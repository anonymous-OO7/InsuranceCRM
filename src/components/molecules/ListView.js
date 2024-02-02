import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../assets/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontScale = Dimensions.get('window').fontScale;

const ListView = ({props, data}) => {




  const renderStatus = status => {
    switch (status) {
      case 'new_lead':
        return (
          <View style={[styles.detailCtnLead, {backgroundColor: '#3D8BFF'}]}>
            <View style={[styles.leadCtn]}>
              <Text style={styles.statusText}>NEW LEAD</Text>
            </View>
          </View>
        );
      case 'active':
        return (
          <View style={[styles.detailCtnLead, {backgroundColor: '#61A60E'}]}>
            <View style={styles.leadCtn}>
              <Text style={styles.statusText}>ACTIVE</Text>
            </View>
          </View>
        );
      case 'in_progress':
        return (
          <View style={[styles.detailCtnLead, {backgroundColor: '#FF9900'}]}>
            <View style={styles.leadCtn}>
              <Text style={styles.statusText}>IN PROGRESS</Text>
            </View>
          </View>
        );
      case 'cold_lead':
        return (
          <View style={[styles.detailCtnLead, {backgroundColor: '#24B0FF'}]}>
            <View style={styles.leadCtn}>
              <Text style={styles.statusText}>COLD LEAD</Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };


  const getBackgroundColor = (status) => {
    switch (status) {
      case 'new_lead':
        return '#E3CBCB';
      case 'active':
        return '#DCE5C2';
      case 'in_progress':
        return '#BCD7EB';
      case 'cold_lead':
        return '#DFCDE2';
      default:
        return 'gray'; // Default color if none of the conditions are met
    }
  };

  function getFirstAndLastCharacters(name) {
    const words = name.split(' ');
    if (words.length === 1) {
        return words[0][0].toUpperCase();
    }
    const firstChar = words[0][0].toUpperCase();
    const lastChar = words[words.length - 1][0].toUpperCase();
    return firstChar + lastChar;

}
  
  const name = "Gaurav Yadav";
  const initials = getFirstAndLastCharacters(name); // This will be 'GY'

  console.log(data, 'Data got in component');

  const renderItem = ({item}) => {

    const namelogo = getFirstAndLastCharacters(item?.name)


    return(
    <TouchableOpacity
      onPress={() => {
        //  props.props.navigation.navigate('ClientInfo')
        props.navigation.navigate('ClientInfo', {clientdata: item});
      }}
      style={styles.item}>
      <View style={[styles.profileButton,{ backgroundColor:   getBackgroundColor(item?.status) }]}>
        {/* <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../../assets/images/profileimage.jpg')}
        /> */}

        {/* <Text style={{color: "gold"}}>ب</Text>
  <Text style={{color: "aqua"}}>ك</Text> */}

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.profileText}>{namelogo}</Text>
        </View>
      </View>
      <View style={styles.detailCtn}>
        <Text style={styles.nametext}>{item?.name}</Text>
        <Text style={styles.nametext}>{item?.phone}</Text>
      </View>

      {renderStatus(item?.status)}
    </TouchableOpacity>

    )
};

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: 'white',
    marginVertical: responsiveHeight(1),
    display: 'flex',
    flexDirection: 'row',
    padding: responsiveWidth(3.5),
    elevation: 2,
    borderRadius: responsiveWidth(1),
    alignItems: 'center',
    marginLeft: responsiveWidth(1),
    marginRight: responsiveWidth(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  title: {
    fontSize: 32,
  },
  profileButton: {
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    height: responsiveHeight(6),
    width: responsiveHeight(6),
    borderRadius: responsiveHeight(6),
    marginLeft: responsiveWidth(2),
    // elevation: 10,
  },
  image: {
    flex: 1,
    transform: [{scale: 1.5}],
  },
  detailCtn: {
    padding: responsiveWidth(0.5),
    marginLeft: responsiveWidth(3),
  },
  nametext: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Rubik-Regular',
    color: 'black',
  },
  detailCtnLead: {
    paddingHorizontal: responsiveWidth(2),
    backgroundColor: 'green',
    position: 'absolute',
    right: responsiveWidth(6),
    bottom: responsiveHeight(2),
    borderRadius: responsiveWidth(4),
  },
  leadCtn: {},
  statusText: {
    fontSize: responsiveFontSize(1.2),
    fontFamily: 'Rubik-Regular',
    color: 'white',
  },

  profileText: {
    fontSize: responsiveFontSize(3),
    fontFamily: 'Rubik-Regular',
    color: 'black',

  },
});

export default ListView;
