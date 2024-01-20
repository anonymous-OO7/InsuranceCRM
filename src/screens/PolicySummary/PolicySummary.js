import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {axiosrequest} from '../../assets/utils/handler';
import TopBack from '../../components/molecules/TopBack';
import Markdown from 'react-native-markdown-display';
import {Colors} from '../../assets/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PolicySummary = props => {
  const [policy, setPolicy] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const markdownStyles = {
    text: {
      color: 'black', // Set text color to black
    },
  };
  useEffect(() => {
    getsummary();
  }, []);

  const getsummary = async () => {
    setIsloading(true);
    try {
      // Block of code to try
      let endpoint = `/policy-summary/${props.route.params.data.id}`;
      const res = await axiosrequest('get', {}, endpoint);
      setIsloading(false);
      if (res != '' && res.status == 200) {
        const apiResponse = res.data;
        const policy = apiResponse.data.length > 0 ? apiResponse.data[0] : null;
        if (apiResponse.data.length > 0) {
          setPolicy(apiResponse.data[0]);
        } else {
          setPolicy(null);
        }
        // showToast(res?.data?.message);
      } else {
        // showToast(res?.data?.message);
      }
    } catch (err) {
      // Block of code to handle errors
      setIsloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TopBack props={props} heading={props.route.params.data.name} />
      <View style={styles.innerCtn}>
        <Text style={styles.headingTxt}>Policy summary</Text>
        {isLoading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: windowHeight,
              width: windowWidth,
              backgroundColor: Colors.white,
            }}>
            <ActivityIndicator color={Colors.activeprimary} size={'large'} />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{padding: 10, height: responsiveHeight(85)}}>
            <Text style={styles.headingTxt}>{policy?.policy_name}</Text>

            <View style={{padding: 10}}>
              <Markdown style={markdownStyles}>
                {/* {copy} */}
                {policy?.summary1}
              </Markdown>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: windowWidth,
    alignItems: 'center',
  },
  innerCtn: {
    backgroundColor: 'white',
    width: responsiveWidth(92),
  },
  headingTxt: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: 'Rubik-Regular',
    color: 'black',
    width: windowWidth,
    backgroundColor: 'white',
  },
});

export default PolicySummary;
