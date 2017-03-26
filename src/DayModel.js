import { Model } from 'ringa';
import Utils from './utils';
import { DateOnly } from './util/time';
import TaskModel from './TaskModel';

export default class DayModel extends Model {
	constructor(tasks, date = DateOnly(), id = Utils.guid()) {
    super();

    this.addProperty('tasks', tasks);
    this.addProperty('date', date);
    this.addProperty('id', id);
  }
}