import React,  { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';
import Realm from 'realm';
import SortableListView from 'react-native-sortable-listview';
import Utils from './src/utils';
import Repository from './src/Repository';
import {DateOnly} from './src/util/time';
import DayModel from './src/DayModel';


var RowComponent = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        underlayColor={'#aaa'}
        delayLongPress={100}
        style={{flex: 1, alignSelf: 'stretch', padding: 5, backgroundColor: "#F8F8F8", borderWidth:1, borderColor: '#333', height: 40}}
        {...this.props.sortHandlers}
      >
        <Text style={{fontSize: 24}}>{this.props.data.description}</Text>
      </TouchableHighlight>
    );
  }
});

export default class Six extends Component {
  constructor() {
    super();
    this.repository = new Repository();

    this.state = {
      days: this.repository.get('Day'),
      currDay: this.repository.get('Day')[0],
      tasks: this.repository.get('Task')
    }
  }

  render() {
    let button = <Button
          onPress={this.addADog.bind(this)}
          title="Add a thing"
          style={styles.button}
          />;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Six</Text>
        <Text style={styles.welcome}>Day: {this.state.days.length}</Text>
        <Text style={styles.welcome}>Day tasks: {this.state.days[0].tasks.length}</Text>
        <Text style={styles.welcome}>Tasks: {this.state.tasks.length}</Text>
        <SortableListView
          style={{flex: 1}}
          data={this.state.currDay.tasks}
          onRowMoved={e => {
            let newOrder = Utils.move(this.state.currDay.tasks, e.from, e.to);

            this.setState({currDay: this.state.currDay});

          }}
          renderRow={row => <RowComponent data={row} />}
        />
      </View>
    );
  }
  addADog() {
    let realm = this.realm;
    realm.write(()=>{
      realm.create('Dog', {name: new Date().toString()});
    });
    this.setState({dogs: realm.objects('Dog')});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    color: '#841584'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  block: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

AppRegistry.registerComponent('Six', () => Six);
