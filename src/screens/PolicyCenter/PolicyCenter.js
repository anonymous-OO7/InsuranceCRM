import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Dropdown} from 'react-native-element-dropdown';
import {axiosrequest} from '../../assets/utils/handler';

import {BackSvg} from '../../assets/svgs/SvgImages';
import LottieView from 'lottie-react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontScale = Dimensions.get('window').fontScale;

const PolicyCenter = props => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [planValue, setPlanValue] = useState(null);
  const [isPlanFocus, setIsPlanFocus] = useState(false);

  const [companydata, setCompanydata] = useState([]);
  const [policytypes, setPolicytypes] = useState([]);
  const [policynames, setPolicynames] = useState([]);

  const [policytypesdata, setPolicytypesdata] = useState([]);

  useEffect(() => {
    getAllCompanylist();
  }, []);

  useEffect(() => {
    console.log('CALLING GETALL policy types');
    getAllPolicytypes();
  }, [value]);

  useEffect(() => {
    console.log('CALLING GETALL PLAM LIST ');
    getAllPlanlist();
  }, [planValue]);

  const getAllCompanylist = async () => {
    console.log('GET ALL COMPANY DATA');
    try {
      // Block of code to try
      let endpoint = `/companies`;
      const res = await axiosrequest('get', {}, endpoint);

      console.log('Response got get all  companies --> ', res.data);

      if (res != '' && res.status == 200) {
        const transformedData = transformApiResponse(res?.data);

        setCompanydata(transformedData);

        // showToast(res?.data?.message);
      } else {
        // showToast(res?.data?.message);
      }
    } catch (err) {
      // Block of code to handle errors

      console.log(err, 'catch block of api');
    }
  };

  function transformApiResponse(apiResponse) {
    if (!apiResponse || !apiResponse.data) {
      return []; // Return an empty array if the response or data is not available
    }

    return apiResponse.data.map(item => ({
      label: item.company_name,
      value: item.company_name,
    }));
  }

  const getAllPolicytypes = async () => {
    console.log('GET ALL POLICYT TYPES DATA');
    try {
      // Block of code to try
      let endpoint = `/policy-types`;
      const res = await axiosrequest('post', {company_name: value}, endpoint);

      console.log('Response got get all  policy typess --> ', res.data);

      if (res != '' && res.status == 200) {
        const transformedData = transformPolicyResponse(res.data);
        setPolicytypes(transformedData);

        // showToast(res?.data?.message);
      } else {
        // showToast(res?.data?.message);
      }
    } catch (err) {
      // Block of code to handle errors

      console.log(err, 'catch block of api');
    }
  };

  function transformPolicyResponse(apiResponse) {
    if (!apiResponse || !apiResponse.data) {
      return []; // Return an empty array if the response or data is not available
    }

    return apiResponse.data.map(item => ({
      label: item.policy_type,
      value: item.policy_type,
    }));
  }

  const getAllPlanlist = async () => {
    console.log('GET ALL PLAN DATA');

    try {
      // Block of code to try
      let endpoint = `/plans`;
      const res = await axiosrequest(
        'post',
        {company_name: value, policy_type: planValue},
        endpoint,
      );

      console.log('Response got get all  listttttttt plans  --> ', res.data);

      if (res != '' && res.status == 200) {
        const policyNames = res.data.data.map(item => ({
          id: item.policy_id,
          name: item.policy_name,
        }));

        setPolicynames(policyNames);
        // const transformedData = transformPolicyResponse(res.data);
        // setPolicytypes(transformedData)
        // showToast(res?.data?.message);
      } else {
        // showToast(res?.data?.message);
      }
    } catch (err) {
      // Block of code to handle errors

      console.log(err, 'catch block of api');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerCtn}>
        <Text style={styles.headingTxt}>Policy Center</Text>

        <Text style={styles.labelTxt}>Select insurance company</Text>

        {companydata.length == 0 ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            itemTextStyle={styles.selectedTextStyle}
            data={companydata}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Policy' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setPolicynames([]);
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        )}

        {policytypes.length == 0 ? null : (
          <>
            <Text style={styles.labelTxt}>Select product category</Text>

            <Dropdown
              style={[styles.dropdown, isPlanFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={styles.selectedTextStyle}

              data={policytypes}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isPlanFocus ? 'Select Plan' : '...'}
              searchPlaceholder="Search..."
              value={planValue}
              onFocus={() => setIsPlanFocus(true)}
              onBlur={() => setIsPlanFocus(false)}
              onChange={item => {
                console.log('CALLING ON CAHNGS');
                setPlanValue(item.value);
                setIsPlanFocus(false);

                getAllPlanlist();
              }}
            />
          </>
        )}

        {policynames.length > 0 ? (
          <View>
            <Text style={styles.labelTxt}>List of plans</Text>

            <FlatList
              data={policynames}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    props.props.navigation.navigate('PolicySummary', {
                      data: item,
                    });
                  }}
                  style={styles.buttonCtn}>
                  <Text style={styles.listText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCtn: {
    flex: 1,
    // marginLeft:responsiveWidth(8),
    backgroundColor: 'white',
    width: responsiveWidth(92),
  },
  headingTxt: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: 'Rubik-Regular',
    color: 'black',
    width: windowWidth,
    backgroundColor: 'white',
    marginTop: responsiveHeight(4),
  },
  labelTxt: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Rubik-Medium',
    color: 'black',
    width: windowWidth,
    backgroundColor: 'white',
    marginTop: responsiveHeight(4),
  },
  animationCtn: {
    backgroundColor: 'white',
    height: responsiveHeight(30),
    width: windowWidth,
  },
  listText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Rubik-Regular',
    color: 'black',
    width: windowWidth,
    backgroundColor: 'white',
  },

  //dropdown
  dropdown: {
    // height: responsiveHeight(5),
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    fontSize:responsiveFontSize(1.8),
    lineHeight:responsiveFontSize(2),
    color:"#333333",
    backgroundColor:"white",
  },
  placeholderStyle: {
    fontFamily: 'Rubik-Regular',
    fontSize:responsiveFontSize(1.8),
    lineHeight:responsiveFontSize(2),
    color:"#333333",
    backgroundColor:"white",
  },
  selectedTextStyle: {
    fontFamily: 'Rubik-Regular',
    fontSize:responsiveFontSize(1.8),
    lineHeight:responsiveFontSize(2),
    color:"#333333",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontFamily: 'Rubik-Regular',
    fontSize:responsiveFontSize(1.8),
    lineHeight:responsiveFontSize(2),
    color:"#333333",
    backgroundColor:"white",  },

  buttonCtn: {
    paddingVertical: responsiveWidth(2),
    backgroundColor: 'white',
    elevation: 2,
    marginVertical: responsiveWidth(1),
  },
});
export default PolicyCenter;
