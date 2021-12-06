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
import { MenuProvider } from 'react-native-popup-menu';

import React, { Component } from "react";
import PropTypes from 'prop-types'
//import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';

import Header from '../Components/Header/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ApiScreen } from '../Api/ApiScreen'
import AsyncStorage from "@react-native-community/async-storage";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Modal from 'react-native-modal';
import Footer from '../Components/Footer/BlackFooter'




export default class ExcerciseDetail extends Component {

    constructor(props) {

        super(props);
        this.state = {

            isLoading: false,
            dataSource: [],
            Title: '',
            image: '',
            description: '',
            dataSource1: [],
            dataSource2: '',
            isPrivate: false,
            isVisible: true,
            isVideo:false,
            isVideoVisible:true,
            vid:'',
            Video:'',
            bookmark:''

        };

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



    goBack = () => {

        this.props.route.params.onGoBack();
        this.props.navigation.goBack();

      }
      
      
      refresh() {
      
        this.componentDidMount();
      
      }
      

    modelfalse1 = (Eid,title,img,dur) => {
      
        console.log('$$$$$$$$$$$$$$$$$$$',Eid)
        this.setState({ isPrivate: false })
        this.props.navigation.navigate('CreateWorkout',{
            Eid:Eid,
            title:title,
            img:img,
            dur:dur,
            onGoBack:() => this.refresh()
        });
    }

    sendtomodal(id,video){

        this.setState({
  
          isVideo:true,
          vid:id,
          Video:video
  
        })
  
  
      }

      Videomodelfalse(){

                    this.setState({
            
                        isVideo:false,
                    
                })

      }

    modelfalse2 = (Eid,title,img,dur) => {
        
        console.log('$$$$$$$$$$$$$$$$$$$',Eid)
        this.setState({ isPrivate: false })
        this.props.navigation.navigate('AddToWorkout',{
            Eid:Eid,
            title:title,
            img:img,
            dur:dur
        });

    }


    componentDidMount = async () => {

        const Id = this.props.route.params.EquipId;

        this.setState({
            isLoading: true
        })



        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);

        let data = JSON.parse(login);
        console.log('#################3', data)
        this.access_token = data;

        const url = ApiScreen.base_url + ApiScreen.ExcerciseDetail
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

                        id: Id,


                    })


            }).then(response => response.json())
            .then((responseJson) => {
                console.log('Equipment detailaa', responseJson.data.exercise)

                setTimeout(() => {
                    this.setState({

                        isLoading: false,
                        // dataSource: responseJson.data.equipment,
                        id: responseJson.data.exercise.id,
                        Title: responseJson.data.exercise.title,
                        image: responseJson.data.exercise.image_original_path,
                        description: responseJson.data.exercise.description,
                        reps: responseJson.data.exercise.reps,
                        sets: responseJson.data.exercise.sets,
                        duration: responseJson.data.exercise.duration,
                        bookmark:responseJson.data.exercise.bookmark_id


                    })
                }, 2000)

            })
            .catch(error => console.log(error))




        //   const url1 = ApiScreen.base_url + ApiScreen.EquipRelateExcercise
        //   console.log("url1:" + url1);
        //   fetch(url1,
        //     {
        //       method: 'POST',
        //       headers: new Headers({
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'x-access-token': this.access_token
        //         // <-- Specifying the Content-Type

        //       }),

        //       body: JSON.stringify(
        //         {

        //           id: Id,


        //         })


        //     }).then(response => response.json())
        //     .then((responseJson) => {
        //       console.log('Excercise detailaa',responseJson.data.exercises)

        //       setTimeout(() => {
        //         this.setState({

        //           isLoading: false,
        //           dataSource: responseJson.data.exercises,
        //         //   Title:responseJson.data.equipment.title,
        //         //   image:responseJson.data.equipment.image_original_path,
        //         //   description:responseJson.data.equipment.description


        //         })
        //       }, 2000)

        //     })
        //     .catch(error => console.log(error))




        const url2 = ApiScreen.base_url + ApiScreen.ExcRelatedVedio
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
                console.log('Excercise detailaa', responseJson.data.videos)

                setTimeout(() => {
                    this.setState({

                        isLoading: false,
                        dataSource1: responseJson.data.videos,
                        //   Title:responseJson.data.equipment.title,
                        //   image:responseJson.data.equipment.image_original_path,
                        //   description:responseJson.data.equipment.description


                    })
                }, 2000)

            })
            .catch(error => console.log(error))




    }
    bookmark = async (ExcrciseId) => {

        this.setState({
           // isLoading: true,
            bookmark:ExcrciseId
        })

        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);

        let data = JSON.parse(login);
        console.log('#################3', data)
        this.access_token = data;

        const Bookmark = ApiScreen.base_url + ApiScreen.bookmark
        console.log("url:" + Bookmark);
        fetch(Bookmark,
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

                        id: ExcrciseId,
                        action:"add"


                    })


            }).then(response => response.json())
            .then((responseJson) => {
                console.log('Equipment detailaa', responseJson.data)

                this.setState({  isLoading:false })
                if(responseJson.status == '1'){
                 console.log(responseJson.status)
                  // console.log("from login ",responseJson.data.user.name);
                 
               
               // Alert.alert(responseJson.data.message);
              //  this.componentDidMount()
              
     
                }
     
                else{
     
                   console.log(responseJson.status)
                   const invalid =  responseJson.data.error[0]
                   Alert.alert(invalid);
                
                 }

            })
            .catch(error => console.log(error))


    }
    

    Unbookmark = async (ExcrciseId) => {

        this.setState({
           // isLoading: true,
            bookmark:null
        })



        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);

        let data = JSON.parse(login);
        console.log('#################3', data)
        this.access_token = data;

        const Bookmark = ApiScreen.base_url + ApiScreen.bookmark
        console.log("url:" + Bookmark);
        fetch(Bookmark,
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

                        id: ExcrciseId,
                        action:"remove"


                    })


            }).then(response => response.json())
            .then((responseJson) => {
                console.log('Equipment detailaa', responseJson.data)

                this.setState({  isLoading:false })
                if(responseJson.status == '1'){
                 console.log(responseJson.status)
                 
                 
               
              //  Alert.alert(responseJson.data.message);
            //  this.componentDidMount()
     
                }
     
                else{
     
                   console.log(responseJson.status)
                   const invalid =  responseJson.data.error[0]
                   Alert.alert(invalid);
                
                 }

            })
            .catch(error => console.log(error))


    }
    


    render() {

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
 <MenuProvider>
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
                            onPress={() => this.props.navigation.navigate('Bookmark')}
                            style={styles.button}>
                            <Image source={require('../../Assets/back.png')} style={styles.backiconTop} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width:wp('60%')}}>
                        <Text style={{ justifyContent: 'center', alignSelf: 'center', fontFamily: 'K2D-Normal', marginTop: 10, color: '#141821' }}>{this.state.Title}</Text>
                    </View>
                    <View style={{width:wp('20%')}}>
                    <Menu>
    
                    {this.state.bookmark == null ? 
                    
                    <MenuTrigger>
                    {/* <TouchableOpacity

                        style={styles.button}> */}
                        <Image source={require('../../Assets/Bookmark=Default.png')} style={styles.loginicon} />
                    {/* </TouchableOpacity> */}
                    </MenuTrigger>
                    
                    : 
                    <MenuTrigger>
                    {/* <TouchableOpacity

                        style={styles.button}> */}
                        <Image source={require('../../Assets/Bookmark=Selected.png')} style={styles.loginicon} />
                    {/* </TouchableOpacity> */}
                    </MenuTrigger>
                    
                    }

                 
                        <MenuOptions style={{paddingTop:20,paddingBottom:20}}>

                        {this.state.bookmark == null ?

                            
        <MenuOption  style={{padding:10}} onSelect={() => this.bookmark( this.state.id)} text='Bookmark' /> :
        <MenuOption  style={{padding:10}} onSelect={() => this.Unbookmark( this.state.bookmark)} text='Bookmarked' /> 
    }  
      
        {/* <MenuOption onSelect={() => alert(`Delete`)} >
          <Text style={{color: 'red'}}>Delete</Text>
        </MenuOption>
        <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' /> */}
      </MenuOptions>
    </Menu>
                    </View>
                </View>

               
   
                <View>


                    <View>

                        <View style={styles.deatilcontainer}>
                           
                            <View style={styles.imagebox}>
                                <Image source={{ uri: this.state.image }} style={styles.equipimg}></Image>
                            </View>
                            <View style={styles.textbox}>
                                {/* <Text style={styles.headertext}></Text> */}
                                <Text numberOfLines={5} style={styles.normaltext}>{this.state.description}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.cat_title}>Categories</Text>

                            <View style={styles.catData}>
                                <View style={{ width: wp('30%') }}>
                                    <View style={{ width: 50 }}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.replace('Home')}
                                            style={styles.button}>
                                            <Image source={require('../../Assets/heart.png')} style={styles.heart} />
                                        </TouchableOpacity>
                                        <Text style={styles.catText}>Cardio</Text>
                                    </View>
                                </View>
                                <View style={{ width: wp('35%') }}>
                                    <View style={{ width: 100, }}>
                                        <TouchableOpacity

                                            style={styles.button}>
                                            <Image source={require('../../Assets/headphones.png')} style={styles.headphone} />
                                        </TouchableOpacity>
                                        <Text style={styles.catText}>Power Training</Text>
                                    </View>
                                </View>
                                <View style={{ width: wp('40%') }}>
                                    <View style={{ width: 100 }}>
                                        <TouchableOpacity

                                            style={styles.button}>
                                            <Image source={require('../../Assets/sun.png')} style={styles.yoga} />
                                        </TouchableOpacity>
                                        <Text style={styles.catText}>Yoga</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    {/* {this.state.dataSource1 ?
                    
                    <View style={{ marginTop: 20 }}>
                    <Text style={styles.cat_title}>Videos</Text>


                    <FlatList

                        data={this.state.dataSource1}
                        keyExtractor={(item, index) => index}
                        horizontal={true}

                        renderItem={({ item, index }) => (
                            <View>

                                <View style={styles.deatilcontainer}

                                >
                                    <View style={styles.imagebox}>
                                    <View  style={{ width: 100, height: 100 }}>
                                    <TouchableOpacity
              onPress={()=> this.sendtomodal(item.id,item.video)}
              >
             
             
              <Image source={{uri:item.thumbnail_image_thumb_path}} style={styles.equipimg}></Image> 
              </TouchableOpacity>
                                    </View>
                                        {/* <Image source={{uri:item.thumbnail_image_thumb_path}} style={styles.equipimg}></Image>  */}
                                        {/* <Text style={styles.headertext}>{item.title}</Text>
                 <Text style={styles.catText}>{item.duration}s</Text> 
                                                                    */}

                                {/*     </View>

                                </View>



                            </View>


                        )}
                    />

                </View>
                    :
                    <View/>
                    
                    }
 */}

                        <View style={{ marginTop: 15 }}>
                            <Text style={styles.cat_title}>Training</Text>
                            <Text style={styles.recText}>Recommended Routine</Text>

                            <View style={styles.catData}>
                                <View style={{ width: wp('25%')}}>
                                    <View style={{ width: 50, marginLeft: 20 }}>

                                        <Text style={styles.TrainingText}>Reps: {this.state.reps}</Text>
                                    </View>
                                </View>
                                <View style={{ width: wp('30%') }}>
                                    <View style={{ width: 100, }}>

                                        <Text style={styles.TrainingText}>Sets: {this.state.sets}</Text>
                                    </View>
                                </View>
                                <View style={{ width: wp('30%') }}>
                                    <View style={{ width: 100 }}>

                                        <Text style={styles.TrainingText}>Duration: {this.state.duration} mins</Text>
                                    </View>
                                </View>
                            </View>

                            <FlatList

                                data={this.state.dataSource}
                                keyExtractor={(item, index) => index}
                                horizontal={true}

                                renderItem={({ item, index }) => (
                                    <View>

                                        <TouchableOpacity style={styles.deatilcontainer}
                                            onPress={() => this.props.navigation.navigate('EquipDetail', {
                                                EquipId: item.id

                                            })}
                                        >
                                            <View style={styles.imagebox}>
                                                <Image source={{ uri: item.image_thumb_path }} style={styles.equipimg}></Image>
                                                <Text style={styles.headertext}>{item.title}</Text>
                                                <Text style={styles.catText}>{item.duration}mins</Text>

                                            </View>

                                        </TouchableOpacity>



                                    </View>


                                )}
                            />





                        </View>

                        <View style={styles.buttoncontainer}>

                            <TouchableOpacity style={styles.buttonv}
                            //onPress={() => this.on_login()}
                            >

                                <Text style={styles.text4}>Start Now</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.whitebtn}
                                onPress={() => this.Add_donor()}
                            >

                                <Text style={styles.text5}>Schedule</Text>

                            </TouchableOpacity>

                        </View>

                    </View>



                </View>


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
                                    <Text  numberOfLines={5} style={styles.normaltext}>{this.state.description}</Text>


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
                                   onPress={() => this.modelfalse2(
                                    this.state.id,this.state.Title,this.state.image,this.state.duration)}
                                >

                                    <Text style={styles.text5}>Add to Workout</Text>

                                </TouchableOpacity>

                            </View>


                        </View>
                    </Modal>
                )}



