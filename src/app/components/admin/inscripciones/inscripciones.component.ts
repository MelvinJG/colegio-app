import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoExtraService } from '../../../services/infoExtra/info-extra.service';
import { AlumnoService } from '../../../services/alumno/alumno.service';
import Swal from 'sweetalert2'
// Interfaz
import { Alumno } from '../../../models/Alumno';
import { Encargado } from '../../../models/Encargado';

@Component({
    selector: 'app-inscripciones',
    templateUrl: './inscripciones.component.html',
    styleUrls: ['./inscripciones.component.css']
  })
export class InscripcionesComponent {
  grados: any = [];
  textDone: any = []; // Porcentaje de carga de la imagen
  lookTextPhoto: boolean = false; // Ver el TEXTO porcentaje de carga o no
  photoAlumno: string; // Almacena URL foto del producto
  lookSpinner: boolean = false; // Ver la carga o no
  GradoID: number; 
  EncontroEncargado: boolean = false;
  AgregoEncargado: boolean = false;

  // Objeto para recibir los datos del formulario y luego enviarlo  
  encargado: Encargado = {
    dpi_Encargado: null,
    nombre: null,
    correo: null,
    no_Cel: null,
    no_Tel_Casa: null,
    direccion:null,
  }
  alumno: Alumno = {
    cui_Alumno: '',
    nombre: '',
    fecha_Nac: new Date(),
    grado_Id: 0,
    foto: '',
    relacion_Encargado: '',
  }

  constructor(private API_SERVICE: InfoExtraService, private API_ALUMNO_ENCARGADO: AlumnoService, private router: Router) { }

  ngOnInit(): void {
    this.API_SERVICE.getGrados().subscribe(
      res => {
        this.grados = res;
      },
      err => {
        console.log("ERROR CARGAR GRADOS :( -> ",err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal!'
        })
      }
    );
  }

  inscribirAlumno(){
    if (this.EncontroEncargado === true){
      let objetoFinalUI = Object.assign(this.encargado, {usuario_Actualizacion: 'app_web_update'})
      this.API_ALUMNO_ENCARGADO.updateEncargado(this.encargado.dpi_Encargado,objetoFinalUI).subscribe(
        res => {
          this.AgregoEncargado = true;
          console.log("RESPUESTA ACTUALIZAR ENCARGADO EN INSCRIPCION -> ",res)
          this.encargado = {}
        },
        err => {
          console.log("ERROR ACTUALIZAR ENCARGADO EN INSCRIPCION -> ",err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal!'
          })
        }
      );
    } else {
      let objetoFinalNew = Object.assign(this.encargado, {usuario_Registro: 'app_web_add'})
      this.API_ALUMNO_ENCARGADO.addEncargado(objetoFinalNew).subscribe(
        res => {
          this.AgregoEncargado = true;
          console.log("RESPUESTA AGREGAR ENCARGADO EN INSCRIPCION -> ",res)
          this.encargado = {}
        },
        err => {
          console.log("ERROR AGREGAR ENCARGADO EN INSCRIPCION -> ",err)
          if(err.error.code === 'REGISTRATION_DUPLICATE'){
            Swal.fire({
              icon: 'info',
              title: 'Oops...',
              text: 'El No. de DPI del encargado ya se encuentra registrado.'
            }).then((result) => {
              if (result.isConfirmed) {
                // OK
                this.encargado = {}
              }}
            )
          } else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Algo salió mal!'
            })
          }
        }
      );
    }
    console.log("ESTADO ",this.AgregoEncargado)
    // if(this.AgregoEncargado){
      let objetoFinalAlumno = Object.assign(this.alumno, {foto: this.photoAlumno}, {grado_Id: this.GradoID}, {dpi_Encargado: this.encargado.dpi_Encargado}, {usuario_Registro: 'app_web_add'})
      this.API_ALUMNO_ENCARGADO.addAlumno(objetoFinalAlumno).subscribe(
        res => {
          let JSONresponse = JSON.parse(JSON.stringify(res));
          Swal.fire({
            icon: 'success',
            title: '¡Yeeei!',
            text: JSONresponse.data
          }).then((result) => {
            if (result.isConfirmed) {
              // OK Navegar a pago inscripcion
              this.router.navigate(['/administracion/pagosColegio/pago-inscripcion']);
            }}
          )
        },
        err => {
          console.log("ERROR AGREGAR ALUMNO -> ",err)
          if(err.error.code === 'REGISTRATION_DUPLICATE'){
            Swal.fire({
              icon: 'info',
              title: 'Oops...',
              text: 'El CUI del alumno ya se encuentra registrado.'
            }).then((result) => {
              if (result.isConfirmed) {
                // OK
                // this.alumno = {} PENDIENTE DE HACER ALGO
              }}
            )
          } else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Algo salió mal!'
            })
          }
        }
      );
      // }
  }

  buscarEncargado(){
    if(this.encargado.dpi_Encargado === ''){// Validar a length 13
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Ingrese DPI a buscar.'
      })
      this.encargado = {}
      this.EncontroEncargado = false;
    } else{
      this.API_ALUMNO_ENCARGADO.getEncargadoPorDPI(this.encargado.dpi_Encargado).subscribe(
        res => {
          let objeto = JSON.parse(JSON.stringify(res));
          this.encargado = objeto.data;
          this.EncontroEncargado = true;
        },
        err => {
          console.log("ERROR BUSCAR ENCARGADO :( -> ",err);
          if(err.status === 404){
            Swal.fire({
              icon: 'info',
              title: 'Oops...',
              text: 'Encargado no encontrado.'
            })
          } else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Algo salió mal!'
            })
          }
          this.encargado = {}
          this.EncontroEncargado = false;
        }
      );
    }
  }

  gradoSelect(event: any){
    this.GradoID = event.target.value;
  }

  uploadPhoto (event: any){
    this.lookTextPhoto = true;
    this.lookSpinner = true;
    this.textDone[0] = "text-primary";
    this.textDone[1] = "SUBIENDO ...";
    const File = event.target.files[0];
    this.API_SERVICE.uploadPhotoToS3(File).subscribe(
      res => { 
        let JSONResponse = JSON.parse(JSON.stringify(res));
        this.photoAlumno = JSONResponse.data.Location
        this.lookSpinner = false;
        this.textDone[0] = "text-success";
        this.textDone[1] = "✅ EXITO";
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Foto subida con exito!',
          showConfirmButton: false,
          timer: 1000
        })
      },
      err => {
        this.lookSpinner = false;
        this.textDone[0] = "text-danger";
        this.textDone[1] = "❌ ERROR";
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: '¡Error al cargar imagen!',
          showConfirmButton: false,
          timer: 1000
        })
        console.log("ERROR SUBIR FOTO -> ",err)
      }
    );
  }

}

