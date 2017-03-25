import { Model } from 'ringa';
import DayModel from './DayModel';
import TaskModel from './TaskModel';

export default class ModelFactory {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(model, modelOptions) {
    this.model = model;
    this.modelOptions = modelOptions;
  }


  //-----------------------------------
  // Methods
  //-----------------------------------
  build() {

  }
}