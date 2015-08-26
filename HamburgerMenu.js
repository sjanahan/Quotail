const React = require('react-native');
const Dimensions = require('Dimensions');
const {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Component,
} = React;

const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

class Menu extends Component {
  
  render() {
    return (
      <ScrollView style={styles.menu}>
        <Text style={styles.item}>PLACE SEARCHBOX HERE</Text>

        <Text style={styles.item}>Watchlist</Text>
        <Text style={styles.item}>Filters</Text>
        <Text style={styles.item}>Share Quotail</Text>
        <Text style={styles.item}>Give us Feedback</Text>
      </ScrollView>
    );
  }
}

module.exports = Menu;