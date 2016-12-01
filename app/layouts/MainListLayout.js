import React from 'react';
import { View, Text } from 'react-native';
import EXListView from '../components/EXListView'
import style from './style.js'

class MainListLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  // its works now :D
  _listViewItemClickCallback(data) {
    // here we can do to switch view or etc
    console.log('Item clicked');
  }

  render() {
    return (
    <View style={style.container}>
      <Text style={style.title}>Data Collections</Text>
      <EXListView listener = {(data) => {
        MainListLayout.prototype._listViewItemClickCallback(data);
      }}/>
    </View>);
  }
}

export default MainListLayout;
