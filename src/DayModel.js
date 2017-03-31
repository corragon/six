import { Model } from 'ringa';
import Utils from './utils';
import { DateOnly } from './util/time';
import TaskModel from './TaskModel';
import List from './List';

export default class DayModel extends Model {
	constructor(tasks, date = DateOnly(), id = Utils.guid()) {
    super();

    if (tasks instanceof Array) {
      tasks = List.deserialize(tasks);
      console.warn(typeof tasks);
    }

    this.addProperty('tasks', tasks);
    this.addProperty('date', date);
    this.addProperty('id', id);
  }
}