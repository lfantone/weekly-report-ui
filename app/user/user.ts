const _isEmpty = require('lodash.isempty');
const validator = require('email-validator');

export class User {
  email: string;
  password: string;
  isValid() {
    return !_isEmpty(this.email) && validator.validate(this.email) && !_isEmpty(this.password);
  }
}
