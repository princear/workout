import {
    View,
    Image,
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    Platform,Animated,
    Text,
    TextInput,BackHandler,
    Alert,
    TouchableOpacity,
    Linking, SafeAreaView,
    ScrollView, FlatList
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import React, { Component } from "react";
import moment from "moment";
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




export default class ExerciseWorkout extends Component {

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
            currentPlayTitle:'',
            currentPlayTime:'',
            archived:'',
            currentIndex:0,
            currentIndexless:1,
            dataId:'',
            dataa:'Warm-Up',
            left_time:1,
            time: {}, 
            seconds:10,
            ExerciseId:'',
            orignal_duration:'',
            progressPercent:'0',
            Exerimage:'',
            selectedItem: null,
            workoutLeftTime:'',
            currentworkoutid:'',
            workoutSpendTime:'',
            workoutactualTime:'',
            currentpercentage:'',
            newtimer :'',
            playbutton:'',
            progressPercent1:0,
            progressPercent2:0,
            progressPercent3:0,
            progressPercent4:0
 
        };

        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.Send_Excercise = this.Send_Excercise.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
     //  this.next_Excercise = this.next_Excercise.bind(this);
       //this.prev_Excercise = this.prev_Excercise.bind(this);
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
    //this.stopTimer();
    AsyncStorage.setItem("Currentrunning",this.state.running.toString());
    AsyncStorage.setItem("WorkTime",this.state.seconds.toString());
    
      this.props.route.params.onGoBack();
      this.props.navigation.goBack();
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
          "S": seconds 
        };
        return obj; 
      } 
  
      startTimer() {

     
  
        if (this.timer == 0 || this.state.seconds > 0) {
        
          console.log('>>>>>>>>>>>>>',this.timer)
        
          this.timer = setInterval(this.countDown, 1000);
  
          this.setState({
            running:true
          })
        }

      //   const newrun = 'true';
      // const  running =  AsyncStorage.setItem("Currentrunning",newrun.toString());
      
        console.log('>>>>>>>>>>>>>startttttttttttttttt',this.timer,);
  
      }
    
  
    
      stopTimer = async () => {

     
        clearInterval(this.timer);
        this.setState({
          running:false
        })

       // const newrun = false;
        //const  running =  AsyncStorage.setItem("Currentrunning",newrun.toString());
      
        console.log('>>>>>>>>>>>>>startttttttttttttttt',this.timer,this.state.running);
     //   AsyncStorage.setItem('CurrentExIndex','');
        //  AsyncStorage.setItem('ExTitle',this.state.dataa);
        //  AsyncStorage.setItem('ExTimer',this.state.seconds);
        console.log('stop>>>>>>>>>>>>>>>>>',this.state.ExerciseId,this.state.seconds,this.state.dataa)
        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);
  
        let data = JSON.parse(login);
       // console.log('#################3', data)
        this.access_token = data;
  
        if(this.state.seconds == 0 )
  
        {
          console.log('Doneeeeeee');
          
          const DoneExcercise = ApiScreen.base_url + ApiScreen.updateExerciseStatus
          console.log("DoneExcercise>>:" + DoneExcercise);
          fetch(DoneExcercise,
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
    
                        id:this.state.ExerciseId,
                        left_duration:this.state.seconds,
                        actual_duration:this.state.orignal_duration,
                        status:"Done",
    
                      })
    
    
              }).then(response => response.json())
              .then((responseJson) => {
              //   console.log('Equipment detailaa', responseJson.data)
    
                  setTimeout(() => {
                      this.setState({ isLoading: false})
                  }, 2000)
                //  this.componentDidMount()
    
              })
              .catch(error => console.log(error))
    
  
        }
  
        else{
   
          console.log('PAuseddddddd',this.state.ExerciseId,this.state.seconds,this.state.dataa);
      
  
        const PauseExcercise = ApiScreen.base_url + ApiScreen.updateExerciseStatus
        console.log("PauseExcercise>>:" + PauseExcercise);
        fetch(PauseExcercise,
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
  
                      id:this.state.ExerciseId,
                      left_duration:this.state.seconds,
                      actual_duration:this.state.orignal_duration,
                      status:"Paused",
  
                    })
  
  
            }).then(response => response.json())
            .then((responseJson) => {
             //  console.log('Equipment detailaa', responseJson.data)
  
                setTimeout(() => {
                    this.setState({ isLoading: false})
                    
                }, 2000)
                
              // this.componentDidMount()
            })
            .catch(error => console.log(error))
          }
      }
  
  
  
      countDown() {
        // Remove one second, set state so a re-render happens.

        let seconds = this.state.seconds - 1;
      //  console.log('??????????????',seconds)
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
          workoutLeftTime : this.state.workoutLeftTime - 1,
        workoutSpendTime:  parseInt(this.state.workoutSpendTime) + 1,
        workoutactualTime:this.state.workoutactualTime,

        progressPercent : parseInt(this.state.workoutSpendTime * 100)/ parseInt(this.state.workoutactualTime),
        });

       // console.log('>>>>>>>>>>>>>>>>>>>',this.state.workoutLeftTime)

        if (this.state.workoutLeftTime == 0) { 
          console.log(this.state.currentworkoutid)
   
          const finishedWorkout = ApiScreen.base_url + ApiScreen.FinishWorkout;
          console.log("finishedWorkout>>:" + finishedWorkout);
          fetch(finishedWorkout,
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
    
                        id:this.state.currentworkoutid,
                       
    
                      })
    
    
              }).then(response => response.json())
              .then((responseJson) => {
               
               console.log('Finished workour=t',responseJson.data);
                  setTimeout(() => {
                      this.setState({ isLoading: false})
                    //  this.props.navigation.navigate('CongratsScreen');
                    this.props.navigation.navigate('WorkoutDetail',{
                      workId:this.props.route.params.WorkID
                     });
   
                  }, 2000)
    
              })
   
              .catch(error => console.log(error))
   
   
           
   
         //Alert.alert('Workout Done')
           this.setState({
             running:false,
          
           })
   
           this.componentDidMount()
         }
        
        // Check if we're at zero.
        if (seconds == 0) { 
          clearInterval(this.timer);
          this.setState({
              running:false
          })
          this.stopTimer()
          this.componentDidMount()
        }
      }
  
      anim = new Animated.Value(0);
      onAnimate = () =>{  
        this.anim.addListener(({})=> {  
            this.setState({progressPercent: this.state.progressPercent});  
        });  
        Animated.timing(this.anim,{  
             toValue: 100,  
             duration: 50000,  
        }).start();  
    }  

    componentDidMount = async () => {

     
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({
           time: timeLeftVar,
          seconds :this.state.seconds,
         
          });
  
        const Id = this.props.route.params.WorkID;
        const WorkTitle = this.props.route.params.WorkTitle;
        const WorkTime = this.props.route.params.workTime;
        const ExerciseId = this.props.route.params.ExerciseId;
        const indexvalue = this.props.route.params.indexvalue;
       
        const Exerimage = this.props.route.params.Exerimage;
        const running = this.props.route.params.running;
        const orignal_duration = this.props.route.params.orignal_duration;


        

        console.log('Workid%%%%%%%%%%%%%%%%%%%%%%%%:'+ExerciseId,indexvalue,running,WorkTime) 



        this.Send_Excercise(ExerciseId,WorkTitle,WorkTime,orignal_duration,Exerimage)
       
        

     

        AsyncStorage.setItem("CurrentExIndex",indexvalue.toString());
        AsyncStorage.setItem("Currentrunning",running.toString());
        AsyncStorage.setItem("WorkTime",WorkTime.toString());
        

    
        this.setState({
            isLoading: true,
            running:running
        })
        //this.onAnimate();
 
        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login); 

        let data = JSON.parse(login);
      //  console.log('#################3', data)
        this.access_token = data;

        const WorkoutDetail = ApiScreen.base_url + ApiScreen.WorkoutDetail
      //  console.log("url:" + WorkoutDetail);
        fetch(WorkoutDetail,
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

                        id: Id,


                    })


            }).then(response => response.json())
            .then((responseJson) => {
               // console.log('Equipment detailaa', responseJson.data.workout)

                setTimeout(() => {
                    this.setState({

                        isLoading: false,
                        // dataSource: responseJson.data.equipment,
                        currentworkoutid: responseJson.data.workout.id,
                        Title: responseJson.data.workout.title,
                        image: responseJson.data.workout.image_original_path,
                        description: responseJson.data.workout.description,
                        Stime: responseJson.data.workout.schedule_time,
                        SDate: responseJson.data.workout.schedule_date,
                        duration: responseJson.data.workout.workout_duration,
                        archived:responseJson.data.workout.is_archived,
                        progressPercent:responseJson.data.workout.workout_progress_percentage,
                        workoutLeftTime:responseJson.data.workout.workout_left_duration,
                        workoutSpendTime:responseJson.data.workout.workout_spend_duration,
                        workoutactualTime:responseJson.data.workout.workout_actual_duration,
                    
                      
                        
                    })
                }, 2000)

            })
            .catch(error => console.log(error))




          const url1 = ApiScreen.base_url + ApiScreen.GetWorkoutexercise
         // console.log("url1:" + url1);
          fetch(url1,
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

                  id: Id,


                })


            }).then(response => response.json())
            .then((responseJson) => {
             // console.log('Excercise>>>>>>>>>>>>>>>>>>>>>>>>>>',responseJson.data.exercises)

              setTimeout(() => {

                  
                this.setState({

                    isLoading: false,
                  dataSource: responseJson.data.exercises,
                  //  selectedItem:  ExerciseId,
                  //  dataa:WorkTitle,
                  //  seconds: WorkTime
                //   Title:responseJson.data.equipment.title,
                //   image:responseJson.data.equipment.image_original_path,
                //   description:responseJson.data.equipment.description

                })


                if(this.state.running == true){

                  this.startTimer();
                }

               else{
                   this.stopTimer();
               }

              }, 2000)

            })
            .catch(error => console.log(error));

           // this.startTimer()

    }
 
    Send_Excercise = async (id,title,Ctime,orignaltime,image) => {

      
     
      console.log(id,title,Ctime,orignaltime,image)
    const  dataa1 = this.state.dataSource;
      const index = dataa1.findIndex(x => x.title === title);
    //  console.log('Indexxxxxxxxxx',index,Ctime);
     

      AsyncStorage.setItem("CurrentExIndex",index.toString());
     // AsyncStorage.setItem("playbutton",playbutton.toString());

      console.log(title,id);
      let timeLeftVar = this.secondsToTime(Ctime);
     
      
      
        this.setState({
        
           // currentPlayTitle : title,
            seconds:Ctime,
            dataa:title,
            time: timeLeftVar,
            ExerciseId:id,
            orignal_duration:orignaltime,
            Exerimage:image,
            selectedItem:id
        
        })

        // var data = this.state.dataSource;
        // const index = data.findIndex(x => x.title === title);


     // console.log('&&&&&&&&&&&&&&&&7', this.state.seconds,this.state.dataa,this.state.currentPlayTitle);

    }




    render() {
      const zero = parseInt(this.state.progressPercent) - 0;
      const one = parseInt(this.state.progressPercent) -20;
      const two = parseInt(this.state.progressPercent) -40;
      const three = parseInt(this.state.progressPercent) -60;
      const four = parseInt(this.state.progressPercent) -80;

    //   if(this.state.isLoading == true)
    //   return(
    //     <View style={{ flex: 1, justifyContent: 'center', position: 'absolute', top: '50%', left: '40%' }}>

    //     <ActivityIndicator
    //         size="large"
    //         style={{
    //             backgroundColor: "rgba(20,116,240,.8)",
    //             height: 80,
    //             width: 80,
    //             zIndex: 999,
    //             borderRadius: 15
    //         }}
    //         size="small"
    //         color="#ffffff"
    //     />

    // </View>
    //   )
        
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

                    <View style={{alignItems:'center',marginTop:10,borderBottomColor:'#CDCECF',borderBottomWidth:3,marginBottom:10}}>
                    <View style={{flexDirection:'row',}}>
                        <View style={{width:hp('35%'),}}>
                             <Text style={styles.Title}>{this.state.Title}</Text>
                         </View>
                         <View style={{width:hp('14%')}}>   
                          <TouchableOpacity
                          onPress={() => this.goBack()}
                          >   
                                <Image
                                style={{
                                 height:20,
                                 width:20,
                                 marginTop:5,   
                               // alignContent:'flex-end',
                                resizeMode:'cover',
                                alignSelf:'flex-end'
                             
                                
                                }}
                                source={require('../../Assets/cross.png')}
                            />

                   </TouchableOpacity>
                   </View>
                    </View>
                      
                    <View style={{flexDirection:'row',marginTop:10}}> 
                       <Text style={styles.Title1}>Progress</Text>
                       <Text style={styles.PercentText}>{parseInt(this.state.progressPercent)}%</Text>
                     </View>
                     {/* <View style={{width:wp('90%'),marginTop:5,marginBottom:5,backgroundColor:'#CDCECF',borderRadius:50}}>
                     <LinearGradient   colors={['#1474F0','red' ,]} 
                                           style={[  
                                            styles.inner,{width: parseInt(this.state.progressPercent) +"%",borderRadius: 50},  
                                        ]}   
                       />

                          {/* <Animated.View  
                              style={[  
                                  styles.inner,{width: parseInt(this.state.progressPercent)  +"%"},  
                              ]}  
                          />   */}
                          
                      {/* </View>  */}

                      <View style={{flexDirection:'row',paddingBottom:15}}>

<View style={{width:wp('17%'),marginRight:5,height:5,marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>

{(() => {
if (zero <= '0') {
  return (
      <View/>
  )
}

else if (zero >= '20') {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp('17%'),borderRadius: 50},  
     ]}   

/>

  )
}

else {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp(parseInt(zero)),marginRight:2,borderRadius: 50},  
     ]}   

