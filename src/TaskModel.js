import { Model } from 'ringa';
import Utils from './utils';
import {DateOnly} from './util/time';

export default class TaskModel extends Model {
	constructor(description, completed = false, dateAdded = DateOnly(), id = Utils.guid()) {
    super();

    this.addProperty('description', description);
    this.addProperty('completed', completed);
    this.addProperty('dateAdded', dateAdded);
    this.addProperty('id', id);
  }
}