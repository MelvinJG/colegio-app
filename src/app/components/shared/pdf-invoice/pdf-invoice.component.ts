import { Component, OnInit, Input } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf-invoice',
  templateUrl: './pdf-invoice.component.html',
  styleUrls: ['./pdf-invoice.component.css']
})
export class PdfInvoiceComponent implements OnInit {

  @Input()
  data: any; // Recibimos Info
  logo = '../../../../assets/logo.png';
  dia = new Date().getDate(); //Fecha
  month = new Date().getMonth(); //Fecha
  mes = this.getNombreMes(this.month); //Fecha 
  anio = new Date().getFullYear(); //Fecha
  monto: number;
  montoLetras: string;
  motivoPago: string;
  mesPago: string;
  personaPago: string;
  verMesPago: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    this.monto = this.data.monto;
    this.montoLetras = this.numeroALetras(this.monto);
    this.motivoPago = this.data.motivoPago;
    this.mesPago = this.getNombreMes((this.data.mes_Id -1));
    this.personaPago = this.data.personaPago;
    if(this.data.tipo_pago_Id !== 1){
      this.verMesPago = true;
    }
  }

  //PDF
  downloadPDF() {
    console.log("RECIBIMOS ",this.data)
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
      docResult.save(`${this.motivoPago}-${this.personaPago}.pdf`);
    });
  }


  getNombreMes(index){
    let mes = new Array(11);
    mes[0] = "Enero";
    mes[1] = "Febrero";
    mes[2] = "Marzo";
    mes[3] = "Abril";
    mes[4] = "Mayo";
    mes[5] = "Junio";
    mes[6] = "Julio";
    mes[7] = "Agosto";
    mes[8] = "Septiembre";
    mes[9] = "Octubre";
    mes[10] = "Noviembre";
    mes[11] = "Diciembre";
    return mes[index];
  }

  //#region Numeros a Letras
  /*************************************************************/
// NumeroALetras
// The MIT License (MIT)
// 
// Copyright (c) 2015 Luis Alfredo Chee 
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// @author Rodolfo Carmona
// @contributor Jean (jpbadoino@gmail.com)


// Modificacion: Quetzales para Guatemala
/*************************************************************/
  Unidades(num){

    switch(num)
    {
        case 1: return 'UN';
        case 2: return 'DOS';
        case 3: return 'TRES';
        case 4: return 'CUATRO';
        case 5: return 'CINCO';
        case 6: return 'SEIS';
        case 7: return 'SIETE';
        case 8: return 'OCHO';
        case 9: return 'NUEVE';
    }

    return '';
}//Unidades()

Decenas(num){

    let decena = Math.floor(num/10);
    let unidad = num - (decena * 10);

    switch(decena)
    {
        case 1:
            switch(unidad)
            {
                case 0: return 'DIEZ';
                case 1: return 'ONCE';
                case 2: return 'DOCE';
                case 3: return 'TRECE';
                case 4: return 'CATORCE';
                case 5: return 'QUINCE';
                default: return 'DIECI' + this.Unidades(unidad);
            }
        case 2:
            switch(unidad)
            {
                case 0: return 'VEINTE';
                default: return 'VEINTI' + this.Unidades(unidad);
            }
        case 3: return this.DecenasY('TREINTA', unidad);
        case 4: return this.DecenasY('CUARENTA', unidad);
        case 5: return this.DecenasY('CINCUENTA', unidad);
        case 6: return this.DecenasY('SESENTA', unidad);
        case 7: return this.DecenasY('SETENTA', unidad);
        case 8: return this.DecenasY('OCHENTA', unidad);
        case 9: return this.DecenasY('NOVENTA', unidad);
        case 0: return this.Unidades(unidad);
    }
}//Unidades()

DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
        return strSin + ' Y ' + this.Unidades(numUnidades)

    return strSin;
}//DecenasY()

Centenas(num) {
    let centenas = Math.floor(num / 100);
    let decenas = num - (centenas * 100);

    switch(centenas)
    {
        case 1:
            if (decenas > 0)
                return 'CIENTO ' + this.Decenas(decenas);
            return 'CIEN';
        case 2: return 'DOSCIENTOS ' + this.Decenas(decenas);
        case 3: return 'TRESCIENTOS ' + this.Decenas(decenas);
        case 4: return 'CUATROCIENTOS ' + this.Decenas(decenas);
        case 5: return 'QUINIENTOS ' + this.Decenas(decenas);
        case 6: return 'SEISCIENTOS ' + this.Decenas(decenas);
        case 7: return 'SETECIENTOS ' + this.Decenas(decenas);
        case 8: return 'OCHOCIENTOS ' + this.Decenas(decenas);
        case 9: return 'NOVECIENTOS ' + this.Decenas(decenas);
    }

    return this.Decenas(decenas);
}//Centenas()

Seccion(num, divisor, strSingular, strPlural) {
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let letras = '';

    if (cientos > 0)
        if (cientos > 1)
            letras = this.Centenas(cientos) + ' ' + strPlural;
        else
            letras = strSingular;

    if (resto > 0)
        letras += '';

    return letras;
}//Seccion()

Miles(num) {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMiles = this.Seccion(num, divisor, 'UN MIL', 'MIL');
    let strCentenas = this.Centenas(resto);

    if(strMiles == '')
        return strCentenas;

    return strMiles + ' ' + strCentenas;
}//Miles()

Millones(num) {
    let divisor = 1000000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMillones = this.Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
    let strMiles = this.Miles(resto);

    if(strMillones == '')
        return strMiles;

    return strMillones + ' ' + strMiles;
}//Millones()

numeroALetras(num) {
    let data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: '',
        letrasMonedaPlural: 'QUETZALES',//'PESOS', 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: 'QUETZAL', //'PESO', 'Dólar', 'Bolivar', 'etc'
        letrasMonedaCentavoPlural: 'CENTAVOS',
        letrasMonedaCentavoSingular: 'CENTAVO'
    };

    if (data.centavos > 0) {
        let centavos = ''
        if (data.centavos == 1)
            centavos = this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
        else
            centavos =  this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
        data.letrasCentavos = 'CON ' + centavos
    };

    if(data.enteros == 0)
        return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    if (data.enteros == 1)
        return this.Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
    else
        return this.Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
};
  //#endregion Numeros a Letras
}


// PARA PDF
// npm install jspdf@1.5.3 html2canvas
// npm install @types/jspdf @types/html2canvas -D  --> ESTE NO PERO POR SI ACASO ES NECESARIO