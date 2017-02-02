import Realm from 'realm';
import TaskModel from './TaskModel';

  const TaskSchema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
      id: {type: 'string'},
      description: {type: 'string'},
      completed: {type: 'date', default: null},
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
    init();
  }

  init() {
    mockData();
  }

  mockData() {
    let realm = this.realm;

    realm.write(() => {
     realm.create('Task', new TaskModel('Workout'));
     realm.create('Task', new TaskModel('Call Eric'));
     realm.create('Task', new TaskModel('Read 30 minutes'));
     realm.create('Task', new TaskModel('Graph Theory'));
    });
  }

  getTasks(date) {

  }

  findAll(sortBy) {
    if (!sortBy) sortBy = [['completed', false], ['updatedAt', true]];
    return this.realm.objects('Task').sorted(sortBy);
  }

  create(day, task) {
    if (this.realm.objects('Task').filtered(`id = '${task.id}'`).length) return;

    this.realm.write(() => {
      this.realm.create('Task', task);
    })
  }

  updateTask(task, callback) {
    if (!callback) return;
    this.realm.write(() => {
      callback();
      task.updatedAt = new Date();
    });
  }

  updateDay(day) {
    
  }

    // realm.write(() => {
    //  realm.create('Dog', {name: 'Rex'});
    // });
}