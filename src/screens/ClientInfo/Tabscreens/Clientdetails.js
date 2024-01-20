import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import TextValue from '../../../components/common/TextValue';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../../assets/colors';
import Button from '../../../components/common/Button';
import {windowWidth} from '../../../assets/utils/Dimensions';
import HeadingBox from '../../../components/molecules/HeadingBox';
import SaveCancelBtn from '../../../components/common/SavecancelBtn';
import {Dropdown} from 'react-native-element-dropdown';
import {axiosrequest} from '../../../assets/utils/handler';
const Clientdetails = props => {
  console.log(props, 'CLIENT DETAILS PROPS');

  const showToast = text => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };
  const [edit, setEdit] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [value, setValue] = useState(props.clientdata.status);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    {label: 'Active', value: 'active'},
    {label: 'New Lead', value: 'new_lead'},
    {label: 'In Progress', value: 'in_progress'},
    {label: 'Cold Lead', value: 'cold_lead'},
  ];

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

  const [singleclient, setSingleclient] = useState({
    name: props.clientdata.name,
    phone: props.clientdata.phone,
    email: props.clientdata.email,
    age: props.clientdata.age,
    profession: props.clientdata.profession,
    address: props.clientdata.address,
    clientpolicies: [],
  });

  const updateClientdata = (key, value) => {
    setSingleclient(prevState => {
      return {
        ...prevState, // Spread the previous state to maintain other key-value pairs
        [key]: value, // Update the specific key with the new value
      };
    });
  };
  const onNameChange = text => {
    updateClientdata('name', text);
  };

  const onphoneChange = text => {
    updateClientdata('phone', text);
  };

  const onemailChange = text => {
    updateClientdata('email', text);
  };

  const onageChange = text => {
    updateClientdata('age', text);
  };

  const onprofessionChange = text => {
    updateClientdata('profession', text);
  };

  const onaddressChange = text => {
    updateClientdata('address', text);
  };

  const updateClient = async () => {
    try {
      // Block of code to try
      let endpoint = `/client/${props.clientdata.id}`;
      const res = await axiosrequest(
        'put',
        {
          name: singleclient.name,
          phone: singleclient.phone,
          email: singleclient.email,
          age: parseInt(singleclient.age),
          profession: singleclient.profession,
          address: singleclient.address,
          status: value,
        },
        endpoint,
      );

      console.log('RESPONSE GOT', res);

      if (res != '' && res.status == 200) {
        console.log('SUCCESS ADD', res.data);
        setEdit(false);
        showToast('Update successful');
        // props.navigation.navigate('OtpVerify', { email: email });
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      // Block of code to handle errors
      console.log('error', err);

      showToast('Some error occured');
    }
  };

  return (
    <View style={styles.container}>
      {edit ? (
        <View style={styles.emptyCtn}>
          <ScrollView style={{marginLeft: responsiveWidth(8)}}>
            <View>
              <Text style={styles.headingText}>Client's status</Text>

              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.selectedTextStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
              <HeadingBox
                headingText="Client name"
                inputplaceholder="Enter name"
                props={props}
                onInputChange={onNameChange}
                inputvalue={singleclient.name}
              />
              <HeadingBox
                headingText="Phone no."
                inputplaceholder="Enter Phone"
                props={props}
                onInputChange={onphoneChange}
                keyboardtype="phone-pad"
                inputvalue={singleclient.phone}
              />

              <HeadingBox
                headingText="Email ID"
                inputplaceholder="Enter Email"
                props={props}
                onInputChange={onemailChange}
                inputvalue={singleclient.email}
              />

              <HeadingBox
                headingText="Age"
                inputplaceholder="Enter Age"
                props={props}
                onInputChange={onageChange}
                keyboardtype="number-pad"
                inputvalue={String(singleclient.age)}
              />

              <HeadingBox
                headingText="Profession"
                inputplaceholder="Enter Profession"
                props={props}
                onInputChange={onprofessionChange}
                inputvalue={singleclient.profession}
              />

              <HeadingBox
                headingText="Address"
                inputplaceholder="Enter Address"
                props={props}
                onInputChange={onaddressChange}
                inputvalue={singleclient.address}
              />
            </View>
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
                if (
                  singleclient.name != '' &&
                  singleclient.age != '' &&
                  singleclient.email != '' &&
                  singleclient.phone != '' &&
                  singleclient.profession != '' &&
                  singleclient.address != ''
                ) {
                  updateClient();
                } else {
                  showToast('Fill all fields!!');
                }
              }}
              buttonctn={styles.savebuttonCtn}
              onCancel={() => {
                showToast('Cancelled!!');
                setSingleclient({
                  name: props.clientdata.name,
                  phone: props.clientdata.phone,
                  email: props.clientdata.email,
                  age: props.clientdata.age,
                  profession: props.clientdata.profession,
                  address: props.clientdata.address,
                  clientpolicies: [],
                });
                setEdit(false);
              }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.emptyCtn}>
          <View style={{flex: 1}}>
            <View style={styles.textCtn}>
              <TextValue title="Client name" value={singleclient.name} />
              <TextValue title="Phone number" value={singleclient.phone} />
              <TextValue title="Email ID" value={singleclient.email} />
              <TextValue title="Age" value={singleclient.age} />
              <TextValue title="Profession" value={singleclient.profession} />
              <TextValue title="Address" value={singleclient.address} />
            </View>
          </View>

          <View style={styles.view2}>
            <Button
              disabled={false}
              btntext="Edit"
              buttonctn={styles.buttonCtn}
              onclick={() => {
                setEdit(true);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  textCtn: {
    backgroundColor: 'lawngreen ',
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(1),
  },
  view2: {
    backgroundColor: Colors.white,
    padding: responsiveWidth(1),
    paddingHorizontal: responsiveWidth(5),
    marginBottom: responsiveHeight(8),
    width: windowWidth,
  },
  buttonCtn: {},
  emptyCtn: {
    display: 'flex',
    flex: 1,
    height: responsiveHeight(82),
    backgroundColor: 'white',
  },
  headingboxctn: {
    marginLeft: responsiveWidth(4),
  },
  savebuttonCtn: {
    backgroundColor: 'white',
  },
  headingText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Rubik-Light',
    color: 'black',
    backgroundColor: 'white',
    width: responsiveWidth(82),
    marginTop: responsiveHeight(3.7),
  },
  dropdown: {
    height: responsiveHeight(4),
    width: responsiveWidth(80),
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    borderRadius: responsiveWidth(1),
    paddingHorizontal: 8,
    marginTop: responsiveHeight(1),
    backgroundColor: Colors.white,
  },
  placeholderStyle: {
    fontFamily: 'Rubik-Regular',
    fontSize: responsiveFontSize(1.8),
    lineHeight: responsiveFontSize(2),
    color: '#333333',
    backgroundColor: 'white',
  },
  selectedTextStyle: {
    fontFamily: 'Rubik-Regular',
    fontSize: responsiveFontSize(1.8),
    lineHeight: responsiveFontSize(2),
    color: '#333333',
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Colors.black,
  },
});

export default Clientdetails;
