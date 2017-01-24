import Utils from './utils';

export default class TaskModel {
	constructor(description, id = Utils.guid(), date = new Date(), completed = null) {
    this.description = description;
    this.id = id;
    this.completed = completed;
  }
}