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
      <View style={styles.viewButton}>
        <Text style={styles.text}>{this.props.day.date.getDate()}</Text>
      </View>
    );
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