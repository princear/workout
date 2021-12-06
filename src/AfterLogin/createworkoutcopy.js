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
import moment from "moment";
import React, { Component } from "react";
import Video from 'react-native-video';
import ImgToBase64 from 'react-native-image-base64';

import Header from '../Components/Header/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ApiScreen } from '../Api/ApiScreen'
import AsyncStorage from "@react-native-community/async-storage";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
//import ImagePicker from 'react-native-image-picker'
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import CheckBox from '@react-native-community/checkbox';
import { array } from "prop-types";
var  selectedTags = [];

export default class CreateWorkoutonly extends Component {

    constructor(props) {

        super(props);
        this.state = {

            show: false,
         
            show1: false,
            charge_id: "",
            isLoading: false,
            dataSource: [],
            Title: '',
            image: '',
            description: '',
            dataSource1: [],
            dataSource2: '',
            choose_photo:null,
            isPrivate: false,
            isVisible: true,
            addTime:'Add Time',
            addDate:'Add Date',
            wtitle:'',
            description:'',
            choose_photo2:'',
            Holder: ''
        };

    }

   
    onDOBPress = () => {
        if (this.state.show == false) {
          this.state.show = true;
          this.setState(this.state);
        } else {
          this.state.show = false;
          this.setState(this.state);
        }
    }

    ontimePress = () => {
        if (this.state.show1 == false) {
          this.state.show1 = true;
          this.setState(this.state);
        } else {
          this.state.show1 = false;
          this.setState(this.state);
        }
    }
 

    componentDidMount = async () => {
         selectedTags = [];
        // const Id = this.props.route.params.Eid;
        // const title = this.props.route.params.title;
        // const img = this.props.route.params.img;
        // const duration = this.props.route.params.dur;
        //console.log('%%%%%%%%%%%%',Id,title,img,duration)

        this.setState({
            isLoading:true
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
    //  console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.exercises)

      setTimeout(() => {
        this.setState({

          isLoading: false,
          dataSource: responseJson.data.exercises,

        })
      }, 2000)

    })
    .catch(error => console.log(error))



        setTimeout(() => {
            this.setState({
                isLoading:false
            })
        }, 2000);
    
    }




    onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || new Date();
    
