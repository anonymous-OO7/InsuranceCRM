import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

let HomeScreenStyle = {};

HomeScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  subcontainer: {
    backgroundColor: 'white',
    width: responsiveWidth(92),
    height: responsiveHeight(100),
  },
  logoImgContainer: {
    backgroundColor: 'white',
    borderRadius: responsiveWidth(5),
    marginLeft: responsiveWidth(1),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(10),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  logoImg: {
    height: responsiveHeight(7),
    width: responsiveWidth(5),
  },
  nameCtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  nameText: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: 'Rubik-Medium',
    color: 'black',
    width: responsiveWidth(70),
    marginLeft: responsiveWidth(4),
  },
  counterCtn: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: responsiveHeight(2),
  },
  counterlight: {
    backgroundColor: '#dcdcdc',
  },
  counteractive: {
    backgroundColor: '#007FFF',
  },
  totalclienttext: {
    color: 'black',
  },
  eventtext: {
    color: 'white',
  },

  listingMainCtn: {
    margin: responsiveWidth(2.2),
    marginTop: responsiveHeight(2),
  },
  listingTitleCtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Rubik-Regular',
    lineHeight: responsiveFontSize(3.4),
    color: 'black',
  },
  addClientText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: 'Rubik-Regular',
    lineHeight: responsiveFontSize(3.4),
    color: '#007FFF',
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
    backgroundColor: '#fff',
    color: '#424242',
    paddingLeft: responsiveHeight(1),
    paddingRight: responsiveHeight(1),
    borderRadius: responsiveWidth(2.5),
  },
  clientlistCtn: {
    backgroundColor: 'white',
    marginTop: responsiveHeight(2),
    height: responsiveHeight(55),
  },
  profileButton: {
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    height: responsiveHeight(6),
    width: responsiveHeight(6),
    borderRadius: responsiveHeight(6),
    // elevation: 10,
  },
  image: {
    flex: 1,
    transform: [{scale: 1}],
  },
  profileText: {
    fontSize: responsiveFontSize(3),
    fontFamily: 'Rubik-Regular',
    color: 'white',
  },
});

export default HomeScreenStyle;
