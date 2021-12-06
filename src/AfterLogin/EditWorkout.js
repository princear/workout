import {
    View,
    Image,
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    Platform,BackHandler,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Linking, SafeAreaView,
    ScrollView, FlatList
} from "react-native";

import React, { Component } from "react";
import moment from "moment";
import Header from '../Components/Header/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ApiScreen } from '../Api/ApiScreen'
import AsyncStorage from "@react-native-community/async-storage";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';
import Swipeout from 'react-native-swipeout';
import DraggableFlatList from 'react-native-draggable-flatlist'
import DateTimePicker from "@react-native-community/datetimepicker";
import Footer from '../Components/Footer/BlackFooter'

var  selectedTags = [];
var  selectedTags1 = [];

export default class EditWorkout extends Component {

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
            exerciseID:'',
            extitle:'',
            show1: false,
            isEnable:false,

        };

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        

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
 

    componentDidMount = async () => {
       selectedTags1 = [];
      const Id = this.props.route.params.WorkID;
    

      console.log('%%%%%%%%%%%%%%%%%%%%%% Workout id',Id)
        this.setState({
            isLoading: true
          })
      
      
      
          const login = await AsyncStorage.getItem('login');
          //console.log("dashboard", login);
      
          let data = JSON.parse(login);
            console.log('#################3',data)
          this.access_token = data;

          const url1 = ApiScreen.base_url + ApiScreen.GetWorkoutexercise
          console.log("url1:" + url1);
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
              console.log('Excercise>>>>>>>>>>>>>>>>>>>>>>>>>>',responseJson.data.exercises)

              setTimeout(() => {
                this.setState({

                  isLoading: false,
                  dataSource: responseJson.data.exercises,
                 // exerciseID:responseJson.data.equipment.id,
                //   Title:responseJson.data.equipment.title,
                //   image:responseJson.data.equipment.image_original_path,
                //   description:responseJson.data.equipment.description


                })
              }, 2000)

            })
            .catch(error => console.log(error))

              this.NewDragList()
      

    }


    addNewExercises = async (id) => {

      this.setState({
        isPrivate:true,
       isLoading:true,
      })

      console.log('hiiiiiiiiiiiiiiiii',id)
      var selectedtags = [];
     
      var selectedtags1 = [];
     
      id.forEach(element => {

        //selectedtags = element.id
        selectedtags.push(element.exercise_id)
      
        
      });

     // console.log('Existing ExID',selectedtags.toString());


      const login = await AsyncStorage.getItem('login');
      //console.log("dashboard", login);
  
      let data = JSON.parse(login);
        console.log('#################3',data)
      this.access_token = data;

      const Unselected = ApiScreen.base_url + ApiScreen.Unselected
console.log("Unselected:" + Unselected);
fetch(Unselected,
  {
    method: 'POST',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': this.access_token,
      // <-- Specifying the Content-Type

    }),

    body: JSON.stringify(
      {

        exercises:selectedtags.toString()
       

      })


  }).then(response => response.json())
  .then((responseJson) => {

    console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.exercises)
    
    setTimeout(() => {
      this.setState({

        isLoading: false,
        dataSource1: responseJson.data.exercises,
       // exerciseID:responseJson.data.equipment.id,
      //   Title:responseJson.data.equipment.title,
      //   image:responseJson.data.equipment.image_original_path,
      //   description:responseJson.data.equipment.description


      })
    }, 2000)
   const all = responseJson.data.exercises;
    all.forEach(element => {

      //selectedtags = element.id
    console.log(element.title);
    
      
    });

  })
  .catch(error => console.log(error))


    }





    NewDragList = async(id) => {

      console.log('draggggg');
      var selectedtags = [];
     
    //  console.log('New List %%%%%%%%%%%%%%%%%%%%%%%%%%%',id);

      id.forEach(element => {

        //selectedtags = element.id
        selectedtags.push(element.id)
      
        
      });

       console.log('%%%%%%%%%%%%%%%%',selectedtags);

       this.setState({
        isLoading: true,
     
      })

       const login = await AsyncStorage.getItem('login');
       //console.log("dashboard", login);
   
       let data = JSON.parse(login);
         console.log('#################3',data)
       this.access_token = data;

       const Reorder = ApiScreen.base_url + ApiScreen.Reorder
 console.log("Reorder:" + Reorder);
 fetch(Reorder,
   {
     method: 'POST',
     headers: new Headers({
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'x-access-token': this.access_token,
       // <-- Specifying the Content-Type

     }),

     body: JSON.stringify(
       {

        ids:selectedtags,
        

       })


   }).then(response => response.json())
   .then((responseJson) => {
     console.log('getting data from fetchaaaaaaaaaaa',responseJson.data)

     setTimeout(() => {
       this.setState({

         isLoading: false,
       //  dataSource: responseJson.data.workouts,

       })
     }, 2000)
     this.goBack()

   })
   .catch(error => console.log(error))


    }

    delete(id){

        console.log('delete>>>>>>>>>>>>>>>>>>>'+id)
    }
  
    ontimePress = (title) => {

    
    

   
      if (this.state.show1 == false) {
        this.state.show1 = true;
        this.setState(this.state);
        this.setState({
          extitle:title
        })
      } else {
        this.state.show1 = false;
        this.setState(this.state);
      
      }
     // console.log('>>>>>>>>>>>>>>>',this.state.extitle)
  }
    

    renderRow(index) {
      let swipeBtns = [{
        text: 'Delete',
        backgroundColor: 'red',
        onOpen:(sectionID, rowId,) => {
              console.log(rowId)
        },
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      //  onPress: () => { this.delete(index) }
      }];
  
      return (
        <DraggableFlatList  

        data={this.state.dataSource}
        keyExtractor={(item, index) => `draggable-item-${item.id}`}
        // horizontal={true}
        onDragEnd={({ data }) => this.setState({
          dataSource:data,
          isEnable:true
        })}
        renderItem={({ item, index,drag }) => ( 
        <View>
        
        <Swipeout right={swipeBtns}
          key={item.id}
                autoClose='true'
                backgroundColor= 'transparent'>

                        <TouchableOpacity style={styles.deatilcontainer}
                       // onPress={this.delete.bind(this, item.id)} 
                       onLongPress={drag}
                        >
                          
                             <Image 
                               
                                 source={require('../../Assets/shuffle.png')}
                                 style={{marginTop:35,marginRight:5,resizeMode:'contain',height:30,width:30}}
                                 ></Image>  
                            <View style={styles.imagebox}>
                               
                                 <Image 
                               source={{uri:item.image_original_path}}
                                 //source={require('../../Assets/dummypic.png')}
                                 style={styles.equipimg}></Image>  
                             </View>
                             <View style={styles.textbox}>
                                    <Text style={styles.headertext}>{item.title}</Text>
                                    <Text style={styles.normaltext}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                                  
                                  { item.rest_time == '0' ? 
                                  
                                  <TouchableOpacity style={styles.whitebtn}
                                  onPress={()=>this.ontimePress(item.id,this)}
                                   >


                                     <Text style={styles.text5}>Add Rest min.</Text>
                                   
                                   </TouchableOpacity>
                                  
                                  :
                                  <TouchableOpacity style={styles.Blueebtn}
                                  onPress={()=>this.ontimePress(item.id,this)}
                                   >


                                     <Text style={styles.text4}>Edit Rest min.</Text>
                                   
                                   </TouchableOpacity>

                                  }
                                   
                                    {/* <Text style={styles.normaltext}>Schedule:{moment().format(item.schedule_time)} - {moment(item.schedule_date).format( 'DD/MM/YYYY')}</Text>
                                    <Text style={styles.normaltext}>Duration: {item.workout_duration} mins</Text>
                                    <Text style={styles.normaltext}>Schedule:{item.schedule_date}</Text>
                                   */}
                           </View>
                        </TouchableOpacity>
        
                        </Swipeout>

                        
                
        
        </View>
        
          
        )}
        /> 
                                    
        
      )
    }


    // Rest_Time_Popup(title)

    // {
    //   console.log('addd')

    //   this.setState({
    //     isPrivate:true,
    //     extitle:title
    //   })
    // }
    

    modelfalse = () => {
   
        this.setState({isPrivate:false})
      
      
            
    
    }



    addExercises =async () => {

      this.setState({isPrivate:false,
      isLoading:true
      });

      const Id = this.props.route.params.WorkID;
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',selectedTags1.toString(),Id)


      console.log('%%%%%%%%%%%%%%%%%%%%%% Workout id',Id)
      
      
      
          const login = await AsyncStorage.getItem('login');
          //console.log("dashboard", login);
      
          let data = JSON.parse(login);
            console.log('#################3',data)
          this.access_token = data;

          const AddBulkExercise = ApiScreen.base_url + ApiScreen.AddBulkExercise
          console.log("AddBulkExercise:" + AddBulkExercise);
          fetch(AddBulkExercise,
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

                  workout_id: Id,
                  exercises: selectedTags1.toString()


                })


            }).then(response => response.json())
            .then((responseJson) => {
              console.log('AllllllllExcercise>>>>>>>>>>>>>>>>>>>>>>>>>>',responseJson.data)

              setTimeout(() => {
                this.setState({

                  isLoading: false,
                //  dataSource: responseJson.data.exercises,
               
                   

                })
              }, 2000)
              this.componentDidMount()
            })
            .catch(error => console.log(error))

           
      





    }

    onChangeTime  = async (event, selectedTime) => {

      const currentTime = selectedTime || new Date();
  
      // this.setState({
      //   dobDate: currentTime,
      //   dobText: moment(currentTime).format("hh:mm:ss")
      // });
      let bdytime =  moment(currentTime).format("hh:mm");
    
      this.setState({
         
          show1:false
         
      })
      console.log("\n\n###############################", bdytime);
     
      
      console.log('AAAAAAAAAAAAAAAAAa',  this.state.extitle)

      this.setState({
        isLoading: true
      })
  
  
  
      const login = await AsyncStorage.getItem('login');
      //console.log("dashboard", login);
  
      let data = JSON.parse(login);
        console.log('#################3',data)
      this.access_token = data;

      const getrest = ApiScreen.base_url + ApiScreen.AddRestTime
      console.log("getrest:" + getrest);
      fetch(getrest,
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

              id: this.state.extitle,
              action:"add",
              rest_time:bdytime


            })


        }).then(response => response.json())
        .then((responseJson) => {
          console.log('Excercise>>>>>>>>>>>>>>>>>>>>>>>>>>',responseJson)
         
            this.setState({isLoading:false})
            
       
      
        Alert.alert('Rest Time Added')
       this.componentDidMount()
        })
        .catch(error => console.log(error))

     
    };


    onchecked(id,title,img,desc){

    

      const data = this.state.dataSource1
       const index = data.findIndex(x => x.id === id)
 
       data[index].checked = !data[index].checked
       this.setState(data)  

       var item = {};
       
       item['id'] = id;
       item['title'] = title
       item['img'] = img
       item['desc'] = desc
  
 //   console.log('ccsscc>>>>>>>>>>>>>>>',item.id)

      if(!this.isExistInArray(selectedTags,"id",item.id)){
     
       console.log('insert in array');
       selectedTags.push(item);
   
        
       }

         else{

           
           console.log('remove');
           this.RemoveTempExercise(selectedTags,"id",item.id);
              
           }

          this.setState({
            Holder:selectedTags
          })
     
           console.log('list>>>>>>>>>>>>>>>>>>>',selectedTags)






         if( selectedTags1.includes(id)){
     
           console.log('aaa>>>>>>>>>>>>>>>>>>>>>');
           selectedTags1.splice(selectedTags1.indexOf(id), 1);
          // this.RemoveTempExercise(selectedTags,"id",id);
           }
   
             else{
   
               
               console.log('bbb');
              selectedTags1.push(id);
                  
               }
            
              console.log('ccsscc',selectedTags1)
           
       
       
      }


      isExistInArray (Ex_array,Ex_Key,Ex_value) {
        var isExist = false;
      Ex_array.forEach(function(element,index){
        if(Ex_array[index] && Ex_array[index].hasOwnProperty(Ex_Key) && Ex_array[index][Ex_Key] === Ex_value ){
        isExist = true;
        return false;
       }
   
     })

     return isExist;

     }


     RemoveTempExercise (Ex_array,Ex_Key,Ex_value) {
      console.log('sudhanshuuuuuuuuuuuuuuuuuu',JSON.stringify(Ex_array))
       Ex_array.forEach(function(element,index){
          if(Ex_array[index] && Ex_array[index].hasOwnProperty(Ex_Key) && Ex_array[index][Ex_Key] === Ex_value ){
            console.log('id:'+Ex_value)
             Ex_array.splice(index,1);
             return false;
             

         }
     
       })

       console.log('Array:'+JSON.stringify(Ex_array))
       selectedTags = Ex_array;

    }


    render() {
  
      
        var swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
          
            
        
          }];
          
        

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



