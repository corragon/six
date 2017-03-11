import Utils from './utils';
import {DateOnly} from './util/time';

export default class TaskModel {
	constructor(description, completed = false, dateAdded = DateOnly(), id = Utils.guid()) {
    this.description = description;
    this.completed = completed;
    this.dateAdded = dateAdded
    this.id = id;
  }
}