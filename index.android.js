/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import Realm from 'realm';


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
    // let database = new Database();
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Button 
          onPress={this.addADog.bind(this)}
          title="Add a thing"
          style={styles.button}
          />
        <Text style={styles.welcome}>Count of dogs in Realm: {this.state.dogs.length}</Text>
      </View>
    );
  }
  addADog() {
    let realm = this.realm;
    realm.write(()=>{
      realm.create('Dog', {name: 'Fido'});
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
