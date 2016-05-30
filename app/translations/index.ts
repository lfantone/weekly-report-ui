'use strict';

const _get = require('lodash.get');
const _bind = require('lodash.bind');

export class Translations {
  private get: Function;
  private translations: Object;
  private locale: String;

  constructor(config = { locale: 'es-AR' }) {
    this.locale = config.locale;
    this.translations = require(`./${this.locale}.json`);
    this.get = _bind(_get, this, this.translations);
  }
}
