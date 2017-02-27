import React,  { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
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
   var _scrollView: ScrollView;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Six</Text>

        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          horizontal={true}
          style={styles.scrollView}>
          {THUMBS.map(createThumbRow)}
        </ScrollView>

        <Text style={styles.welcome}>Day: {this.state.days.length}</Text>
        <Text style={styles.welcome}>Day tasks: {this.state.days[0].tasks.length}</Text>
        <Text style={styles.welcome}>Tasks: {this.state.tasks.length}</Text>
        <SortableListView
          style={{flex: 3}}
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
}

class Thumb extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <View style={styles.viewButton}>
        <Image style={styles.img} source={{uri:this.props.uri}} />
      </View>
    );
  }
}

var THUMBS = ['https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851549_767334479959628_274486868_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851561_767334496626293_1958532586_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851579_767334503292959_179092627_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851589_767334513292958_1747022277_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851563_767334559959620_1193692107_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851593_767334566626286_1953955109_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851591_767334523292957_797560749_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851567_767334529959623_843148472_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851548_767334489959627_794462220_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851575_767334539959622_441598241_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851573_767334549959621_534583464_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851583_767334573292952_1519550680_n.png'];
THUMBS = THUMBS.concat(THUMBS); // double length of THUMBS
var createThumbRow = (uri, i) => <Thumb key={i} uri={uri} />;

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
  viewButton: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  scrollView: {
    flex: 0,
    backgroundColor: '#6A85B1',
    height: 50,
  },
  horizontalScrollView: {
    height: 50,
  },
  block: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: 64,
    height: 64,
  },
});

AppRegistry.registerComponent('Six', () => Six);
