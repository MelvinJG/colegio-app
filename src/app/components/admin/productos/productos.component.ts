import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { InfoExtraService } from '../../../services/info-extra.service';
import { UserAuthService } from '../../../services/user-auth.service';
import Swal from 'sweetalert2'
// Interfaz
import { Producto } from '../../../models/Producto';
// Validar Form
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  globalProductoID: any;
  no_Foto_Producto = '../../../../assets/no-foto-producto.jpg';
  agregarProducto: boolean = false;
  actualizarProducto: boolean = false;
  productos: any = []; // Contendra los grados que devuelva la API
  error: any; // Contendra el error que devuelva la API
  verError: boolean = false; // Pinta la vista error
  textDone: any = []; // Porcentaje de carga de la imagen
  lookTextPhoto: boolean = false; // Ver el TEXTO porcentaje de carga o no
  photoProducto: string; // Almacena URL foto del producto
  lookSpinner: boolean = false; // Ver la carga o no
  
  // Objeto para recibir los datos del formulario y luego enviarlo  
  producto: Producto = {
    producto_Id: 0,
    nombre_Producto: '',
    precio: 0,
    cantidad: 0,
    foto: ''
  };

  validationForm: FormGroup;
  constructor(private API_SERVICE: ProductoService, private API_PHOTO: InfoExtraService, private API_USER_AUTH: UserAuthService) {
    this.validationForm = new FormGroup({
      nameProducto: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      precio: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      can: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
    });
  }

  get nameProducto(): AbstractControl {
    return this.validationForm.get('nameProducto')!;
  }

  get precio(): AbstractControl {
    return this.validationForm.get('precio')!;
  }

  get can(): AbstractControl {
    return this.validationForm.get('can')!;
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();
  }

  HabilitarPantallaAgregarProducto() {
    this.producto = {};
    this.actualizarProducto = false;
    this.agregarProducto = true;
    window.scroll(0,1000000);
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

  addProducto(){
    let objetoFinal = Object.assign(this.producto, {foto: this.photoProducto}, {usuario_Registro: 'app_web_add'})
    this.API_SERVICE.addProducto(objetoFinal).subscribe(
      res => {
        let JSONresponse = JSON.parse(JSON.stringify(res));
        Swal.fire({
          icon: 'success',
          title: '¡Yeeei!',
          text: JSONresponse.data
        }).then((result) => {
          if (result.isConfirmed) {
            // OK
            this.Refresh();
          }}
        )
      },
      err => {
        console.log("ERROR AGREGAR PRODUCTO -> ",err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal!'
        })
      }
    );
  }

  deleteProducto(){
    this.API_SERVICE.deleteProducto(this.globalProductoID, {usuario_elimino: 'app_web_delete'}).subscribe(
      res => {
        let JSONresponse = JSON.parse(JSON.stringify(res));
        Swal.fire({
          title: '¡Eliminado!',
          text: JSONresponse.data,
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            // OK
            this.Refresh();
          }}
        )
      },
      err => {
        console.log("ERROR ELIMINAR PRODUCTO -> ",err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal!'
        })
      }
    );
  }

  updateProducto(){
    let objetoFinal = Object.assign(this.producto, {foto: this.photoProducto}, {usuario_Actualizacion: 'app_web_update'})
    this.API_SERVICE.updateProducto(this.globalProductoID,objetoFinal).subscribe(
      res => {
        let JSONresponse = JSON.parse(JSON.stringify(res));
        Swal.fire({
          title: '¡Actualizado!',
          text: JSONresponse.data,
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            // OK
            this.Refresh();
          }}
        )
      },
      err => {
        console.log("ERROR ACTUALIZAR PRODUCTO -> ",err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal!'
        })
      }
    );
  }

  Eliminar_Actualizar(productoID: any){
  this.globalProductoID = productoID;
    Swal.fire({
      title: '¿Qué quieres realizar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Actualizar Producto',
      denyButtonText: `Eliminar Producto`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.agregarProducto = false;
        this.actualizarProducto = true;
        window.scroll(0,1000000);
        this.API_SERVICE.getProductoPorID(productoID).subscribe(
          res => {
            let objeto = JSON.parse(JSON.stringify(res));
            this.producto = objeto.data;
          },
          err => {
            console.log("ERROR GET PRODUCTO POR ID -> ",err)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Algo salió mal!'
            })
          }
        );
      } else if (result.isDenied) {
        Swal.fire({
          title: '¿Estás Seguro?',
          text: "¡No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteProducto();
          }
        })
      }
    })
  }

  Refresh(){
    window.location.reload();
  }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    this.API_SERVICE.getProductos().subscribe(
      res => {
        this.productos = res;
      },
      err => {
        console.log("ERROR MAIN :( -> ",err);
        this.error = err;
        this.verError = true;
      }
    );
  }

}
