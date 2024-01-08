import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ToastAndroid,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import HeadingBox from '../../components/molecules/HeadingBox';
import Button from '../../components/common/Button';
import AddclientStyle from './AddclientStyle';
import TopBack from '../../components/molecules/TopBack';
import Radiobutton from '../../components/common/Radiobutton';
import {Success} from '../../assets/svgs/SvgImages';
import LogoViewer from '../../components/common/LogoViewer';
import {Upload} from '../../assets/svgs/SvgImages';
import {axiosrequest} from '../../assets/utils/handler';
import {Dropdown} from 'react-native-element-dropdown';
import {Colors} from '../../assets/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const AddClient = props => {
  const showToast = text => {
    if (text != undefined && text != null && text != '') {
      ToastAndroid.show(text);
    } else {
      ToastAndroid.show('Some error occurred!! ');
    }
  };

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);


  const data = [
    {label: 'Active', value: 'active'},
    {label: 'New Lead', value: 'new_lead'},
    {label: 'In Progress', value: 'in_progress'},
    {label: 'Cold Lead', value: 'cold_lead'},
  ];

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[AddclientStyle.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const [addsingle, setAddsingle] = useState(false);
  const [successAdd, setSuccessAdd] = useState(false);
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

  const addnewclient = async () => {
    console.log('ADDITION OF CLIENT!!');

    setLoading(true)

    try {
      // Block of code to try
      let endpoint = `/client`;
      const res = await axiosrequest(
        'post',
        {
          name: singleclient.name,
          phone: singleclient.phone,
          email: singleclient.email,
          age: parseInt(singleclient.age),
          profession: singleclient.profession,
          address: singleclient.address,
          status : value
        },
        endpoint,
      );

      console.log('Response got in add cilient otp--> ', res?.data);
      setLoading(false)


      if (res != '' && res.status == 200) {
        setSuccessAdd(true);
        console.log(res.data.message);
        // props.navigation.navigate('OtpVerify', { email: email });
      } else {
        console.log(res.data.message);
      }

      setSingleclient({
        name: '',
        phone: 0,
        email: '',
        age: 0,
        profession: '',
        address: '',
        policies: [],
      });
    } catch (err) {
      // Block of code to handle errors
      setLoading(false)

      showToast('Some error occured');

      console.log(err, 'catch block of api');
    }
  };

  const onNameChange = text => {
    console.log('name change! in client setup ' + text);
    updateClientdata('name', text);
  };

  const onphoneChange = text => {
    console.log('phone change! in client setup ' + text);
    updateClientdata('phone', text);
  };

  const onemailChange = text => {
    console.log('emal change! in client setup ' + text);
    updateClientdata('email', text);
  };

  const onageChange = text => {
    console.log('age change! in client setup ' + text);
    updateClientdata('age', text);
  };

  const onprofessionChange = text => {
    console.log('profession change! in client setup ' + text);
    updateClientdata('profession', text);
  };

  const onaddressChange = text => {
    console.log('address change! in client setup ' + text);
    updateClientdata('address', text);
  };

  return (
    <SafeAreaView style={AddclientStyle.container}>
      <View style={{marginBottom: responsiveHeight(0)}}>
        <TopBack props={props} />
      </View>

      <ScrollView>
        <View style={AddclientStyle.contentCtn}>
          {/* {!successAdd ? (
            <>
              <Radiobutton
                radioheading="Enter new client details"
                btn1heading="Multiple clients"
                btn2heading="Single client"
                active={addsingle}
                onclickfirst={() => {
                  setAddsingle(true);
                }}
                onclicksecond={() => {
                  setAddsingle(false);
                }}
              />
            </>
          ) : (
            <></>
          )} */}

          {addsingle ? (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <LogoViewer
                  Logosource={Upload}
                  containerstyle={AddclientStyle.loginImgContainer}
                  logostyle={AddclientStyle.loginImg}
                />
              </TouchableOpacity>
            </View>
          ) : successAdd != true ? (
            <View>
              <Text style={AddclientStyle.headingText}>Client's status</Text>

              <Dropdown
                style={[
                  AddclientStyle.dropdown,
                  isFocus && {borderColor: 'blue'},
                ]}
                placeholderStyle={AddclientStyle.placeholderStyle}
                selectedTextStyle={AddclientStyle.selectedTextStyle}
                itemTextStyle={AddclientStyle.selectedTextStyle}

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
          ) : (
            <>
              <View style={AddclientStyle.profileButton}>
                <LogoViewer
                  Logosource={Success}
                  containerstyle={AddclientStyle.loginImgContainer}
                  logostyle={AddclientStyle.loginImg}
                />
              </View>

              <View>
                <Text style={AddclientStyle.congratesText}>
                  Congratulations!
                </Text>
                <Text
                  style={[
                    AddclientStyle.congratesText,
                    {
                      fontSize: responsiveFontSize(2),
                      marginLeft: responsiveWidth(15),
                    },
                  ]}>
                  Client is added successfully!
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View
        style={[
          AddclientStyle.view2,
          {
            marginBottom: keyboardVisible
              ? responsiveHeight(0)
              : responsiveHeight(8),
          },
        ]}>
        {successAdd ? (
          <>
            <View style={AddclientStyle.buttonmainCtn}>
              <TouchableOpacity
                onPress={() => {
                  setSuccessAdd(false);
                  setSingleclient({
                    name: '',
                    phone: 0,
                    email: '',
                    age: 0,
                    profession: '',
                    address: '',
                    policies: [],
                  });
                }}>
                <Text style={AddclientStyle.sendTxt}>Add another Client</Text>
              </TouchableOpacity>
            </View>

            <Button
              disabled={false}
              btntext="Go to Dashboard"
              buttonctn={AddclientStyle.buttonCtn}
              onclick={() => {
                props.navigation.goBack();
              }}
            />
          </>
        ) : (
          <>
            <Button
              disabled={
                singleclient.name &&
                singleclient.name != '' &&
                singleclient.phone &&
                singleclient.phone != '' &&
                singleclient.email &&
                singleclient.email != '' &&
                singleclient.age &&
                singleclient.age != '' &&
                singleclient.profession &&
                singleclient.profession != '' &&
                singleclient.address &&
                singleclient.address != ''
                  ? false
                  : true
              }
              btntext="Save"
              buttonctn={AddclientStyle.buttonCtn}
              loading = {loading}
              onclick={() => {
                // setSuccessAdd(true);
                addnewclient();
              }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddClient;
