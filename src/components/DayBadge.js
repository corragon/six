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
      <TouchableHighlight style={styles.viewButton} onPress={(e) => this._onPressButton}>
        <Text style={styles.text}>{this.props.day.date.getDate()}</Text>
      </TouchableHighlight>
    );
  }

  _onPressButton() {
    this.props.setDay(this.props.day);
  }
}

const styles = StyleSheet.create({
  viewButton: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#6AB185',
    borderRadius: 20,
  },
  text: {
    color: 'white',
    fontWeight: '500'
  }
});