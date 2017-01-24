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

export default class Database {

  constructor() {
    this.realm = new Realm({
     schema: [TaskSchema, DaySchema]
    });
  }

  init() {
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



    // realm.write(() => {
    //  realm.create('Dog', {name: 'Rex'});
    // });
}