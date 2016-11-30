import React from 'react';
import { View, ListView, Image, Text, StyleSheet } from 'react-native';
//import styles from './styles';

var REQUEST_URL = 'http://private-b3d005-hackdayreactnative.apiary-mock.com/collect_data';

class EXListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  render() {
    if (!this.state.dataSource) {
      return renderLoadingView();
    }
    
    return <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderDataRow}
      renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      style={styles.listView}
    />
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text style={style.container}>
          Loading data...
        </Text>
      </View>
    );
  }

  renderDataRow(dataSource) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: dataSource.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{dataSource.title}</Text>
          <Text style={styles.content}>{dataSource.content}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  content: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
});

export default EXListView;