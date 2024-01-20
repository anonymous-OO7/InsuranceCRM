import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import {Colors} from '../../../assets/colors';
import {EmptyDocSvg} from '../../../assets/svgs/SvgImages';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Button from '../../../components/common/Button';
import {windowHeight, windowWidth} from '../../../assets/utils/Dimensions';
import HeadingBox from '../../../components/molecules/HeadingBox';
import Radiobutton from '../../../components/common/Radiobutton';
import SaveCancelBtn from '../../../components/common/SavecancelBtn';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {axiosrequest} from '../../../assets/utils/handler';

const Policydetails = props => {
  const showToast = text => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  const [addpolicy, setaddPolicy] = useState(false);
  const [statusactive, setStatusactive] = useState(false);
  const [premiumYearly, serPremiumyearly] = useState(false);
  const [clientData, setClientData] = useState(
    // props.clientdata?.clientpolicies,
    [],
  );

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentDatebox, setcurrentDatebox] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    const d = x1[2] + '/' + x1[1] + '/' + x1[0];

    if (currentDatebox == 'inception') {
      inceptiondate(d);
    } else if (currentDatebox == 'maturity_date') {
      maturitydate(d);
    } else {
      nextduedate(d);
    }
    hideDatePicker();
  };

  const [policydata, setPolicyData] = useState({
    name: '',
    amount: 0,
    status: false,
    inception_date: 'Date',
    frequency: false,
    next_due_date: 'Date',
    maturity_date: 'Date',
  });

  useEffect(() => {
    getAllpolicy();
  }, []);

  const updatePolicyData = (key, value) => {
    setPolicyData(prevState => {
      return {
        ...prevState, // Spread the previous state to maintain other key-value pairs
        [key]: value, // Update the specific key with the new value
      };
    });
  };

  const onproductNameChange = text => {
    updatePolicyData('name', text);
  };

  const amountChange = text => {
    updatePolicyData('amount', text);
  };

  const inceptiondate = text => {
    updatePolicyData('inception_date', text);
  };

  const nextduedate = text => {
    updatePolicyData('next_due_date', text);
  };

  const maturitydate = text => {
    updatePolicyData('maturity_date', text);
  };

  const addpolicydatabackend = async () => {
    if (
      policydata.amount &&
      policydata.amount != 0 &&
      policydata.name &&
      policydata.name != '' &&
      policydata.inception_date &&
      policydata.inception_date != '' &&
      policydata.next_due_date &&
      policydata.next_due_date != '' &&
      policydata.maturity_date &&
      policydata.maturity_date != ''
    ) {
      try {
        // Block of code to try
        let endpoint = `/policy`;
        const res = await axiosrequest(
          'post',
          {
            name: policydata.name,
            amount: policydata.amount,
            status: policydata.status == true ? 'active' : 'inactive',
            inception_date: policydata.inception_date,
            frequency: policydata.frequency == true ? 'yearly' : 'monthly',
            next_due_date: policydata.next_due_date,
            client_id: props?.clientdata?.id,
            maturity_date: policydata.maturity_date,
          },
          endpoint,
        );
        if (res != '' && res.status == 200) {
          setaddPolicy(!addpolicy);
          showToast('Policy added successfully!');
          setPolicyData({
            name: '',
            amount: 0,
            status: false,
            inception_date: 'Date',
            frequency: false,
            next_due_date: 'Date',
            maturity_date: 'Date',
          });
          getAllpolicy();
        } else {
          showToast(res?.data?.message);
          // showToast(res?.data?.message);
        }
      } catch (err) {
        // Block of code to handle errors

        showToast('Some error occured');
      }
    } else {
      showToast('Fill all fields!');
    }
  };

  const getAllpolicy = async () => {
    try {
      // Block of code to try
      let endpoint = `/policy/${props?.clientdata?.id}`;
      const res = await axiosrequest('get', {}, endpoint);

      if (res != '' && res.status == 200) {
        if (res.data.data != null && res.data.data != undefined) {
          setPolicyData(res.data.data);

          setClientData(res.data.data);
        }
      } else {
      }
    } catch (err) {
      // Block of code to handle errors
      showToast('Some error occured');
    }
  };

  return (
    <View style={styles.maincontainer}>
      {addpolicy ? (
        <View style={styles.emptyCtn}>
          <ScrollView>
            <HeadingBox
              props={props}
              headingText={'Product name'}
              inputplaceholder={'Product name'}
              onInputChange={onproductNameChange}
              containerstyle={styles.headingboxctn}
            />

            <HeadingBox
              props={props}
              headingText={'Proposed amount'}
              inputplaceholder={'Amount'}
              onInputChange={amountChange}
              containerstyle={styles.headingboxctn}
              keyboardtype="phone-pad"
            />

            <Radiobutton
              radioheading="Status"
              btn1heading="Active"
              btn2heading="Inactive"
              active={statusactive}
              containerstyle={styles.radiobtnctn}
              onclickfirst={() => {
                setStatusactive(true);
                updatePolicyData('status', true);
              }}
              onclicksecond={() => {
                setStatusactive(false);
                updatePolicyData('status', false);
              }}
            />

            <Text style={styles.headingText}>Inception date</Text>

            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => {
                setcurrentDatebox('inception');
                showDatePicker();
              }}>
              <Text style={{fontFamily: 'Rubik-Regular', color: Colors.black}}>
                {policydata.inception_date}
              </Text>
            </TouchableOpacity>

            <Radiobutton
              radioheading="Premium frequency"
              btn1heading="Yearly"
              btn2heading="Monthly"
              containerstyle={styles.radiobtnctn}
              active={premiumYearly}
              onclickfirst={() => {
                serPremiumyearly(true);
                updatePolicyData('frequency', true);
              }}
              onclicksecond={() => {
                serPremiumyearly(false);
                updatePolicyData('frequency', false);
              }}
            />

            <Text style={styles.headingText}>Next due date</Text>

            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => {
                setcurrentDatebox('duedate');
                showDatePicker();
              }}>
              <Text style={{fontFamily: 'Rubik-Regular', color: Colors.black}}>
                {policydata.next_due_date}
              </Text>
            </TouchableOpacity>

            <Text style={styles.headingText}>Maturity date</Text>

            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => {
                setcurrentDatebox('maturity_date');
                showDatePicker();
              }}>
              <Text style={{fontFamily: 'Rubik-Regular', color: Colors.black}}>
                {policydata.maturity_date}
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <View
            style={[
              styles.view2,
              {
                marginBottom: keyboardVisible
                  ? responsiveHeight(0)
                  : responsiveHeight(8),
              },
            ]}>
            <SaveCancelBtn
              onSave={() => {
                // addPolicyData();
                addpolicydatabackend();
              }}
              buttonctn={styles.savebuttonCtn}
              onCancel={() => {
                showToast('Cancelled!!');
                setaddPolicy(false);
              }}
            />
          </View>
        </View>
      ) : clientData.length > 0 ? (
        <View style={styles.policymainctn}>
          <View style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {clientData.map((item, index) => {
                return (
                  <View key={index} style={styles.containerouterlist}>
                    <View style={styles.containerlist}>
                      <View style={styles.ctn1}>
                        <Text style={styles.listheadtext}>
                          Policy Holder name
                        </Text>
                        <Text style={styles.listvaltext}>{item.name}</Text>

                        <Text style={styles.listheadtext}>Product name</Text>
                        <Text style={styles.listvaltext}>{item.name}</Text>

                        <Text style={styles.listheadtext}>Inception date</Text>
                        <Text style={styles.listvaltext}>
                          {item.inception_date}
                        </Text>

                        <Text style={styles.listheadtext}>Next due date</Text>
                        <Text style={styles.statustext}>
                          {item.next_due_date}
                        </Text>

                        <TouchableOpacity>
                          <View style={{alignSelf: 'center'}}>
                            <Text style={styles.sendTxt}>
                              Send policy discription
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.ctn2}>
                        <Text style={styles.listheadtext}>Current Status</Text>
                        <Text style={styles.statustext}>{`${
                          item.status ? 'Active' : 'Inactive'
                        }`}</Text>

                        <Text style={styles.listheadtext}>Proposed amount</Text>
                        <Text style={styles.listvaltext}>₹{item.amount}</Text>

                        <Text style={styles.listheadtext}>
                          Premium frequency
                        </Text>
                        <Text style={styles.statustext}>{`${
                          item.frequency ? 'Yearly' : 'Monthly'
                        }`}</Text>

                        <Text style={styles.listheadtext}>Maturity Date</Text>
                        <Text style={styles.listvaltext}>
                          {item.maturity_date}
                        </Text>

                        <TouchableOpacity>
                          <View style={{alignSelf: 'center'}}>
                            <Text style={styles.sendTxt}>Edit details</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.view2}>
            <Button
              disabled={false}
              btntext="Add policy"
              buttonctn={styles.buttonCtn}
              onclick={() => {
                setaddPolicy(true);
              }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.emptyCtn}>
          <View style={styles.textctn}>
            <EmptyDocSvg />

            <Text style={styles.emptytext}>
              There no policy details found. Please enter the details.
            </Text>
          </View>

          <View style={styles.view2}>
            <Button
              disabled={false}
              btntext="Add policy"
              buttonctn={styles.buttonCtn}
              onclick={() => {
                setaddPolicy(true);
              }}
            />
          </View>
        </View>
      )}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  emptyCtn: {
    display: 'flex',
    flex: 1,
    height: responsiveHeight(82),
    backgroundColor: 'white',
  },
  emptytext: {
    textAlign: 'center',
    width: responsiveWidth(60),
    fontSize: responsiveFontSize(1.5),
    fontFamily: 'Rubik-Regular',
    color: 'black',
  },
  textctn: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view2: {
    backgroundColor: Colors.white,
    padding: responsiveWidth(1),
    paddingHorizontal: responsiveWidth(5),
    marginBottom: responsiveHeight(8),
    width: windowWidth,
  },

  headingboxctn: {
    marginLeft: responsiveWidth(4),
  },

  radiobtnctn: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    marginLeft: responsiveWidth(4),
    marginTop: responsiveHeight(2),
  },
  savebuttonCtn: {
    backgroundColor: 'white',
  },
  containerouterlist: {
    backgroundColor: 'white',
    width: responsiveWidth(82),
    // height: responsiveHeight(40),
    marginTop: responsiveHeight(3),
    borderRadius: responsiveWidth(4),
    margin: responsiveWidth(4),
    elevation: 2,
  },
  containerlist: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: responsiveHeight(4),
  },
  item: {
    flexBasis: '40%',
  },
  policymainctn: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  ctn1: {
    backgroundColor: 'white',
  },
  ctn2: {
    backgroundColor: 'white',
  },
  listheadtext: {
    color: '#a9a9a9',
    fontSize: responsiveFontSize(1.6),
    fontFamily: 'Rubik-Regular',
    marginTop: responsiveHeight(2),
  },
  listvaltext: {
    color: 'black',
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Rubik-Regular',
  },
  statustext: {
    color: '#3EA400',
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Rubik-Regular',
  },
  sendCtn: {
    backgroundColor: 'green',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sendTxt: {
    color: Colors.activeprimary,
    fontSize: responsiveFontSize(1.6),
    fontFamily: 'Rubik-Regular',
    borderBottomWidth: 1,
    borderColor: Colors.activeprimary,
    marginTop: responsiveHeight(3),
  },
  buttonCtn: {},
  dateBtn: {
    backgroundColor: 'white',
    marginLeft: responsiveWidth(4),
    padding: responsiveWidth(1.5),
    borderBottomWidth: responsiveWidth(0.2),
    width: responsiveWidth(80),
  },
  headingText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Rubik-Light',
    color: 'black',
    backgroundColor: 'white',
    width: responsiveWidth(82),
    marginTop: responsiveHeight(3.7),
    marginLeft: responsiveWidth(4),
  },
  textInput: {
    // marginTop: responsiveHeight(1),
    height: responsiveHeight(5),
    width: responsiveWidth(80),
    borderBottomColor: 'white',
    padding: 0,
    margin: 0,
    borderBottomWidth: 1,
    marginBottom: responsiveHeight(1),
    fontSize: responsiveFontSize(1.8),
    borderBottomWidth: responsiveWidth(0.2),
    borderBottomColor: Colors.textcolor,
    color: 'black',
  },
});

export default Policydetails;
