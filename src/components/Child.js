import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';

import {dispatch} from 'ringa';
import {attach, depend, dependency, walkReactParents} from 'react-ringa';
import SixController from '../global/SixController';

const DAY_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default class Child extends React.Component {
  constructor() {
    super();

    this.testDispatchMethod  = this.testDispatchMethod.bind(this);
    this.displayMessage  = this.displayMessage.bind(this);
  }

  componentDidMount() {
    let topBus = undefined;
    walkReactParents(this, (parent) => topBus = parent.bus ? parent.bus : topBus);
    this.setState({
      bus: topBus
    })
  }

  testDispatchMethod() {
    if (this.state.bus) {
      dispatch(SixController.TEST_EVENT, {someValue: 'This is from Child'}, this.state.bus);
    }
    else {
      console.warn('Could not find a bus on any parent');
      return;
    }
  }

  displayMessage() {
    dispatch(SixController.UPDATE_MESSAGE, {message: 'This is from Child'}, this.state.bus);
  }

  render() {
    let text = '';
    let busName = '';

    walkReactParents(this, (parent) => text += (parent.constructor.name || parent.toString()) + '\n');
    walkReactParents(this, (parent) => busName += parent.bus ? parent.constructor.name + ': ' + parent.bus.id : '');

    return (
      <View>
        <Text style={styles.welcome}>{text}</Text>
        <Text style={styles.welcome}>{busName}</Text>
        <Button
          onPress={this.testDispatchMethod}
          title="Fire Event"
          color="#841584"
        />
        <Button
          onPress={this.displayMessage}
          title="Update Message"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
});