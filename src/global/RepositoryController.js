import {Controller} from 'ringa';
import Repository from '../Repository';
import moment from 'moment';


export default class RepositoryController extends Controller {
  constructor(bus) {
    super('RepositoryController', bus);

    this.repository = new Repository();

    //---------------------------------
    // RepositoryController.GET_TODAY
    //---------------------------------
    this.addListener('getToday', [
      ($ringaEvent) => {
        let day = moment('2017-04-13');

        $ringaEvent.detail.today = this.repository.getDay(day.toDate());
      }
      ]);

    //---------------------------------
    // RepositoryController.GET_DAY
    //---------------------------------
    this.addListener('getDay', []);

    // RepositoryController.GET_DAY_LIST
    this.addListener('getDayList', [
      ($ringaEvent) => {
        $ringaEvent.detail.dayList = this.repository.get('Day');
      }
      ]);

  }
}