import {
    View,
    Image,
    ActivityIndicator,
    ImageBackground,Animated,
    StyleSheet,
    Platform,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Linking, SafeAreaView,
    ScrollView, FlatList
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import React, { Component } from "react";
import Header from '../Components/Header/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ApiScreen } from '../Api/ApiScreen'
import AsyncStorage from "@react-native-community/async-storage";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Modal from 'react-native-modal';
import Footer from '../Components/Footer/WorkoutFooter'
import moment from "moment";


export default class Finished extends Component {

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
       
        console.log('workout')
        this.setState({
            isLoading: true
          })
      
      
      
          const login = await AsyncStorage.getItem('login');
          //console.log("dashboard", login);
      
          let data = JSON.parse(login);
            console.log('#################3',data)
          this.access_token = data;

          const finishlist = ApiScreen.base_url + ApiScreen.FinishWorkoutList
    console.log("finishlist:" + finishlist);
    fetch(finishlist,
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

            title:"",
            is_archived:"0",
            is_finished:"1",
            start:"0",
            length:"10"

          })


      }).then(response => response.json())
      .then((responseJson) => {
        console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.workouts)

        setTimeout(() => {
          this.setState({

            isLoading: false,
            dataSource: responseJson.data.workouts,

          })
        }, 2000)

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

                
                  {/* <View style={styles.head}>
                                    
                  <TouchableOpacity style={styles.whitebtn}
                  onPress={() => this.props.navigation.navigate('AllWorkOuts')}>
                     
                   <Text style={styles.text4}>All workouts</Text>
                </TouchableOpacity> 
               
                  
                    <TouchableOpacity style={styles.whitebtn}
                   onPress={() => this.props.navigation.navigate('Scheduled')}>
                     
                   <Text style={styles.text5}>Scheduled</Text>
                </TouchableOpacity> 

                <TouchableOpacity style={styles.button1}
                   onPress={() => this.props.navigation.navigate('Finished')}>
                     
                   <Text style={styles.text6}>Finished</Text>
                </TouchableOpacity>
               </View> */}



                <View style={{height:hp('85%')}}>
                   
                    {this.state.dataSource ? 
                    
                    <FlatList

                    data={this.state.dataSource}
                    keyExtractor={(item, index) => index}
                    // horizontal={true}
                    
                    renderItem={({ item, index }) => (

                    <View style={{alignSelf:'center',width:wp('85%')}}>
                    
                                    <TouchableOpacity style={styles.deatilcontainer}
                                      onPress={() => this.props.navigation.navigate('WorkoutDetail',{
                                            workId:item.id,
                                            onGoBack:() => this.refresh()
                    
                                      })}
                                    >
                                        <View style={styles.imagebox}>
                                       
                                             <Image 
                                             source={{uri:item.image_original_path}}
                                            // source={require('../../Assets/dummypic.png')}
                                             style={styles.equipimg}></Image> 

                                        </View>

                                         <View style={styles.textbox}>
                                           <Text style={styles.headertext}>{item.title}</Text>

                                           {/* <Text style={styles.normaltext}>{item.description}</Text> */}

                                            <Text style={styles.normaltext}>Schedule:{moment().format(item.schedule_time)} - {moment(item.schedule_date).format( 'DD/MM/YYYY')}</Text>
                                            <Text style={styles.normaltext}>Duration: {item.workout_duration} Mins</Text>
                                            {item.workout_progress_percentage == null ? 
                                            
                                            <View style={{flexDirection:'row',width:wp('100%')}}>
                                            <Text style={styles.normaltext}>Progress: </Text>
                                            <Text style={styles.normaltext1}>0%</Text>
                                            </View>
                                            :
                                            <View style={{flexDirection:'row'}}>
                                            <Text style={styles.normaltext}>Progress: </Text>
                                            <Text style={styles.normaltext1}> {item.workout_progress_percentage}%</Text>
                                            </View>
                                            }

                                           {/* <View style={{width:wp('55%'),marginTop:5,}}>
                                          <DashedLine  dashLength={40} dashThickness={5} dashGap={6} dashColor='#CDCECF'
                                          >
                                          <LinearGradient   colors={['#1474F0','red' ,]} 
                                           style={[  
                                            styles.inner,{width: item.workout_progress_percentage +"%",borderRadius: 50,zIndex:0},  
                                        ]}   
                                          
                                          />
                                          </DashedLine>
                                      </View> */}
  
                                          {/* <View style={{width:wp('55%'),marginTop:5,backgroundColor:'#CDCECF'}}>
                                         
                                         
                                          <LinearGradient   colors={['#1474F0','red' ,]} 
                                           style={[  
                                            styles.inner,{width: item.workout_progress_percentage +"%",borderRadius: 50},  
                                        ]}   
                                          // style={{position:'absolute',bottom:0,left:0,right:0, flexDirection: 'row', height: 10, 
                                          // borderRadius: 50, justifyContent: "center", alignItems: "center", paddingLeft: 15, paddingRight: 15, margin: 10 }} 
                                          />
                                        {/* <Animated.View  

                                          style={[  
                                              styles.inner,{width: item.workout_progress_percentage +"%"},  
                                          ]}  
                                      />   */}
                      {/* </View>  */}


                      <View style={{flexDirection:'row'}}>

<View style={{width:wp('10%'),marginRight:5,height:5,marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>

{(() => {
if (item.workout_progress_percentage -0 <= '0') {
  return (
      <View/>
  )
}

else if (item.workout_progress_percentage -0 >= '20') {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp('10%'),borderRadius: 50},  
     ]}   

/>

  )
}

else {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp(parseInt(item.workout_progress_percentage - 0)),marginRight:2,borderRadius: 50},  
     ]}   

/>
  )
}
})()}

