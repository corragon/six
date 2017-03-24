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
        let day = moment('2017-04-09');

        $ringaEvent.detail.today = this.repository.getDay(day.toDate());
      }
      ]);

    //---------------------------------
    // RepositoryController.GET_DAY
    //---------------------------------
    this.addListener('getDay', []);


    //---------------------------------
    // RepositoryController.GET_DAY_LIST
    //---------------------------------
    this.addListener('getDayList', [
      ($ringaEvent) => {
        $ringaEvent.detail.dayList = this.repository.get('Day');
      }
      ]);

    //---------------------------------
    // RepositoryController.TOGGLE_TASK_COMPLETED
    //---------------------------------
    this.addListener('toggleTaskCompleted', [
      (task) => {
        this.repository.toggleTaskCompleted(task);
      }
      ]);

    //---------------------------------
    // RepositoryController.UPDATE_TASK_DESCRIPTION
    //---------------------------------
    this.addListener('updateTaskDescription', [
      (task, desc) => {
        this.repository.updateTaskDescription(task, desc);
      }
      ]);


  }
}