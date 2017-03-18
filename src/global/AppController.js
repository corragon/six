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

    //---------------------------------
    // AppController.SET_CURRENT_DAY
    //---------------------------------
    this.addListener('setCurrentDay', [
      (appModel, day) => {
        appModel.currentDay = day;
      }
      ]);

    //---------------------------------
    // AppController.SET_DAY_LIST
    //---------------------------------
    this.addListener('setDayList', [
      RepositoryController.GET_DAY_LIST,
      (appModel, dayList) => {
        appModel.dayList = dayList;
      }
      ]);

    //---------------------------------
    // AppController.INITIALIZE
    //---------------------------------
    /**
     * This is where the application starts up!
     */
    this.addListener('initialize', [
      AppController.SET_DAY_LIST,
      RepositoryController.GET_TODAY,
      (appModel, today) => {
        appModel.currentDay = today;
      },
    ]);
  }

  busMounted() {
    this.dispatch('initialize');
  }
}