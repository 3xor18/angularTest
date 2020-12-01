import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import usersFake from '../fakeData/User-Fake';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from '../models/user';
import { HttpErrorResponse } from '@angular/common/http';

describe('UsersService', () => {
  let service: UsersService;
  /* Estos hay q inyectarño */
  let httpTestCtr: HttpTestingController;
  /* Esto es la data fake para el mock */
  const dataFake = usersFake;

  beforeEach(() => {
    TestBed.configureTestingModule({
      /* Agregar linea 20*/
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UsersService);
    /* Agregar linea 24*/
    httpTestCtr = TestBed.inject(HttpTestingController);
    httpTestCtr.verify();
  });

  /* Comprobar si se creo el componente */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /* -------------------------------------------------------------------------------*/
  /* -------------------------------------------------------------------------------*/
  /* -------------------------------------------------------------------------------*/
  /* Get----------------- */
  it('method get', () => {
    /* Chequeamos si retorna los usuarios esperados (mock) */
    service.getUsers().subscribe((users) => {
      expect(dataFake).toBe(users, 'Mock Data');
      expect(users.length).toBeGreaterThanOrEqual(2);
      expect(users[0].id).toBeDefined();
    });
    /* Verificamos el Endpoint */
    const req = httpTestCtr.expectOne(service.BASE_URL + 'users');
    /* Que no se cancele la peticoon por que el endpoinbt o token */
    expect(req.cancelled).toBeFalsy();
    /* Que la respuesta sea en Json */
    expect(req.request.responseType).toEqual('json');
    /* Ver si es get */
    expect(req.request.method).toBe('GET');

    /* Que se ejecute la Peticion */
    req.flush(dataFake);
  });

  /* -------------------------------------------------------------------------------*/
  /* -------------------------------------------------------------------------------*/
  /* -------------------------------------------------------------------------------*/
  /* Post------------------ */
  it('method post', () => {
    /* Nuevo Usuario a ser creado */
    const newUser: User = { id: 10, name: 'nuevo', age: 10 };

    /* llamamos al metodo */
    service.addUser(newUser).subscribe((add) => {
      expect(add).toBe(newUser);
      expect(add.id).toBeDefined();
    });

    /* Para la peticion */
    const req = httpTestCtr.expectOne(service.BASE_URL);
    /* Que no ocurra error */
    expect(req.cancelled).toBeFalsy();
    /* Respuesta en json */
    expect(req.request.responseType).toEqual('json');
    /* Ver si es Post */
    expect(req.request.method).toBe('POST');
    /* Ejecutamos la Accion */
    req.flush(newUser);
  });

  /* -------------------------------------------------------------------------------*/
  /* -------------------------------------------------------------------------------*/
  /* -------------------------------------------------------------------------------*/
  /* Error------------------ */
  it('Error...', () => {
    /* Error mock */
    const errorMessage = 'Mock Error 404';

    /* llamamos al metodo, el (data) no importa */
    service.getUsers().subscribe(
      (data) => {
        fail('Failing with error 404');
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toEqual(errorMessage);
      }
    );

    /* Endpoint para el request */
    const req = httpTestCtr.expectOne(service.BASE_URL + 'users');
    /* Ejecutamos */
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
