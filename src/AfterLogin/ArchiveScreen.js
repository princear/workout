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
import moment from "moment";
import Header from '../Components/Header/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ApiScreen } from '../Api/ApiScreen'
import AsyncStorage from "@react-native-community/async-storage";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Modal from 'react-native-modal';
import Footer from '../Components/Footer/index'
import Swipeout from 'react-native-swipeout';
import DraggableFlatList from 'react-native-draggable-flatlist'
import DateTimePicker from "@react-native-community/datetimepicker";
import { withNavigation } from 'react-navigation';
import PTRView from 'react-native-pull-to-refresh';

class FlatListItem extends Component {

  constructor(props){

    super(props);
    this.state ={
      activeRowKey :null,
      dataSource: [],
      isPrivate:false,
      isVisible:true
    };
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

      const url1 = ApiScreen.base_url + ApiScreen.AllWorkouts
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

              
                    title:"",
                    is_archived:"1",
                    start:"0",
                    length:"20"
              


            })


        }).then(response => response.json())
        .then((responseJson) => {
          console.log('Excercixxxxxxxxxxxxxxse>>>>>>>>>>>>>>>>>>>>>>>>>>',responseJson.data)

          setTimeout(() => {
            this.setState({

              isLoading: false,
              dataSource: responseJson.data.workouts
              ,
           


            })
          }, 2000)

        })
        .catch(error => console.log(error))

    
}


deleteId( RowID){

  this.setState({isPrivate:true})

  console.log(RowID)
    

}


modelfalse = () => {
  // Alert.alert('API Pending');
 // const navigation= this.props.navigation
  this.setState({isPrivate:false})
 //navigation.navigate('AllWorkOuts')

}


Restore = async(WorkoutID) => {
  const deleteRow = WorkoutID;
  this.props.paraentFlatList.refreshFlatList(deleteRow)

  console.log(WorkoutID);

  
this.setState({
    isLoading: true
  })



  const login = await AsyncStorage.getItem('login');
  //console.log("dashboard", login);

  let data = JSON.parse(login);
    console.log('#################3',data)
  this.access_token = data;

  const restore = ApiScreen.base_url + ApiScreen.Archive
  console.log("restore:" + restore);
  fetch(restore,
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

          
                id:WorkoutID.toString(),
                action:"restore",
               
          


        })


    }).then(response => response.json())
    .then((responseJson) => {
      console.log('Excercise>>>>>>>>>>>>>>>>>>>>>>>>>>',responseJson.data)

      setTimeout(() => {
        this.setState({

          isLoading: false,
        //  dataSource: responseJson.data.workouts,
      


        })
      }, 2000)
      Alert.alert(responseJson.data.message);
     
      this.modelfalse()
     
    })
    .catch(error => console.log(error))
   
  console.log('Restore>>>>>>>>>>>>>>>')
 // navigattion.navigate('AllWorkOuts');
}



Remove = async (WorkoutID) =>  {
  console.log(WorkoutID);

  
  this.setState({
      isLoading: true
    })
  
  
  
    const login = await AsyncStorage.getItem('login');
    //console.log("dashboard", login);
  
    let data = JSON.parse(login);
      console.log('#################3',data)
    this.access_token = data;
  
    const del = ApiScreen.base_url + ApiScreen.Del_workout;
    console.log("restore:" + del);
    fetch(del,
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
  
            
                  id:WorkoutID.toString(),
                
                 
            
  
  
          })
  
  
      }).then(response => response.json())
      .then((responseJson) => {
        console.log('Excercise>>>>>>>>>>>>>>>>>>>>>>>>>>',responseJson.data)
  
        setTimeout(() => {
          this.setState({
  
            isLoading: false,
          //  dataSource: responseJson.data.workouts,
        
  
  
          })
        }, 2000)
        Alert.alert(responseJson.data.message);
      
  
        this.modelfalse()
      
      })
      .catch(error => console.log(error))
}


  render() {
    const swipeSetting ={
        autoClose:true,
        onClose:(secId,rowID,direction) => {
          //console.log(this.props.index);
          this.setState({activeRowKey:null});
        },
        onOPen:(secId,rowID,direction) => {
            console.log(this.props.index);
            Alert.alert('open');
        },
        right:[
          {
            onPress:() => {
            
           this.deleteId (this.props.item.id)
            
           
            },
            text:'Delete',type:'delete'
          }
        ],
       rowID:this.props.index,
       sectionID:1
    };


   
    return (
     
       <View>
      
      <Swipeout {...swipeSetting}
       
              autoClose='true'
              backgroundColor= 'transparent'>

                      <TouchableOpacity style={styles.deatilcontainer}
                     // onPress={this.delete.bind(this, item.id)} 
                   
                      >
                        
                          
                          <View style={styles.imagebox}>
                             
                               <Image 
                             source={{uri:this.props.item.image_original_path}}
                               //source={require('../../Assets/dummypic.png')}
                               style={styles.equipimg}></Image>  
                           </View>
                           <View style={styles.textbox}>
                                  <Text style={styles.headertext}>{this.props.item.title}</Text>
                                  <Text style={styles.normaltext}>{this.props.item.description}</Text>
                                
                              
                         </View>
                      </TouchableOpacity>
      
                      </Swipeout>

                      
                      {this.state.isPrivate == true && (
              
            
              <Modal  isVisible={this.state.isVisible}>
                 <View style={{backgroundColor:'#fff',padding:15}}>
             
            
               
                <View style={{}}>
               

               <Text style={styles.keeptext}>Shoulder press</Text>
               <TouchableOpacity style={{flexDirection:'row',marginTop:20}}
                onPress={() =>
                  {
                 
                  this.Restore(this.props.item.id)
                
                  }

                }
               >

                        <Image 
                            style={styles.icon}
                            source={require('../../Assets/Unarchive.png')}
                            />
            
                           <Text style={styles.successMsg}>Restore</Text>

               </TouchableOpacity>
             
               <TouchableOpacity style={{flexDirection:'row',marginTop:20}}
                onPress={() => this.Remove(this.props.item.id)}
               >

                        <Image 
                            style={styles.icon}
                            source={require('../../Assets/Delete.png')}
                            />
            
                           <Text style={styles.successMsg}>Remove</Text>

               </TouchableOpacity>

               <TouchableOpacity style={styles.whitebtn1}
                        onPress={() => this.modelfalse()}
                        >

                            <Text style={styles.text6}>Done</Text>
                        </TouchableOpacity>
                </View>    
  
</View>
</Modal>
  )}
  
      
      </View>
      
        
   

      
     )
  }

}




