import Utils from './utils';
import TaskModel from './TaskModel';

export default class DayModel {
	constructor(tasks, id = Utils.guid(), date = new Date()) {
    this.tasks = tasks;
    this.id = id;
    this.date = date;
  }
}