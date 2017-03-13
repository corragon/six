import React,  { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';
import {attach, depend, dependency, walkReactParents} from 'react-ringa';

const DAY_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default class Child extends React.Component {
  constructor() {
    super();

  }

  render() {
    let text = '';
    let busName = '';

    walkReactParents(this, (parent) => text += parent.constructor.displayName || parent.type || parent.toString());
    walkReactParents(this, (parent) => busName += parent.bus ? parent.bus.id : '');

    return (
      <View>
        <Text style={styles.welcome}>{text}</Text>
        <Text style={styles.welcome}>{busName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});