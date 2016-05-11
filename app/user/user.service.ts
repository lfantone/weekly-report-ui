import {Injectable} from '@angular/core';
import {User} from './user';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class UserService {
  constructor() {}

  login(user: User) {
    return Observable.create(observer => {
      observer.next({
        success: true,
        user: user
      });
      observer.complete();
    });
  }
}
