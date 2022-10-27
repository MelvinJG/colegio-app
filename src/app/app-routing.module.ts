import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// componentes
/* Raiz */

/* Compartido */
import { LoginComponent } from './components/shared/login/login.component';
import { HomeComponent } from './components/shared/home/home.component';
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
    component: HomeComponent,
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'shared/modificarPerfil',
    component: AdminPerfilComponent,
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'shared/error',
    component: ErrorComponent,
    canActivate: [AuthorizationGuard]
  },
  // Admin
  {
    path: 'administracion/grades',
    component: GradesComponent,
    canActivate: [AuthorizationGuard, RolesGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'shared/alumnos/:grado_Id/:nombre_Grado',
    component: AlumnosComponent,
    canActivate: [AuthorizationGuard] // COMPARTIDO 
  },
  {
    path: 'administracion/productos',
    component: ProductosComponent,
    canActivate: [AuthorizationGuard, RolesGuard], //[Valida si existe el token (si inicio sesion), Valida el role que tiene (si tiene permisos)]
    data: { expectedRole: 'admin' } // Tiene que tener el roll
  },
  {
    path: 'administracion/personal/listarPersonal',
    component: ListarPersonalComponent,
    canActivate: [AuthorizationGuard, RolesGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'administracion/personal/agregarPersonal',
    component: AgregarPersonalComponent,
    canActivate: [AuthorizationGuard, RolesGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'administracion/inscripciones',
    component: InscripcionesComponent,
    canActivate: [AuthorizationGuard, RolesGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'administracion/solicitudes',
    component: SolicitudesComponent,
    canActivate: [AuthorizationGuard, RolesGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'administracion/pagosColegio/:id',
    component: PagosComponent,
    canActivate: [AuthorizationGuard, RolesGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'administracion/reporte',
    component: ReporteComponent,
    canActivate: [AuthorizationGuard, RolesGuard],
    data: { expectedRole: 'admin' }
  },
  // Profesores
  {
    path: 'profesores/misGrados',
    component: GradesComponent,
    canActivate: [AuthorizationGuard, RolesGuard],
    data: { expectedRole: 'prof' }
  },
  // {
  //   path: 'profesores/misAlumnos',
  //   component: AlumnosComponent,
  //   canActivate: [AuthorizationGuard, RolesGuard],
  //   data: { expectedRole: 'prof' }
  // },
  {
    path: 'profesores/publicarAnuncio-Tarea',
    component: AnuncioTareaComponent,
    canActivate: [AuthorizationGuard, RolesGuard],
    data: { expectedRole: 'prof' }
  },
  {
    path: 'profesores/calificarTarea',
    component: CalificarTareaComponent,
    canActivate: [AuthorizationGuard, RolesGuard],
    data: { expectedRole: 'prof' }
  },
  {
    path: 'profesores/subirNotasFinales',
    component: NotasFinalesComponent,
    canActivate: [AuthorizationGuard, RolesGuard],
    data: { expectedRole: 'prof' }
  },
  // Alumnos
  {
    path: 'alumnos/Anuncios-Tareas',
    component: AnunciosTareasComponent,
    canActivate: [AuthorizationGuard, RolesGuard],
    data: { expectedRole: 'user' }
  },
  {
    path: 'alumnos/verTareas',
    component: TareasComponent,
    canActivate: [AuthorizationGuard, RolesGuard],
    data: { expectedRole: 'user' }
  },
  {
    path: 'alumnos/verNotas',
    component: VerNotasComponent,
    canActivate: [AuthorizationGuard, RolesGuard],
    data: { expectedRole: 'user' }
  },
  {
    path: 'alumnos/realizarPago',
    component: GenerarPagoComponent,
    canActivate: [AuthorizationGuard, RolesGuard],
    data: { expectedRole: 'user' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