/>
  )
}
})()}

</View>

<View style={{width:wp('17%'),marginRight:5,height:5,marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>

{(() => {
if (one <= '0') {
  return (
      <View/>
  )
}

else if (one >= '20') {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp('17%'),borderRadius: 50},  
     ]}   

/>

  )
}

else {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp(parseInt(one)),marginRight:2,borderRadius: 50},  
     ]}   

/>
  )
}
})()}


</View>

<View style={{width:wp('17%'),marginRight:3,height:5,marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>

{(() => {
if (two <= '0') {
  return (
      <View/>
  )
}

else if (two >= '20') {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp('17%'),marginRight:2,borderRadius: 50},  
     ]}   

/>

  )
}

else {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp(parseInt(two)),marginRight:2,borderRadius: 50},  
     ]}   

/>
  )
}
})()}



</View>

<View style={{width:wp('17%'),marginRight:3,height:5,marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>


{(() => {
if (three <= 0) {
  return (
      <View/>
  )
}

else if (three >= 20) {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp('17%'),marginRight:2,borderRadius: 50},  
     ]}   

/>

  )
}

else {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp(parseInt(three)),marginRight:2,borderRadius: 50},  
     ]}   

/>
  )
}
})()}



</View>



<View style={{width:wp('17%'),marginRight:3,height:5,marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>

{(() => {
if (four <= '0') {
  return (
      <View/>
  )
}

else if (four >= '20') {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp('17%'),marginRight:2,borderRadius: 50},  
     ]}   

/>

  )
}

else {
  return (
    <LinearGradient   colors={['#1474F0','red' ,]} 
    style={[  
     styles.inner,{width: wp(parseInt(four)),marginRight:2,borderRadius: 50},  
     ]}   

/>
  )
}
})()}


