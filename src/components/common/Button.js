import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity,StyleSheet,ActivityIndicator} from 'react-native';




import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import { Colors } from '../../assets/colors';


  


const Button = ({disabled = true, onclick=  () => {console.log("checking  default logingg in!");} , buttonctn, btntext="Button", loading = false }) => {

  return (


        <View style={buttonctn}>
            <TouchableOpacity onPress={onclick} disabled={ disabled} style={[Buttonstyles.buttonstyle,{backgroundColor: disabled ? "#D6D6D6" : "#007FFF"}]} >
                   {
                    loading ?     <ActivityIndicator size="small" color={Colors.white} /> : <Text style={Buttonstyles.title} >{btntext}</Text> 

                   }
                   
                    
            </TouchableOpacity>
        </View>


  );
};




const Buttonstyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#eaeaea',
    },
    title: {
     
      borderRadius: 6,
      color: 'white',
      textAlign: 'center',
      fontSize: responsiveFontSize(2),
      fontFamily:'Rubik-Regular',
    },
    buttonstyle:{
        backgroundColor:"#D6D6D6",
        paddingHorizontal:responsiveWidth(5),

        height: responsiveHeight(6),
        borderRadius:responsiveHeight(1),
        alignItems:"center",
        justifyContent:"center",
        elevation:5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,

    }
  });

export default Button;