        this.setState({
          dobDate: currentTime,
          dobText: moment(currentTime).format("HH:mm")
        });
        let bdytime =  moment(currentTime).format("HH:mm");
         

    
        this.state.show1 = false;
       // this.setState(this.state);
        this.setState({
            addTime:bdytime,
           
        })
        console.log("\n\n###############################", bdytime);
        // this.fetchUpdate(bdy);
       // this.fetchUpdateDate(bdy);
        // alert(currentDate);
        //setShow(Platform.OS === "ios");
        // setDate(currentDate);
      };


    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
    
        this.setState({
          dobDate: currentDate,
          dobText: moment(currentDate).format("DD-MM-YYYY ")
        });
        let bdy =  moment(currentDate).format("YYYY-MM-DD");
         

    
        this.state.show = false;
        this.setState(this.state);
        this.setState({
            addDate:bdy
        })
        console.log("\n\n###############################", bdy);
        // this.fetchUpdate(bdy);
       // this.fetchUpdateDate(bdy);
        // alert(currentDate);
        //setShow(Platform.OS === "ios");
        // setDate(currentDate);
      };

    choose_photo() {
        console.log('addd')
    
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        }).then(image => {
          console.log(image);
          if (image.path) {
            const source = { uri: image.path,name:'file.jpg',type:'image/jpg'};
              console.log('imagessssssssssssssss',source)

            // this.uploadImage(source)
               this.setState({
    
                 choose_photo: source,
           
               });
          }
        });
        // this.setState({
        //   isPrivate: true
        // })
      }


        uploadImage = async (image_uri) => {
            let base_url ='http://3.106.36.138/';
            let uploadData = new FormData();
            uploadData.append('submit','ok');
            uploadData.append('image',{type:'image/jpg',uri:image_uri,name:'uploadimgtemp.jpg'})
            fetch(base_url,{
                method:'POST',
                body:uploadData


            }).then(response => response.json())
            .then(response=>{
                if(response.status){
                    this.setState({choose_photo :base_url + response.image})

                }
                else{
                    Alert.alert('error')
                }
            }).catch(error => console.log(error))
 

        }

      Create_Workout = async () => {

        console.log('DDDDDDDDDDDDDDDdd',selectedTags)
        
        const wtitle = this.state.wtitle;
        const description = this.state.description;
        const time = this.state.addTime;
        const date = this.state.addDate;
        const id = selectedTags;
        console.log('<<<<<<<<<<<<<<',id)
       const image = this.state.choose_photo.uri

        ImgToBase64.getBase64String(image)
        .then(base64String  => {
      
          if (base64String) {
            const pic1 = "data:image/jpeg;base64," + base64String
             // console.log('imagessssssssssssssss',pic1)
             this.setState({
      
               choose_photo2: pic1,
           
             });
          }
        
          
        })

       console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAA',wtitle,description,time,date,id)

       
      this.setState({
        isLoading: true
      })
  
  
  
      const login = await AsyncStorage.getItem('login');
      //console.log("dashboard", login);
  
      let data = JSON.parse(login);
        console.log('#################3',data)
      this.access_token = data;

    const url =  ApiScreen.base_url + ApiScreen.AddWorkout
    console.log("urlvv:" + url);

let formdata = new FormData();
      
formdata.append("title", wtitle)
formdata.append("schedule_time",this.state.addTime) 
formdata.append("schedule_date",this.state.addDate) 
formdata.append("description",this.state.description)

//formdata.append('image',{uri:image.uri,name:image.name});
formdata.append("exercises" ,id) 
// {
// uri: image.uri,
// type: 'image/jpeg/jpg',
// name: image.fileName,

// });

//console.log("***create_poll****", formdata);


fetch('http://3.106.36.138/api/add_workout',
  {
     method: 'POST',
     headers:{
       'Accept': 'application/json',
     // 'Content-Type': 'multipart/form-data;',
      'Content-Type': 'application/json',

      
       'x-access-token': this.access_token
    //   // <-- Specifying the Content-Type

     },
        // body :formdata
    body: JSON.stringify(
        {
          

          title :wtitle,
          schedule_time:time,
          schedule_date:date,
          description:description,
          exercises:id.toString(),
         image_type_format:'base64',
          image: this.state.choose_photo2
          
        })
///formdata

  }
  ).then(response => response.json())
  .then((responseJson) => {
    console.log('getting data from fetchaaaaaaaaaaa',responseJson)

    if(responseJson.status == '1'){
        console.log(responseJson.status)
          //console.log("from login ",responseJson.data.message);
          Alert.alert(responseJson.data.message)
          this.setState({  isLoading:false })
          this.props.navigation.navigate('AllWorkOuts')
       }

       else{

        this.setState({  isLoading:false })
          console.log(responseJson.status)
          const invalid =  responseJson.data
          Alert.alert(invalid);
       
        }

  })

  .catch(error => console.log(error))

  this.setState({  isLoading:false })

  



//     axios.post('http://192.156.0.22:3000/api/updateProfile', userDetail, {
//       headers: {'Content-Type': 'multipart/form-data'},
//     }).then(res => //)
//       .catch(err => //);
// }



      }

      Add_donor() {
        console.log('addd')
        this.setState({
            isPrivate: true
        })
    }


      modelfalse = () => {
        
        this.setState({ isPrivate: false })
    // this.componentDidMount()


    }


    onchecked(id,title){
       // var selectedTags = [];
      //  console.log('%%%%%%%%%%%%%%%%%%%%%',id)

       
        // const data = this.state.dataSource
        // const index = data.findIndex(x => x.id === id)
  
        // data[index].checked = !data[index].checked
        // this.setState(data)

        //console.log('AAAAAAAAAAA',data)
      
      // console.log('/////////////////////',newArrayList)      
      var item = {};
      item['id'] = id;
      item['title'] = title
       selectedTags.push(item);
           
        // if( selectedTags.includes(id,title)){
        //  // console.log('a')
        // //  selectedTags.splice(id)
        //   selectedTags.splice(selectedTags.indexOf(id), 1);
         
        // }

        //   else{

        //     //console.log('b')
        //   //  console.log('ccssccaaaaaaaaaaaaaaa',selectedTags)

        //   // console.log('/////////////////////',newArrayList)      
        //   var item = {};
        //   item['id'] = id;
        //   item['title'] = title
        //    selectedTags.push(item);
               
        //     }

         console.log('ccsscc',selectedTags)
        
       }
   

    render() {

       // const Id = this.props.route.params.Eid;
        // const title = this.props.route.params.title;
        // const img = this.props.route.params.img;
        // const duration = this.props.route.params.dur;

        if (this.state.isLoading == true)
            return (<View style={{ flex: 1, justifyContent: 'center', position: 'absolute', top: '50%', left: '40%' }}>

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

            </View>

            )

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

                <View style={styles.head}>
                    <View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.replace('Excercise')}
                            style={styles.button}>
                            <Image source={require('../../Assets/back.png')} style={styles.backicon} />
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={{ justifyContent: 'center', alignSelf: 'center', fontFamily: 'K2D-Normal', marginTop: 10, color: '#141821' }}>Untitled Workout</Text>
                    </View>
                    <View >
                        <TouchableOpacity
                            onPress={()=> this.Create_Workout()}
                            style={styles.button}>
                            <Image source={require('../../Assets/check.png')} style={styles.loginicon} />
                        </TouchableOpacity>
                    </View>
                </View>


                {this.state.show1 == true && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              marginBottom: 20,
              padding: 20,
              shadowColor: "#6a6a6a",
              shadowOffset: {
                width: 0,
                height: 1
              },
              // shadowRadius: 3,
              // shadowOpacity: 1.0,
              // elevation: 5,
              // backgroundColor: "red",
              // borderRadius: 10,
              // alignSelf: "center",
              // marginTop: 20,
              // width: "92%"
            }}
          >
            {/* <TouchableOpacity
              style={{ position: "absolute", right: 0, margin: 5 }}
              onPress={() => this.onDOBPress()}
            >
              {/* <Icon size={24} name="close" /> 
            </TouchableOpacity> */}

            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              minimumDate={new Date()}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={this.onChangeTime}
            />
          </View>
        )}


                {this.state.show == true && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              marginBottom: 20,
              padding: 20,
              shadowColor: "#6a6a6a",
              shadowOffset: {
                width: 0,
                height: 1
              },
              // shadowRadius: 3,
              // shadowOpacity: 1.0,
              // elevation: 5,
              // backgroundColor: "red",
              // borderRadius: 10,
              // alignSelf: "center",
              // marginTop: 20,
              // width: "92%"
            }}
          >
            {/* <TouchableOpacity
              style={{ position: "absolute", right: 0, margin: 5 }}
              onPress={() => this.onDOBPress()}
            >
              {/* <Icon size={24} name="close" /> 
            </TouchableOpacity> */}

            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              minimumDate={new Date()}
              mode="date"
              display="spinner"
              onChange={this.onChange}
            />
          </View>
        )}


