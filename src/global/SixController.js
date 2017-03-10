import {Controller} from 'ringa';
import SixBus from './SixBus';


export default class SixController extends Controller {
  constructor(bus) {
    super('AppController', bus);

  }
}