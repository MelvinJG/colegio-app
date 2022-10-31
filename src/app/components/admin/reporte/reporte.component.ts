import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  public chart: any;
  public graficaSolventes: any;

  constructor(private API_USER_AUTH: UserAuthService) { }

  ngOnInit(): void {
    this.API_USER_AUTH.ShowNavigation.next(true);
    this.createChart();
    this.createChart2();
    this.createChart3();
  }

  // INGRESOS / EGRESOS
  titleIngresos = 'chartAngular';

  chartDataIngresos = [
    {
      data: [330, 600, 260, 700,567,345],
      label: 'Egresos'
    },
    {
      data: [120, 455, 100, 340,678,567],
      label: 'Ingresos'
    }
  ];

  chartLabelsIngresos = [
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
    'Noviembre'
  ];

  chartOptionsIngresos = {
    responsive: true
    
  };

  // VENTA DE PRODUCTOS
  titleProductos = 'chartAngular';

  chartDataProductos = [
    {
      data: [100, 600, 260, 700,567,345],
      label: 'Uniforme Diario'
    },
    {
      data: [120, 455, 100, 340,678,567],
      label: 'Uniforme de Fisica'
    },
    {
      data: [45, 67, 800, 500,980,456],
      label: 'Libros'
    }
  ];

  chartLabelsProductos = [
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
  ];

  chartOptionsProductos = {
    responsive: true
  };

  // ALUMNOS SOLVENTES O INSOLVENTES
  createChart2(){
    // Ejemplo 3
    this.graficaSolventes = new Chart("MyChartSolventes", {
      type: 'doughnut', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ['Solventes', 'Insolventes'],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59],
          backgroundColor: [
            'rgb(153, 102, 255)',
            'rgb(54, 162, 235)'
          ]
        }]
      },
      options: {
        aspectRatio:2.5,
        // plugins: {
        //   legend: {
        //     position: 'top',
        //   },
        //   title: {
        //     display: true,
        //     text: 'Chart.js Doughnut Chart'
        //   }
        // }
      }
      
    });
    // Ejemplo 3
  }

  // VENTA Y DISPONIBILIDAD DE PRODUCTOS
  createChart(){
    //Ejemplo 2
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ['PRODUCTO X', 'PRODUCTO XX', 'PRODUCTO XXX', 'PRODUCTO IV', 'PRODUCTO V', 'PRODUCTO XI','PRODUCTO XII'], 
        datasets: [
          {
            label: 'Cantidad Vendida',
            data: [4, 2, 6, 2, 7, 0, 8, 5, 9, 5],
            backgroundColor: 'rgb(60,179,113)'
          },
          {
            label: 'Cantidad Disponible',
            data: [5, 5, 10, 7, 10, 8, 15, 8, 11, 10],
            backgroundColor: 'rgb(65,105,225)'
          }
        ]
      },
      // options: {
      //   aspectRatio:2.5
      // },
      
    });
    // Ejemplo 2
  }

  // ACEPTACION
  createChart3(){
    //Ejemplo 2
    this.chart = new Chart("MyChartAceptacion", {
      type: 'doughnut', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ['Porcentaje (%) de Aceptación', 'Porcentaje (%) de Rechazo'],
        datasets: [{
          label: 'My First Dataset',
          data: [133, 38],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)'
          ]
        }]
        // labels: ['ENCARGADOS DEL COLEGIO','PROFESORES', 'ALUMNOS'], 
        // datasets: [
        //   {
        //     label: 'Aceptación aplicación',
        //     data: [9, 10, 114],
        //     backgroundColor: 'rgb(54, 162, 235)'
        //   },
        //   {
        //     label: 'Rechazo aplicación',
        //     data: [2, 4, 32],
        //     backgroundColor: 'rgb(255, 99, 132)'
        //   }
        // ]
      },
      // options: {
      //   aspectRatio:2.5
      // },
      
    });
    // Ejemplo 2
  }

}

// backgroundColor: [
//   'rgb(255, 99, 132)',
//   'rgb(255, 159, 64)',
//   'rgb(255, 205, 86)',
//   'rgb(75, 192, 192)',
//   'rgb(54, 162, 235)',
//   'rgb(153, 102, 255)',
//   'rgb(201, 203, 207)'
// ],