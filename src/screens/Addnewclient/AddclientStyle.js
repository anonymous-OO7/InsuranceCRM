import { Platform, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { Colors } from "../../assets/colors";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontScale = Dimensions.get('window').fontScale;


let AddclientStyle = {};


AddclientStyle = StyleSheet.create({

        container: {
            flex:1,
            backgroundColor: 'white',
          },
          contentCtn:{
            flex:1,
            marginLeft:responsiveWidth(8),
          },
          view2: {
            backgroundColor: Colors.white,
            padding: responsiveWidth(1),
            paddingHorizontal: responsiveWidth(5),
            marginBottom:responsiveHeight(8)

          },
          profileButton:{
            overflow: 'hidden',
            alignItems: 'center',
            position: 'relative',
            backgroundColor:"white",
            borderRadius:responsiveHeight(6),
            marginTop:responsiveHeight(20),
            transform: [{ translateX: -responsiveWidth(5) }], // Move 50 pixels to the left

          },
          image: {
            flex: 1,
            transform: [{ scale: 1.5 }]
          },

          logoImgContainer:{
            backgroundColor:"white",
            alignItems:"center",
            justifyContent:"center"
          },
          loginImg:{
            height:responsiveHeight(15),
            width:responsiveHeight(20.52),
          },
          congratesText:{
            fontSize:responsiveFontSize(4),
            fontFamily:'Rubik-Medium',
            color:"#333333",
            backgroundColor:"white",
            width:responsiveWidth(82),
            marginLeft:responsiveWidth(10),
            marginTop:responsiveHeight(3.79)
          },
          sendTxt: {
            color: Colors.activeprimary,
            fontSize: responsiveFontSize(2),
            fontFamily: 'Rubik-Regular',
            borderBottomWidth: 1,
            borderColor: Colors.activeprimary,
            marginBottom: responsiveHeight(2),
            width:responsiveWidth(38),
          },
          buttonmainCtn:{
            justifyContent:"center",
            alignItems:"center"
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
            borderBottomColor: "black",
            borderBottomWidth: 0.5,
            borderRadius: responsiveWidth(1),
            paddingHorizontal: 8,
            marginTop: responsiveHeight(1),
            backgroundColor: Colors.white,
          },
          icon: {
            marginRight: 5,
          },
          label: {
            position: "absolute",
            backgroundColor: Colors.white,
            left: 22,
            top: 8,
            zIndex: 999,
            paddingHorizontal: 8,
            fontSize: 14,
            color:Colors.black
        
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
       
          inputSearchStyle: {
            height: 40,
            fontSize: 16,
            color:Colors.black
        
          },

       
    })


export default AddclientStyle 
