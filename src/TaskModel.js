import Utils from './utils';

export default class TaskModel {
	constructor(description, id = Utils.guid(), completed = null) {
    this.description = description;
    this.id = id;
    this.completed = Utils.date(completed);
  }
}