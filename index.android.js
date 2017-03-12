import React,  { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  Image,
  TouchableHighlight
} from 'react-native';
import Realm from 'realm';
import SortableListView from 'react-native-sortable-listview';
import Utils from './src/utils';
import Repository from './src/Repository';
import {DateOnly} from './src/util/time';
import DayModel from './src/DayModel';
import DayBadge from './src/components/DayBadge';
import TaskListItem from './src/components/TaskListItem';

import SixBus from './src/global/SixBus';
import SixController from './src/global/SixController';

import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';




export default class Six extends Component {
  constructor() {
    super();
    this.repository = new Repository();
    this.bus = new SixBus();
    this.controller = new SixController(this.bus);

    this.state = {
      days: this.repository.get('Day'),
      currDay: this.repository.get('Day')[0],
      tasks: this.repository.get('Task')
    }
  }

  render() {
    var _scrollView: ScrollView;

    return (
      <View style={styles.container}>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          horizontal={true}
          style={styles.scrollView}>
          {this.state.days.map((day, i) => <DayBadge key={i} day={day} setDay={this.setCurrentDay.bind(this, i)}/>)}
        </ScrollView>

        <Text style={styles.welcome}>Day: {this.state.currDay.date.toDateString()}</Text>
        <SortableListView
          style={{flex: 3}}
          data={this.state.currDay.tasks}
          onRowMoved={e => {
            this.repository.move(this.state.currDay, e.from, e.to);
          }}
          renderRow={row => <TaskListItem data={row}
                              toggle={() => this.repository.toggleTaskCompleted(row)}
                              saveDesc={(task, desc) => this.repository.updateTaskDescription(task, desc)} />}
        />
      </View>
    );
  }
  setCurrentDay(ix) {
    this.setState({
      currDay: this.repository.get('Day')[ix]
    });
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
  scrollView: {
    marginTop: 20,
    flex: 10,
    maxHeight: 128
  },
  horizontalScrollView: {
    height: 50,
  },
  block: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

AppRegistry.registerComponent('Six', () => Six);
