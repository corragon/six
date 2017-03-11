import Realm from 'realm';
import moment from 'moment';

import TaskModel from './TaskModel';
import DayModel from './DayModel';
import {DateOnly} from './util/time';

  const TaskSchema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
      id: {type: 'string'},
      description: {type: 'string'},
      completed: {type: 'bool', default: false, optional: true},
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

  const mockTaskList = ['Workout', 'Call Eric', 'Read GEB', 'Graph Theory', 
  'Build Ringa', 'Write app', 'Read 5/3/1', 'Message Kris', 'Email Shawn', 
  'Read Abstract Algebra', 'Pay bills', 'Message Gabe', 'Plan trip', 'Cook meals', 
  'Find meal-plans', 'Grocery shopping', 'Clean bedroom', 'Return library books', 
  'Sell old books', 'Clean kitchen', 'Take out the trash', 'Declutter office'];

export default class Repository {

  constructor() {
    this.realm = new Realm({
     schema: [TaskSchema, DaySchema],
     schemaVersion: 1
    });
    // this.wipe();
    // this.init();
  }

  init() {
    this.mockData();
  }

  mockData() {
    let realm = this.realm;

    let day = moment('2017-04-08');

    let newDay = new DayModel([
      this.mockTask('Workout', true),
      this.mockTask('Call Eric', false),
      this.mockTask('Read GEB', true),
      this.mockTask('Graph Theory', false),
      this.mockTask('Build Ringa', false),
      this.mockTask('Write Ivy Lee app', true),
      ], day.toDate());

    realm.write(() => {
      realm.create('Day', newDay);
      realm.create('Day', this.mockDay(day.add(1, 'days').toDate()));
      realm.create('Day', this.mockDay(day.add(1, 'days').toDate()));
      realm.create('Day', this.mockDay(day.add(1, 'days').toDate()));
      realm.create('Day', this.mockDay(day.add(1, 'days').toDate()));
      realm.create('Day', this.mockDay(day.add(1, 'days').toDate()));
    });
  }

  mockDay(day) {
    day = day || DateOnly();
    return new DayModel([
      this.mockTask(),
      this.mockTask(),
      this.mockTask(),
      this.mockTask(),
      this.mockTask(),
      this.mockTask(),
      ], day);
  }

  mockTask(name, completed = Math.random() > 0.5) {
    name = name || mockTaskList[Math.floor(Math.random() * mockTaskList.length)];
    return new TaskModel(name, completed);
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

  toggleTaskCompleted(task) {
    this.realm.write(() => {
      task.completed = !task.completed;
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