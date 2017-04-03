import Utils from './utils';
import {DateOnly} from './util/time';
import TaskModel from './TaskModel';

export default class DayModel {
  constructor(tasks, date = DateOnly(), id = Utils.guid()) {
    this.tasks = tasks;
    this.date = date;
    this.id = id;
  }
}