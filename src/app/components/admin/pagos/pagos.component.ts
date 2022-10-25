import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../services/alumno/alumno.service';
import { InfoExtraService } from '../../../services/infoExtra/info-extra.service';
import { EmpleadoService } from '../../../services/empleado/empleado.service';
import { UserAuthService } from '../../../services/userAuth/user-auth.service';
import { PagoService } from '../../../services/pago/pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  constructor(private API_ALUMNO_SERVICE: AlumnoService, private activeRoute: ActivatedRoute, private API_INFO_SERVICE: InfoExtraService, 
    private API_EMPLEADO_SERVICE: EmpleadoService, private API_PAGO_SERVICE: PagoService, private API_USER_AUTH: UserAuthService) { }

  no_Foto = '../../../../assets/no-foto.jpg';
  titulo: string = "";
  monto: number = 0;
  esSalario: boolean = false;
  esInscripcion: boolean = false;
  verAlumno: boolean = false;
  verEmpleado: boolean = false;
  verBotones: boolean = false;
  grados: any = [];
  alumnos: any = [];
  empleados: any = [];
  meses: any = [];
  alumnoInfo: any = [];
  empleadoInfo: any = [];
  colorInscripcion: string;
  tipoDePago: number;
  PersonaPago: string;
  //Enviar PDF
  objetoDatosPDF: any;
  verPDF: boolean = false;

  //EnviarInfo API
  alumnoSeleccionado: string = "";
  mesSeleccionado: string = "";
  empleadoSeleccionado: string = "";

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    const parametro = this.activeRoute.snapshot.params;
    if(parametro['id'] === 'pago-inscripcion') {
      this.getGrados();
      this.titulo = "Pago De Inscripción";
      this.monto = 500; //DEPENDIENDO DE QUE DIGA EL COLEGIO
      this.esInscripcion = true;
      this.tipoDePago = 1;
    } else if(parametro['id'] === 'pago-colegiatura') {
      this.getGrados();
      this.titulo = "Pago De Colegiatura";
      this.tipoDePago = 2;
    } 
    else {
      this.titulo = "Pago Salarial";
      this.getEmpleados()
      this.esSalario = true;
      this.tipoDePago = 3;
    }
  }

  generarPago(){
    let datosFull: boolean = false;
    let objetoFinal: any;
    //Inscripcion
    if(this.tipoDePago === 1){
      objetoFinal = Object.assign({tipo_pago_Id: this.tipoDePago}, {origen_pago_Id: 1}, {monto: this.monto}, {cui_Alumno: this.alumnoSeleccionado}, {usuario_Registro: 'app_web_add'})
      datosFull = true;
    }
    //Colegiatura 
    if(this.tipoDePago === 2){
      if(this.mesSeleccionado.length === 0){
        this.setError(404,'Seleccione al mes de pago.');
      } else {
        if(isNaN(Number(this.mesSeleccionado))){
          this.setError(404,'Seleccione al mes de pago.');
        } else {
          objetoFinal = Object.assign({tipo_pago_Id: this.tipoDePago}, {origen_pago_Id: 1}, {monto: Number(this.monto)}, {cui_Alumno: this.alumnoSeleccionado}, {mes_Id: Number(this.mesSeleccionado)}, {usuario_Registro: 'app_web_add'})
          datosFull = true;
        }
      }
    }
    //Salario
    if(this.tipoDePago === 3){
      if(this.mesSeleccionado.length === 0){
        this.setError(404,'Seleccione al mes de pago.');
      } else {
        if(isNaN(Number(this.mesSeleccionado))){
          this.setError(404,'Seleccione al mes de pago.');
        } else {
          objetoFinal = Object.assign({tipo_pago_Id: this.tipoDePago}, {monto:  Number(this.monto)}, {dpi_Empleado: this.empleadoSeleccionado}, {mes_Id: Number(this.mesSeleccionado)}, {usuario_Registro: 'app_web_add'})
          datosFull = true;
        }
      }
    }
    //Si todo esta bien Envia api
    if(datosFull){
      this.API_PAGO_SERVICE.realizarPagoVariosADMIN(objetoFinal).subscribe(
        (res) => {
          let JSONresponse = JSON.parse(JSON.stringify(res));
          Swal.fire({
            icon: 'success',
            title: '¡Yeeei!',
            text: JSONresponse.data
          }).then((result) => {
            if (result.isConfirmed) {
              // OK
              // Enviamos Datos PDF
              this.objetoDatosPDF = Object.assign(objetoFinal,{motivoPago: this.titulo},{personaPago: this.PersonaPago})
              this.verPDF = true;
            }}
          )
        },
        (err) => {
          console.log('ERROR REGISTRAR PAGO :( -> ', err);
          this.setError(err.status,'404??');
        }
      );
    }
  }

  mesSelect(event: any){
    this.verPDF = false;
    this.mesSeleccionado = event.target.value;
  }

  alumnoSelect(event: any){
    this.verPDF = false;
    this.alumnoSeleccionado = event.target.value;
    this.API_ALUMNO_SERVICE.getDetalleUltimoPagoAlumno(event.target.value).subscribe(
      res => {
        this.alumnoInfo = res;
        this.PersonaPago = this.alumnoInfo.data.nombre;
        if(this.alumnoInfo.data.pago_Inscripcion === 'SI'){
          this.colorInscripcion = "text-success";
        } else {
          this.colorInscripcion = "text-danger"
        }
        this.getMeses(this.alumnoInfo.data.cui_Alumno,2);
        this.verAlumno = true;
        if(this.alumnoInfo.data.pago_Inscripcion === 'SI' && this.tipoDePago === 1){
          this.verBotones = false;
          Swal.fire({
            icon: 'success',
            title: '¡Solvente!',
            text: "Inscripción ya cancelada",
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          this.verBotones = true;
        }
      },
      err => {
        console.log("ERROR GET INFORMACION ALUMNO SELECCIONADO :( -> ",err);
        this.setError(err.status,'Alumno seleccionado no encontrado.');
        this.alumnoInfo = [];
      }
    );
  }

  gradoSelect(event: any) {
    this.verAlumno = false;
    this.verBotones = false;
    this.meses = [];
    this.mesSeleccionado = "";
    this.verPDF = false;
    let valoresArray = event.target.value.split(',');
    if(!this.esInscripcion){ // Si es pago de inscripcion ignoramos el monto de la mensualidad segun el grado
      this.monto = valoresArray[1];
    }
    // Pintar los alumnos segun el grado seleccionado
    this.API_ALUMNO_SERVICE.getAlumnosPorGrado(valoresArray[0]).subscribe(
      res => {
        this.alumnos = res;
      },
      err => {
        console.log('ERROR CARGAR ALUMNOS POR GRADO :( -> ', err);
        this.setError(err.status,'Alumnos no encontrados, seleccione otro grado.');
      }
    );
  }

  getMeses(idCliente: string, tipoPago: number){
    if(tipoPago === 2){
      //ALUMNOS
      this.API_INFO_SERVICE.getMesesPendientesPagoAlumno(idCliente).subscribe(
        (res) => {
          this.meses = res;
        },
        (err) => {
          console.log('ERROR CARGAR MESES ALUMNOS :( -> ', err);
          this.setError(err.status,'Meses pendientes de pago no encontrados.');
        }
      );
    } else if(tipoPago === 3){
      //EMPLEADOS
      this.API_INFO_SERVICE.getMesesPendientesPagoEmpleado(idCliente).subscribe(
        (res) => {
          this.meses = res;
        },
        (err) => {
          console.log('ERROR CARGAR MESES EMPLEADOS :( -> ', err);
          this.setError(err.status,'Meses pendientes de pago no encontrados.');
        }
      );
    }
  }

  empleadoSelect(event: any){
    this.mesSeleccionado = "";
    this.verPDF = false;
    let valoresArray = event.target.value.split(',');
    this.monto = valoresArray[1];
    this.empleadoSeleccionado = valoresArray[0];
    this.API_EMPLEADO_SERVICE.getDetalleUltimoPagoEmpleado(valoresArray[0]).subscribe(
      res => {
        this.empleadoInfo = res;
        this.PersonaPago = this.empleadoInfo.data.nombre;
        this.getMeses(this.empleadoInfo.data.dpi_Empleado,3);
        this.verEmpleado = true;
        this.verBotones = true;
      },
      err => {
        console.log("ERROR GET INFORMACION EMPLEADO SELECCIONADO :( -> ",err);
        this.setError(err.status,'Empleado seleccionado no encontrado.');
        this.alumnoInfo = [];
      }
    );
  }

  getEmpleados(){
    this.API_EMPLEADO_SERVICE.getEmpleados().subscribe(
      (res) => {
        this.empleados = res;
      },
      (err) => {
        console.log('ERROR CARGAR EMPLEADOS :( -> ', err);
        this.setError(err.status,'Empleados no encontrados.');
      }
    );
  }

  getGrados(){
    this.API_INFO_SERVICE.getGrados().subscribe(
      (res) => {
        this.grados = res;
      },
      (err) => {
        console.log('ERROR CARGAR GRADOS :( -> ', err);
        this.setError(err.status,'Grados no encontrados.');
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
