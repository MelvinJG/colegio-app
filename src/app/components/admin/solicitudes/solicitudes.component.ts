import { Component, OnInit } from '@angular/core';
import { PagoService } from 'src/app/services/pago.service';
import Swal from 'sweetalert2';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  solicitudesDePago: any = [];
  ningunaSolicitud: boolean = false;

  constructor(private API_USER_AUTH: UserAuthService, private API_PAGO_SERVICE: PagoService) { }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    this.API_PAGO_SERVICE.getAllPagosApp().subscribe(
      res => {
        this.solicitudesDePago = res;
        if(this.solicitudesDePago.data.length === 0){
          this.ningunaSolicitud = true;
        }
      },
      err => {
        console.log("ERROR getAllPagosApp :( -> ",err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal!'
        })
      }
    );
  }

  AceptarSolicitud(comprobanteID: number, posicion: number){
    Swal.fire({
      title: '¿Quieres aceptar este pago?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar Pago'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¿Estás Seguro?',
          text: "¡No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Aceptar!'
        }).then((result) => {
          if (result.isConfirmed) {
            //API PAGO ADMIN
            let objetoFinalADMIN = Object.assign({tipo_pago_Id: 2}, {origen_pago_Id: 2}, {monto: Number(this.solicitudesDePago.data[posicion].monto)}, {cui_Alumno: this.solicitudesDePago.data[posicion].cui_Alumno}, {mes_Id: Number(this.solicitudesDePago.data[posicion].mes_Id)}, {usuario_Registro: this.API_USER_AUTH.getUserName()})
            this.API_PAGO_SERVICE.realizarPagoVariosADMIN(objetoFinalADMIN).subscribe(
              (res: any) => {
                if(res.code === "OPERATION_SUCCESSFUL"){
                  console.log("OK realizarPagoVariosADMIN Pagos",res.code)
                  //API COMPROBANTE APP
                  let objetoFinal = Object.assign({usuario_Respuesta: this.API_USER_AUTH.getUserName()})
                  this.API_PAGO_SERVICE.aceptarComprobante(comprobanteID,objetoFinal).subscribe(
                    res => {
                      let JSONresponse = JSON.parse(JSON.stringify(res));
                      Swal.fire({
                        title: '¡Aceptado!',
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
                      console.log("ERROR aceptarComprobante -> ",err)
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: '¡Algo salió mal!'
                      })
                    }
                  );
                }
              },
              (err) => {
                console.log('ERROR REGISTRAR PAGO ADMIN :( -> ', err);
              }
            );
          }
        })
      }
    })
  }

  RechazarSolicitud(comprobanteID: number){
    Swal.fire({
      title: 'Motivo de Rechazo',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Rechazar',
      showLoaderOnConfirm: true,
      preConfirm: (msj) => {
        let objetoFinal = Object.assign({comentario_Respuesta: msj}, {usuario_Respuesta: this.API_USER_AUTH.getUserName()})
        this.API_PAGO_SERVICE.rechazarComprobante(comprobanteID,objetoFinal).subscribe(
          res => {
            let JSONresponse = JSON.parse(JSON.stringify(res));
            Swal.fire({
              title: '¡Rechazado!',
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
            console.log("ERROR rechazarComprobante -> ",err)
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

}
