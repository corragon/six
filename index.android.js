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


var RowComponent = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        underlayColor={'#aaa'}
        delayLongPress={500} 
        style={{padding: 25, backgroundColor: "#aae", borderBottomWidth:1, borderColor: '#eee', width: 200}} 
        {...this.props.sortHandlers}
      >
        <Text>{this.props.data.description}</Text>
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
        <Text style={styles.welcome}>Whatever</Text>
        <Text style={styles.welcome}>Day: {this.state.days.length}</Text>
        <Text style={styles.welcome}>Day tasks: {this.state.days[0].tasks.length}</Text>
        <Text style={styles.welcome}>Tasks: {this.state.tasks.length}</Text>
        
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
    alignItems: 'center',
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
});

AppRegistry.registerComponent('Six', () => Six);
