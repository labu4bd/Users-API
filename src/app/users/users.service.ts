import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './user';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()
export class UsersService {
  usersUrl = '/user_api'; // URL to web api
  //private handleError: HandleError;

  constructor(private http: HttpClient) {
    //this.handleError = httpErrorHandler.createHandleError('UsersService');
  }

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      //.pipe(catchError(this.handleError('getUsers', [])));
  }

}
