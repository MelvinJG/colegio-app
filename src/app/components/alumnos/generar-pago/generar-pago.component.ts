import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { InfoExtraService } from '../../../services/info-extra.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-generar-pago',
  templateUrl: './generar-pago.component.html',
  styleUrls: ['./generar-pago.component.css']
})
export class GenerarPagoComponent implements OnInit {

  textDone: any = []; // Porcentaje de carga de la imagen
  lookTextPhoto: boolean = false; // Ver el TEXTO porcentaje de carga o no
  photoProducto: string; // Almacena URL foto del producto
  lookSpinner: boolean = false; // Ver la carga o no

  constructor(private API_USER_AUTH: UserAuthService, private API_PHOTO: InfoExtraService) { }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
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
        this.photoProducto = JSONResponse.data.Location
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
