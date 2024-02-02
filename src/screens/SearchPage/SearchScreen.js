import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput, StyleSheet, SafeAreaView} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SearchIcon from '../../assets/svgs/searchicon.svg';
import ListView from '../../components/molecules/ListView';
import {Colors} from '../../assets/colors';
import TopBack from '../../components/molecules/TopBack';

const SearchScreen = props => {
  const [clientlist, setClientlist] = useState(props.route.params.data);
  const [filteredClientlist, setFilteredClientlist] = useState(clientlist);

  const searchClients = searchString => {
    const filteredClients = clientlist.filter(
      client =>
        client.name.toLowerCase().includes(searchString.toLowerCase()) ||
        client.phone.includes(searchString),
    );
    setFilteredClientlist(filteredClients);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerCtn}>
        <TopBack heading="Search" props={props} />
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search client"
            placeholderTextColor="#d3d3d3"
            underlineColorAndroid="transparent"
            onChangeText={searchString => searchClients(searchString)}
          />

          <TouchableOpacity>
            <SearchIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.clientlistCtn}>
          <ListView props={props} data={filteredClientlist} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },

  innerCtn: {
    backgroundColor: Colors.white,
    width: responsiveWidth(90),
    height: responsiveHeight(100),
  },
  searchSection: {
    marginTop: responsiveHeight(2),
    borderRadius: responsiveWidth(2.5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    paddingRight: responsiveHeight(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  searchIcon: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    paddingTop: responsiveHeight(1),
    paddingBottom: responsiveHeight(1),
    backgroundColor: Colors.white,
    color: '#424242',
    paddingLeft: responsiveHeight(1),
    paddingRight: responsiveHeight(1),
    borderRadius: responsiveWidth(2.5),
  },
  clientlistCtn: {
    backgroundColor: Colors.white,
    marginTop: responsiveHeight(2),
    height: responsiveHeight(80),
  },
});

export default SearchScreen;
