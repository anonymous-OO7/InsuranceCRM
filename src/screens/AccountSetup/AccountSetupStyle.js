import {StyleSheet} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

let AccountSetupStyle = {};

AccountSetupStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headingCtn: {
    backgroundColor: 'white',
    marginTop: responsiveHeight(5),
  },
  buttonCtn: {
    marginLeft: responsiveWidth(8),
    width: responsiveWidth(80),
    justifyContent: 'center',
  },
  view1: {
    flex: 1,
    backgroundColor: 'white',
  },
  view2: {
    backgroundColor: 'white',
    marginBottom: responsiveHeight(8),
  },
  fieldCtn: {
    marginLeft: responsiveWidth(8),
  },
});

export default AccountSetupStyle;
