import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {axiosrequest} from '../../../assets/utils/handler';

const Policydetails = props => {
  // console.log(props.clientdata, 'CLIENT ALL got id policy derail page');

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

  const showDatePicker = () => {
    console.log('opened date picker');
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    console.log('closed date picker');
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.log('A date has been picked: ', date);
    console.log(currentDatebox, 'CURRENTDATE');
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    const d = x1[2] + '/' + x1[1] + '/' + x1[0];
    console.log(d, 'CURRENTDATE stringg');

    if (currentDatebox == 'inception') {
      inceptiondate(d);
    }else if(currentDatebox == 'maturity_date'){

      maturitydate(d)
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
    maturity_date:'Date'
  });

  useEffect(() => {
    getAllpolicy();
  }, []);

  // const addPolicyData = () => {
  //   if (
  //     policydata.amount != 0 &&
  //     policydata.name != '' &&
  //     policydata.inception_date != '' &&
  //     policydata.next_due_date != ''
  //   ) {
  //     console.log(
  //       'Data of policy being added',
  //       policydata.amount,
  //       '--',
  //       policydata.name,
  //       '---',
  //       policydata.inception_date,
  //       '---',
  //       policydata.next_due_date,
  //       '---',
  //       policydata.maturity_date,
  //     );
  //     setaddPolicy(!addpolicy);
  //     // setClientData(prevDetails => [...prevDetails, policydata]);
  //     addpolicydatabackend();
  //     // updateClientPolicies();
  //     setPolicyData({
  //       name: '',
  //       amount: 0,
  //       status: false,
  //       inception_date: 'Date',
  //       frequency: false,
  //       next_due_date: 'Date',
  //       maturity_date:'Date'
  //     });
  //   } else {
  //     showToast('Fill details first!!');
  //   }
  // };



  const updateClientPolicies = async () => {
    try {
      // Retrieve the existing clients array from AsyncStorage
      const existingClientsJson = await AsyncStorage.getItem('@clients_array');
      let clientsArray = existingClientsJson
        ? JSON.parse(existingClientsJson)
        : [];
      console.log('CLIENTS ARRAY', clientsArray);

      // Find the index of the client to be updated
      const clientIndex = clientsArray.findIndex(
        client => client.clientname === props.clientdata.clientname,
      );

      if (clientIndex !== -1) {
        console.log(clientIndex, 'INDEX FOUND!');
        // Update the clientpolicies array for the specific client
        clientsArray[clientIndex].clientpolicies = [
          ...clientsArray[clientIndex].clientpolicies,
          policydata,
        ];

        console.log(clientsArray, 'CLIENTS ARRAY AFTER INSERTING NET POLICY!');
        // Save the updated array back to AsyncStorage
        const updatedClientsJson = JSON.stringify(clientsArray);
        await AsyncStorage.setItem('@clients_array', updatedClientsJson);

        showToast('Policy added successfully!');
      } else {
        console.log('Client not found');
      }
    } catch (e) {
      console.error('Error updating client policies', e);
    }
  };

  const updatePolicyData = (key, value) => {
    setPolicyData(prevState => {
      return {
        ...prevState, // Spread the previous state to maintain other key-value pairs
        [key]: value, // Update the specific key with the new value
      };
    });

  };

  const onproductNameChange = text => {
    console.log(' product name change! in account setup ' + text);
    updatePolicyData('name', text);
  };

  const amountChange = text => {
    console.log(' amount change ' + text);
    updatePolicyData('amount', text);
  };

  const inceptiondate = text => {
    console.log(' inceptiondate change ' + text);
    updatePolicyData('inception_date', text);
  };

  const nextduedate = text => {
    console.log(' nextduedate  changed' + text);
    updatePolicyData('next_due_date', text);
  };

  const maturitydate = text => {
    console.log(' maturity  changed' + text);
    updatePolicyData('maturity_date', text);
  };




  const addpolicydatabackend = async () => {
    console.log('ADD POLICY DATA');
    if (

      policydata.amount && policydata.amount != 0 &&
      policydata.name && policydata.name != '' &&
      policydata.inception_date && policydata.inception_date != '' &&
       policydata.next_due_date && policydata.next_due_date != '' && 
       policydata.maturity_date && policydata.maturity_date != ''

    ) {

          
      try {

        console.log(
          'Data of policy being added',
          policydata.amount,
          '--',
          policydata.name,
          '---',
          policydata.inception_date,
          '---',
          policydata.next_due_date,
          '---',
          policydata.maturity_date,
        );
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
            maturity_date:policydata.maturity_date
          },
          endpoint,
        );
        // console.log('Response got in add single policy --> ', res);
        if (res != '' && res.status == 200) {
          setaddPolicy(!addpolicy);
          showToast('Policy added successfully!');
          // showToast(res?.data?.message);
          // props.navigation.navigate('OtpVerify', { email: email });
          setPolicyData({
            name: '',
            amount: 0,
            status: false,
            inception_date: 'Date',
            frequency: false,
            next_due_date: 'Date',
            maturity_date:'Date'
          });
          getAllpolicy();
        } else {
          showToast(res?.data?.message);
          // showToast(res?.data?.message);
        }
      } catch (err) {
        // Block of code to handle errors

        showToast('Some error occured');
        console.log(err, 'catch block of api');
      }
    } else {
      showToast('Fill all fields!');
    }
  };



  const getAllpolicy = async () => {
    console.log('GET ALL POLICY DATA');
    try {
      // Block of code to try
      let endpoint = `/policy/${props?.clientdata?.id}`;
      const res = await axiosrequest('get', {}, endpoint);

      console.log('Response got get all  policy --> ', res.data);

      if (res != '' && res.status == 200) {
        if (res.data.data != null && res.data.data != undefined) {
          setPolicyData(res.data.data);

          // setClientData(prevDetails => [...prevDetails, res.data.data]);
          setClientData(res.data.data);
        }
        // showToast(res?.data?.message);
        // props.navigation.navigate('OtpVerify', { email: email });
      } else {
        // showToast(res?.data?.message);
      }
    } catch (err) {
      // Block of code to handle errors
      showToast('Some error occured');

      console.log(err, 'catch block of api');
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

            {/* <HeadingBox
              props={props}
              headingText={'Inception date'}
              inputplaceholder={'Date'}
              onInputChange={inceptiondate}
              containerstyle={styles.headingboxctn}
            /> */}
            <Text style={styles.headingText}>Inception date</Text>

            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => {
                setcurrentDatebox('inception');
                showDatePicker();
              }}>
              <Text style={{fontFamily:"Rubik-Regular", color:Colors.black}}>{policydata.inception_date}</Text>
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

            {/* <HeadingBox
              props={props}
              headingText={'Next due date'}
              inputplaceholder={'Date'}
              onInputChange={nextduedate}
              containerstyle={styles.headingboxctn}
            /> */}

            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => {
                setcurrentDatebox('duedate');
                showDatePicker();
              }}>
              <Text style={{fontFamily:"Rubik-Regular",color:Colors.black}}>{policydata.next_due_date}</Text>
            </TouchableOpacity>

            <Text style={styles.headingText}>Maturity date</Text>

            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => {
                setcurrentDatebox('maturity_date');
                showDatePicker();
              }}>
              <Text style={{fontFamily:"Rubik-Regular", color:Colors.black}}>{policydata.maturity_date}</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.view2}>
            {/* <Button
              disabled={false}
              btntext="Add new policy details"
              buttonctn={styles.buttonCtn}
            /> */}
            <SaveCancelBtn
              onSave={() => {
                // addPolicyData();
                addpolicydatabackend()
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
                console.log(item, 'ITEM', index, 'INDEX');

                return (
                  <View key={index} style={styles.containerouterlist}>
                    <View style={styles.containerlist}>
                      {/* Repeat this item to see the two-column layout */}

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

                      {/* Add more items as needed */}
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
    width:windowWidth
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
    // You can also use width: '50%' instead of flexBasis
    // Add padding, margin, etc., as needed for spacing and layout
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
    height:responsiveHeight(5),
    width: responsiveWidth(80),
    borderBottomColor: 'white',
    padding:0,
    margin:0,
    borderBottomWidth: 1,
    marginBottom: responsiveHeight(1),
    fontSize:responsiveFontSize(1.8),
    borderBottomWidth: responsiveWidth(0.2),
    borderBottomColor: Colors.textcolor,
    color:"black",

  },
});

export default Policydetails;
