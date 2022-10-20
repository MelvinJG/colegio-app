import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  public chart: any;
  public graficaSolventes: any;
  constructor() { }

  ngOnInit(): void {
    this.createChart();
    this.createChart2();
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

  //PDF
  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }



}

// PARA PDF
// npm install jspdf@1.5.3 html2canvas
// npm install @types/jspdf @types/html2canvas -D ESTE NO
// en dependencias desarrollo con "-D"

// backgroundColor: [
//   'rgb(255, 99, 132)',
//   'rgb(255, 159, 64)',
//   'rgb(255, 205, 86)',
//   'rgb(75, 192, 192)',
//   'rgb(54, 162, 235)',
//   'rgb(153, 102, 255)',
//   'rgb(201, 203, 207)'
// ],