</View>

      
</View>   

                </View> 

                {this.state.Exerimage == '' ?
                
                <Image 
                source={require('../../Assets/warm.png')} style={styles.image1}>
   
               </Image>
                :
                
                <Image 
                source={{uri:this.state.Exerimage}} style={styles.image}>
   
               </Image>
                }

          


                    <View style={{flexDirection:'row'}}>
                        <View style={{width:wp('50%'),paddingLeft:20}}>
                       {/* <Text style={styles.Title}>{this.state.currentPlayTitle}</Text> */}
                    <Text style={styles.Title}>{this.state.dataa}</Text> 
                       <Text style={styles.Title1}>No Equipments</Text>
                       {/* {this.state.running == true ?
                        
                        <Text style={styles.Title}>True</Text>
                        :
                        <Text style={styles.Title}>false</Text>
                        
                        } */}
                       </View>
                       <View style={{justifyContent:'flex-end',flexDirection:'row',width:wp('45%')}}>

                       <View>
                  
                           <Text style={styles.Timer}>{this.state.time.m}: {this.state.time.S}</Text> 
                         </View>
                            
                             <View>  
                             {this.state.running == false ?
                                <TouchableOpacity
                                 onPress={() => this.startTimer()}
                                >
                                  <Image
                       style={{
                   
                      
                      alignSelf:'center',    
                      height:12,
                      width:12,
                      marginTop:4,
                      marginLeft:10 
                       }}
                       source={require('../../Assets/Play.png')}
                   />
                   </TouchableOpacity>
                   :

                   <TouchableOpacity
                   onPress={() => this.stopTimer()}
                  >
                    <Image
         style={{
     
        
        alignSelf:'center'  ,    
        height:12,
        width:12,
        marginTop:4,
        marginLeft:10 
         }}
         source={require('../../Assets/stop.png')}
     />
     </TouchableOpacity>
                    }
                    </View>
                       </View>
                       </View>

  <View style={{marginLeft:20,paddingTop:10}}>
  <Text style={styles.Title3}>Next exercises</Text>
  </View>

  <FlatList

