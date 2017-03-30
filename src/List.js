import {Model} from 'ringa';

class List extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  /**
   * Build a List.
   *
   * @param values Optional POJO with values to populate into this List.
   */
  constructor(values) {
    super(values);

    this.addProperty('items', values || []);

    this.addProperty('editing', false);
  }

  //-----------------------------------
  // Properties
  //-----------------------------------


  //-----------------------------------
  // Methods
  //-----------------------------------

  /**
   * Removes an item by its index and then notifies 'items'.
   *
   * @param ix
   */
  removeItemByIx(ix) {
    this.items.splice(ix, 1);
    this.notify('items');
  }

}

/**
 * Convert a simple Javascript object into a list. Used when data is returned from the server.
 *
 * @param obj A POJO.
 * @returns {List} The new List object, ready for injection into the view layer.
 */
List.deserialize = function(obj) {
  return new List(obj);
};

export default List;
