import React,  { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';

const DAY_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default class DayBadge extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.dayOfWeek}>{DAY_OF_WEEK[this.props.day.date.getDay()]}</Text>
        <TouchableHighlight style={styles.backgroundCircle} onPress={this.props.setDay}>
          <Text style={styles.digit}>{this.props.day.date.getDate()}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'stretch'
  },
  backgroundCircle: {
    marginHorizontal: 8,
    marginVertical: 2,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#6A85B1',
    borderRadius: 32,
    width: 56,
    height: 56
  },
  dayOfWeek: {
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    alignSelf: 'stretch'
  },
  digit: {
    color: 'white',
    fontSize: 36,
    fontWeight: '500'
  }
});