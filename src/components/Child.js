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
import AppController from '../global/AppController';

export default class Child extends React.Component {
  constructor() {
    super();

    this.displayMessage  = this.displayMessage.bind(this);
  }

  componentDidMount() {
    let topBus = undefined;
    walkReactParents(this, (parent) => topBus = parent.bus ? parent.bus : topBus);
    this.setState({
      bus: topBus
    })
  }

  displayMessage() {
    dispatch(AppController.UPDATE_MESSAGE, {message: 'This is from Child'}, this.state.bus);
  }

  render() {
    return (
      <View>
        <Button
          onPress={this.displayMessage}
          title="Update Message"
          style={styles.button}
          color='#6A85B1'
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
  button: {
    color: '#841584'
  },
});