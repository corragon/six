import React,  { Component } from 'react';
import {attach, depend, dependency, walkReactParents} from 'react-ringa';
import {dispatch} from 'ringa';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import Realm from 'realm';
import Utils from './src/utils';
import Repository from './src/Repository';
import DayModel from './src/DayModel';
import DayBadge from './src/components/DayBadge';
import Child from './src/components/Child';
import DaySelectionRenderer from './src/components/DaySelectionRenderer';
import TaskListRenderer from './src/components/TaskListRenderer';

import AppBus from './src/global/AppBus';
import AppController from './src/global/AppController';
import RepositoryController from './src/global/RepositoryController';
import AppModel from './src/global/AppModel';

export default class Six extends Component {
  constructor() {
    super();
    this.repository = new Repository();
    this.bus = new AppBus();

    attach(this, new RepositoryController(), {refName: 'AppBus'});
    attach(this, new AppController(), {refName: 'AppBus'});

    depend(this, dependency(AppModel, ['showMessage', 'appMessage', 'currentDay']));

    this.setCurrentDay = this.setCurrentDay.bind(this);


  }
  componentWillMount() {
    // Hack to workaround react-ringa assuming `refs` holds DOM nodes
    // Provide our custom bus instead of a DOM node
    this.refs = {
      AppBus: this.bus,
    };
  }

  render() {
    var _scrollView: ScrollView;
    let message = <Text style={styles.welcome}>Blah: {this.state.appMessage}</Text>;
    let currentDay = this.state.currentDay || this.repository.get('Day')[0];

    return (
      <View style={styles.container}>
        <DaySelectionRenderer />
        <Child />
        {message}
        <Text style={styles.welcome}>Day: {currentDay.date.toDateString()}</Text>
        <TaskListRenderer/>
      </View>
    );
  }
  setCurrentDay(ix) {
    dispatch(AppController.SET_CURRENT_DAY,
      {'selectedDay': this.repository.get('Day')[ix]},
      this.bus);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    color: '#841584'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Six', () => Six);
