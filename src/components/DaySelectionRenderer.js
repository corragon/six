import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';

import {attach, depend, dependency} from 'react-ringa';

import AppModel from '../global/AppModel';
import DayBadge from './DayBadge';

export default class DaySelectionRenderer extends Component {
  constructor(props) {
    super(props);

    depend(this, dependency(AppModel, ['dayList']));

  }

  render() {
    if (this.state.dayList) {
      return (<ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          horizontal={true}
          style={styles.scrollView}>
          {this.state.dayList.map((day, i) => <DayBadge key={i} day={day} />)}
        </ScrollView>);
    }
    else {
      return <Text style={styles.text}>Loading...</Text>;
    }
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 15,
  },
  scrollView: {
    marginTop: 20,
    flex: 10,
    maxHeight: 128
  },
  horizontalScrollView: {
    height: 50,
  },
});