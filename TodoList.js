//  include react-native-swipeout
import Swipeout from 'react-native-swipeout';
//  example row data (see for json structure)
import rows from './data';
//  example styles
import styles from './styles';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, ListView, Text, View} from 'react-native';

class TodoList extends Component {

  constructor() {
    super();

    //  datasource rerendered when change is made (used to set swipeout to active)
    // var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    //
    // this.state = {
    //   dataSource: ds.cloneWithRows(rows),
    //   scrollEnabled: true,
    // };
  }

  //  set scrolling to true/false
  _allowScroll(scrollEnabled) {
    this.setState({ scrollEnabled: scrollEnabled });
  }

  //  set active swipeout item
  _handleSwipeout(rowID) {
    for (var i = 0; i < rows.length; i++) {
      if (i != rowID) rows[i].active = false;
      else rows[i].active = true;
    }
    this._updateDataSource(rows);
  }

  _updateDataSource(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  }

  _renderRow(rowData: string, rowID: number) {
    return (
      <Swipeout
        right={
          [
            {text: 'Delete', onPress: () => this.props.onRemoveTodo(rowId)}
          ]
        }
        rowID={rowID}
        autoClose={true}
        close={!rowData.active}
        onOpen={(rowID) => this._handleSwipeout(rowID) }
        scroll={event => this._allowScroll(event)}>
        <View style={styles.li}>
          <Text style={styles.liText}>{rowData.content}</Text>
        </View>
      </Swipeout>
    );
  }

  render() {
    return (
        <ListView
          dataSource={this.props.dataSource}
          renderRow={this._renderRow.bind(this)}
          style={styles.listview}/>
    );
  }

}

export default TodoList;
