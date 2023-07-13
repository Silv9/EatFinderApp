import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
})
export class CuentaComponent  implements OnInit {
  nombre: string;
  telefono: string;
  email: string;
  ubi_actual: string;
  constructor() {

    this.telefono = '';
    this.nombre = '';
    this.email = '';
    this.ubi_actual = '';
   }

  ngOnInit() {}

}
