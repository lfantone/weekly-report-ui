const _isEmpty = require('lodash.isempty');

export class User {
  username: string;
  password: string;
  isValid() {
    return !_isEmpty(this.username) && !_isEmpty(this.password);
  }
}
