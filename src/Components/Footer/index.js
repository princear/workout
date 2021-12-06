import {
    View,
    Image,
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    Platform,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Linking,SafeAreaView,
    ScrollView,
  } from "react-native";
import React, { Component } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ApiScreen } from "../../API/ApiScreen";
import AsyncStorage from "@react-native-community/async-storage";
import { back } from "react-native/Libraries/Animated/Easing";

  export default class Home extends Component {

    constructor(props) {
        
      super(props);
        this.state = {
        dataSource:[],
        name:''
        };
      
      }

      componentDidMount = async () => {

      
      }


      render(){
        
        return(
            <View style={styles.bottom}>
            <View style={{width:wp('40%')}}>
        <TouchableOpacity 
           onPress={()=> this.props.navigation.navigate('MyTabs')}
            style={styles.button}>
                <Image source={require('../../../Assets/homeb.png')} style={styles.homeicon}/>
            </TouchableOpacity>
            </View>
            <View style={{width:wp('20%')}}>
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('WorkoutTabs')}
            style={styles.button}>
                <Image source={require('../../../Assets/dumble.png')} style={styles.scan}/>
            </TouchableOpacity>
            </View>
            <View style={{width:wp('40%')}}>
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Homep')}
            style={styles.button}>
                <Image source={require('../../../Assets/login.png')} style={styles.loginicon}/>
            </TouchableOpacity>
            </View>
        </View>


        )
      }
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1, 
            backgroundColor:'#F8F8F8'
       
          
        },
        bottom:{
            flexDirection:'row',
            position:'absolute',
            bottom:0,
            borderTopColor:'#E5E5E5',
            borderTopWidth:1,
            width:wp('100%'),
            height:hp('5%'),
            backgroundColor:'#fff'
        },
        scan:{
            alignSelf:'center',
            height:40,
           width:40,
           marginTop:5,
           resizeMode:'contain'
        },
        homeicon:{
            alignContent:'flex-start',
           marginRight:wp('30%'),
           height:30,
           width:30,
           resizeMode:'contain',
           marginTop:5,
           marginLeft:15
        },
    
        loginicon:{
        alignContent:'flex-end',
        marginLeft:wp('29%'),
        height:30,
        width:30,
        resizeMode:'contain',
        marginTop:10,
       
       
        },

    })
