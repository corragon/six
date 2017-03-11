import React,  { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
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

import SixBus from './src/global/SixBus';
import SixController from './src/global/SixController';

import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';


var RowComponent = React.createClass({
  render: function() {
    let task = this.props.data;

    return (
      <TouchableHighlight
        underlayColor={'#F5FCFF'}
        onPress={() => {
          this.props.toggle();
          this.forceUpdate();
        }}
        delayLongPress={100}
        style={styles.itemWrapper}
        {...this.props.sortHandlers}
      >
      <View style={styles.item}>
          {task.completed ?
          <Icon name="ios-checkmark-circle" style={styles.itemIcon} /> :
          <Icon name="ios-checkmark-circle-outline" style={styles.itemIcon} />
          }
          <Text style={styles.itemText}>{task.description}</Text>
        </View>
      </TouchableHighlight>
    );
  }
});

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
          renderRow={row => <RowComponent data={row} toggle={() => this.repository.toggleTaskCompleted(row)} />}
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
  itemWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 5,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    fontSize: 40,
    color: '#6A85B1',
    marginHorizontal: 5,
    width: 30,
  },
  itemText: {
    fontSize: 32,
    flex: 1,
  }
});

AppRegistry.registerComponent('Six', () => Six);
