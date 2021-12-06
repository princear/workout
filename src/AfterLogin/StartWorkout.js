import {
    View,
    Image,
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    Platform,Animated,BackHandler,
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
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'




export default class StartWorkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: [],
            name: '',
            dataSource1: [],
            dataSource2: '',
            isPrivate: false,
            isVisible:true,
            loginin:'',
            showtime:false,

        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    
   

    componentDidMount = async () => {

        this.setState({
            isLoading: true
          })
        
       
          setTimeout(() => {
            this.setState({
  
              isLoading: false,
            
           
  
            })
          }, 2000)
 
          

    }
    componentWillMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      
      componentWillUnmount() {
      
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      
      }
      
      handleBackButtonClick() {
      
        this.props.route.params.onGoBack();
        this.props.navigation.goBack();
        return true;
      }
      
      goBack = () => {
        this.props.route.params.onGoBack();
        this.props.navigation.goBack();
      }
      
      
      refresh() {
      
      
      this.componentDidMount();
      this.setState({
          showtime :false
      })
      
      }
      

    showtimer () {

        AsyncStorage.setItem("CurrentExIndex",'');
        AsyncStorage.setItem("Currentrunning",'false');
        this.setState({
            showtime:true
        })
        
    }
   

    render() {
        
      //  const name = this.props.route.params.name;
      const WorkoutID = this.props.route.params.WorkID;
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

               <TouchableOpacity
                onPress={()=> this.showtimer()}
               >

            <ImageBackground  
             source={require('../../Assets/startw.png')} style={styles.image}>

                    <View style={styles.header}>
                        
                        <TouchableOpacity onPress={() => this.goBack()}>
                                <Image
                                    style={{
                                    margin: 10,
                                    marginTop:20,
                                    marginLeft:20
                                    // tintColor: '#f05c54',
                                
                                    }}
                                    source={require('../../Assets/whiteback.png')}
                                />

                        </TouchableOpacity>

               
                
                     </View>   
                     {this.state.showtime == true && (


<View style={{alignSelf:'center'}}>
    <CountdownCircleTimer
                isPlaying
                duration={3}
                colors={[
                ['green', 0.6],
                ['red', 0.4],
                ['white', 0.2],
                ]}
               size={100}
            >
                {({ remainingTime, animatedColor }) => (
                <Animated.Text style={{ color: animatedColor }}>
                {remainingTime}

                {remainingTime == 0 &&
                
                this.props.navigation.navigate('WarmUpWorkout',{
                        
                    WorkID :WorkoutID,
                    onGoBack:() => this.refresh()
                })
                }

                  {/* {remainingTime == '0', () => {
                        Alert.alert('hi');
                 } 


                 }*/}
            </Animated.Text>

                       

                )
                
               
                }
               
    </CountdownCircleTimer>
</View>


)}


                
                <View>
                    <Text style={styles.text1}>Ready for your workout?</Text>
                    <Text style={styles.text2}>Tap anywhere start the warm-up</Text>
                </View>
                           
                    </ImageBackground>
     </TouchableOpacity>

                  


               
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

        height:hp('100%'),
        width:wp('100%'),
        resizeMode:'cover',
       // resizeMode: "center",
        justifyContent:'center',
       
       },
       text2:{
          color:'#fff',
        textAlign:'center',
        fontFamily:'K2D-Normal',
        fontSize:12
       },
       text1:{
        color:'#fff',
        textAlign:'center',
        fontFamily:'K2D-Bold',
        fontSize:16
       },
       header:{
           position:'absolute',
           top:0
       }
     

   
})