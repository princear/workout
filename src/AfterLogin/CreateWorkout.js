import {
    View,
    Image,
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    Platform,
    Text,BackHandler,
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


export default class CreateWorkout extends Component {

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
            choose_photo:'',
            isPrivate: false,
            isVisible: true,
            addTime:'',
            addDate:'',
            wtitle:'',
            description:'',
            choose_photo2:'',

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

        const Id = this.props.route.params.Eid;
        const title = this.props.route.params.title;
        const img = this.props.route.params.img;
        const duration = this.props.route.params.dur;
        //console.log('%%%%%%%%%%%%',Id,title,img,duration)
    
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



        const wtitle = this.state.wtitle;
        const description = this.state.description;
        const time = this.state.addTime;
        const date = this.state.addDate;
        const Id = this.props.route.params.Eid;
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

        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAA',wtitle,description,time,date,Id,image)

       
    //   this.setState({
    //     isLoading: true
    //   })
  
  
  
      const login = await AsyncStorage.getItem('login');
      //console.log("dashboard", login);
  
      let data = JSON.parse(login);
        console.log('#################3',data)
      this.access_token = data;

    const url =  ApiScreen.base_url + ApiScreen.AddWorkout
    console.log("urlvv:" + url,this.props.route.params.Eid);

// let formdata = new FormData();
      
// formdata.append("title", wtitle)
// formdata.append("schedule_time",this.state.addTime) 
// formdata.append("schedule_date",this.state.addDate) 
// formdata.append("description",this.state.description)

// //formdata.append('image',{uri:image.uri,name:image.name});
// formdata.append("exercises" ,id) 
// {
// uri: image.uri,
// type: 'image/jpeg/jpg',
// name: image.fileName,

// });

//console.log("***create_poll****", formdata);


fetch(url,
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
          exercises:Id.toString(),
         image_type_format:'base64',
          image: this.state.choose_photo2
          
        })


  }
  ).then(response => response.json())
  .then((responseJson) => {
    console.log('getting data from fetchaaaaaaaaaaa',responseJson)

    if(responseJson.status == '1'){
        this.setState({
            isLoading: true
          })
        console.log(responseJson.status)
          //console.log("from login ",responseJson.data.message);
          Alert.alert(responseJson.data.message)
          this.setState({  isLoading:false })
          this.props.navigation.navigate('AllWorkOuts')
       }

       else{

        this.setState({  isLoading:false })
          console.log(responseJson.status)
          const invalid =  responseJson.data.error[0]
          Alert.alert(invalid);
       
        }

  })

  .catch(error => console.log(error))

  //this.setState({  isLoading:false })

  



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
     


    }

    render() {

        const Id = this.props.route.params.Eid;
        const title = this.props.route.params.title;
        const img = this.props.route.params.img;
        const duration = this.props.route.params.dur;

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
                <View style={{width:wp('20%')}}>
                        <TouchableOpacity
                                    onPress={() =>this.goBack()}
                            style={styles.button}>
                            <Image source={require('../../Assets/back.png')} style={styles.backicon} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width:wp('60%')}}>
                        <Text style={{justifyContent: 'center', alignSelf: 'center', fontFamily: 'K2D-Normal', marginTop: 10, color: '#141821' }}>Untitled Workout</Text>
                    </View>
                    <View style={{width:wp('20%')}}>
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

    <View style={{ backgroundColor: '#fff', height: hp('70%') }}>
        <View style={styles.head1}>
            <View>
                <TouchableOpacity
                    onPress={() => this.modelfalse()}
                    style={styles.closemodalStyle}>
                    <Image source={require('../../Assets/back.png')} style={styles.backicon} />
                </TouchableOpacity>
            </View>
            <View >
                <Text style={{ justifyContent: 'center', alignSelf: 'center', fontFamily: 'K2D-Normal', marginTop: 10, color: '#141821' }}>{this.state.Title}</Text>
            </View>

        </View>

        <View style={styles.deatilcontainer1}

        >
            <View style={styles.imagebox}>
                <Image source={{ uri: this.state.image }} style={styles.equipimg1}></Image>
            </View>
            <View style={styles.textbox1}>
                {/* <Text style={styles.headertext}></Text> */}
                <Text style={styles.normaltext}>{this.state.description}</Text>


            </View>
        </View>

        <View style={styles.buttoncontainer1}>

            <TouchableOpacity style={styles.buttonv1}
            onPress={() => this.modelfalse1(
                this.state.id,this.state.Title,this.state.image,this.state.duration)}
            >

                <Text style={styles.text4}>Create Workout</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.whitebtn1}
              //  onPress={() => this.Add_donor()}
            >

                <Text style={styles.text5}>Add to Workout</Text>

            </TouchableOpacity>

        </View>


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
  this.state.choose_photo ? 

  <Image source={{uri:this.state.choose_photo.uri}} style={{height:250,width:wp('90%'),marginTop:10,resizeMode:'contain'}}/>
  :
  
  <Image source={{uri:this.state.choose_photo}} style={{height:0,width:wp('90%'),marginTop:10,resizeMode:'contain'}}/>
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
{this.state.addTime ?
 <Text style={styles.text4}>{this.state.addTime}</Text>
:
<Text style={styles.text4}>Add Time</Text>
}
</TouchableOpacity>


