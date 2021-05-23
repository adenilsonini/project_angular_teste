import { Car } from './../models/Car';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  url = 'http://localhost:5000/api/v2/login'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient, private router: Router) { }

  login2() {

  }

  public login(usuario: { Username: string; Password: string; }){
    return this.httpClient.post(this.url, usuario).subscribe(data => {
     var token = JSON.parse(JSON.stringify(data)).token;
     localStorage.setItem("token", token);
     this.router.navigate(['/dashboard']);
    //console.info(token)
    },
    error => {
    //  console.error("Usuario ou senha invalida !!!");
      var texto = error.message;
      if(error.status == 400){
        texto = 'Usuario ou senha invalida !!!'
      }
      if(error.status == 0){
        texto = 'Servidor web fora do ar'
      }
      Swal.fire({
        icon: 'error',
        title: 'Login invalido !!!',
        text: texto,
       // footer: 'Sistema Angular'
      })

      return error;
    })
 }
  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('Token')})
   }

  // Obtem todos os carros
  getCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um carro pelo id
  getCarById(id: number): Observable<Car> {
    return this.httpClient.get<Car>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um carro
  saveCar(car: Car): Observable<Car> {
    return this.httpClient.post<Car>(this.url, JSON.stringify(car), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um carro
  updateCar(car: Car): Observable<Car> {
    return this.httpClient.put<Car>(this.url + '/' + car.id, JSON.stringify(car), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um carro
  deleteCar(car: Car) {
    return this.httpClient.delete<Car>(this.url + '/' + car.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
