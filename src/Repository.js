import Realm from 'realm';
import TaskModel from './TaskModel';
import DayModel from './DayModel';
import {DateOnly} from './util/time';

  const TaskSchema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
      id: {type: 'string'},
      description: {type: 'string'},
      completed: {type: 'date', default: null, optional: true},
      dateAdded: {type: 'date', default: DateOnly()},
    }
  };
  const DaySchema = {
    name: 'Day',
    primaryKey: 'id',
    properties: {
      id: {type: 'string'},
      tasks: {type: 'list', objectType: 'Task'},
      date: {type: 'date', indexed: true}
    }
  };

export default class Repository {

  constructor() {
    this.realm = new Realm({
     schema: [TaskSchema, DaySchema]
    });
    // this.wipe();
    // this.init();
  }

  init() {
    this.mockData();
  }

  mockData() {
    let realm = this.realm;

    let newDay = new DayModel([
      new TaskModel('Workout'),
      new TaskModel('Call Eric'),
      new TaskModel('Read GEB'),
      new TaskModel('Graph Theory'),
      new TaskModel('Build Ringa'),
      new TaskModel('Write Ivy Lee app'),
      ]);

    realm.write(() => {
      realm.create('Day', newDay);
    });
  }

  getDay(date) {
    return this.realm.objects('Day').find((day) => {day.date.getTime()===date.getTime()});
  }

  get(objectType) {
    return this.realm.objects(objectType);
  }

  create(day, task) {
    if (this.realm.objects('Task').filtered(`id = '${task.id}'`).length) return;

    this.realm.write(() => {
      this.realm.create('Task', task);
    })
  }

  move(day, fromIndex, toIndex) {
    this.realm.write(() => {
      day.tasks.splice(toIndex, 0, day.tasks.splice(fromIndex, 1)[0]);
    });
  }

  updateTask(task) {
    this.realm.write(() => {
      task.date = task.date;
    });
  }

  updateDay(day) {
    this.realm.write(() => {
      day.date = day.date;
    });
  }

  wipe(target) {
    this.realm.write(() => {
      if (target) {
        this.realm.delete(target);
      } else {
        this.realm.deleteAll();
      }
    });
  }
}