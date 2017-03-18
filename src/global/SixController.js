import {Controller} from 'ringa';
import SixBus from './SixBus';
import AppModel from './AppModel';
import RepositoryController from './RepositoryController';


export default class SixController extends Controller {
  constructor(bus) {
    super('AppController', bus);

    this.addModel(new AppModel());

    this.addListener('testEvent', [
      () => console.warn('Fired from within Controller')
      ]);

    this.addListener('showMessage', [
      appModel => appModel.showMessage = true
      ]);

    this.addListener('hideMessage', [
      appModel => appModel.showMessage = false
      ]);

    this.addListener('updateMessage', [
      (appModel, message) => {
        appModel.appMessage = message;
      }
      ]);

  }
}