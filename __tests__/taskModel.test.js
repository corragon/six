/* eslint-disable no-unused-vars */

import TaskModel from '../src/TaskModel';


describe('TaskModel', () => {
  beforeEach(() => {
    
  });

  it('should not have a description', () => {
    let task = new TaskModel();
    expect(task.description).toEqual(undefined);
  });

});