{this.state.isPrivate == true && (

<Modal isVisible={this.state.isVisible}>

    <View style={{ backgroundColor: '#fff', height: hp('90%'),paddingBottom:10 }}>
        <View style={styles.head1}>
            <View style={{width:wp('5%')}}>
                <TouchableOpacity
                    onPress={() => this.modelfalse()}
                    style={styles.closemodalStyle}>
                    <Image source={require('../../Assets/back.png')} style={styles.backicon} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ width:wp('70%'),textAlign:"center", fontFamily: 'K2D-Bold', color: '#141821' }}>Choose Exercises To Add</Text>
            </View>

            <View style={{width:wp('10%')}}>
                
                <TouchableOpacity
                    onPress={() => this.addExercises()}
                    style={styles.closemodalStyle}>
                   <Text>Done</Text>
                </TouchableOpacity>

            </View>

        </View>
                
                   <FlatList

            data={this.state.dataSource1}
            keyExtractor={(item, index) => index}
                  // horizontal={true}

                  renderItem={({ item, index }) => (
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

                  <TouchableOpacity style={styles.deatilcontainer1}
                                  //  onPress={() => this.props.navigation.navigate('ExcerciseDetail',{
                                  //        EquipId:item.id

                                  //  })}
                  >
                          

                                  

                  <CheckBox

                  value={item.checked}
                  // onValueChange={Alert.alert(this.item.givenName)}

                  onValueChange={() => {this.onchecked(item.id,item.title,item.image_thumb_path,item.description)}}

                  style={styles.checkbox}

                  /> 
             
                                    <View style={styles.imagebox}>
                                          <Image source={{uri:item.image_thumb_path}} style={styles.equipimg}></Image> 
                                      </View>
                                      <View style={styles.textbox}>
                                        <Text style={styles.headertext}>{item.title}</Text>
                                        <Text numberOfLines={5} style={styles.normaltext}>{item.description}</Text>
                                    
                                      </View>
                                </TouchableOpacity>

                  </View>

                  
                  )}
                  />

                      </View>
                  </Modal>
                  )}