// VALIDAR FORMULARIO

// IMPORTS
// import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

// PARA FORMS
// validationForm: FormGroup; // ARRIBA CONSTRUCTOR

// DENTRO DEL CONSTRUCTOR
// this.validationForm = new FormGroup({
//   nameEncargado: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
//   dpi: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
//   relacion: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
//   cel: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
//   direccion: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
//   nameAlumno: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
//   cui: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
//   fecNac: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
// });

// METODOS

// get nameEncargado(): AbstractControl {
//   return this.validationForm.get('nameEncargado')!;
// }

// get dpi(): AbstractControl {
//   return this.validationForm.get('dpi')!;
// }

// get relacion(): AbstractControl {
//   return this.validationForm.get('relacion')!;
// }

// get cel(): AbstractControl {
//   return this.validationForm.get('cel')!;
// }

// get direccion(): AbstractControl {
//   return this.validationForm.get('direccion')!;
// }

// get nameAlumno(): AbstractControl {
//   return this.validationForm.get('nameAlumno')!;
// }

// get cui(): AbstractControl {
//   return this.validationForm.get('cui')!;
// }

// get fecNac(): AbstractControl {
//   return this.validationForm.get('fecNac')!;
// }

// onSubmit(): void {
//   this.validationForm.markAllAsTouched();
// }
// VALIDAR FORMULARIO








//PRUEBA PARA PDF
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-inscripciones',
//   templateUrl: './inscripciones.component.html',
//   styleUrls: ['./inscripciones.component.css']
// })
// export class InscripcionesComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }
// }



// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import htmlToPdfmake from 'html-to-pdfmake'
//administracion/inscripciones
  // createPDFInvoice(){
//     const htmlToConvert = htmlToPdfmake(`
//     <img src="https://static.vecteezy.com/system/resources/previews/006/004/413/non_2x/university-or-school-engineering-emblem-logo-design-inspiration-vector.jpg"
//     style="alignment: right; width: 150px;" />
// <p style="background-color: white; font-style: italic;">
//     <strong style="font-size: 35px; font-style: initial;">RECIBO</strong><br />
//     <span style="font-size: 10px; font-style: italic;"><strong>Lugar y fecha de expedición</strong></span><br />
//     En <u style="font-style: initial;"> Guatemala Sumpango, Sacatepéquez </u> a <u style="font-style: initial;"> 28 </u>
//     de <u style="font-style: initial;"> agosto </u> de <u style="font-style: initial;"> 2022 </u><br />
//     Recibí de <u style="font-style: initial;"> Melvin Misael Joj Gil </u> la cantidad de Q <u style="font-style: initial;"> 250.00 </u><br />
//     <span style="font-size: 10px; font-style: italic;"><strong>Cantidad en letras</strong></span><br />
//     <span
//         style="font-style: initial; border: 4; padding: 5px 50px 5px 50px; border-radius: 15px; background-color: rgba(224, 221, 221, 0.849);"><strong>Docientos
//             cienta quetzales exactos.</strong></span><br />
            
//     Por concepto de <u style="font-style: initial;"> Pago de colegiatura del mes de Agosto </u><br />
// </p>
// <br />
// <p style="margin: 20 50 20 50; ">
//     Prueba
// <p/>
//     `,  { 
//       imagesByReference : true 
//     });
//     const pdfContent: any =  {
//       content: htmlToConvert.content,
//       images: htmlToConvert.images,
//       styles:{
//         derecha:{ // we define the class called "red"
//           //float: "right",
//           width: "120px"
//         }
//       }
//     }
//     const pdfResult = pdfMake.createPdf(pdfContent);
//     pdfResult.open();
  // }