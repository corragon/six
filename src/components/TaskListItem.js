import React,  { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native';

import {attach, depend, dependency, watch, walkReactParents} from 'react-ringa';
import {dispatch} from 'ringa';

import AppController from '../global/AppController';
import AppModel from '../global/AppModel';

import Icon from 'react-native-vector-icons/Ionicons';

export default class TaskListItem extends Component {
  constructor(props) {
    super(props);

    // We will use this after making task items ringa models
    // watch(this, props.data);

    this.state = {
      editing: false,
      text: props.data.description,
    }
    this.saveDescription = this.saveDescription.bind(this);
    this.toggleTaskDone = this.toggleTaskDone.bind(this);
  }

  componentDidMount() {
    let topBus = undefined;
    walkReactParents(this, (parent) => topBus = parent.bus ? parent.bus : topBus);
    this.setState({
      bus: topBus
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.data.description
    });
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
          </View> :

          <View style={styles.item}>
            <TouchableHighlight
              style={{flex:1}}
              underlayColor={'#F5FCFF'}
              onPress={this.toggleTaskDone}
              delayLongPress={100}
              {...this.props.sortHandlers}
            >
              <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}} >
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

  saveDescription() {
    dispatch(AppController.SAVE_TASK_DESCRIPTION,
        {
          task: this.props.data,
          desc: this.state.text,
        }, this.state.bus);

    this.setState({editing: false});
  }

  toggleTaskDone() {
    dispatch(AppController.TOGGLE_TASK_DONE, {task: this.props.data}, this.state.bus);
  }
}

const styles = StyleSheet.create({
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
    fontSize: 30,
    color: '#CCC',
    marginHorizontal: 10,
    marginVertical: 5,
    width: 30,
  },
});