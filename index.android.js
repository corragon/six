/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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


var RowComponent = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        underlayColor={'#aaa'}
        delayLongPress={500} 
        style={{padding: 25, backgroundColor: "#aae", borderBottomWidth:1, borderColor: '#eee', width: 200}} 
        {...this.props.sortHandlers}
      >
        <Text>{this.props.data.name}</Text>
      </TouchableHighlight>
    );
  }
});

export default class Six extends Component {
  constructor() {
    super();
    this.realm = new Realm({
     schema: [{name: 'Dog', properties: {name: 'string'}}]
    });
    this.realm.write(() => {
     this.realm.deleteAll();
    });
    this.state = {
      dogs: this.realm.objects('Dog')
    }
  }
  render() {
    // let repository = new Repository();
    
    return (
      <View style={styles.container}>
        <Button 
          onPress={this.addADog.bind(this)}
          title="Add a thing"
          style={styles.button}
          />
        <Text style={styles.welcome}>Count of dogs in Realm: {this.state.dogs.length}</Text>
        <Text style={styles.welcome}>{`state.dogs is type ${typeof this.state.dogs}`}</Text>
        <SortableListView
          style={{flex: 1}}
          data={this.state.dogs}
          onRowMoved={e => {
            let newOrder = Utils.move(this.state.dogs, e.from, e.to);
            this.setState({dogs: newOrder});

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
