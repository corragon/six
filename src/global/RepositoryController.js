import {Controller} from 'ringa';
import Repository from '../Repository';


export default class RepositoryController extends Controller {
  constructor(bus) {
    super('RepositoryController', bus);

    this.repository = new Repository();

    // RepositoryController.GET_TODAY
    this.addListener('getToday', []);

    // RepositoryController.GET_DAY_LIST
    this.addListener('getDayList', [
      ($ringaEvent) => {
        $ringaEvent.detail.dayList = this.repository.get('Day');
      }
      ]);

  }
}