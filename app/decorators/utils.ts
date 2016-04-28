import {Component} from 'angular2/core';
import {ViewBrokerService} from '../services/view-broker.service';

const _reflect: any = Reflect;

export class DecoratorUtils {
  public static getMetadata(metadata: any = {}, customDecoratorMetadata?: any) {

    if (metadata.templateUrl) {
      // correct template for platform target
      metadata.templateUrl = ViewBrokerService.TEMPLATE_URL(metadata.templateUrl);
    }

    return metadata;
  }

  public static annotateComponent(cls: any, metadata: any = {}, customDecoratorMetadata?: any) {
    let annotations = _reflect.getMetadata('annotations', cls) || [];
    annotations.push(new Component(DecoratorUtils.getMetadata(metadata, customDecoratorMetadata)));
    _reflect.defineMetadata('annotations', annotations, cls);
    return cls;
  }
}
