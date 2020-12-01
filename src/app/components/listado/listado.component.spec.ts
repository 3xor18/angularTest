import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoComponent } from './listado.component';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import usersFake from '../../fakeData/User-Fake';
import { not } from '@angular/compiler/src/output/output_ast';

describe('ListadoComponent', () => {
  let component: ListadoComponent;
  let fixture: ComponentFixture<ListadoComponent>;
  /* Agregar */
  let service: UsersService;
  const mockResponse = usersFake;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoComponent],
      /* Agregar imports:[HttpClientTestingModule]*/
      imports: [HttpClientTestingModule],
      /* agregar: schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], */
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    /* Agregar  service = component.userService;*/
    service = component.userService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check si se inyecta el service', () => {
    expect(service).toBeTruthy();
  });

  it('check si en el oninit se llama el metodo de llenar usuarios', () => {
    /* Inyectamos el espia */
    spyOn(component, 'getUsers').and.callThrough();
    /* Inyextamos mock en el service */
    spyOn(service, 'getUsers').and.returnValue(of(mockResponse));
    /* llamamos al onInit */
    component.ngOnInit();

    expect(component.getUsers).toHaveBeenCalled();
  });

  it('Llamar al onInit y ver si llama al metodo q invoca el service para llenar la var', () => {
    /* Se llama al service y al metodo del service (no del componente), se inyecta el mock */
    spyOn(service, 'getUsers').and.returnValue(of(mockResponse));
    /* Disparar el oninit */
    component.ngOnInit();
    /* Que retorne lo mismo q inyectamos */
    expect(component.users).toEqual(mockResponse);
    /* Que sean minimo los datos que inyectamos */
    expect(component.users.length).toBeGreaterThanOrEqual(6);
    /* Que el id no venga null */
    expect(component.users[0].id).toBeDefined();
  });

  it('ver si se renderizaron los registro mokeados', () => {
    /* Mockeamos el service */
    spyOn(service, 'getUsers').and.returnValue(of(mockResponse));
    /* Disparamos el oninit */
    component.ngOnInit();
    /* esto es para capturar los ellentos del html */
    const compile = fixture.debugElement.nativeElement;
    /* Es como darle f5 */
    fixture.detectChanges();
    /* Ver cantidad de cards renderizadas */
    const cantidad = compile.querySelectorAll('#cardUser').length;
    expect(cantidad).toBe(6);
  });
});
