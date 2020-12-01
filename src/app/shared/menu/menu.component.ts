import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  saludo = 'Hi';
  constructor(public router: Router) {}

  irHome(): void {
    this.router.navigate(['/home']);
  }

  irListado(): void {
    this.router.navigate(['/component/listado']);
  }

  irDetalle(): void {
    this.router.navigate(['/component/detail']);
  }

  cambiarSaludo(): void {
    this.saludo = 'Gerson';
  }

  ngOnInit(): void {}
}
