import React from 'react';
import { View, ListView, Image, Text, TouchableOpacity } from 'react-native';
import RestApi from '../../src/RestApi.js'
import styles from './styles.js';

export class EXListView extends React.Component {
  constructor(props) {
    super(props);
    this.restApi = new RestApi();
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2}),
      loaded: false,
    };
  }

  render() {
    if (!this.state.loaded)
      return this._renderLoadingView();
    else
      return <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderDataRow}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        style={styles.listView}
      />
  }

  componentWillMount() {
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2}),
      loaded: false,
    };
  }

  componentDidMount() {
    this.restApi._getCollectionsData((responseData, error) => {
      if (!error) {
        console.log(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      }
    });
  }

  _onListItemClicked(data) {
    console.log('Item Clicked : '.concat(data));
  }

  _renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Loading data...
        </Text>
      </View>
    );
  }

  _renderDataRow(data) {
    return (
      <TouchableOpacity>
        <View style={styles.container}>
          <Image
            source={{uri: data.thumbnail}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.content}>{data.content}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default EXListView;
