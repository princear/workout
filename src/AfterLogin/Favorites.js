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
import { ApiScreen } from '../Api/ApiScreen'
import AsyncStorage from "@react-native-community/async-storage";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Modal from 'react-native-modal';
import Footer from '../Components/Footer/index'


export default class Favorites extends Component {

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

        };

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
        this.setState({
            isLoading: true
          })
      
      
      
          const login = await AsyncStorage.getItem('login');
          //console.log("dashboard", login);
      
          let data = JSON.parse(login);
            console.log('#################3',data)
          this.access_token = data;

          const url = ApiScreen.base_url + ApiScreen.ExcerciseList
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

            start: '0',
            length: '10'

          })


      }).then(response => response.json())
      .then((responseJson) => {
        console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.exercises)

        setTimeout(() => {
          this.setState({

            isLoading: false,
            dataSource: responseJson.data.exercises,

          })
        }, 2000)

      })
      .catch(error => console.log(error))



      

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
    const img = 'http://3.106.36.138';

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

<View style={styles.headTop}>
                        <TouchableOpacity style={{width:wp('15%')}}
                          onPress={() =>  this.props.navigation.replace('Excercise')}
                        >
                   <Image
                       style={{
                      // margin: 10,
                       // tintColor: '#f05c54',
                      
                       height:20,
                       width:20
                       }}
                       source={require('../../Assets/back.png')}
                   />
            </TouchableOpacity>
            <View style={{width:wp('60%')}}>
                    <Text style={{justifyContent:'center',alignSelf:'center'}}>Add to Workout</Text>
                    </View>

                    <View style={{width:wp('20%')}}>
                   
                    </View>        
                
                
            </View>
            
                
<View style={styles.head}>
                   
<TouchableOpacity style={styles.whitebtn}
                  onPress={() => this.props.navigation.navigate('AddToWorkout')}>
                     
                   <Text style={styles.text4}>Workouts</Text>
                </TouchableOpacity> 
               
                  
                    <TouchableOpacity style={styles.button1}
                   onPress={() => this.props.navigation.navigate('Favorites')}>
                     
                   <Text style={styles.text5}>Favorites</Text>
                </TouchableOpacity> 

               
                  
               </View>
               <View style={{height:hp('75%')}}>
                   
                    <FlatList

data={this.state.dataSource}
keyExtractor={(item, index) => index}
// horizontal={true}

renderItem={({ item, index }) => (
<View>

<TouchableOpacity style={styles.deatilcontainer}
                  onPress={() => this.props.navigation.navigate('ExcerciseDetail',{
                        EquipId:item.id

                  })}
                >
                    <View style={styles.imagebox}>
                         <Image source={{uri:item.image_original_path}} style={styles.equipimg}></Image> 
                     </View>
                     <View style={styles.textbox}>
                       <Text style={styles.headertext}>{item.title}</Text>
                       <Text style={styles.normaltext}>{item.description}</Text>
                    
                     </View>
                </TouchableOpacity>

              

</View>

  
)}
/>


          
                    </View>
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
    whitebtn:{
        width:wp('45%'),
        paddingBottom:10,
      //  borderBottomWidth:1,
        borderColor:'#1474F0',
       marginRight:20

    },

    whitebtn1:{
        width:wp('25%'),
        paddingBottom:10,
      //  borderBottomWidth:1,
        borderColor:'#1474F0',
       marginLeft:20

    },

    button1:{
        width:wp('45%'),
        paddingBottom:10,
        borderBottomWidth:1,
        borderColor:'#1474F0',
      
    },
    text4:{
      textAlign:'center',
      color:'#141821',
      fontFamily:'K2D-Normal',
      lineHeight:16
    },
    text5:{
      textAlign:'center',
      color:'#1474F0',
      fontFamily:'K2D-Normal',
      lineHeight:16
    },

    text6:{
        textAlign:'center',
        color:'#141821',
        fontFamily:'K2D-Normal',
        lineHeight:16
      },
    image: {

        height:hp('60%'),
        resizeMode: "contain",
       
       
       },
       normaltext:{
           paddingTop:5,
           color:'#696D76',
           fontFamily:'K2D-Normal',
           fontSize:12
           
       },

       equipimg:{
     
           height:100,
           width:100,
       
       },

       deatilcontainer:{
            flexDirection:'row',
            paddingLeft:20,
            paddingRight:20,
            paddingTop:20
       },

       imagebox:{

       },
       textbox:{
          
            width:wp('60%'),
            paddingLeft:20
       },
       headertext:{
        fontFamily:'K2D-Normal',
        fontSize:16,
        color:'#141821',
            

       },
    scan:{
        alignSelf:'center',
        height:65,
        width:65,
       
        bottom:30,
        resizeMode:'contain'
    },
    homeicon:{
        alignContent:'flex-start',
       marginRight:wp('30%'),
       height:20,
       width:20,
       resizeMode:'contain',
       marginTop:10,
       marginLeft:10
    },
    loginicon:{alignContent:'flex-end',
    marginLeft:wp('30%'),
    height:20,
       width:20,
       resizeMode:'contain',
    marginTop:10
},
    fundlefttext: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#CB3A3F',
        width: wp('45%'),


    },
        head:{
        flexDirection:'row',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:20,
        height:60,
        borderBottomColor:'#E5E5E5',
        borderBottomWidth:2,
   },

   headTop:{
    flexDirection:'row',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:20,
    height:60,
    
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
        resizeMode:'cover',
             //height:100,
             //width:100,
       justifyContent:'center',
       alignSelf:'center'
    },
    homebanner:{
        //resizeMode:'center',
             height:hp('30%'),
             width:wp('70%'),
       justifyContent:'center',
       alignSelf:'center',
       marginTop:20,
       marginBottom:20
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