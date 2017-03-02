import React,  { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';

export default class DayBadge extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <TouchableHighlight style={styles.viewButton} onPress={this.props.setDay}>
        <Text style={styles.text}>{this.props.day.date.getDate()}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  viewButton: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#6AB185',
    borderRadius: 32,
    width: 64,
    height: 64
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: '500'
  }
});