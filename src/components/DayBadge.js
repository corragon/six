import React,  { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';

import {attach, depend, dependency, walkReactParents} from 'react-ringa';
import {dispatch} from 'ringa';

import AppController from '../global/AppController';
import AppModel from '../global/AppModel';

const DAY_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default class DayBadge extends React.Component {
  constructor() {
    super();

    depend(this, dependency(AppModel, ['currentDay']));

    this.selectDay = this.selectDay.bind(this);
  }

  componentDidMount() {
    let topBus = undefined;
    walkReactParents(this, (parent) => topBus = parent.bus ? parent.bus : topBus);
    this.setState({
      bus: topBus
    })
  }

  render() {
    let circleStyle = styles.unselected;
    if (this.state.currentDay && (this.state.currentDay.id === this.props.day.id)) {
      circleStyle = styles.selected;
    }

    return (
      <View style={styles.wrapper}>
        <Text style={styles.dayOfWeek}>{DAY_OF_WEEK[this.props.day.date.getDay()]}</Text>
        <TouchableHighlight style={[styles.backgroundCircle, circleStyle]} onPress={this.selectDay}>
          <Text style={styles.digit}>{this.props.day.date.getDate()}</Text>
        </TouchableHighlight>
      </View>
    );
  }

  selectDay() {
    dispatch(AppController.SET_CURRENT_DAY, {day: this.props.day}, this.state.bus);
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
    borderRadius: 32,
    width: 56,
    height: 56
  },
  unselected: {
    backgroundColor: '#6A85B1',
  },
  selected: {
    backgroundColor: '#889DC1',
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