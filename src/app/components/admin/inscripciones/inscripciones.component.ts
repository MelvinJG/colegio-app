import { Component, OnInit } from '@angular/core';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import htmlToPdfmake from 'html-to-pdfmake'

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {

  constructor() { }

  public mail: string = "";
  public name: string = "";

  ngOnInit(): void {
  }

  verValor(){
    if(this.mail == ''){
      alert('INGRESE ALGO');
    }
    else{ 
      alert(this.mail);
    }
  }
  //administracion/inscripciones
  createPDFInvoice(){
//     const htmlToConvert = htmlToPdfmake(`
//     <img src="https://static.vecteezy.com/system/resources/previews/006/004/413/non_2x/university-or-school-engineering-emblem-logo-design-inspiration-vector.jpg"
//     style="alignment: right; width: 150px;" />
// <p style="background-color: white; font-style: italic;">
//     <strong style="font-size: 35px; font-style: initial;">RECIBO</strong><br />
//     <span style="font-size: 10px; font-style: italic;"><strong>Lugar y fecha de expedición</strong></span><br />
//     En <u style="font-style: initial;"> Guatemala Sumpango, Sacatepéquez </u> a <u style="font-style: initial;"> 28 </u>
//     de <u style="font-style: initial;"> agosto </u> de <u style="font-style: initial;"> 2022 </u><br />
//     Recibí de <u style="font-style: initial;"> Melvin Misael Joj Gil </u> la cantidad de Q <u style="font-style: initial;"> 250.00 </u><br />
//     <span style="font-size: 10px; font-style: italic;"><strong>Cantidad en letras</strong></span><br />
//     <span
//         style="font-style: initial; border: 4; padding: 5px 50px 5px 50px; border-radius: 15px; background-color: rgba(224, 221, 221, 0.849);"><strong>Docientos
//             cienta quetzales exactos.</strong></span><br />
            
//     Por concepto de <u style="font-style: initial;"> Pago de colegiatura del mes de Agosto </u><br />
// </p>
// <br />
// <p style="margin: 20 50 20 50; ">
//     Prueba
// <p/>
//     `,  { 
//       imagesByReference : true 
//     });
//     const pdfContent: any =  {
//       content: htmlToConvert.content,
//       images: htmlToConvert.images,
//       styles:{
//         derecha:{ // we define the class called "red"
//           //float: "right",
//           width: "120px"
//         }
//       }
//     }
//     const pdfResult = pdfMake.createPdf(pdfContent);
//     pdfResult.open();
  }
}

