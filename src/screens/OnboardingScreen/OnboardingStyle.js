import { Platform, StyleSheet } from "react-native";
import { Dimensions } from "react-native";


import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontScale = Dimensions.get('window').fontScale;


let OnboardingStyle = {};


OnboardingStyle = StyleSheet.create({

        container: {
            flex:1,
            backgroundColor: 'white',
      
          },
          logoStyle:{
            height:responsiveHeight(8.13),
            backgroundColor:"white",
            alignItems:"center",
            justifyContent:"center"
          },
          logoImgContainer:{
            backgroundColor:"white",
            alignItems:"center",
            justifyContent:"center"
          },
          logoImg:{
            height:responsiveHeight(16.7),
            width:responsiveHeight(20.52),
          },
          loginImgContainer:{
            backgroundColor:"white",
            alignItems:"center",
            justifyContent:"center"
          },
          loginImg:{
            height:responsiveHeight(31.7),
            width:responsiveHeight(40.52),

          },
          loginText:{
            fontSize:responsiveFontSize(3),
            fontFamily:'Rubik-Medium',
            lineHeight:responsiveFontSize(3.4),
            color:"#333333",
            backgroundColor:"white",
            width:responsiveWidth(82),
            marginLeft:responsiveWidth(8),
            marginTop:responsiveHeight(3.79),
          },
          buttonCtn:{
            marginLeft:responsiveWidth(8),
            width:responsiveWidth(80),
            marginTop:responsiveHeight(1),
            marginBottom:responsiveHeight(1)

          },
          submitButton: {
            position: 'absolute',
            bottom:responsiveHeight(5),
        },
        headingText: {
          fontSize: responsiveFontSize(1.8),
          fontFamily: 'Rubik-Light',
          color: '#333333',
          backgroundColor: 'white',
          width: responsiveWidth(82),
          marginTop: responsiveHeight(1),
        },
        emailText:{
          fontSize:responsiveFontSize(1.8),
          fontFamily:'Rubik-Light',
          lineHeight:responsiveFontSize(3.4),
          color:"#333333",
          backgroundColor:"white",
          width:responsiveWidth(82),
          marginLeft:responsiveWidth(8),
          marginTop:responsiveHeight(3.79),
        }
    })


export default OnboardingStyle 
