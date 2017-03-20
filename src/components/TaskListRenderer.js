import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import TaskListItem from './TaskListItem';

import {attach, depend, dependency} from 'react-ringa';

import AppModel from '../global/AppModel';
import DayBadge from './DayBadge';

export default class TaskListRenderer extends Component {
  constructor(props) {
    super(props);

    depend(this, dependency(AppModel, ['currentDay']));

  }

  render() {
    if (this.state.currentDay) {
      return (<SortableListView
          style={{flex: 3}}
          data={this.state.currentDay.tasks}
          onRowMoved={e => {
            this.repository.move(this.state.currentDay, e.from, e.to);
          }}
          renderRow={row => <TaskListItem data={row} />}
        />);
    }
    else {
      return <Text style={styles.text}>Loading...</Text>;
    }
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 15,
  },
});