<TouchableOpacity style={styles.whitebtn}
    onPress={this.onDOBPress.bind(this)}
>
<Image style={styles.searchIcon} source={require('../../Assets/calendar.png')}/>
{this.state.addDate ?
 <Text style={styles.text5}>{this.state.addDate}</Text>
:
<Text style={styles.text5}>Add Date</Text>
}

</TouchableOpacity>

</View>
</View>
<View style={styles.searchSection}> 
        <View style={{flexDirection:'row',}}>
        <View style={{width:wp('70%')}}>
                <Text style={styles.text}>Exercises</Text>
        </View>
        {/* <TouchableOpacity style={{width:wp('20%'),flexDirection:'row',justifyContent:'flex-end'}}
              onPress={() => this.Add_donor()}
        >
                <Image style={styles.addIcon} source={require('../../Assets/Add2.png')}/>
        <Text style={styles.addtext}>Add</Text>
        </TouchableOpacity> */}

        </View>
          
             <Text style={styles.textdur}>Duration: {duration}mins</Text>

        </View>
<View style={styles.deatilcontainer}

>
    <View style={styles.imagebox}>
        <Image source={{ uri: img }} style={styles.equipimg}></Image>
    </View>
    <View style={styles.textbox}>
        {/* <Text style={styles.headertext}></Text> */}
        <Text  style={styles.normaltext}>{title}</Text>
        <Text  style={styles.durtext}>{duration} mins</Text>


    </View>
</View>
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
         height:30,
         width:30,
       resizeMode:'contain'
    
      },
      addIcon:{
       height:25,
       width:25,
        resizeMode:'contain'
     
       },
       addtext:{
        color: '#141821',
        marginBottom:5,
        fontFamily: 'K2D-Normal',
        fontSize: 12,
        paddingLeft:5,
        alignSelf:'flex-end',

       },
    input: {
        borderWidth:1,
        borderColor: '#E5E5E5',
        width:wp('90%'),
        alignSelf:'center',
       fontFamily:'K2D-Regular',
       paddingLeft:10,
     //  color:'#AFAFAF',
       color: '#141821',
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
        marginLeft:5,
        marginTop:5
    },
    text5: {
        marginLeft:5,
        marginTop:5,
        color: '#1474F0',
      
        
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
      //  backgroundColor:'red',
        marginTop: 12,
        marginLeft: 10,
        height:20,
        width:20

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
        textAlign: 'center',
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
        alignSelf: 'flex-end',
        marginRight: wp('3%'),
        height: 30,
        width: 30,
        resizeMode: 'contain',
        marginTop: 10,
        //backgroundColor:'green'

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