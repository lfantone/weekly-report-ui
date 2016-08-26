import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { User } from './user';
import { Observable } from 'rxjs/Observable';
import appSettings = require('application-settings');

@Injectable()
export class UserService {
  private url: string = `${appSettings.getString('URL')}/login`;
  constructor(private http: Http) { }

  login(user: User) {
    let body = JSON.stringify({username: user.username, password: user.password});
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.url, body, {headers})
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
      });
  }
}
