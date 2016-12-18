import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  form: FormGroup;
  chiffre: FormControl;
  representationBinaire: string;

  segmentA: boolean;
  segmentB: boolean;
  segmentC: boolean;
  segmentD: boolean;
  segmentE: boolean;
  segmentF: boolean;
  segmentG: boolean;

  constructor(
    fb: FormBuilder
  ) {
    this.representationBinaire = 'wait for it ...';
    this.segmentA = false;
    this.segmentB = false;
    this.segmentC = false;
    this.segmentD = false;
    this.segmentE = false;
    this.segmentF = false;
    this.segmentG = false;

    this.chiffre = fb.control(null, Validators.compose([Validators.required, this.isChiffre]))
    this.form = fb.group({
      chiffre: this.chiffre
    });
  }

  /**
   * Valide si l'entrée est un chiffre
   */
  isChiffre = (control: FormControl) => {
    let chiffre: number = control.value;
    return chiffre < 10 && chiffre >= 0 ? null : { notAChiffre: true };
  };

  /**
   * Met à jour l'état des segments de l'afficheur (allume ou eteint) selon le chiffre décimal entré
   */
  public afficher(chiffre: number) {
    this.representationBinaire = this.decimalToBinary(chiffre);
    let a = this.representationBinaire[3] == '1' ? true : false;
    let b = this.representationBinaire[2] == '1' ? true : false;
    let c = this.representationBinaire[1] == '1' ? true : false;
    let d = this.representationBinaire[0] == '1' ? true : false;
    this.segmentA = (!a && !c) || (a && b) || d || (a && c);
    this.segmentB = (!a && !b) || !c || (a && b);
    this.segmentC = (!b) || a || c;
    this.segmentD = (a && !b && c) || (!a && !c) || (!a && b) || (b && !c);
    this.segmentE = (!a && !c) || (!a && b);
    this.segmentF = (c && !b) || d || (!a && !b) || (!a && c);
    this.segmentG = (b && !c) || d || (!a && b) || (!b && c);
  }

  /**
   * Réprésente un nombre décimal en base 2
   */
  public decimalToBinary(decimalValue: number): string {
    var dividende, diviseur, quotient, reste, binaryValue;
    var buffer = "";
    dividende = decimalValue;
    diviseur = 2;
    if (dividende >= diviseur) {
      while (dividende >= diviseur) {
        quotient = Math.floor(dividende / diviseur);
        reste = dividende % diviseur;
        buffer += reste.toString();
        dividende = quotient;
      }
      buffer += quotient.toString();
      if (buffer.length % 4 != 0) {
        for (var i = 0; i < buffer.length % 4; i++) {
          buffer += "0";
        }
      }
      binaryValue = buffer.split("").reverse().join("");
    } else {
      binaryValue = "000" + dividende.toString();
    }

    return binaryValue;
  }
}
