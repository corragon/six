import {Model} from 'ringa';

export default class AppModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name) {
    super(name);

    this.addProperty('showMessage', true);
    this.addProperty('appMessage', 'Defalt message');
    this.addProperty('currentDay');

  }

}
