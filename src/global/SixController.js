import {Controller} from 'ringa';
import SixBus from './SixBus';
import SixModel from './SixModel';


export default class SixController extends Controller {
  constructor(bus) {
    super('AppController', bus);

    this.addModel(new SixModel());

    this.addListener('testEvent', [
      () => console.warn('Fired from within Controller')
      ]);

    this.addListener('showMessage', [
      sixModel => sixModel.showMessage = true
      ]);

    this.addListener('hideMessage', [
      sixModel => sixModel.showMessage = false
      ]);

    this.addListener('updateMessage', [
      (sixModel, message) => {
        sixModel.appMessage = message;
      }
      ]);

  }
}