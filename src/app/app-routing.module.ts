import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// componentes
/* Compartido */
import { LoginComponent } from './components/shared/login/login.component';
import { HomeComponent } from './components/shared/home/home.component';
import { PdfInvoiceComponent } from './components/shared/pdf-invoice/pdf-invoice.component'
import { AdminPerfilComponent } from './components/shared/admin-perfil/admin-perfil.component';
import { ErrorComponent } from './components/shared/error/error.component';
/* Admin */
import { GradesComponent } from './components/admin/grades/grades.component';
import { AlumnosComponent } from './components/admin/alumnos/alumnos.component';
import { ProductosComponent } from './components/admin/productos/productos.component';
import { InscripcionesComponent } from './components/admin/inscripciones/inscripciones.component';
import { SolicitudesComponent } from './components/admin/solicitudes/solicitudes.component';
import { PagosComponent } from './components/admin/pagos/pagos.component';
import { ListarPersonalComponent } from './components/admin/personal/listar-personal/listar-personal.component';
import { AgregarPersonalComponent } from './components/admin/personal/agregar-personal/agregar-personal.component';
import { ReporteComponent } from './components/admin/reporte/reporte.component';
/* Profesores */
import { AnuncioTareaComponent } from './components/profesores/anuncio-tarea/anuncio-tarea.component';
import { CalificarTareaComponent } from './components/profesores/calificar-tarea/calificar-tarea.component';
import { NotasFinalesComponent } from './components/profesores/notas-finales/notas-finales.component';
/* Alumnos */
import { AnunciosTareasComponent } from './components/alumnos/anuncios-tareas/anuncios-tareas.component';
import { TareasComponent } from './components/alumnos/tareas/tareas.component';
import { VerNotasComponent } from './components/alumnos/ver-notas/ver-notas.component';
import { GenerarPagoComponent } from './components/alumnos/generar-pago/generar-pago.component';
/*Guard*/
import { AuthorizationGuard } from './guards/authorization.guard'
import { RolesGuard } from './guards/roles.guard'

const routes: Routes = [
  // Root
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // Shared
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'shared/invoicePDF',
    component: PdfInvoiceComponent
  },
  {
    path: 'shared/modificarPerfil',
    component: AdminPerfilComponent
  },
  {
    path: 'shared/error/:err',
    component: ErrorComponent
  },
  // Admin
  {
    path: 'administracion/grades',
    component: GradesComponent,
    canActivate: [AuthorizationGuard] // Valida si existe el token o si ya expiero
  },
  {
    path: 'administracion/alumnos/:grado_Id/:nombre_Grado',
    component: AlumnosComponent
  },
  {
    path: 'administracion/productos',
    component: ProductosComponent,
    canActivate: [RolesGuard],
    data: { expectedRole: 'admin' } // Tiene que tener el roll
  },
  {
    path: 'administracion/personal/listarPersonal',
    component: ListarPersonalComponent
  },
  {
    path: 'administracion/personal/agregarPersonal',
    component: AgregarPersonalComponent
  },
  {
    path: 'administracion/inscripciones',
    component: InscripcionesComponent
  },
  {
    path: 'administracion/solicitudes',
    component: SolicitudesComponent
  },
  {
    path: 'administracion/pagosColegio/:id',
    component: PagosComponent
  },
  {
    path: 'administracion/reporte',
    component: ReporteComponent
  },
  // Profesores
  {
    path: 'profesores/misGrados',
    component: GradesComponent
  },
  {
    path: 'profesores/misAlumnos',
    component: AlumnosComponent
  },
  {
    path: 'profesores/publicarAnuncio-Tarea',
    component: AnuncioTareaComponent
  },
  {
    path: 'profesores/calificarTarea',
    component: CalificarTareaComponent
  },
  {
    path: 'profesores/subirNotasFinales',
    component: NotasFinalesComponent
  },
  // Alumnos
  {
    path: 'alumnos/Anuncios-Tareas',
    component: AnunciosTareasComponent
  },
  {
    path: 'alumnos/verTareas',
    component: TareasComponent
  },
  {
    path: 'alumnos/verNotas',
    component: VerNotasComponent
  },
  {
    path: 'alumnos/realizarPago',
    component: GenerarPagoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
