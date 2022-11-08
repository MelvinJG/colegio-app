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
