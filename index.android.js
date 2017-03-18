import React,  { Component } from 'react';
import {attach, depend, dependency, walkReactParents} from 'react-ringa';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import Realm from 'realm';
import SortableListView from 'react-native-sortable-listview';
import Utils from './src/utils';
import Repository from './src/Repository';
import DayModel from './src/DayModel';
import DayBadge from './src/components/DayBadge';
import Child from './src/components/Child';
import TaskListItem from './src/components/TaskListItem';

import SixBus from './src/global/SixBus';
import SixController from './src/global/SixController';
import AppModel from './src/global/AppModel';

export default class Six extends Component {
  constructor() {
    super();
    this.repository = new Repository();
    this.bus = new SixBus();

    attach(this, new SixController(), {refName: 'SixBus'});

    depend(this, dependency(AppModel, ['showMessage', 'appMessage']));

    this.state = {
      days: this.repository.get('Day'),
      currDay: this.repository.get('Day')[0],
    }
  }
  componentWillMount() {
    // Hack to workaround react-ringa assuming `refs` holds DOM nodes
    // Provide our custom bus instead of a DOM node
    this.refs = {
      SixBus: this.bus,
    };
  }

  render() {
    var _scrollView: ScrollView;
    let message;
    if (this.state.showMessage || true) {
      message = <Text style={styles.welcome}>Blah: {this.state.appMessage}</Text>;
    }

    return (
      <View style={styles.container}>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          horizontal={true}
          style={styles.scrollView}>
          {this.state.days.map((day, i) => <DayBadge key={i} day={day} setDay={this.setCurrentDay.bind(this, i)}/>)}
        </ScrollView>
        <Child />
        <Text style={styles.welcome}>Day: {this.state.currDay.date.toDateString()}</Text>
        {message}
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
