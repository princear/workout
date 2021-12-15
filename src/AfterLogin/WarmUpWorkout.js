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

import React, { Component } from "react";
import LinearGradient from 'react-native-linear-gradient';
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




export default class WarmUpWorkout extends Component {

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
            currentIndex:-1,
            currentIndexless:1,
            dataId:'',
            Exerimage:'',
            dataa:'Warm-up',
            left_time:1,
            time: {}, 
            seconds: 10,
            ExerciseId:'',
            orignal_duration:'',
            progressPercent:0,
            progressStatus: 0,  
            workoutLeftTime:'',
            currentworkoutid:'',
            workoutSpendTime:'',
            workoutactualTime:'',
            currentpercentage:'',
            ItemIndex:0 ,
            indexvalue:'',
            playbutton:false,
            progressPercent1:0,
            progressPercent2:0,
            progressPercent3:0,
            progressPercent4:0


            
        };
        
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
       this.next_Excercise = this.next_Excercise.bind(this);
       this.prev_Excercise = this.prev_Excercise.bind(this);

       this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
   

    componentWillMount() {

      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
     
  }

 

  handleBackButtonClick() {
  
      // this.props.route.params.onGoBack();
      // this.props.navigation.goBack();
      return  true;
  }

  goBack = () => {
    
      this.props.route.params.onGoBack();
      this.props.navigation.goBack();
  }

  refresh() {


    this.componentDidMount();
    
    }

   
    startrunning ()
    {
        if(this.state.running == false){
            this.setState({
                running:true
            })
        }

        else{
            this.setState({
                running:false
            })

        }
       
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
    
     // console.log('>>>>>>>>>>>>>',this.timer)

      if (this.timer == 0 || this.state.seconds > 0) {
      
      //  console.log('>>>>>>>>>>>>>',this.timer)
      
        this.timer = setInterval(this.countDown, 1000);

        this.setState({
          running:true,
         // playbutton:false
        })
      }


    
    }
  

  
    stopTimer = async () => {
      clearInterval(this.timer);
    
      this.setState({
        running:false,
      //  playbutton:true
      
      })

   
      console.log('stop>>>>>>>>>>>>>>>>>',this.state.ExerciseId,this.state.seconds,this.state.dataa)

     // console.log('stop>>>>>>>>>>>>>>>>>',this.state.workoutLeftTime)
      const login = await AsyncStorage.getItem('login');
      //console.log("dashboard", login);

      let data = JSON.parse(login);
     // console.log('#################3', data)
      this.access_token = data;

      if(this.state.seconds == '0' && this.state.dataa == 'Warm-up')
      {

    //  this.stopTimer();
        
      console.log('?????????????????',this.state.currentIndex);
          const Id = this.props.route.params.WorkID;
          console.log('Workid:'+Id) 
  
          const Next = ApiScreen.base_url + ApiScreen.GetWorkoutexercise
          console.log("Next:" + Next);
          fetch(Next,
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
          
            
              
               var index = 0;
     
              this.setState({
           
                 // dataSource: responseJson.data.exercises,
                 currentIndex : 0,
                dataa:responseJson.data.exercises[index].title, 
                ExerciseId:responseJson.data.exercises[index].id,
                seconds:responseJson.data.exercises[index].left_duration ,
                orignal_duration:responseJson.data.exercises[index].actual_duration,
                Exerimage:responseJson.data.exercises[index].image_original_path,
                ItemIndex:index
              })
           
            //  AsyncStorage.setItem("CurrentExIndex",this.state.ExerciseId.toString());
             
              console.log('&&&&&&&&&&&&&&&&7--->>>>>>>>>>>---------',this.state.Exerimage,this.state.dataa,this.state.ItemIndex,index,this.state.seconds,this.state.ExerciseId,this.state.orignal_duration); 
    
            let timeLeftVar = this.secondsToTime(this.state.seconds);
            this.setState({ time: timeLeftVar });
               // this.startTimer();
  
            })
            .catch(error => console.log(error))
         

          }

      else if(this.state.seconds == 0 )

    

      {

        
       
        const DoneExcercise = ApiScreen.base_url + ApiScreen.updateExerciseStatus
       // console.log("DoneExcercise>>:" + DoneExcercise);
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
             //  console.log('Equipment detailaa', responseJson.data)
  
                setTimeout(() => {
                    this.setState({ isLoading: false})
                }, 2000)

                this.componentDidMount()
              //this.next_Excercise();
    
            })
            .catch(error => console.log(error))
  
      }

      else{

        console.log('PAuseddddddd');
        console.log('PAuseddddddd>>>>>>>>>>>>>>>>>',this.state.ExerciseId,this.state.seconds,this.state.dataa)

      const PauseExcercise = ApiScreen.base_url + ApiScreen.updateExerciseStatus
     // console.log("PauseExcercise>>:" + PauseExcercise);
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
             console.log('Equipment detailaa', responseJson.data)

              setTimeout(() => {
                  this.setState({
                     isLoading: false,
                    // playbutton:true
                    })
              }, 2000)
             // this.componentDidMount()

          })
          .catch(error => console.log(error))
        }
        
    }



    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
    //  let workoutLeftTime = this.state.workoutLeftTime -1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
        workoutLeftTime : this.state.workoutLeftTime - 1,
        workoutSpendTime:  parseInt(this.state.workoutSpendTime) + 1,
        workoutactualTime:this.state.workoutactualTime,

        progressPercent : parseInt(this.state.workoutSpendTime * 100)/ parseInt(this.state.workoutactualTime),
        
       
        


       

      
      });
      
    
      // Check if we're at zero.


     
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

      if (seconds == 0) { 
        clearInterval(this.timer); 
        this.setState({
          running:false,
       
        })
        this.stopTimer()
        this.componentDidMount()
      }
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
 //  const running =  await AsyncStorage.getItem('Currentrunning'); 

      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar,
     //  running: await AsyncStorage.getItem('Currentrunning')
     
    
      });
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%',this.state.running)
     
     // console.log('onloadscreen',this.state.currentIndex);
      //  this.next_Excercise()
        const Id = this.props.route.params.WorkID;
          // console.log('Workid:'+Id) 

        this.setState({
            isLoading: true,
           
        })

        this.onAnimate();  


        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);

        let data = JSON.parse(login);
       // console.log('#################3', data)
        this.access_token = data;


        const WorkoutDetail = ApiScreen.base_url + ApiScreen.WorkoutDetail
       // console.log("url>>:" + WorkoutDetail);
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
                       // running:this.state.running,
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

                        // progressPercent1 : parseInt(this.state.progressPercent) - parseInt(20),
                        // progressPercent2 : parseInt(this.state.progressPercent) - 40,
                        // progressPercent3 : parseInt(this.state.progressPercent) - 60,
                        // progressPercent4 : parseInt(this.state.progressPercent) - 80,


                    })
                }, 2000)

            })
            .catch(error => console.log(error))
            console.log('>>>>>>>>>>>>>>>>>>>',this.state.progressPercent,this.state.progressPercent1)



          const url2 = ApiScreen.base_url + ApiScreen.GetWorkoutexercise
          console.log("url2:" + url2);
          fetch(url2,
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
           //   console.log('Excercise>>>>>>>>>>>>>>>>>>>>>>>>>>',responseJson.data.exercises[0])

              setTimeout(() => {

                this.setState({
                  
                  isLoading: false,
                  dataSource: responseJson.data.exercises,
                
             

              
                })

            

              }, 2000)


           

            })
            .catch(error => console.log(error))


            const index = await AsyncStorage.getItem('CurrentExIndex');
            const running =  await AsyncStorage.getItem('Currentrunning'); 
           // const running = JSON.stringify(running1);

            const WorkTime = await AsyncStorage.getItem('WorkTime');
          
         //   this.state.playbutton = await AsyncStorage.getItem('playbutton');

            console.log('Running ex',index,running,WorkTime);
        
            const Next = ApiScreen.base_url + ApiScreen.GetWorkoutexercise
           // console.log("Next:" + Next);
            fetch(Next,
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
              
              
                this.setState({
                    running:running,
                    currentIndex : (this.state.currentIndex + 1),
                  
                    dataSource: responseJson.data.exercises,
              //     currentIndex : this.state.currentIndex + 1 % dataa1.length,
                  dataa:responseJson.data.exercises[index].title, 
                  ExerciseId:responseJson.data.exercises[index].id,
                  seconds:WorkTime ,
                  orignal_duration:responseJson.data.exercises[index].actual_duration,
                  Exerimage:responseJson.data.exercises[index].image_original_path,
                  ItemIndex:index
                })

               
                console.log('??????????????????',this.state.running);

               if(this.state.running == 'true')
               {
                 console.log('Trueeeeeeeeeeeeeeeeeeeeeee')
                 this.startTimer();

               }
               else{
                    console.log('falsesssssssssssssssssss')
                    this.stopTimer();
               }


               // this.startTimer();
             
              //  if(this.state.playbutton == this.state.playbutton)
              //  {
                 
              //           this.startTimer();
              //  }

              //  else{

              //         this.stopTimer();
              //  }

             
                console.log('&&&&&&&&&&&&&&&&7--->>>>>>>>>>>---------',this.state.Exerimage,this.state.ItemIndex,index,this.state.seconds,this.state.ExerciseId,this.state.orignal_duration); 
      
              let timeLeftVar = this.secondsToTime(this.state.seconds);
              this.setState({ time: timeLeftVar });
           
    
              })
              .catch(error => console.log(error))
    
    }


  
 
 
    next_Excercise = async () =>  {

      this.stopTimer();
        
    console.log('?????????????????',this.state.currentIndex);
        const Id = this.props.route.params.WorkID;
        console.log('Workid:'+Id) 

     const login = await AsyncStorage.getItem('login');
     //console.log("dashboard", login);

     let data = JSON.parse(login);
   //  console.log('#################3', data)
     this.access_token = data;

        const Next = ApiScreen.base_url + ApiScreen.GetWorkoutexercise
        console.log("Next:" + Next);
        fetch(Next,
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
        
            const dataa1 = responseJson.data.exercises;
            
            // var email = 'Exercise Ten'
            // console.log('XXXXXXXXXXXXXXXXxx',dataa1);
            // console.log(dataa1[0].title.indexOf(email));

            
            
            this.setState({
              currentIndex:this.state.currentIndex + 1
            })

    
          var email = responseJson.data.exercises[this.state.currentIndex].title;
         // console.log('XXXXXXXXXXXXXXXXxx',dataa1);
       //   console.log(dataa1[0].title.indexOf(email));
          const index = dataa1.findIndex(x => x.title === email);
        console.log(index)
            this.setState({
                
                indexvalue : index,
              
                dataSource: responseJson.data.exercises,
          //     currentIndex : this.state.currentIndex + 1 % dataa1.length,
              dataa:responseJson.data.exercises[index].title, 
              ExerciseId:responseJson.data.exercises[index].id,
              seconds:responseJson.data.exercises[index].left_duration ,
              orignal_duration:responseJson.data.exercises[index].actual_duration,
              Exerimage:responseJson.data.exercises[index].image_original_path,
              ItemIndex:index
            })
         
            AsyncStorage.setItem("CurrentExIndex",this.state.ExerciseId.toString());
           
            console.log('&&&&&&&&&&&&&&&&7--->>>>>>>>>>>---------',this.state.Exerimage,this.state.dataa,this.state.ItemIndex,index,this.state.seconds,this.state.ExerciseId,this.state.orignal_duration); 
           
          let timeLeftVar = this.secondsToTime(this.state.seconds);
          this.setState({ time: timeLeftVar });
             // this.startTimer();

          })
          
          .catch(error => console.log(error))
       
    }

    prev_Excercise = async () => {
      
      this.stopTimer();
      const Id = this.props.route.params.WorkID;
      console.log('Workid:'+Id) 

     const login = await AsyncStorage.getItem('login');
     //console.log("dashboard", login);

     let data = JSON.parse(login);
   //  console.log('#################3', data)
     this.access_token = data;

        const prev = ApiScreen.base_url + ApiScreen.GetWorkoutexercise
        console.log("prev:" + prev);
        fetch(prev,
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

           
          
            const dataa1 = responseJson.data.exercises;

            this.setState({
              currentIndex : (this.state.currentIndex - 1) % dataa1.length,
            })
            console.log('backkkkkkkkkkkkkkkkk',this.state.currentIndex,responseJson.data.exercises[this.state.currentIndex].title);
            var email = responseJson.data.exercises[this.state.currentIndex].title;
            // console.log('XXXXXXXXXXXXXXXXxx',dataa1);
          //   console.log(dataa1[0].title.indexOf(email));
             const index = dataa1.findIndex(x => x.title === email);
             console.log(index)
          
            this.setState({

              // currentIndex : (this.state.currentIndex - 1) % dataa1.length,
              dataa:responseJson.data.exercises[index].title,
              ExerciseId:responseJson.data.exercises[index].id,
              seconds:responseJson.data.exercises[index].left_duration, 
              orignal_duration:responseJson.data.exercises[index].actual_duration ,
              Exerimage:responseJson.data.exercises[index].image_original_path,
              ItemIndex:index

            })

            AsyncStorage.setItem("CurrentExIndex",this.state.ExerciseId.toString());
           
         
          console.log('RRRRRRRRRRRRRR--->>>>>>>>>>>---------' ,this.state.ItemIndex,index,this.state.dataa,this.state.seconds,this.state.ExerciseId,this.state.orignal_duration);
         
          let timeLeftVar = this.secondsToTime(this.state.seconds);
          this.setState({ time: timeLeftVar });
          //  this.startTimer();
          

          })

            .catch(error => console.log(error)) 
    
  }

  gotonext()
  {
    this.stopTimer()
    const WorkoutID = this.props.route.params.WorkID;
    console.log('asssssssssssssssss');
    this.props.navigation.navigate('ExerciseWorkout',{
      WorkID:WorkoutID,
      WorkTitle:this.state.dataa,
      workTime:this.state.seconds,
      ExerciseId:this.state.ExerciseId,
      indexvalue:this.state.ItemIndex,
      playbutton:this.state.playbutton,
      Exerimage:this.state.Exerimage,
      running:this.state.running,
      orignal_duration:this.state.orignal_duration,
    
     onGoBack:() => this.refresh()

})
  }
    render() {
       
    // if(this.state.isLoading == true)
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
      const WorkoutID = this.props.route.params.WorkID;
      const zero = parseInt(this.state.progressPercent) - 0;
      const one = parseInt(this.state.progressPercent) -20;
      const two = parseInt(this.state.progressPercent) -40;
      const three = parseInt(this.state.progressPercent) -60;
      const four = parseInt(this.state.progressPercent) -80;

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

                    {this.state.Exerimage == '' ?
                    <ImageBackground  
                    source={require('../../Assets/warm.png')} style={styles.image}>
       
                           <View style={styles.header}>

                          
                             
                             <TouchableOpacity style={{ width:wp('48%')}} onPress={() => this.props.navigation.navigate('WorkoutDetail')}>
                             <Image
                                 style={{
                                 margin: 10,
                                 marginTop:20,
                                 marginLeft:20,
                               
                                 // tintColor: '#f05c54',
                             
                                 }}
                                 source={require('../../Assets/whiteback.png')}
                             />

                     </TouchableOpacity>
                             
                            
                               <View style={{width:wp('48%'),flexDirection:'row',justifyContent:'flex-end'}}>
                   <TouchableOpacity  onPress={() => this.props.navigation.navigate('WorkoutDetail')()}>
                   <Image
                              style={{
                              
                            
                               margin: 10,
                               marginTop:20,
                             
                              
                              }}
                              source={require('../../Assets/bar-white.png')}
                          />
                     </TouchableOpacity>
                   </View>
                       
                            </View>   
                         
                               
                           </ImageBackground>
       
       
              
                :
                
                <ImageBackground  
                source={{uri:this.state.Exerimage}} style={styles.image}>
   
                       <View style={styles.header}>

                         {this.state.workoutLeftTime == 0 ? 
                         
                         <TouchableOpacity 
                        
                         style={{ width:wp('48%')}} onPress={() => this.props.navigation.navigate('WorkoutDetail')}>
                                 <Image
                                     style={{
                                     margin: 10,
                                    height:20,
                                    width:20,
                                   // backgroundColor:'red'
                                   
                                     // tintColor: '#f05c54',
                                 
                                     }}
                                     source={require('../../Assets/back.png')}
                                 />
 
                         </TouchableOpacity>
                         
                         :
                         
                      
                           
                           <TouchableOpacity 
                         //  disabled={true}
                           style={{ width:wp('48%')}} onPress={() => this.props.navigation.navigate('WorkoutDetail')}>
                                   <Image
                                       style={{
                                       margin: 10,
                                      height:20,
                                      width:20
                                      
                                     
                                       // tintColor: '#f05c54',
                                   
                                       }}
                                       source={require('../../Assets/back-disable.png')}
                                   />
   
                           </TouchableOpacity>
      }
                           <View style={{width:wp('48%'),flexDirection:'row',justifyContent:'flex-end'}}>
               <TouchableOpacity  onPress={() => this.gotonext()}>
               <Image
                          style={{
                          
                        
                           margin: 10,
                          
                           height:20,
                           width:20
                         
                          
                          }}
                          source={require('../../Assets/List=Default.png')}
                      />
                 </TouchableOpacity>
               </View>
                   
                        </View>   
                     
                           
                       </ImageBackground>
   
   
                }
              

                <View style={{margin:10}}>
               
                       <Text style={styles.Title}>{this.state.Title}</Text>

                       {/* {this.state.running == true ?
                        
                        <Text style={styles.Title}>True</Text>
                        :
                        <Text style={styles.Title}>false</Text>
                        
                        }*/

                      }
                       
                          
                       {/* <View style={{flexDirection:'row'}}> 
                      
                    
                      <Text >{parseInt(this.state.progressPercent)}%</Text>
                      <Text >{one}%</Text>
                      <Text >{two}%</Text>
                      <Text >{three}%</Text>
                      <Text >{four}%</Text>
                     
                  
                   </View> */}

                       <View style={{flexDirection:'row'}}> 
                      
                          <Text style={styles.Title1}>Progress</Text>
                          <Text style={styles.PercentText}>{parseInt(this.state.progressPercent)}%</Text>
                        
                      
                       </View>
                                


                        {/* <View style={{width:wp('90%'),marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>
                                        
                      
                         
                            <LinearGradient   colors={['#1474F0','red' ,]} 
                             style={[  
                                  styles.inner,{width: parseInt(this.state.progressPercent),marginRight:2 +"%",borderRadius: 50},  
                              ]}   

                        />
                      

                      </View> */}

                    
                      <View style={{flexDirection:'row'}}>

                        <View style={{width:wp('18%'),marginRight:5,height:5,marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>
                      
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
                             styles.inner,{width: wp('18%'),borderRadius: 50},  
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

                       <View style={{width:wp('18%'),marginRight:5,height:5,marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>
                      
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
                             styles.inner,{width: wp('18%'),borderRadius: 50},  
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

                       <View style={{width:wp('18%'),marginRight:3,height:5,marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>
                     
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
                             styles.inner,{width: wp('18%'),marginRight:2,borderRadius: 50},  
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

                 <View style={{width:wp('18%'),marginRight:3,height:5,marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>
                     
                
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
                             styles.inner,{width: wp('18%'),marginRight:2,borderRadius: 50},  
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

                       

                 <View style={{width:wp('18%'),marginRight:3,height:5,marginTop:5,backgroundColor:'#CDCECF',alignSelf:'center'}}>
               
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
                             styles.inner,{width: wp('18%'),marginRight:2,borderRadius: 50},  
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

                         

                        
                                 
                     {/* </View> */}
                      {/* <View style={{width:wp('90%'),borderWidth:1,margin:10,borderColor:'#CDCECF'}}>
                      <Animated.View  

                style={[  
                    styles.inner,{width: parseInt(this.state.progressPercent) +"%"},  
                ]}  
            />  
                      </View> */}
                     
         {/* <Text style={styles.Title2}>Warm-Up</Text> */}

       {/* {this.state.currentIndex == 0 ?

       <View>

         <Text style={styles.Title2}>Warm-Up</Text>
         {/* <Text style={styles.Timer}>{this.state.time.m}: {this.state.time.s}</Text> 
         </View>
       
       : */}

       <View>
            <Text style={styles.Title2}>{this.state.dataa}</Text> 
            <Text style={styles.Timer}>{this.state.time.m}: {this.state.time.s}</Text> 
       </View>
       
       {/* }  */}

       
{/* <Text style={{textAlign:'center'}}> m: {this.state.time.m} s: {this.state.time.s}</Text>
          */}
     {/* <CountDown
        until={time * 60}
      
        size={25}
        onFinish={() => this.next_Excercise()} 
        digitStyle={{backgroundColor: '#FFF'}}
        digitTxtStyle={{color: '#141821'}}
        timeToShow={['M', 'S']}
        separatorStyle={{color: '#141821'}}
      timeLabels={{}}
        showSeparator
      //  onPress={Alert.alert('h')}
        running={this.state.running}
      
      /> */}

                </View>    
   
                  
                       <View style={{flexDirection:'row',alignSelf:'center'}}>
                        {/* <Text>{this.state.currentIndex}</Text>
                        <TouchableOpacity
                            onPress={() => this.prev_Excercise()}
                            disabled={true}
                            >
                              
                                <Image
                                style={{
                            
                            //backgroundColor:'red',
                              marginTop:10,
                              // justifyContent:'center'
                              // alignSelf:'center'      
                                resizeMode:'contain',
                                height:25,
                                width:25
                                
                                }}
                                source={require('../../Assets/reverse.png')}
                            />
                            </TouchableOpacity> */}
              {/* <Text>{this.state.currentIndex}{this.state.ItemIndex}</Text> */}

                {this.state.currentIndex == 0 ?

                <TouchableOpacity disabled={true}
                onPress={() => this.prev_Excercise()}
                >
                  
                    <Image
                    style={{
                
                
                  marginTop:10,
                  // justifyContent:'center'
                  // alignSelf:'center'      
                    resizeMode:'contain',
                    height:30,
                    width:30,
                    
                    }}
                    source={require('../../Assets/back-disable.png')}
                />
                
                </TouchableOpacity>

                :

                <TouchableOpacity onPress={() => this.prev_Excercise()}>
                  
                    <Image
                    style={{
                
                
                  marginTop:10,
                  // justifyContent:'center'
                  // alignSelf:'center'      
                    resizeMode:'contain',
                    height:30,
                    width:30,
                    
                    }}
                    source={require('../../Assets/back.1.png')}
                />
                </TouchableOpacity>

                }
                      
                <View>
                       {this.state.running == false ?
                       
                       <TouchableOpacity
                    //   onPress={() => {this.startrunning()}}
                       onPress={() => this.startTimer()}
                       >
                           <Image
                           style={{
                          resizeMode:'contain',
                          height:50,
                          width:50,
                          alignSelf:'center',      
                          marginLeft:30,
                          marginRight:30,
                          alignContent:'center',
                          justifyContent:'center'
                        
                           
                           }}
                           source={require('../../Assets/PlayButton.png')}
                       />

                       </TouchableOpacity>

                       : 
                       
                       <TouchableOpacity
                       onPress={() => {this.stopTimer()}}
                       >
                           <Image
                           style={{
                       
                          height:50,
                          width:50,
                          alignSelf:'center',      
                          marginLeft:30,
                          marginRight:30
                           
                           }}
                           source={require('../../Assets/PauseButton.png')}
                       />
                       </TouchableOpacity>
                       
                       }
                </View>

      {/* <Text>{this.state.dataSource.length}</Text>
      <TouchableOpacity
                 disabled={true}
                 onPress={() => this.next_Excercise()}>
                    <Image
                      style={{
                       resizeMode:'contain',
                       height:25,
                       width:25,
                     marginTop:10,
                //   backgroundColor:'red'
                   //  alignSelf:'center'      
                     
                      
                      }}
                      source={require('../../Assets/next.png')}
                  />
               </TouchableOpacity> */}
                {this.state.ItemIndex == this.state.dataSource.length  - 1 ? 
                 <TouchableOpacity disabled={true}
                 onPress={() => this.next_Excercise()}>
                    <Image
                       style={{
                       resizeMode:'contain',
                       marginTop:10,
                       height:30,
                       width:30,
                       marginTop:10,
                   //  alignSelf:'center'      
                  
                      }}
                      
                      source={require('../../Assets/forward-disable.png')}
                  />
                  {/* <Text>{this.state.dataSource.length}</Text> */}
               </TouchableOpacity>
                
                :
                
                <TouchableOpacity
                onPress={() => this.next_Excercise()}>

                   <Image
                      style={{
                      resizeMode:'contain',
                      marginTop:10,
                      height:30,
                       width:30,
                      marginTop:10,
                  //  alignSelf:'center'      
                 
                     }}
                     
                     source={require('../../Assets/forward.1.png')}
                 />
                  {/* <Text>{this.state.dataSource.length}</Text> */}
              </TouchableOpacity>
                }
                 
                       </View>
                    
                      
                          {/* <Text style={{textAlign:'center'}}>
                         {JSON.stringify(newitem1.id)}
                        </Text>    */}
               
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
        //width:wp('100%'),
       // resizeMode:'cover',
        resizeMode: "center",
        //justifyContent:'center',
       
       },
       Title:{
        color:'#141821',
       margin:10,
        fontFamily:'K2D-Normal',
        fontSize:16
       },
       Title1:{
        color:'#141821',
       margin:10,
        fontFamily:'K2D-Normal',
        fontSize:12,
        width:wp('50%'),
      
       },

       PercentText:{
      
        width:wp('36%'),
        textAlign:'right',
        color:'#141821',
        margin:10,
        fontFamily:'K2D-Normal',
        fontSize:12
       },
       inner:{  
        width: "100%",  
        height: 5,  
        
        backgroundColor:"#CDCECF", 
      
        
      },  

       Title2:{
        color:'#696D76',
       marginTop:30,
       textAlign:'center',
        fontFamily:'K2D-Normal',
        fontSize:14
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
       },
      

       container1: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
      
        alignItems: 'flex-start' // if you want to fill rows left to right
      },
      item: {
        height:50,
        backgroundColor:'red',
        width: '50%' // is 50% of container width
      }

   
})