export default class ArchiveScreen extends Component {

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
            deleteRowKey:null

        };

    }
    

refreshFlatList = (deletedKey) => {
  this.setState((prevState) => {
    return{
      deleteRowKey:deletedKey
    };
  });
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

          const url1 = ApiScreen.base_url + ApiScreen.AllWorkouts
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

                  
                        title:"",
                        is_archived:"1",
                        start:"0",
                        length:"20"
                  


                })


            }).then(response => response.json())
            .then((responseJson) => {
             // console.log('Excercise>>>>>>>>>>>>>>>>>>>>>>>>>>',responseJson.data.workouts)

              setTimeout(() => {
                this.setState({

                  isLoading: false,
                  dataSource: responseJson.data.workouts
                  ,
               


                })
              }, 2000)

            })
            .catch(error => console.log(error))

           
      

    }


   

    _refresh = async () => {
 
      this.setState({
          isLoading: true
        })

        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);
    
        let data = JSON.parse(login);
          console.log('#################3',data)
        this.access_token = data;

        const url1 = ApiScreen.base_url + ApiScreen.AllWorkouts
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

                      title:"",
                      is_archived:"1",
                      start:"0",
                      length:"20"
                


              })


          }).then(response => response.json())
          .then((responseJson) => {
           // console.log('Excercise>>>>>>>>>>>>>>>>>>>>>>>>>>',responseJson.data.workouts)

            setTimeout(() => {
              this.setState({

                isLoading: false,
                dataSource: responseJson.data.workouts
                ,
             


              })
            }, 2000)

          })
          .catch(error => console.log(error))

         
    

  }


  

    render() {
  
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

              

           

<View style={styles.headTop}>
<TouchableOpacity style={{width:wp('20%'),paddingLeft:20 }}
                          onPress={() =>  this.props.navigation.navigate('Homep')}
                        >
                   <Image
                       style={{
                    height:20,
                    width:20
                       
                       }}
                       source={require('../../Assets/back.png')}
                   />
            </TouchableOpacity>   
            <View style={{width:wp('60%')}}>
                    <Text style={{ fontFamily: 'K2D-Normal',fontSize:16,fontWeight:'500',textAlign:'center'}}>Archives</Text>
                    </View>
                    <View style={{width:wp('20%')}}>
                  
                    </View>        
                       

                       
                
                
            </View>
            
                
            <PTRView onRefresh={this._refresh} >
                    <View style={{height:hp('75%')}}>


{this.state.dataSource ?

<FlatList
data={this.state.dataSource}
renderItem={({item,index}) => {
 return(

   <FlatListItem item={item} index ={index} paraentFlatList={this}>

   </FlatListItem>
 )

}}
>


</FlatList>
:

<View style={{ flex: 1, justifyContent: 'center', }}>

<Text style={{alignSelf:'center'}}>No Archive workout.</Text>
</View>


}

                      
                    
          
                    </View>
              </PTRView>      
           
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
    text4:{
        textAlign:'center',
       color:'#fff',
       fontFamily:'K2D-Normal',
      
       lineHeight:16
       
    },
    successMsg:{
     // textAlign: 'center',
      color: '#141821',
      fontFamily:'K2D-Normal',
      paddingLeft:10,
     // marginTop:10
    },
    text6: {
      textAlign: 'center',
      color: '#ffd',
      fontFamily:'K2D-Normal',
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
      alignSelf:'center',
      marginTop:20

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
  
    borderBottomColor:'#E5E5E5',
    borderBottomWidth:2,

    paddingTop:20,
    height:60,
   
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