data={this.state.dataSource}
keyExtractor={(item, index) => index}
// horizontal={true}

renderItem={({ item, index }) => (
<View>

{this.state.selectedItem === item.id
?

<TouchableOpacity style={styles.selectcontainer}
onPress={() => {this.Send_Excercise(item.id,item.title,item.left_duration,item.actual_duration,item.image_original_path)}}
>
   <View style={styles.imagebox}>
        <Image source={{uri:item.image_thumb_path}} style={styles.equipimg}></Image> 
    </View>
    <View style={styles.textbox}>
      <Text style={styles.headertext}>{item.title}</Text>
     
    
      <Text style={styles.normaltext}>{parseInt(item.left_duration / 60)}</Text>
     
   
    </View>

   
   
</TouchableOpacity>
:
<TouchableOpacity style={styles.deatilcontainer}
onPress={() => {this.Send_Excercise(item.id,item.title,item.left_duration,item.actual_duration,item.image_original_path)}}
>
   <View style={styles.imagebox}>
        <Image source={{uri:item.image_thumb_path}} style={styles.equipimg}></Image> 
    </View>
    <View style={styles.textbox}>
      <Text style={styles.headertext}>{item.title}</Text>
    
    
      <Text style={styles.normaltext}>{parseInt(item.left_duration / 60)}</Text>
     
   
    </View>

   
   
</TouchableOpacity>

}
             



               {item.rest_time > '0' ?
                      
                      <View style={styles.deatilcontainer}>
                           <View style={styles.imagebox1}>
                           <Image style={{alignSelf:'center'}} source={require('../../Assets/timeblue.png')}></Image>
                    </View>
                    <View style={{paddingLeft:20}}>
                          <Text style={styles.headertext}>Rest Time</Text>
                          <Text  style={styles.headertext}>{item.rest_time}</Text>
                    </View>  
                          </View>
                      :
                      <View/>
                      }
             

             

</View>

 
)}
/>
               
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

          height:hp('50%'),
        width:wp('100%'),
        marginTop:5,
      marginBottom:10,
        resizeMode:'contain',
       // resizeMode: "contain",
        //justifyContent:'center',
       
       },

       image1: {

        height:hp('55%'),
      width:wp('100%'),
      marginTop:5,
   
      resizeMode:'contain',
    
     
     },
       imagebox1:{
           width:50,
          alignContent:'center',
          alignItems:'center'
       },
       PercentText:{
      
        width:wp('40%'),
        textAlign:'right',
        color:'#CDCECF',
       
        fontFamily:'K2D-Normal',
        fontSize:12
       },
       Title:{
        color:'#141821',
      
        fontFamily:'K2D-Normal',
        fontSize:16
       },
      
       Title1:{
        color:'#CDCECF',
        width:wp('50%'),
        fontFamily:'K2D-Normal',
        fontSize:10
       },
       Title2:{
        color:'#696D76',
       marginTop:30,
       textAlign:'center',
        fontFamily:'K2D-Normal',
        fontSize:14
       },
       Title3:{
        color:'#141821',
       paddingBottom:10,
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
           top:0,
           flexDirection:'row'
       },

       deatilcontainer:{
        flexDirection:'row',
        padding:20,
      
   },

   selectcontainer:{
    flexDirection:'row',
    padding:20,
    backgroundColor:'#CDCECF'
  
},


   equipimg:{
    height:50,
    width:50,
 

},
textbox:{
          
    width:wp('60%'),
    paddingLeft:20
},
headertext:{
fontFamily:'K2D-Normal',
fontSize:12,
color:'#696D76',
    

},
normaltext:{
    paddingTop:5,
    color:'#696D76',
    fontFamily:'K2D-Normal',
    fontSize:12
    
},
searchIcon:{
         height:10,
         width:10,
  //  resizeMode:'contain'
 
   },
   inner:{  
    width: "100%",  
    height: 5,  
    
    backgroundColor:"#CDCECF", 
  
    
  },  
  Timer:{
    color:'#1474F0'
  }

   
})