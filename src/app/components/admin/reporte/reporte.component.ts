import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductoService } from 'src/app/services/producto.service';
import { ReporteService } from 'src/app/services/reporte.service';
import Swal from 'sweetalert2';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {


  constructor(private API_USER_AUTH: UserAuthService, private API_REPORTE: ReporteService, private API_PRODUCTO: ProductoService) { }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    this.API_REPORTE.getIngresoEgreso().subscribe(
      (res: any) => {
        this.reporteIntresosYEgresos(res.data);
      },
      err => {
        console.log("ERROR getIngresoEgreso :( -> ",err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal!'
        })
      }
    );
    this.API_REPORTE.getSolventeInsolvente().subscribe(
      (res: any) => {
        this.reporteSolventeInsolvente(res.data);
      },
      err => {
        console.log("ERROR getSolventeInsolvente :( -> ",err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal!'
        })
      }
    );
    this.API_PRODUCTO.getProductos().subscribe(
      (res: any) => {
        this.reporteProductosDisponibles(res.data)
      },
      err => {
        console.log("ERROR getProductos :( -> ",err);
        if(err.status === 404){
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: err.error.message
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal!'
          })
        }
      }
    );
    this.API_REPORTE.getOrigenPago().subscribe(
      (res: any) => {
        this.reportePagosAppYAdmin(res.data);
      },
      err => {
        console.log("ERROR getOrigenPago :( -> ",err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal!'
        })
      }
    );
    this.API_REPORTE.getCantidadAlumnoEmpleado().subscribe(
      (res: any) => {
        this.reporteCantidadAlumnosYProfesores(res.data);
      },
      err => {
        console.log("ERROR getOrigenPago :( -> ",err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal!'
        })
      }
    );
    // this.createChart();
  }

  // INGRESOS / EGRESOS
  reporteIntresosYEgresos(data: any){
    new Chart("MyChartIngresoEgreso", {
      type: 'line',
      data: {
        labels: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre'
        ],
        datasets: [
          {
            data: [data[0].sumaMes,data[1].sumaMes,data[2].sumaMes,data[3].sumaMes,data[4].sumaMes,data[5].sumaMes,data[6].sumaMes,data[7].sumaMes,data[8].sumaMes,data[9].sumaMes,data[10].sumaMes,data[11].sumaMes],
            label: 'Ingresos',
            backgroundColor:'rgba(54, 162, 235, 0.4)',
            borderColor:'rgb(54, 162, 235)',
            borderWidth: 3
          },
          {
            data: [data[12].sumaMes,data[13].sumaMes,data[14].sumaMes,data[15].sumaMes,data[16].sumaMes,data[17].sumaMes,data[18].sumaMes,data[19].sumaMes,data[20].sumaMes,data[21].sumaMes,data[22].sumaMes,data[23].sumaMes],
            label: 'Egresos',
            backgroundColor: 'rgba(255, 99, 132, 0.4)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true
        // aspectRatio: 2.5
      }
    });
  }

  // ALUMNOS SOLVENTES O INSOLVENTES
  reporteSolventeInsolvente(data: any){
    new Chart("MyChartSolventeInsolvente", {
      type: 'doughnut',
      data: {
        labels: ['Solventes', 'Insolventes'],
        datasets: [{
          label: 'My First Dataset',
          data: [data[0].coutSolventes, data[1].coutSolventes],
          backgroundColor: [
            'rgb(142, 68, 173)',
            'rgba(142, 68, 173,0.4)',
          ]
        }]
      },
      options: {
        responsive: true,
        animation: {
            animateScale: true,
            animateRotate: true
        },
        // plugins: {
        //   // datalabels: {
        //   //   display: true,
        //   //   backgroundColor: '#ccc',
        //   //   borderRadius: 3,
        //   //   font: {
        //   //     color: 'red',
        //   //     weight: 'bold',
        //   //   }
        //   // },
        //   doughnutlabel: {
        //     labels: [{
        //       text: '550',
        //       font: {
        //         size: 20,
        //         weight: 'bold'
        //       }
        //     }, {
        //       text: 'total'
        //     }]
        //   }
        // }
      }
    });
  }

  // PAGOS APP Y ADMIN
  reportePagosAppYAdmin(data: any){
    new Chart("MyChartPagosAppyAdmin", {
      type: 'pie',
      data: {
        labels: ['Pagos en Administración', 'Pagos desde App'],
        datasets: [
          {
            data: [data[0].pagoOrigen,data[1].pagoOrigen],
            backgroundColor: [
              'rgb(230, 126, 34)',
              'rgba(230, 126, 34,0.4)',
            ]
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  //Alumnos y profesores
  reporteCantidadAlumnosYProfesores(data: any){
    new Chart("MyChartAlumnosEmpleados", {
      type: 'doughnut',
      data: {
        labels: ['Alumnos','Empleados'],
        datasets: [
          {
            data: [data[0].cantidadPersona,data[1].cantidadPersona],
            backgroundColor: [
              'rgb(39, 174, 96)',
              'rgba(39, 174, 96, 0.4)'
            ]
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  // DISPONIBILIDAD DE PRODUCTOS
  reporteProductosDisponibles(data: any){
    let nombres: any = [];
    let cantidad: any = [];
    for(let i = 0 ; i < data.length; i++){
      nombres.push(data[i].nombre_Producto);
      cantidad.push(data[i].cantidad);
    }
    new Chart("MyChartProductosDisponibles", {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: nombres, 
        datasets: [
          {
          label: 'Cantidad Disponible',
          data: cantidad,
          backgroundColor: 'rgba(244, 208, 63, 0.6)',
          borderColor: 'rgb(244, 208, 63)',
          borderWidth: 4
        }
      ]
      },
      options: {
        // aspectRatio: 2.5
        responsive: true
      },
    });
  }

  // VENTA DE PRODUCTOS
  // titleProductos = 'chartAngular';

  // chartDataProductos = [
  //   {
  //     data: [100, 600, 260, 700,567,345],
  //     label: 'Uniforme Diario'
  //   },
  //   {
  //     data: [120, 455, 100, 340,678,567],
  //     label: 'Uniforme de Fisica'
  //   },
  //   {
  //     data: [45, 67, 800, 500,980,456],
  //     label: 'Libros'
  //   }
  // ];

  // chartLabelsProductos = [
  //   'Enero',
  //   'Febrero',
  //   'Marzo',
  //   'Abril',
  //   'Mayo',
  //   'Junio',
  //   'Julio',
  //   'Agosto',
  //   'Septiembre',
  //   'Octubre',
  // ];

  // chartOptionsProductos = {
  //   responsive: true
  // };

  // VENTA Y DISPONIBILIDAD DE PRODUCTOS
  // createChart(){
  //   //Ejemplo 2
  //   new Chart("MyChart", {
  //     type: 'bar', //this denotes tha type of chart
  //     data: {// values on X-Axis
  //       labels: ['PRODUCTO X', 'PRODUCTO XX', 'PRODUCTO XXX', 'PRODUCTO IV', 'PRODUCTO V', 'PRODUCTO XI','PRODUCTO XII'], 
  //       datasets: [
  //         {
  //           label: 'Cantidad Vendida',
  //           data: [4, 2, 6, 2, 7, 0, 8, 5, 9, 5],
  //           backgroundColor: 'rgb(60,179,113)'
  //         },
  //         {
  //           label: 'Cantidad Disponible',
  //           data: [5, 5, 10, 7, 10, 8, 15, 8, 11, 10],
  //           backgroundColor: 'rgb(65,105,225)'
  //         }
  //       ]
  //     },
  //     // options: {
  //     //   aspectRatio:2.5
  //     // },
      
  //   });
  //   // Ejemplo 2
  // }
}