<View style={styles.headTop}>
                        
            <View style={{flexDirection:'row',}}>
            <View style={{width:wp('20%')}} >
                                    <TouchableOpacity
                                      onPress={() => this.goBack()}
                                        style={{paddingLeft:10}}>
                                        <Image source={require('../../Assets/back.png')} style={styles.backicon} />
                                    </TouchableOpacity>
             </View>
             
                    <Text style={{width:wp('60%'),textAlign:'center',fontFamily: 'K2D-Normal',fontSize:16,fontWeight:'500'}}>Edit exercises</Text>
                  

            <TouchableOpacity style={{width:wp('20%'), alignItems:'flex-end',paddingRight:15}}
                          onPress={() =>  this.addNewExercises(this.state.dataSource)}
                    >

                            <Image
                                style={{
                                marginTop: 5,
                              
                                  height:20,
                                  width:20
                                // tintColor: '#f05c54',
                                
                                
                                }}
                                source={require('../../Assets/Add2.png')}
                            />
                            
                    </TouchableOpacity>          
             </View>

                        

                       
                
                
            </View>
            
                
             
                    <View style={{height:hp('80%')}}>
                   
                       {this.renderRow(this)}
                        {this.state.isEnable == true ?
                        
                        <TouchableOpacity style={styles.buttonv}
                        onPress={()=> {this.NewDragList(this.state.dataSource)}}
                       >
                             <Text style={styles.text4}>Save</Text>
                       </TouchableOpacity>
                        :
                        
                        <TouchableOpacity style={styles.buttonDisable} disabled={true}
                        onPress={()=> {this.NewDragList(this.state.dataSource)}}
                       >
                             <Text style={styles.text4}>Save</Text>
                       </TouchableOpacity>
                         }
                      
                    {/*
                     <FlatList

data={this.state.dataSource}
keyExtractor={(item, index) => index}
// horizontal={true}

renderItem={({ item, index }) => (
<View>

<Swipeout right={swipeBtns}
        autoClose='true'
        backgroundColor= 'transparent'>
                <TouchableOpacity style={styles.deatilcontainer}
                onPress={this.delete.bind(this, item.id)} 
                >
                     <Image 
                       
                         source={require('../../Assets/shuffle.png')}
                         style={{marginTop:45,marginRight:5,resizeMode:'contain',}}
                         ></Image>  
                    <View style={styles.imagebox}>
                       
                         <Image 
                       source={{uri:item.image_original_path}}
                         //source={require('../../Assets/dummypic.png')}
                         style={styles.equipimg}></Image>  
                     </View>
                     <View style={styles.textbox}>
                            <Text style={styles.headertext}>{item.title}</Text>
                            <Text style={styles.normaltext}>Schedule:{moment().format(item.schedule_time)} - {moment(item.schedule_date).format( 'DD/MM/YYYY')}</Text>
                            <Text style={styles.normaltext}>Duration: {item.workout_duration}</Text>
                   </View>
                </TouchableOpacity>

                </Swipeout>

</View>

  
)}
/> 

*/}


          
                    </View>
                      {this.state.show1 == true && (
                // <View> 
                //     <Text style={styles.privateTextStyle}>
                //       {I18n.t('add_poll.private_poll_desc')}
                //     </Text>
                //   <Text></Text>
            
                  // <Modal  isVisible={this.state.isVisible}>
                     <View style={{backgroundColor:'#fff',padding:15}}>
                 
                 {/* <TouchableOpacity
                   onPress={() => this.modelfalse()}
                   >
                      <Text style={styles.closemodalStyle}>X</Text>
                   
                   </TouchableOpacity> */}
                   
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                   

                   {/* <Text style={styles.keeptext}>{this.state.extitle} exercise</Text>

                   <Text style={styles.successMsg}>Rest minutes</Text> */}
                   <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
            //  minimumDate={new Date()}
              mode="time"
            
              is24Hour={true}
              display="spinner"
              
              onChange={this.onChangeTime}
            />

                   {/* <TouchableOpacity style={styles.whitebtn1}
                            onPress={() => this.modelfalse()}
                            >

                                <Text style={styles.text6}>LET'S DO THIS!</Text>
                            </TouchableOpacity> */}
                    </View>    
      
</View>
// </Modal>
      )}

              <Footer
                    navigation={this.props.navigation}
                />
             
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
        width:wp('30%'),
       
        padding:5,
        borderWidth:1,
        borderRadius:5,
        borderColor:'#1474F0',
        marginTop:15

    },
    backicon: {
      //alignContent: 'flex-start',
    //  marginRight: wp('10%'),
    //  marginTop: 12,
      //marginLeft: 10,
      height:20,
      width:20
  },

    Blueebtn:{
      width:wp('30%'),
      backgroundColor:'#1474F0',
      padding:5,
      borderWidth:1,
      borderRadius:5,
      borderColor:'#1474F0',
      marginTop:15

  },
    button1:{
        width:wp('45%'),
        paddingBottom:10,
        borderBottomWidth:1,
        borderColor:'#1474F0',
       
    },
    head1:{
      flexDirection:'row',
      padding:10,
      borderBottomWidth:1,
      borderBottomColor:'#E5E5E5',
    },
    text4:{
        textAlign:'center',
       color:'#fff',
       fontFamily:'K2D-Normal',
      
       lineHeight:16
       
    },
    successMsg:{
      textAlign: 'center',
      color: '#696D76',
      fontFamily:'K2D-Normal',
      padding:10
    },
    text6: {
      textAlign: 'center',
      color: '#ffd',
      fontFamily:'K2D-Normal',
  },
  buttonv:{
    backgroundColor:'#1474F0',
  marginBottom:10,
    padding:10,
    margin:20
   // width:wp('40%'),
  
},

