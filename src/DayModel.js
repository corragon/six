import Utils from './utils';
import {DateOnly} from './util/time';
import TaskModel from './TaskModel';

export default class DayModel {
	constructor(tasks, id = Utils.guid(), date = DateOnly()) {
    this.tasks = tasks;
    this.id = id;
    this.date = date;
  }
}