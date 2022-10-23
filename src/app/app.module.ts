import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/shared/login/login.component';
import { HomeComponent } from './components/shared/home/home.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { GradesComponent } from './components/admin/grades/grades.component';
import { AlumnosComponent } from './components/admin/alumnos/alumnos.component';
import { ProductosComponent } from './components/admin/productos/productos.component';
import { InscripcionesComponent } from './components/admin/inscripciones/inscripciones.component';
import { SolicitudesComponent } from './components/admin/solicitudes/solicitudes.component';
import { PagosComponent } from './components/admin/pagos/pagos.component';
import { ListarPersonalComponent } from './components/admin/personal/listar-personal/listar-personal.component';
import { AgregarPersonalComponent } from './components/admin/personal/agregar-personal/agregar-personal.component';
import { AnuncioTareaComponent } from './components/profesores/anuncio-tarea/anuncio-tarea.component';
import { CalificarTareaComponent } from './components/profesores/calificar-tarea/calificar-tarea.component';
import { NotasFinalesComponent } from './components/profesores/notas-finales/notas-finales.component';
import { AnunciosTareasComponent } from './components/alumnos/anuncios-tareas/anuncios-tareas.component';
import { TareasComponent } from './components/alumnos/tareas/tareas.component';
import { VerNotasComponent } from './components/alumnos/ver-notas/ver-notas.component';
import { GenerarPagoComponent } from './components/alumnos/generar-pago/generar-pago.component';
import { PdfInvoiceComponent } from './components/shared/pdf-invoice/pdf-invoice.component';
import { AdminPerfilComponent } from './components/shared/admin-perfil/admin-perfil.component';
import { ErrorComponent } from './components/shared/error/error.component';
import { SelectGradosComponent } from './components/admin/personal/select-grados/select-grados.component';
import { ReporteComponent } from './components/admin/reporte/reporte.component';
// Servicios
import { InfoExtraService } from './services/infoExtra/info-extra.service';
import { AlumnoService } from './services/alumno/alumno.service';
import { ProductoService } from './services/producto/producto.service';
import { EmpleadoService } from './services/empleado/empleado.service';
import { PagoService } from './services/pago/pago.service';
import { UserAuthService } from './services/userAuth/user-auth.service';

// MDB
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ReactiveFormsModule } from '@angular/forms';
// Grafica
import { ChartsModule } from 'ng2-charts';
// JWT
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    GradesComponent,
    AlumnosComponent,
    ProductosComponent,
    InscripcionesComponent,
    SolicitudesComponent,
    PagosComponent,
    ListarPersonalComponent,
    AgregarPersonalComponent,
    AnuncioTareaComponent,
    CalificarTareaComponent,
    NotasFinalesComponent,
    AnunciosTareasComponent,
    TareasComponent,
    VerNotasComponent,
    GenerarPagoComponent,
    PdfInvoiceComponent,
    AdminPerfilComponent,
    ErrorComponent,
    SelectGradosComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MdbFormsModule,
    MdbDropdownModule,
    BrowserAnimationsModule,
    MdbCollapseModule,
    MdbRadioModule,
    MdbCheckboxModule,
    MdbValidationModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [
    InfoExtraService,
    AlumnoService,
    ProductoService,
    EmpleadoService,
    PagoService,
    UserAuthService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
