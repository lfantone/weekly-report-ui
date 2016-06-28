import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { User } from './user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  login(user: User) {
    let body = JSON.stringify({email: user.email, password: user.password});
    return this.http.post('/login', body)
      .map((res: Response) => res.json())
      .catch((error: any) => {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
      });
  }
}