</View>

<View style={{width:wp('10%'),marginRight:5,height:5,marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>

{(() => {
if (item.workout_progress_percentage -20 <= '0') {
  return (
      <View/>
  )
}

else if (item.workout_progress_percentage -20 >= '20') {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp('10%'),borderRadius: 50},  
     ]}   

/>

  )
}

else {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp(parseInt(item.workout_progress_percentage -20)),marginRight:2,borderRadius: 50},  
     ]}   

/>
  )
}
})()}


</View>

<View style={{width:wp('10%'),marginRight:3,height:5,marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>

{(() => {
if (item.workout_progress_percentage -40 <= '0') {
  return (
      <View/>
  )
}

else if (item.workout_progress_percentage -40 >= '20') {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp('10%'),marginRight:2,borderRadius: 50},  
     ]}   

/>

  )
}

else {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp(parseInt(item.workout_progress_percentage -40)),marginRight:2,borderRadius: 50},  
     ]}   

/>
  )
}
})()}



</View>

<View style={{width:wp('10%'),marginRight:3,height:5,marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>


{(() => {
if (item.workout_progress_percentage -60 <= 0) {
  return (
      <View/>
  )
}

else if (item.workout_progress_percentage -60 >= 20) {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp('10%'),marginRight:2,borderRadius: 50},  
     ]}   

/>

  )
}

else {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp(parseInt(item.workout_progress_percentage -60)),marginRight:2,borderRadius: 50},  
     ]}   

/>
  )
}
})()}



</View>



<View style={{width:wp('10%'),marginRight:3,height:5,marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>

{(() => {
if (item.workout_progress_percentage -80 <= '0') {
  return (
      <View/>
  )
}

else if (item.workout_progress_percentage -80 >= '20') {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp('10%'),marginRight:2,borderRadius: 50},  
     ]}   

/>

  )
}

else {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp(parseInt(item.workout_progress_percentage -80)),marginRight:2,borderRadius: 50},  
     ]}   

/>
  )
}
})()}


</View>

      
</View>   


                                         </View> 
                                    </TouchableOpacity>
                    
                         
                    </View>
                    
                      
                    )}
                    
                    />
                    
                    :
                    <View style={{ flex: 1, justifyContent: 'center', }}>

                      <Text style={{alignSelf:'center'}}>No workout available.</Text>
                    </View>
                    
                    }
                   
             
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
                />
                */}

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
        width:wp('25%'),
        paddingBottom:10,
      //  borderBottomWidth:1,
        borderColor:'#1474F0',
        marginRight:20

    },
    button1:{
        width:wp('25%'),
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
        color:'#141821',
        fontFamily:'K2D-Normal',
       
        lineHeight:16
    },
    normaltext:{
      paddingTop:5,
      color:'#696D76',
      fontFamily:'K2D-Normal',
      fontSize:12,
      width:wp('48%'),
    
      
  },
  normaltext1:{
   paddingTop:5,
   color:'#696D76',
   fontFamily:'K2D-Normal',
   fontSize:12,
  // marginLeft:100,
   alignSelf:'flex-end',
   width:wp('50%'),
 

  
   
},
    image: {

        height:hp('60%'),
        resizeMode: "contain",
       
       
       },
    
       equipimg:{
           height:100,
           width:100,
           backgroundColor:'red'

       },
       deatilcontainer:{
        flexDirection:'row',
        // paddingLeft:20,
        // paddingRight:20,
        paddingTop:20
   },

   imagebox:{
    width:wp('30%'),
   

   },
   textbox:{
      
        width:wp('55%'),
       // backgroundColor:'yellow',
        
   },
       headertext:{
        fontFamily:'K2D-Normal',
        fontSize:16,
        color:'#141821',
            

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
    scan:{
        alignSelf:'center',
        height:65,
        width:65,
       
        bottom:30,
        resizeMode:'contain'
    },
    inner:{  
        width: "100%",  
        height: 5,  
        
        backgroundColor:"#CDCECF", 
      
        
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