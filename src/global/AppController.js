import {Controller} from 'ringa';
import AppModel from './AppModel';
import RepositoryController from './RepositoryController';


export default class AppController extends Controller {
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

    // AppController.SET_CURRENT_DAY
    this.addListener('setCurrentDay', [
      (appModel, selectedDay) => {
        appModel.currentDay = selectedDay;
      }
      ]);
  }
}