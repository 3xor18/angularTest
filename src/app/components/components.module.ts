import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { ListadoComponent } from './listado/listado.component';
import { DetalleComponent } from './detalle/detalle.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent, ListadoComponent, DetalleComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class ComponentsModule {}