{this.state.isPrivate == true && (

<Modal isVisible={this.state.isVisible}>

    <View style={{ backgroundColor: '#fff', height: hp('90%'),paddingBottom:10 }}>
        <View style={styles.head1}>
            <View style={{width:wp('10%')}}>
                <TouchableOpacity
                    onPress={() => this.modelfalse()}
                    style={styles.closemodalStyle}>
                    <Image source={require('../../Assets/back.png')} style={styles.backicon} />
                </TouchableOpacity>
            </View>
            <View >
                <Text style={{ width:wp('80%'),textAlign:"center", fontFamily: 'K2D-Bold', marginTop: 10, color: '#141821' }}>Choose Exercises To Add</Text>
            </View>

        </View>

      
       
                   
                   <FlatList

data={this.state.dataSource}
keyExtractor={(item, index) => index}
// horizontal={true}

renderItem={({ item, index }) => (
<View>

<TouchableOpacity style={styles.deatilcontainer}
                //  onPress={() => this.props.navigation.navigate('ExcerciseDetail',{
                //        EquipId:item.id

                //  })}
               >
         

                

<CheckBox

value={item.checked}
// onValueChange={Alert.alert(this.item.givenName)}

onValueChange={() => {this.onchecked(item.id,item.title)}}

style={styles.checkbox}

/> 


             
                   <View style={styles.imagebox}>
                        <Image source={{uri:item.image_thumb_path}} style={styles.equipimg}></Image> 
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
</Modal>
)}

                <ScrollView>
                <View style={styles.searchSection}> 
                <TouchableOpacity style={styles.chooseimg}
                    onPress={() => this.choose_photo()}
                    >

    <Text style={styles.text4}>Choose Image</Text>
</TouchableOpacity>
<View style={styles.searchSection}> 
{
  this.state.choose_photo && 
  <Image source={{uri:this.state.choose_photo.uri}} style={{height:250,width:wp('90%'),marginTop:10,resizeMode:'contain'}}/>
}     
</View>
</View>
                <View style={styles.searchSection}> 
                  <Text style={styles.text}>Title</Text>
                  <TextInput autoCorrect={false}
                       onChangeText={(wtitle) => this.setState({wtitle})}
                      //value='garun@delimp.com'
                      placeholder="Title of workout"
                      style={styles.input}
                    >
                  </TextInput>
                  
             </View>
            
             <View style={styles.searchSection}> 
                  <Text style={styles.text}>Description</Text>
                  <TextInput autoCorrect={false}
                       onChangeText={(description) => this.setState({description})}
                      //value='garun@delimp.com'
                      multiline={true}
                      numberOfLines={4}
                      
                      placeholder="Put anything that describes the workout"
                      style={styles.input}
                      
                    >
                  </TextInput>
                  
             </View>
             <View style={styles.searchSection}> 
             <Text style={styles.text}>Schedule</Text>
             <View style={styles.buttoncontainer}>

<TouchableOpacity style={styles.buttonv}
  onPress={this.ontimePress.bind(this)}
>
<Image style={styles.searchIcon} source={require('../../Assets/time.png')}/>
    <Text style={styles.text4}>{this.state.addTime}</Text>
</TouchableOpacity>


<TouchableOpacity style={styles.whitebtn}
    onPress={this.onDOBPress.bind(this)}
>
<Image style={styles.searchIcon} source={require('../../Assets/calendar.png')}/>
    <Text style={styles.text5}>{this.state.addDate}</Text>

</TouchableOpacity>

</View>
</View>
<View style={styles.searchSection}> 
        <View style={{flexDirection:'row',}}>
        <View style={{width:wp('70%')}}>
                <Text style={styles.text}>Exercises</Text>
        </View>
        <TouchableOpacity style={{width:wp('20%'),flexDirection:'row',justifyContent:'flex-end'}}
              onPress={() => this.Add_donor()}
        >
                <Image style={styles.addIcon} source={require('../../Assets/add.png')}/>
        <Text style={styles.addtext}>Add</Text>
        </TouchableOpacity>

        </View>
        <Text>{selectedTags}</Text>
          
             {/* <Text style={styles.textdur}>Duration: {duration}mins</Text> */}

        </View>
                    {/* <View style={styles.deatilcontainer}>
                        <View style={styles.imagebox}>
                            <Image source={{ uri: img }} style={styles.equipimg}></Image>
                        </View>
                        <View style={styles.textbox}>
                           
                            <Text  style={styles.normaltext}>{title}</Text>
                            <Text  style={styles.durtext}>{duration} mins</Text>


                        </View>
                    </View> */}

</ScrollView>
              
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
    searchIcon:{
         
       resizeMode:'contain'
    
      },
      addIcon:{
       
        resizeMode:'contain'
     
       },
       addtext:{
        color: '#141821',
        marginBottom:5,
        fontFamily: 'K2D-Normal',
        fontSize: 12,
        paddingLeft:10,
        alignSelf:'flex-end',

       },
    input: {
        borderWidth:1,
        borderColor: '#E5E5E5',
        width:wp('90%'),
        alignSelf:'center',
       fontFamily:'K2D-Regular',
       paddingLeft:10,
       color:'#AFAFAF',
       textAlignVertical: "top"
    
    },
    searchSection:{
       
        marginLeft:10,
        marginRight:10,
       marginBottom:10
   

    },
    text: {
        fontFamily: 'K2D-Normal',
        fontSize: 14,
        color: '#141821',
        marginLeft:10,
       // textAlign: 'center',
        paddingBottom: 5


    },
    text4: {
        textAlign: 'center',
        color: '#fff',
        marginLeft:20
    },
    text5: {
        
        color: '#1474F0',
        marginLeft:20
        
    },
    recText: {
        fontFamily: 'K2D-Normal',
        fontSize: 12,
        color: '#B9B9B9',
        //  textAlign:'center',
        paddingTop: 5,
        paddingLeft: 18



    },
    backicon: {
        alignContent: 'flex-start',
        marginRight: wp('30%'),

        marginTop: 12,
        marginLeft: 10
    },
    TrainingText: {
        fontFamily: 'K2D-Normal',
        fontSize: 12,
        // color:'#B9B9B9',
        textAlign: 'center',
        paddingTop: 5


    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 100,
        width: 100,
        backgroundColor: 'red'
    },
    bottom: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        borderTopColor: '#E5E5E5',
        borderTopWidth: 1,
        width: wp('100%'),
        height: 50
    },

    cat_title: {
        fontFamily: 'K2D-Normal',
        fontSize: 14,
        paddingLeft: 20
    },

    head1: {

        flexDirection: 'row',
        //position:'absolute',
        //bottom:0,
        // borderBottomColor: '#E5E5E5',
        // borderBottomWidth: 2,
        width: wp('100%'),
        height: 50
    },

    head: {
        flexDirection: 'row',
        //position:'absolute',
        //bottom:0,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 2,
        width: wp('100%'),
        height: 50
    },

    buttonv: {
       flexDirection:'row',
        backgroundColor: '#1474F0',
        padding: 10,
        width: wp('40%'),
    },

    chooseimg: {
      
         backgroundColor: '#1474F0',
         padding: 10,
         width: wp('90%'),
         marginTop:5,
         marginLeft:10,
         alignItems:'center'
     },

    whitebtn: {
        flexDirection:'row',
        width: wp('40%'),
        padding: 10,
        borderWidth: 1,
        borderColor: '#1474F0',
        marginLeft: 20

    },

    buttonv1 : {
        
        backgroundColor: '#1474F0',
        padding: 10,
        width: wp('80%'),

    },
    
    whitebtn1: {
        width: wp('80%'),
        padding: 10,
        borderWidth: 1,
        borderColor: '#1474F0',
        marginTop:10
       

    },

    catData: {
        flexDirection: 'row',
        //position:'absolute',
        //bottom:0,
        paddingTop: 15,
        width: wp('90%'),
        alignSelf: 'center',
        height: 50
    },

    // whitebtn:{
    //     width:wp('25%'),
    //     paddingBottom:10,
    //   //  borderBottomWidth:1,
    //     borderColor:'#1474F0',
    //     marginLeft:20

    // },

    button1: {
        width: wp('25%'),
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#1474F0',

    },


    image: {

        height: hp('60%'),
        resizeMode: "contain",


    },
    normaltext: {
        paddingTop: 5,
        color: '#141821',
        fontFamily: 'K2D-Normal',
        fontSize: 12

    },
    textdur: {
        //paddingTop: 5,
        color: '#696D76',
        fontFamily: 'K2D-Normal',
        fontSize: 12,
        paddingLeft:10,

    },

    durtext: {
        paddingTop: 5,
        color: '#C5C5C5',
        fontFamily: 'K2D-Normal',
        fontSize: 12

    },
    equipimg: {
        height: 90,
        width: 90,
        // resizeMode:'contain'


    },
    equipimg1: {
        height: hp('30%'),
        width: wp('85%'),
        alignSelf: 'center',
        padding: 10
        //resizeMode:'contain'


    },
    deatilcontainer: {
        flexDirection: 'row',
        marginTop: 10,
        paddingLeft: 20
    },
    buttoncontainer: {
        flexDirection: 'row',
        paddingTop: 10,
        //paddingLeft:20,
        alignSelf: 'center'
    },

    buttoncontainer1 : {
        //flexDirection: 'row',
        paddingTop: 10,
        //paddingLeft:20,
        alignSelf: 'center'
    },
    imagebox: {

    },
    textbox: {

        width: wp('60%'),
        paddingLeft: 20
    },
    textbox1: {

        // width: wp('85%'),
        textAlign: 'center',
        padding: 10
    },
    headertext: {
        fontFamily: 'K2D-Normal',
        fontSize: 12,
       // textAlign: 'center',
        color: '#141821',


    },
    scan: {
        alignSelf: 'center',
        height: 65,
        width: 65,

        bottom: 30,
        resizeMode: 'contain'
    },
    homeicon: {
        alignContent: 'flex-start',
        marginRight: wp('30%'),
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginTop: 10,
        marginLeft: 10
    },
    loginicon: {
        alignContent: 'flex-end',
        marginLeft: wp('28%'),
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginTop: 10,

    },
    fundlefttext: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#CB3A3F',
        width: wp('45%'),


    },
    heart: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    headphone: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        alignSelf: 'center',

    },
    yoga: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        alignSelf: 'center'
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

    logo: {
        resizeMode: 'cover',
        //height:100,
        //width:100,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    homebanner: {
        //resizeMode:'center',
        height: hp('30%'),
        width: wp('70%'),
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    logoblock: {
        marginTop: 20
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