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

import SixBus from './src/global/SixBus';
import SixController from './src/global/SixController';

import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';


export class RowComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      text: props.data.description,
    }
    this.saveDescription = this.saveDescription.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.data.description
    });
  }
  saveDescription() {
    this.props.saveDesc(this.props.data, this.state.text);
    this.setState({editing: false});
  }
  render() {
    let task = this.props.data;

    return (
      <View style={styles.itemWrapper}>
        {this.state.editing ?
          <View style={styles.edit}>
            <TextInput
              style={styles.editText}
              value={this.state.text}
              blurOnSubmit={true}
              autoFocus={true}
              autoCapitalize={'sentences'}
              onBlur={this.saveDescription}
              onEndEditing={this.saveDescription}
              onChangeText={(text) => this.setState({text})} />
            <TouchableHighlight
              underlayColor={'#F5FCFF'}
              onPress={this.saveDescription}
            >
              <Icon name="md-close" style={styles.editIcon} />
            </TouchableHighlight>
          </View> :

          <View style={styles.item}>
            <TouchableHighlight
              style={{flex:1}}
              underlayColor={'#F5FCFF'}
              onPress={() => {
                this.props.toggle();
                this.forceUpdate();
              }}
              delayLongPress={100}
              {...this.props.sortHandlers}
            >
              <View
            style={{flex:1, flexDirection: 'row'}}
              >
                {task.completed ?
                <Icon name="ios-checkmark-circle" style={styles.itemIcon} /> :
                <Icon name="ios-checkmark-circle-outline" style={styles.itemIcon} />
                }
                <Text style={styles.itemText}>{task.description}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.editIconWrapper}
              underlayColor={'#F5FCFF'}
              onPress={() => {
                this.setState({editing: true});
              }}
            >
              <Icon name="md-create" style={styles.editIcon} />
            </TouchableHighlight>
          </View>
        }

      </View>
    );
  }
}

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
          renderRow={row => <RowComponent data={row}
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
  },
  edit: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    fontSize: 32,
    flex: 1,
    maxHeight: 50,
  },
  editIconWrapper: {
    flex:1,
    maxWidth: 45,
    paddingHorizontal: 5,
  },
  editIcon: {
    fontSize: 40,
    color: '#6A85B1',
    marginHorizontal: 5,
    width: 30,
  },
});

AppRegistry.registerComponent('Six', () => Six);
