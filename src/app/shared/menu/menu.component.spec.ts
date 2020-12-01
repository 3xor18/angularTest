import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';

import { MenuComponent } from './menu.component';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from '../../components/components.module';
import { routes } from '../../app-routing.module';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  /* crear desde la 25 a la 27 */
  let location: Location;
  let router: Router;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      /* Agregar 32,33,34  ojo (routes tienes que dale export en el archivo routes), importamos el modulo lazzeado*/
      imports: [RouterTestingModule.withRoutes(routes), ComponentsModule],
      declarations: [MenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    /* Agregar 43,45,47,49,51 */
    /* Para enrrutamiendo */
    router = TestBed.inject(Router);
    /* para poder capturar la url actual */
    location = TestBed.inject(Location);
    /* Para tomar un elemento del componente */
    debugElement = fixture.debugElement;
    /* Iniciamos el router */
    router.initialNavigation();
    /* es comodarle f5 al explorador */
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#logo must exist', () => {
    const element = fixture.nativeElement.querySelector('#logo');
    expect(element).toBeTruthy();
  });

  it('#home must exist', () => {
    const element = fixture.nativeElement.querySelector('#home');
    expect(element).toBeTruthy();
  });

  it('#listado must exist', () => {
    const element = fixture.nativeElement.querySelector('#listado');
    expect(element).toBeTruthy();
  });

  it('elemento debe contener texto', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('#home').textContent).toEqual(' Home home');
  });

  it('#detail must exist', () => {
    /* Seleccionamos  el compomente con el id detail */
    const element = fixture.nativeElement.querySelector('#detail');
    /* ver si existe */
    expect(element).toBeTruthy();
  });

  it('click in #saludar', fakeAsync(() => {
    /* Seleccionamos el elemento dle html con el id=detail */
    const btn = debugElement.query(By.css('#detail'));
    /* Hacemos click sobre el, en vez de {} se puede pasar un parametro */
    btn.triggerEventHandler('click', {});
    /* Espera implicita */
    tick();
    /* Refrescamos (f5) */
    fixture.detectChanges();
    /* check si el path actual es el esperado */
    expect(location.path()).toBe('/component/detail');
  }));
});