{this.state.isVideo == true && (
              
              <Modal  isVisible={this.state.isVideoVisible}>

            <View style={{backgroundColor:'#fff',paddingBottom:20}}>
             
              <TouchableOpacity
               onPress={() => this.Videomodelfalse()}
               >

                  <Text style={styles.closemodalStyle}>X</Text>
               
               </TouchableOpacity>
       
                  <VideoPlayer
                    video={{ uri: this.state.Video }}
                    style={ styles.equipvideo }
                    fullScreenOnLongPress
                    //onShowControls	={true}
                    fullscreen={true}
                    resizeMode="cover"
                    controls={true}
                    paused={false}
                    autoplay={false}
                   // thumbnail={{uri:item.thumbnail_image_thumb_path}}
                    ref={(ref) => {
                    this.player = ref
                    }} />
  
</View>
</Modal>
  )}



<Footer
                    navigation={this.props.navigation}
                />
                </MenuProvider>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    catText: {
        fontFamily: 'K2D-Normal',
        fontSize: 12,
        color: '#B9B9B9',
        textAlign: 'center',
        paddingTop: 5


    },
    text4: {
        textAlign: 'center',
        color: '#fff'
    },
    text5: {
        textAlign: 'center',
        color: '#1474F0'
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
        marginLeft: 10,
        height:20,
        width:20
    },

    backiconTop: {

        alignSelf: 'flex-start',
        marginLeft:20,
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
       
        backgroundColor: '#1474F0',
        padding: 10,
        width: wp('40%'),
    },

    whitebtn: {
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
        color: '#696D76',
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
        padding: 10,
        resizeMode:'contain'


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
        marginRight:20,
        height: 30,
        //justifyContent:'space-between',
        width: 30,
        //justifyContent:'flex-end',
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