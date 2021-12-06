import {
    View,
    Image,
    ActivityIndicator,
    ImageBackground,
    StyleSheet,Animated,
    Platform,BackHandler,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Linking, SafeAreaView,
    ScrollView, FlatList
} from "react-native";

import React, { Component } from "react";
import LinearGradient from 'react-native-linear-gradient';
import Header from '../Components/Header/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ApiScreen } from '../Api/ApiScreen'
import AsyncStorage from "@react-native-community/async-storage";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Modal from 'react-native-modal';
import moment from "moment";
import Footer from '../Components/Footer/WorkoutFooter'
import DashedLine from 'react-native-dashed-line';



export default class AllWorkOuts extends Component {

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
            progressPercent:0,

        };
      //  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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

    anim = new Animated.Value(0);
    onAnimate = () => {  
      this.anim.addListener(({})=> {  
          this.setState({progressPercent: this.state.progressPercent});  
      });  
      Animated.timing(this.anim,{  
           toValue: 100,  
           duration: 50000,  
           useNativeDriver: false
      }).start();  
  }  

    componentDidMount = async () => {

     
        this.setState({
            isLoading: true
          })
          this.onAnimate();  
          const login = await AsyncStorage.getItem('login');
          //console.log("dashboard", login);
      
          let data = JSON.parse(login);
            console.log('#################3',data)
          this.access_token = data;

          const url = ApiScreen.base_url + ApiScreen.AllWorkouts
    console.log("urlvv:" + url);
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

            "title":"",
            "is_archived":"0",
            "start":"0",
            "length":"10"

          })


      }).then(response => response.json())
      .then((responseJson) => {
       // console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.workouts)

        setTimeout(() => {
          this.setState({

            isLoading: false,
            dataSource: responseJson.data.workouts,
            progressPercent:responseJson.data.workout_progress_percentage

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


// componentWillMount() {

//   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
// }

// componentWillUnmount() {

//   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

// }

// handleBackButtonClick() {

//   this.props.route.params.onGoBack();
//   this.props.navigation.goBack();
//   return true;
// }

goBack = () => {
  this.props.route.params.onGoBack();
  this.props.navigation.goBack();
}


refresh() {


this.componentDidMount();

}


    render() {
    const img = 'http://3.106.36.138';
    //const currentTime = selectedTime || new Date();
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
                   
                   <TouchableOpacity style={styles.button1}
                  onPress={() => this.props.navigation.navigate('AllWorkOuts')}
                  >
                     
                   <Text style={styles.text4}>All workouts</Text>
                </TouchableOpacity> 
               
                  
                    <TouchableOpacity style={styles.whitebtn}
                   onPress={() => this.props.navigation.navigate('Scheduled')}>
                     
                   <Text style={styles.text5}>Scheduled</Text>
                </TouchableOpacity> 

                <TouchableOpacity style={styles.whitebtn}
                   onPress={() => this.props.navigation.navigate('Finished')}>
                     
                   <Text style={styles.text5}>Finished</Text>
                </TouchableOpacity> 
                  
               </View> */}

                    <View style={{}}>
                    <View style={{alignSelf:'center',width:wp('92%')}}>
                        <TouchableOpacity style={{flexDirection:'row',padding:10}}
                              onPress={() => this.props.navigation.navigate('CreateWorkoutonly',{

                                onGoBack:() => this.refresh()
                              })}>
                                <Image style={styles.addIcon} source={require('../../Assets/Add2.png')}/>
                        <Text style={styles.addtext}>Create a Workout</Text>
                        </TouchableOpacity>
                  </View>
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
  
                                          <View style={{width:wp('55%'),marginTop:5,backgroundColor:'#CDCECF'}}>
                                         
                                         
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
    addIcon:{
      
     // resizeMode:'contain',
      height:20,
      width:20,
      //marginTop:2,

    },

    whitebtn:{
        width:wp('25%'),
        paddingBottom:10,
      //  borderBottomWidth:1,
        borderColor:'#1474F0',
        marginLeft:20

    },
    button1:{
        width:wp('25%'),
        paddingBottom:10,
        borderBottomWidth:1,
        borderColor:'#1474F0',
       
    },
    text4:{
        textAlign:'center',
       color:'#1474F0',
       fontFamily:'K2D-Normal',
      
       lineHeight:16
       
    },
    text5:{
        textAlign:'center',
        textAlign:'center',
       color:'#141821',
       fontFamily:'K2D-Normal',
       
       lineHeight:16
      //  color:'#1474F0' 
    },
    addtext:{
        color: '#141821',
        //marginBottom:5,
        fontFamily: 'K2D-Normal',
        fontSize: 14,
        paddingLeft:10,
        //alignSelf:'flex-end',

       },
    image: {

        height:hp('60%'),
        resizeMode: "contain",
       
       
       },
       normaltext:{
           paddingTop:5,
           color:'#696D76',
           fontFamily:'K2D-Normal',
           fontSize:12,
           width:wp('48%')
           
       },
       normaltext1:{
        paddingTop:5,
        color:'#696D76',
        fontFamily:'K2D-Normal',
        fontSize:12,
       // marginLeft:100,
        alignSelf:'flex-end',
        width:wp('50%')
       
        
    },
       inner:{  
      //  width: "100%",  
        height: 5,  
        
        backgroundColor:"#CDCECF", 
      
        
      },  
       equipimg:{
           height:100,
           width:100,
         //  resizeMode:'contain'
         

       },
       deatilcontainer:{
            flexDirection:'row',
            // paddingLeft:20,
             //paddingRight:20,
             
            paddingTop:20
       },
       head:{
        flexDirection:'row',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:20,
        height:hp('8%'),
        borderBottomColor:'#E5E5E5',
        borderBottomWidth:2,
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