buttonDisable:{
  backgroundColor:'grey',
marginBottom:10,
  padding:10,
  margin:20
 // width:wp('40%'),

},


text4:{
    textAlign:'center',
   color:'#fff' ,
   fontFamily:'K2D-Normal',
   fontSize:12,
},
  keeptext:{
    textAlign:'center',
  fontSize:16,
   color:'#141821',
   fontFamily:'K2D-Bold',
  },
    text5:{
        textAlign:'center',
        textAlign:'center',
        color:'#1474F0',
       fontFamily:'K2D-Normal',
       
       lineHeight:16
      //  color:'#1474F0' 
    },
    whitebtn1: {
      backgroundColor: '#1474F0',
        padding: 10,
        width: wp('60%'),

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
           fontSize:12
           
       },
       equipimg:{
           height:100,
           width:100,
       },
       searchSection:{
       
        margin:10
       
    },

    input: {
        borderWidth:1,
        borderColor: '#E5E5E5',
       // width:wp('90%'),
       fontFamily:'K2D-Regular',
       paddingLeft:10,
       color:'#AFAFAF'
    
    },

       deatilcontainer:{

            flexDirection:'row',
            paddingLeft:20,
            paddingRight:20,
            paddingTop:20,
           

       },

       deatilcontainer1: {
        flexDirection: 'row',
        marginTop: 10,
        paddingLeft: 20
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
    // paddingLeft:20,
    // paddingRight:20,
    borderBottomColor:'#E5E5E5',
    borderBottomWidth:2,
    justifyContent:'center',
    alignItems:'center',
   // paddingTop:20,
    height:60,
   
},
       imagebox:{

       },
       textbox:{
          
            width:wp('55%'),
            paddingLeft:20,
            paddingRight:20
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