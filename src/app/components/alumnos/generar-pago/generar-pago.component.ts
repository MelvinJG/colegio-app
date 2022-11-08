import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { InfoExtraService } from '../../../services/info-extra.service';
import Swal from 'sweetalert2'
import { AlumnoService } from 'src/app/services/alumno.service';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-generar-pago',
  templateUrl: './generar-pago.component.html',
  styleUrls: ['./generar-pago.component.css']
})
export class GenerarPagoComponent implements OnInit {

  textDone: any = []; // Porcentaje de carga de la imagen
  lookTextPhoto: boolean = false; // Ver el TEXTO porcentaje de carga o no
  photoBoleta: string = ""; // Almacena URL foto del producto
  lookSpinner: boolean = false; // Ver la carga o no
  alumnoInfo: any = [];
  meses: any = [];
  combrobantesDePago: any = [];
  no_Foto = '../../../../assets/no-foto.jpg';
  colorInscripcion: string;
  mensualidad: string = this.API_USER_AUTH.getMensualidad();
  MesSelect: string = "";

  constructor(private API_USER_AUTH: UserAuthService, private API_PHOTO: InfoExtraService, private API_ALUMNO_SERVICE: AlumnoService, private API_INFO_SERVICE: InfoExtraService,
    private API_PAGO_SERVICE: PagoService) { }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    this.API_ALUMNO_SERVICE.getDetalleUltimoPagoAlumno(this.API_USER_AUTH.getIdUsuario()).subscribe(
      res => {
        this.alumnoInfo = res;
        if(this.alumnoInfo.data.pago_Inscripcion === 'SI'){
          this.colorInscripcion = "text-success";
        } else {
          this.colorInscripcion = "text-danger"
        }
      },
      err => {
        console.log("ERROR getDetalleUltimoPagoAlumno :( -> ",err);
        this.setError(err.status,'Estado de cuenta no encontrado.');
      }
    );
    this.API_INFO_SERVICE.getMesesPendientesPagoAlumno(this.API_USER_AUTH.getIdUsuario()).subscribe(
      (res) => {
        this.meses = res;
      },
      (err) => {
        console.log('ERROR CARGAR MESES ALUMNOS :( -> ', err);
        this.setError(err.status,'Meses pendientes de pago no encontrados.');
      }
    );
    this.API_PAGO_SERVICE.getPagosAppAlumno(this.API_USER_AUTH.getIdUsuario()).subscribe(
      (res) => {
        this.combrobantesDePago = res;
      },
      (err) => {
        console.log('ERROR getPagosAppAlumno :( -> ', err);
        this.setError(err.status,'Ningun Comprobante de Pago Enviado.');
      }
    );
  }

  AccionComprobante(comprobanteID: number, estado: number, posicion: number){
    if(estado === 1){
      Swal.fire({
        title: '¿Quieres cancelar el envío?',
        showCancelButton: true,
        confirmButtonText: 'Cancelar Envio'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '¿Estás Seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Cancelar!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.API_PAGO_SERVICE.cancelarEnvio(comprobanteID).subscribe(
                res => {
                  let JSONresponse = JSON.parse(JSON.stringify(res));
                  Swal.fire({
                    title: '¡Cancelado!',
                    text: JSONresponse.data,
                    icon: 'success',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // OK
                      window.location.reload();
                    }}
                  )
                },
                err => {
                  console.log("ERROR cancelarEnvio -> ",err)
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Algo salió mal!'
                  })
                }
              );
            }
          })
        }
      })
    } else if (estado === 3){
      Swal.fire({
        icon: 'info',
        title: 'Oops... Rechazado',
        text: this.combrobantesDePago.data[posicion].comentario_Respuesta
      })
    }

  }

  enviarComprobante(){
    let objetoFinal: any;
    if(this.MesSelect === "" || this.photoBoleta === "" ){
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Seleccione el mes de pago y/o suba la boleta de pago.'
      })
    } else{
      objetoFinal = Object.assign({cui_Alumno: this.API_USER_AUTH.getIdUsuario()}, {mes_Id: this.MesSelect}, {monto: this.mensualidad}, {img_Comprobante: this.photoBoleta}, {estado_Id: 1})
      this.API_PAGO_SERVICE.realizarPagoApp(objetoFinal).subscribe(
        (res) => {
          let JSONresponse = JSON.parse(JSON.stringify(res));
          Swal.fire({
            icon: 'success',
            title: '¡Yeeei!',
            text: JSONresponse.data
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }}
          )
        },
        (err) => {
          console.log('ERROR REGISTRAR PAGO :( -> ', err);
          this.setError(err.status,'404 ???');
        }
      );
    }
  }

  mesSelect(event: any){
    this.MesSelect = event.target.value;
  }

  uploadPhoto (event: any){
    this.lookTextPhoto = true;
    this.lookSpinner = true;
    this.textDone[0] = "text-primary";
    this.textDone[1] = "SUBIENDO ...";
    const File = event.target.files[0];
    this.API_PHOTO.uploadPhotoToS3(File).subscribe(
      res => { 
        let JSONResponse = JSON.parse(JSON.stringify(res));
        this.photoBoleta = JSONResponse.data.Location
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

  setError(status: number, mensaje404: string){
    if(status === 404){
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: mensaje404
      })
    } else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Algo salió mal!'
      })
    }
  }
}
