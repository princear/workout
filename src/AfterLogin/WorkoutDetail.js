import {
    View,
    Image,
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    Platform,
    Text,
    TextInput,
    Alert,BackHandler,
    TouchableOpacity,
    Linking, SafeAreaView,
    ScrollView, FlatList
} from "react-native";

import React, { Component } from "react";
import PropTypes from 'prop-types'
//import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import moment from "moment";
import { MenuProvider } from 'react-native-popup-menu';
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


export default class WorkoutDetail extends Component {

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
            Stime:'',
            SDate:'',
            isPrivate: false,
            isVisible: true,
            archived:'',

        };
        
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        
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

    modelfalse1 = (Eid,title,img,dur) => {
        console.log('$$$$$$$$$$$$$$$$$$$',Eid)
        this.setState({ isPrivate: false })
        this.props.navigation.navigate('CreateWorkout',{
            Eid:Eid,
            title:title,
            img:img,
            dur:dur
        });

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

        const Id = this.props.route.params.workId;
           console.log('Workid:'+Id) 
        this.setState({
            isLoading: true
        })



        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);

        let data = JSON.parse(login);
        console.log('#################3', data)
        this.access_token = data;

        const WorkoutDetail = ApiScreen.base_url + ApiScreen.WorkoutDetail
        console.log("url:" + WorkoutDetail);
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
                console.log('Equipment detailaa', responseJson.data.workout)

                setTimeout(() => {
                    this.setState({

                        isLoading: false,
                        // dataSource: responseJson.data.equipment,
                        id: responseJson.data.workout.id,
                        Title: responseJson.data.workout.title,
                        image: responseJson.data.workout.image_original_path,
                        description: responseJson.data.workout.description,
                        Stime: responseJson.data.workout.schedule_time,
                        SDate: responseJson.data.workout.schedule_date,
                        duration: responseJson.data.workout.workout_duration,
                        archived:responseJson.data.workout.is_archived


                    })
                }, 2000)

            })
            .catch(error => console.log(error))




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
            //  console.log('Excercise>>>>>>>>>>>>>>>>>>>>>>>>>>',responseJson.data.exercises)

              setTimeout(() => {
                this.setState({

                  isLoading: false,
                  dataSource: responseJson.data.exercises,
                //   Title:responseJson.data.equipment.title,
                //   image:responseJson.data.equipment.image_original_path,
                //   description:responseJson.data.equipment.description


                })
              }, 2000)

            })
            .catch(error => console.log(error))


    }

    archive = async (workID) => {

        this.setState({
            isLoading: true
        })



        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);

        let data = JSON.parse(login);
        console.log('#################3', data)
        this.access_token = data;

        const Archive = ApiScreen.base_url + ApiScreen.Archive
        console.log("url:" + Archive);
        fetch(Archive,
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

                        id: workID,
                        action:"add"


                    })


            }).then(response => response.json())
            .then((responseJson) => {
                console.log('Add to Archive', responseJson.data)

                setTimeout(() => {

                    this.setState({  isLoading:false })
                    if(responseJson.status == '1'){
                     console.log(responseJson.status)
                     
                     
                   
                  //  Alert.alert(responseJson.data.message);
                  this.componentDidMount()
         
                    }
         
                    else{
         
                       console.log(responseJson.status)
                       const invalid =  responseJson.data.error[0]
                       Alert.alert(invalid);
                    
                     }
                    
                }, 1000);
               

            })
            .catch(error => console.log(error))

    }

    archived = async (workID) => {

        this.setState({
            isLoading: true
        })



        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);

        let data = JSON.parse(login);
        console.log('#################3', data)
        this.access_token = data;

        const Archived = ApiScreen.base_url + ApiScreen.Archive
        console.log("url:" + Archived);
        fetch(Archived,
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

                        id: workID,
                        action:"remove"


                    })


            }).then(response => response.json())
            .then((responseJson) => {
                console.log('Remove from archive', responseJson.data)

                this.setState({  isLoading:false })
                if(responseJson.status == '1'){
                 console.log(responseJson.status)
                 
                 
               
              //  Alert.alert(responseJson.data.message);
              this.componentDidMount()
     
                }
     
                else{
     
                   console.log(responseJson.status)
                   const invalid =  responseJson.data.error[0]
                   Alert.alert(invalid);
                
                 }

            })
            .catch(error => console.log(error))

    }

    editworkout = async () => {


    }

    refresh() {


        this.componentDidMount();
        
    }


    render() {
      
        const WorkoutID = this.props.route.params.workId;

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
                             // onPress={() =>this.goBack()}
                              onPress={() =>this.props.navigation.navigate('AllWorkOuts')}
                            style={styles.button}>
                            <Image source={require('../../Assets/back.png')} style={styles.backiconTop} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width:wp('60%')}}>
                        <Text style={{ justifyContent: 'center', alignSelf: 'center', fontFamily: 'K2D-Normal', marginTop: 10, color: '#141821' }}>{this.state.Title}</Text>
                    </View>
                    <View style={{width:wp('20%')}}>
               <Menu>
                         <MenuTrigger>
                        {/* <TouchableOpacity

                            style={styles.button}> */}
                            <Image source={require('../../Assets/More.png')} style={styles.loginicon} />
                        {/* </TouchableOpacity> */}
                        </MenuTrigger>

                         <MenuOptions style={{paddingTop:20,paddingBottom:20}}>
                             {this.state.archived == "1" ?
                             <MenuOption style={{padding:10}} onSelect={() => this.archived( this.state.id)} text='Archived' />:
                             <MenuOption style={{padding:10}} onSelect={() => this.archive( this.state.id)} text='Archive' />
                             }
                           
                            <MenuOption style={{padding:10}}  onSelect={() =>
                            // Alert.alert('Under Process')
                            
                            this.props.navigation.navigate('EditWorkoutNew',{
                                    WorkID : WorkoutID,
                                    onGoBack:() => this.refresh()


                            })
                            
                            } text='Edit workout' />
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
                            <Image 
                        source={{uri:this.state.image}}
                        // source={require('../../Assets/dummypic.png')}
                         style={styles.equipimg}></Image> 
                            </View>
                           
                    <View style={styles.textbox}>
                       <Text style={styles.headertext}>{this.state.Title}</Text>
                       {/* <Text style={styles.normaltext}>{this.state.description}</Text> */}
                        <Text style={styles.normaltext}>Schedule:{moment().format(this.state.Stime)} - {moment(this.state.SDate).format( 'DD/MM/YYYY')}</Text>
                        <Text style={styles.normaltext}>Duration: {this.state.duration} mins</Text>
                    </View>
                        </View>
                        <Text style={styles.description}>{this.state.description}</Text>

                        {/* <View style={styles.buttoncontainer}>

                                <TouchableOpacity style={styles.buttonv}
                                //onPress={() => this.on_login()}
                                >

                                    <Text style={styles.text4}>Add Rest day</Text>
                                </TouchableOpacity>


                                <TouchableOpacity style={styles.whitebtn}
                                //  onPress={() => this.Add_donor()}
                                >

                                    <Text style={styles.text5}>Edit Rest day</Text>

                                </TouchableOpacity>

                        </View> */}
                   {this.state.dataSource ? 
                   
                   <View style={{ marginTop: 20 }}>
                   <View style={{flexDirection:'row'}}>

                   <Text style={styles.cat_title}>Exercises</Text>
                   <TouchableOpacity style={{width:wp('30%')}}
                   onPress={() => this.props.navigation.navigate('EditWorkout',{
                       WorkID : WorkoutID,
                       onGoBack:() => this.refresh()

               })}
                   >
                       <Text style={styles.ViewAll}>Edit Exercises</Text>
                   </TouchableOpacity>
                   </View>
                  


                   <FlatList

                       data={this.state.dataSource}
                       keyExtractor={(item, index) => index}
                       horizontal={true}

                       renderItem={({ item, index }) => (
                           <View>

                               <View style={styles.deatilcontainer}

                               >
                                   <View style={styles.imagebox}>
                                   <View style={styles.imagebox}>
                <Image source={{uri:item.image_original_path}} style={styles.equipimg}></Image> 
                <Text style={styles.headertext1}>{item.title}</Text>
                {item.status == 'Paused' ?
                <View style={{position:'absolute'}}>
                 <View style={[styles.overlay]} />
                 <View style={{alignItems:'center',height:90,width:90,justifyContent:'center'}}>
                 <Image 
             
                 source={require('../../Assets/paused.png')}
                 style={{resizeMode:'contain',height:10,width:10}}></Image> 
                 <Text style={{color:'#fff',fontFamily: 'K2D-Normal'}}>Paused</Text>
                  
                 </View>
                </View>
                :
                   <View/>
                }

               {item.status == 'Done' ?
                <View style={{position:'absolute'}}>
                 <View style={[styles.overlay]} />
                 <View style={{alignItems:'center',height:90,width:90,justifyContent:'center'}}>
                 <Image 
             
                 source={require('../../Assets/done.png')}
                 style={{resizeMode:'contain',height:10,width:10}}></Image> 
                 <Text style={{color:'#fff',fontFamily: 'K2D-Normal'}}>Done</Text>
                  
                 </View>
                </View>
                :
                   <View/>
                }

                <Text style={styles.catText}>{parseInt(item.left_duration / 60)} mins</Text>

            </View>
         
                                   </View>

                               </View>



                           </View>


                       )}
                   />

               </View>
                   
                   :

                   <View/>
                   }     






                        <View style={styles.buttoncontainer}>

                            <TouchableOpacity style={styles.workbutton}
                            onPress={() => this.props.navigation.navigate('StartWorkout',
                            {
                                WorkID : WorkoutID,
                                onGoBack:() => this.refresh()
                            }
                            )}

                            >

                                <Text style={styles.text4}>Start the Workout Now</Text>
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
                                <View>
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
                                   onPress={() => this.modelfalse2(
                                    this.state.id,this.state.Title,this.state.image,this.state.duration)}
                                >

                                    <Text style={styles.text5}>Add to Workout</Text>

                                </TouchableOpacity>

                            </View>


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
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        width: 90,
        height: 90
      }  ,
    backicon: {
        alignContent: 'flex-start',
        marginRight: wp('30%'),
        marginTop: 12,
        marginLeft: 10
    },

    backiconTop: {
        
        alignSelf: 'flex-start',
        marginLeft:20,
        marginTop: 6,
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
        paddingLeft: 20,
        width:wp('70%')
    },
    ViewAll:{
        fontFamily: 'K2D-Normal',
        fontSize: 14,
        paddingRight: 20,
       textAlign:'right'
    },

    head1: {

        flexDirection: 'row',
        //position:'absolute',
        //bottom:0,
        // borderBottomColor: '#E5E5E5',
        // borderBottomWidth: 2,
       
        width: wp('100%'),
        height: 50,
       
    },

    head: {
        flexDirection: 'row',
        //position:'absolute',
        //bottom:0,
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 2,
        width: wp('100%'),
        height: 50,
        paddingBottom:10
    },

    buttonv: {
       
        backgroundColor: '#1474F0',
        padding: 10,
        width: wp('43%'),
    },
    workbutton: {
       
        backgroundColor: '#1474F0',
        padding: 10,
        width: wp('90%'),
    },

    whitebtn: {
        width: wp('43%'),
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
    description:{
        color: '#696D76',
        fontFamily: 'K2D-Normal',
        fontSize: 12,
        padding:15
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
        padding: 10
        //resizeMode:'contain'


    },
    deatilcontainer: {
        flexDirection: 'row',
        marginTop: 10,
        paddingLeft: 20,
        paddingBottom:20
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
    headertext1: {
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
        height: 20,
        //justifyContent:'space-between',
        width: 20,
      
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