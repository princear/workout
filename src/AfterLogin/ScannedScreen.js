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

import Header from '../Components/Header/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ApiScreen } from '../Api/ApiScreen'
import AsyncStorage from "@react-native-community/async-storage";



export default class ScannedScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: [],
            name: '',
            dataSource1: [],
            dataSource2: '',
            title:'',
            desc:'',
            img:'',
        };

    }
    
    componentDidMount = async () => {

       

        this.setState({
            isLoading: true
          })
      
          const Id = this.props.route.params.Equp_id;
      
          const login = await AsyncStorage.getItem('login');
          //console.log("dashboard", login);
      
          let data = JSON.parse(login);
            console.log('#################3',data)
          this.access_token = data;

          const url = ApiScreen.base_url + ApiScreen.EquipmentDetail
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
       // console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.equipment.image_thumb_path)

        setTimeout(() => {
          this.setState({

            isLoading: false,
            title: responseJson.data.equipment.title,
            desc: responseJson.data.equipment.description,
            img: responseJson.data.equipment.image_thumb_path

          })
        }, 2000)

      })
      .catch(error => console.log(error))



   

    }
    

 
    render() {

        const Id = this.props.route.params.Equp_id;
       
        if(this.state.isLoading == true)  
        
        return <View style={{flex:1,justifyContent:'center',position:'absolute',top:'50%',left:'40%'}}>

          <ActivityIndicator 
   
            color="#00ff00"
            size="large"
            style={{
                backgroundColor: "rgba(20,116,240,.8)",
            height: 80,
            width: 80,
            zIndex: 999,
            borderRadius: 15
            }}
            size="small"
            color="#0000ff"
         
         /> 

     </View>


        return (

            <View style={styles.container}>
                <ScrollView>
                 {/* <Text style={{textAlign:'center',justifyContent:'center'}}>Scanned Equipment Id: {Id}</Text>  */}
                 <ImageBackground source={require('../../Assets/fitness.png')} style={styles.image}>
                   
                    <Image source={require('../../Assets/QR.png')} style={styles.logo}>

                    </Image>

                </ImageBackground>

               
                <View style={styles.deatilcontainer}>
                    <View style={styles.imagebox}>
                        <Image source={{uri:this.state.img}} style={styles.equipimg}></Image>
                     </View>
                     <View style={styles.textbox}>
                       <Text style={styles.headertext}>{this.state.title}</Text>
                       <Text numberOfLines={6}  style={styles.normaltext}>{this.state.desc}</Text>
                     </View>
                </View>

                <View style={styles.deatilcontainer}>
                   
                    <TouchableOpacity style={styles.button}
                    onPress={() => this.on_login()}>
                      
                    <Text style={styles.text4}>View Details</Text>
                 </TouchableOpacity> 
                
                   
                     <TouchableOpacity style={styles.whitebtn}
                    onPress={() => this.props.navigation.navigate('Bookmark')}>
                      
                    <Text style={styles.text5}>Bookmark</Text>
                     </TouchableOpacity> 
                   
                </View>

                {/* {(this.state.isLoading) &&
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

                <Header
                    navigation={this.props.navigation}
                />

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

                {/*  <View style={styles.logoblock}>
                   
                 
                           <Image source={require('../../Assets/logo.png')} style={styles.logo}>

                           </Image>
                  
                   </View>
                   <View style={{marginTop:20}}>
                         <Text style={{fontFamily:'K2D-Medium',fontSize:28,textAlign:'center'}}> Welcome To Home</Text>  
                    </View>
                    <View style={styles.BackColor}>
                   
                 
                   <Image source={require('../../Assets/Home.png')} style={styles.homebanner}>

                   </Image>
          
           </View>
            <Text style={{color:'#696D76',fontFamily:'K2D-Regular',fontSize:14,textAlign:'center'}}>Lorem Ipsum dolor sit amet consectetur{'\n'}adipiscing elit, sed do eiusmod tempor. </Text>  */}

        </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    button:{
        backgroundColor:'#1474F0',
        padding:10,
        width:wp('40%'),
       
       
      
    },
    whitebtn:{
        width:wp('40%'),
        padding:10,
        borderWidth:1,
        borderColor:'#1474F0',
        marginLeft:20

    },
    text4:{
        textAlign:'center',
       color:'#fff' 
    },
    text5:{
        textAlign:'center',
       color:'#1474F0' 
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
           height:hp('15%'),
           width:wp('30%'),
           resizeMode:'contain'

       },
       deatilcontainer:{
            flexDirection:'row',
            padding:20
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
       alignSelf:'center',
       bottom:10,
       position:'absolute'
    },
    homebanner:{
        //resizeMode:'center',
             height:hp('30%'),
             width:wp('70%'),
       justifyContent:'center',
       alignSelf:'center'
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