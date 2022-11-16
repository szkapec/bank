import React from 'react'
import { jsPDF } from "jspdf";

export const configPdf = ({ original, originalSubRows }:any) => {
  console.log('original :>> ', original);
  console.log('originalSubRows :>> ', originalSubRows);

  const doc = new jsPDF();
   
    doc.setFont('', "bold");
    doc.setFontSize(20);
    doc.text("POTWIERDZENIE PRZELEWU", 20, 20);
    doc.line(0, 30, 1000, 30);

    doc.setFontSize(16);

    doc.text("RACHUNEK WINIEN (NADAWCA):", 20, 50);
    doc.setFont('', "normal");
    doc.setFontSize(14);
    doc.text("Numer rachunku:", 20, 70);
    doc.text(original.account, 120, 70);

    doc.text("Nazwa banku:", 20, 80);
    doc.text("Bank Coders S.A", 120, 80);

    doc.text("Wlasciciel:", 20, 90);
    doc.text(original.firstName, 120, 90);

    doc.setFont('', "bold");
    doc.setFontSize(16);
    doc.text("RACHUNEK MA (ODBIORCA):", 20, 120);
    doc.setFontSize(14);
    doc.setFont('', "normal");
    doc.text("Odbiorca:", 20, 140);
    doc.text(originalSubRows[0].firstName + '  ' + originalSubRows[0].account, 120, 140);

    doc.setFont('', "bold");
    doc.setFontSize(16);
    doc.text("SZCZEGOLY OPERACJI", 20, 170);
    doc.setFontSize(14);
    doc.setFont('', "normal");

    doc.text("Kwota operacji:", 20, 190);
    doc.text(original.price, 120, 190);

    doc.text("Kwota obciazeniowa", 20, 200);
    doc.text(original.price, 120, 200);

    doc.text("Data księgowania", 20, 210);
    doc.text(original.date, 120, 210);

    doc.text("Data waluty", 20, 220);
    doc.text(original.confirmation, 120, 220); // do poprawy

    doc.text("Nr referencyjny operacji", 20, 230);
    doc.text(original.confirmation.toUpperCase(), 120, 230); // do poprawy

    doc.setFont('', "bold");
    doc.text("Data i godzina wystawienia dokumentu:", 20, 250);
    doc.setFont('', "normal");

    doc.text(original.date, 135, 250);

     doc.setFontSize(12)
    doc.text(
      "Potwierdzenie wygenerowane automatycznie nie wymaga stempla i podpisu",
      20,
      270
    );
    doc.save("a4.pdf");
    return doc;

   

    // const openPdf = () => {
    //   const pdf = configPdf();
    //   pdf.save("a4.pdf")
    // };

}
