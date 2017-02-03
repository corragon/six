import Utils from './utils';
import {DateOnly} from './util/time';

export default class TaskModel {
	constructor(description, id = Utils.guid(), completed = null, dateAdded = DateOnly()) {
    this.description = description;
    this.id = id;
    this.completed = completed;
    this.dateAdded = dateAdded
  }
}