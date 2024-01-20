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
import { Dropdown } from 'react-native-element-dropdown';
const Clientdetails = (props) => {
  console.log(props , "CLIENT DETAILS PROPS")

  const showToast = text => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };
  const [edit, setEdit] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [value, setValue] = useState(null);
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
    name: '',
    phone: 0,
    email: '',
    age: 0,
    profession: '',
    address: '',
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


  return (
    <View style={styles.container}>
      {edit ? (
        <View style={styles.emptyCtn}>
          <ScrollView>
          <View>
              <Text style={styles.headingText}>Client's status</Text>

              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && {borderColor: 'blue'},
                ]}
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
              />
              <HeadingBox
                headingText="Phone no."
                inputplaceholder="Enter Phone"
                props={props}
                onInputChange={onphoneChange}
                keyboardtype="phone-pad"
              />

              <HeadingBox
                headingText="Email ID"
                inputplaceholder="Enter Email"
                props={props}
                onInputChange={onemailChange}
              />

              <HeadingBox
                headingText="Age"
                inputplaceholder="Enter Age"
                props={props}
                onInputChange={onageChange}
                keyboardtype="number-pad"
              />

              <HeadingBox
                headingText="Profession"
                inputplaceholder="Enter Profession"
                props={props}
                onInputChange={onprofessionChange}
              />

              <HeadingBox
                headingText="Address"
                inputplaceholder="Enter Address"
                props={props}
                onInputChange={onaddressChange}
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
                // addPolicyData();
              }}
              buttonctn={styles.savebuttonCtn}
              onCancel={() => {
                showToast('Cancelled!!');
                setEdit(false);
              }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.emptyCtn}>
          <View style={{flex: 1}}>
            <View style={styles.textCtn}>
              <TextValue title="Client name" value={props.clientdata.name} />
              <TextValue title="Phone number" value={props.clientdata.phone} />
              <TextValue title="Email ID" value={props.clientdata.email} />
              <TextValue title="Age" value={props.clientdata.age} />
              <TextValue
                title="Profession"
                value={props.clientdata.profession}
              />
              <TextValue title="Address" value={props.clientdata.address} />
            </View>
          </View>

          <View style={styles.view2}>
            <Button
              disabled={false}
              btntext="Edit"
              buttonctn={styles.buttonCtn}
              onclick={() => {
                setEdit(true)
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
