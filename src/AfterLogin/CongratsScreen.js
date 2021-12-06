import {
    View,
    Image,
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    Platform,Animated,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Linking, SafeAreaView,
    ScrollView, FlatList
} from "react-native";

import React, { Component } from "react";

import Header from '../Components/Header/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ApiScreen } from "../Api/ApiScreen"
import AsyncStorage from "@react-native-community/async-storage";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Modal from 'react-native-modal';
import Footer from '../Components/Footer/index';
import * as Progress from 'react-native-progress';
import CountDown from 'react-native-countdown-component';



export default class CongratsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            running:false,
            dataSource: [],
            Title: '',
            image: '',
            description: '',
            dataSource1: [],
            dataSource2: '',
            Stime:'',
            SDate:'',
            isPrivate: false,
            isVisible: true,
            archived:'',
            currentIndex:0,
            currentIndexless:1,
            dataId:'',
            dataa:'Warm-up',
            left_time:1,
            time: {}, 
            seconds: 10,
            ExerciseId:'',

            
        };
       
    }
    
 

    componentDidMount = async () => {
      
      console.log('onloadscreen');
    
      
    }


  
 
 

    render() {
       
    

      //  const name = this.props.route.params.name;
    

        return (

            <View style={styles.container}>

                 {(this.state.isLoading) &&
                    <View style={{ flex: 1, justifyContent: 'center', position: 'absolute', top: '50%', left: '40%' }}>

                        <ActivityIndicator
                            size="large"
                            style={{
                                backgroundColor: "rgba(20,116,240,.8)",
                                height: 80,
                                width: 80,
                                zIndex: 999,
                                borderRadius: 15
                            }}
                            size="small"
                            color="#ffffff"
                        />

                    </View>}

              

            <Image
             source={require('../../Assets/Frame.png')} style={styles.image}>
      
                    </Image>

            <View>
                <Text  style={styles.Title}>Congratulations!</Text>
                <Text  style={styles.Title1}>You've completed your workout.{'\n'} Don't forget to cool-down and stretch.</Text>
                <Text  style={styles.Title2}>A picture says a thousand words.Take a photograph after{'\n'}each workout.It will help you
                track your progress {'\n'}towards your goal.</Text>
            </View>


                  
 <View style={{margin:20}}>
            <TouchableOpacity style={styles.buttonv}
                   //onPress={() => this.on_login()}
                   onPress={() => this.props.navigation.navigate('AllWorkOuts')}
                   >
                     
                   <Text style={styles.text4}>Take a Photo</Text>
                </TouchableOpacity> 
               
                  
                    <TouchableOpacity style={styles.whitebtn}
                      onPress={() => this.props.navigation.navigate('Homep')} 
                    >
                     
                   <Text style={styles.text5}>Back to Home</Text>

             </TouchableOpacity> 
                  
 </View>
   
                     

     
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
       
      
    },
  
    image: {

       
     margin:30,
        resizeMode: "contain",
        alignSelf:'center'
       
       },
       buttonv:{
        backgroundColor:'#1474F0',
      marginBottom:10,
        padding:10
       // width:wp('40%'),
       
       
      
    },
    text4:{
        textAlign:'center',
       color:'#fff' ,
       fontFamily:'K2D-Normal',
       fontSize:12,
    },
    text5:{
        textAlign:'center',
       color:'#1474F0' ,
       fontFamily:'K2D-Normal',
       fontSize:12,

    },
    whitebtn:{
     
        padding:10,
        borderWidth:1,
        borderColor:'#1474F0',
      

    },
       Title:{
        color:'#141821',
      
       textAlign:'center',
        fontFamily:'K2D-SemiBold',
        fontSize:28,
      
       },
       Title1:{
        color:'#141821',
     
       textAlign:'center',
        fontFamily:'K2D-SemiBold',
        fontSize:15
       },
       Title2:{
        color:'#696D76',
       marginTop:10,
       textAlign:'center',
        fontFamily:'K2D-Normal',
        fontSize:12
       },

       Timer:{
        color:'#141821',
       marginTop:10,
       textAlign:'center',
        fontFamily:'K2D-Normal',
        fontSize:29
       },
       text1:{
        color:'#fff',
        textAlign:'center',
        fontFamily:'K2D-Bold',
        fontSize:16
       },
       header:{
           position:'absolute',
           top:0,
           flexDirection:'row'
       }
     

   
})