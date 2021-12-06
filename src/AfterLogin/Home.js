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
import Footer from '../Components/Footer/index'
import { resolvePlugin } from "@babel/core";


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        time: {}, 
        seconds: 60,
        
            isLoading: false,
            dataSource: [],
            name: '',
            dataSource1: [],
            dataSource2: '',
            isPrivate: false,
            isVisible:true,
            loginin:'',
            count:0

        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    

    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }


    startTimer() {
      if (this.timer == 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  
    stopTimer = () => {
      clearInterval(this.timer);
    }

    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      
      // Check if we're at zero.
      if (seconds == 0) { 
        clearInterval(this.timer); 
      }
    }


    Add_donor()

    {
      console.log('addd')
      this.setState({
        isPrivate:true
      })
    }
    

    modelfalse = () => {
   
        this.setState({isPrivate:false})
      
      
            
    
    }

    componentDidMount = async () => {
    
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
        console.log('On home screen');
        this.setState({
            isLoading: true
          })

         const id = await AsyncStorage.getItem('id');
      
      
          const login = await AsyncStorage.getItem('login');
          //console.log("dashboard", login);
      
          let data = JSON.parse(login);
            console.log('#################3',data)
          this.access_token = data;

          const url = ApiScreen.base_url + ApiScreen.GetUser
    console.log("url:" + url);
    fetch(url,
      {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.access_token
          // <-- Specifying the Content-Type

        }),

        body: JSON.stringify(
          {

            user_id: id,
           

          })


      }).then(response => response.json())
      .then((responseJson) => {
        console.log('getting data from fetchaaaaaaaaaaa',responseJson)

       if(responseJson.data.message == "Data found")  
       {
        setTimeout(() => {
       
          this.setState({

            isLoading: false,
            loginin: responseJson.data.user.name,
         

          })
      
        }, 2000)

      }

      else if (responseJson.message == "Unauthorized!"){

              Alert.alert("Session expired")
              this.setState({

                isLoading: false,
         
              })

              AsyncStorage.removeItem('login');
              this.props.navigation.navigate('Auth');
              
      }

      })
      
  
    
      .catch(error => console.log(error))
    
       
   
      
           
      

    }

    goBack = () => {
      this.props.route.params.onGoBack();
      this.props.navigation.goBack();
    }
    
    
    refresh() {
    
    
    this.componentDidMount();
    
    }

   
    onSuccess = e => {
       
        console.log('%%%%%%%%%5',e.data);
        const data = JSON.parse(e.data);
        console.log('#################',data.id);
        const Equp_id = data.id;
        this.props.navigation.navigate('ScannedScreen',{Equp_id:Equp_id})

    //     Linking.openURL(e.data).catch(err =>
    //       console.error('An error occured', err)
 
    //     );
    //     console.log('>>>>>%%%%%%%%%%%',e.data.id);
      
};

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

                <Header
                    navigation={this.props.navigation}
                />

                {/* <View style={styles.header}>
                 <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Image
                            style={{
                            margin: 10,
                            // tintColor: '#f05c54',
                            width: 30,
                            height: 30,
                            }}
                            source={require('../assets/02.png')}
                        />
                 </TouchableOpacity>
                 <View style={{marginLeft:wp('55%'),flexDirection:'row',marginTop:10}}>
                     <Text style={styles.usertext}>Participant:</Text>
                     <Image style={styles.userimg} source={require('../assets/icon.png')}/>
                   
                 </View>
                
            </View> */}

                  <View style={styles.logoblock}>
                   
                 
                           <Image source={require('../../Assets/Logo2.png')} style={styles.logo}>

                           </Image>
                  
                   </View>
                   <View style={{marginTop:10}}>
                         <Text style={{fontFamily:'K2D-Medium',fontSize:28,textAlign:'center'}}> Welcome {this.state.loginin}!</Text>  
                    </View>
                    <View style={styles.BackColor}>
                   
                 
                   <Image source={require('../../Assets/Home.png')} style={styles.homebanner}>

                   </Image>
          
           </View>
            <Text style={{color:'#000',fontFamily:'K2D-Regular',fontSize:12,textAlign:'center',marginBottom:5}}>Now's the time to begin your Axces{'\n'}journey. Select one of the options {'\n'}below.  
            </Text>

          
            <View style={styles.buttoncontainer}>
                   
                   <TouchableOpacity style={styles.buttonv}
                   //onPress={() => this.on_login()}
                   onPress={() => this.props.navigation.navigate('AllWorkOuts',{
                    onGoBack:() => this.refresh()
                   })}
                   >
                     
                   <Text style={styles.text4}>Browse Workouts</Text>
                </TouchableOpacity> 
               
                  
                    <TouchableOpacity style={styles.whitebtn}
                      onPress={() => this.props.navigation.navigate('CreateWorkoutonly',{

                        onGoBack:() => this.refresh()
                      })} 
                    >
                     
                   <Text style={styles.text5}>Create a Workout</Text>

                    </TouchableOpacity> 
                  
               </View>
          {/* <View style={{flexDirection:'row'}}>
               <TouchableOpacity style={styles.whitebtn}
                      onPress={() => this.startTimer()} 
                    >
                     
                   <Text style={styles.text5}>Start</Text>

                    </TouchableOpacity> 
                  

                    <TouchableOpacity style={styles.whitebtn}
                      onPress={() => this.stopTimer()} 
                    >
                     
                   <Text style={styles.text5}>Stop</Text>

                    </TouchableOpacity> 
                    </View>
            <Text style={{textAlign:'center'}}> m: {this.state.time.m} s: {this.state.time.s}</Text> */}

            {this.state.isPrivate == true && (
                // <View> 
                //     <Text style={styles.privateTextStyle}>
                //       {I18n.t('add_poll.private_poll_desc')}
                //     </Text>
                //   <Text></Text>
            
                  <Modal  isVisible={this.state.isVisible}>
                     <View style={{flex:1,backgroundColor:''}}>
                 
                 <TouchableOpacity
                   onPress={() => this.modelfalse()}
                   >
                      <Text style={styles.closemodalStyle}>X</Text>
                   
                   </TouchableOpacity>
                   
             <QRCodeScanner
             showMarker
      //  cameraProps={{ ratio:'1:1'}}
        onRead={this.onSuccess}
      //  flashMode={RNCamera.Constants.FlashMode.torch}
        // topContent={
        //   <Text style={styles.centerText}>
        //     Go to{' '}
        //     <Text style={styles.textBold}>wikipedia.org/w iki/QR_code</Text> on
        //     your computer and scan the QR code.
        //   </Text>
        // }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}
          onPress={() => this.modelfalse()}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        }
      /> 
      
</View>
</Modal>
      )}

                {/* <Footer
                    navigation={this.props.navigation}
                /> */}
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    bottom:{
        flexDirection:'row',
        position:'absolute',
        bottom:0,
        borderTopColor:'#E5E5E5',
        borderTopWidth:1,
        width:wp('100%'),
        height:50
    },
    buttonv:{
        backgroundColor:'#1474F0',
        padding:10,
        width:wp('40%'),
       
       
      
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
        width:wp('40%'),
        padding:10,
        borderWidth:1,
        borderColor:'#1474F0',
        marginLeft:20

    },
    buttoncontainer:{
        flexDirection:'row',
        paddingTop:10,
        //paddingLeft:20,
        alignSelf:'center'
   },
    scan:{
        alignSelf:'center',
        height:30,
       width:30,
       marginTop:5,
       resizeMode:'contain'
    },
    homeicon:{
        alignContent:'flex-start',
       marginRight:wp('30%'),
       height:20,
       width:20,
       resizeMode:'contain',
       marginTop:10,
       marginLeft:15
    },

    loginicon:{
    alignContent:'flex-end',
    marginLeft:wp('29%'),
    height:20,
    width:20,
    resizeMode:'contain',
    marginTop:10,
   
   
    },

    fundlefttext: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#CB3A3F',
        width: wp('45%'),


    },
    fundrighttext: {
        color: '#5F5F5F',
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'right',
        fontSize: 16,
        width: wp('45%'),


    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',

        padding: 10
    },

    logo:{
        resizeMode:'contain',
             height:100,
             width:100,
       justifyContent:'center',
       alignSelf:'center'
    },
    homebanner:{
        //resizeMode:'center',
             height:hp('30%'),
             width:wp('70%'),
       justifyContent:'center',
       alignSelf:'center',
       marginTop:10,
       marginBottom:10
    },
    logoblock:{
        marginTop:20
    },

    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
      },
      textBold: {
        fontWeight: '500',
        color: '#000'
      },
      buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
      },
      buttonTouchable: {
        padding: 16
      }
    
    

   
})