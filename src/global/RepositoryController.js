import {Controller} from 'ringa';


export default class RepositoryController extends Controller {
  constructor(bus) {
    super('RepositoryController', bus);

    // RepositoryController.GET_TODAY
    this.addListener('getToday', []);

    // RepositoryController.GET_DAY
    this.addListener('getDay', []);

  }
}