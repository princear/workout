import React, { Component } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,TextInput,
  Image,
  useColorScheme,
  View,TouchableOpacity, Alert,
  ActivityIndicator,
  TouchableOpacityBase
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ApiScreen } from "../Api/ApiScreen";
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';


import AsyncStorage from "@react-native-community/async-storage";


export default class EditProfile
 extends Component {
    constructor(props){
        super(props);
        this.state={

          isLoading:false,
          
          email:'',
          //email:'tysellespencer@aol.com',
          password:'',
          loginin:'',
          choose_photo:'',
          choose_photo2:'',
          phone:'',
          img:''
          //password:'gocgoq-2futto-bezGub',
        

        }

    }

    
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
       this.setState({

         choose_photo: source,
        // isPrivate:false
     
       });
    }
  });

}

    componentDidMount = async() =>{
        this.setState({

          isLoading:true
        })

        const id = await AsyncStorage.getItem('id');
      
      
        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);
    
        let data = JSON.parse(login);
          console.log('#################3',data)
        this.access_token = data;

        const url = ApiScreen.base_url + ApiScreen.GetUser
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

          user_id: id,
         

        })


    }).then(response => response.json())
    .then((responseJson) => {
     // console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.equipment.image_thumb_path)

      setTimeout(() => {
        this.setState({

          isLoading: false,
          loginin: responseJson.data.user.name,
          email:responseJson.data.user.email,
          phone:responseJson.data.user.phone,
          img:responseJson.data.user.image_original_path,
         // password:responseJson.data.user.password
       

        })
      }, 2000)

    })
    .catch(error => console.log(error))



      
    }

    on_login = async () =>{
      const choose_photo1 =  this.state.choose_photo.uri;

      ImgToBase64.getBase64String(choose_photo1)
      .then(base64String  => {
    
        if (base64String) {
          const pic1 = "data:image/jpeg;base64," + base64String
           // console.log('imagessssssssssssssss',pic1)
           this.setState({
    
             choose_photo2: pic1,
         
           });
        }
      
        
      })
      
      console.log('click to login');
      const name = this.state.loginin;
      
      const email = this.state.email;
      const password = this.state.password;
      
      console.log('mail'+email,'pass'+password,name);
 
      this.setState({
        isLoading:true
      })

      const login = await AsyncStorage.getItem('login');
      //console.log("dashboard", login);
  
      let data = JSON.parse(login);
        console.log('#################3',data);
      this.access_token = data;

      const editprofile = ApiScreen.base_url + ApiScreen.EditProfile
console.log("url:" + editprofile);
fetch(editprofile,
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
              
              name:this.state.loginin,
              email :email,
              password:password,
              phone:this.state.phone,
              image_type_format:'base64',
              image:this.state.choose_photo2,
              iso2:'in',
              dialCode:'91'
              
            })

        }).then((response) => response.json()).then((responseJson) =>
             
        {
          console.log("from login*** ");
          console.log("from login*** ",responseJson.data);
          this.setState({  isLoading:false })
           if(responseJson.status == '1'){
            console.log(responseJson.status)
              console.log("from login ",responseJson.data);
           
            Alert.alert(responseJson.data.message);
            //Alert.alert(responseJson.data.message);
           //this.props.navigation.goBack(null);
             this.props.navigation.navigate("Auth",{
            //     name: responseJson.data.user.name
             }); 

           }

           else{

              console.log(responseJson.status)
              const invalid =  responseJson.data.error[0]
              Alert.alert(invalid);
           
            }

           this.setState({ ActivityIndicator_Loading : false });

        }).catch((error) =>
        {
          this.setState({
            isLoading:false
          })
            console.error(error);

        });

    }


  



render(){

        return(

                <SafeAreaView style={styles.container}>
                   {(this.state.isLoading) &&
                        <View style={{flex:1,justifyContent:'center',position:'absolute',top:'50%',left:'40%'}}>
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

                        </View>}
                        <View style={styles.head}>
                        <TouchableOpacity style={{width:wp('20%')}}
                          onPress={() =>  this.props.navigation.replace('Home')}
                        >
                   <Image
                       style={{
                       margin: 10,
                       // tintColor: '#f05c54',
                      height:20,width:20
                       
                       }}
                       source={require('../../Assets/back.png')}
                   />
            </TouchableOpacity>
            <View style={{width:wp('60%')}}>
                    <Text style={{justifyContent:'center',alignSelf:'center',marginTop:10}}>Edit Profile</Text>
                    </View>

                    <View style={{width:wp('20%')}}>
                   
                    </View>        
                
                
            </View>
            


                     <ScrollView>
                    <View style={styles.BackColor}>
                    {
  this.state.choose_photo ?
  <Image source={{uri:this.state.choose_photo.uri}} style={{height:100,width:100,alignContent:'center',alignSelf:'center',marginTop:10,borderRadius:50}}/>:

                            <Image 
                           // source={require('../../Assets/profile.png')}
                            source={{uri:this.state.img}}
                     //        style={styles.logo}>
style={{height:100,width:100,alignContent:'center',alignSelf:'center',marginTop:10,borderRadius:50}}>
                            </Image>
}                             
                      <TouchableOpacity
                      onPress={()=> this.choose_photo()}
                      >
                            <Text style={styles.pic}>Change Photo</Text>
                            </TouchableOpacity>
                    </View>
                    

                <View style={{marginTop:20}}>
                    <View style={styles.searchSection}> 
                  <Text style={styles.text1}>Display Name</Text>
                      <TextInput autoCorrect={false}
                           onChangeText={(loginin) => this.setState({loginin})}
                          value={this.state.loginin}
                          placeholder="Email Address"
                          style={styles.input}
                        >
                      </TextInput>
                      
                 </View>

                 <View style={styles.searchSection}> 
                 <Text style={styles.text1}>Email</Text>
                  <TextInput autoCorrect={false}
                       onChangeText={(email) => this.setState({email})}
                      value={this.state.email}
                      placeholder="Email Address"
                      style={styles.input}
                    >
                  </TextInput>
                  
             </View>

             <View style={styles.searchSection}> 
                 <Text style={styles.text1}>Phone Number</Text>
                  <TextInput autoCorrect={false}
                       onChangeText={(phone) => this.setState({phone})}
                      value={this.state.phone}
                      placeholder="Phone Number"
                      keyboardType='numeric'
                      style={styles.input}
                    >
                  </TextInput>
                  
             </View>
                    <View style={styles.searchSection}> 
                    <Text style={styles.text1}>Password</Text>
                        <TextInput autoCorrect={false}
                         onChangeText ={(password) => this.setState({password})}
                         value={this.state.password}
                        secureTextEntry={true}
                          placeholder="Password"
                          style={styles.input}
                          >
                      </TextInput>

                    
                 </View>
                 </View> 
                 <View style={{marginTop:hp('10%')}}> 
                 <View style={styles.searchSection}> 
                 <TouchableOpacity style={styles.button}
                    onPress={() => this.on_login()}>
                      
                    <Text style={styles.text4}>Save</Text>
                 </TouchableOpacity>
                 </View>
                 <TouchableOpacity
                 style={{alignItems:'center'}}
                     // onPress = {() =>this.props.navigation.navigate('RegisterScreen') }
                      >
                    <Text style={styles.text1}>See our <Text style={styles.text3}>Terms of Service  <Text style={styles.text1}>and <Text style={styles.text3}>Privacy Policy</Text></Text></Text></Text>
                 </TouchableOpacity>
                 </View>
                 </ScrollView>
                </SafeAreaView>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
     //   flexDirection: "column",
        backgroundColor:'#fff'
    
    },

    image: {

        height:hp('35%'),
        margin:0,
       // resizeMode: "center",
        justifyContent:'center',
       
       },

       BackColor:{
          
       },

       logo:{
           resizeMode:'cover',
                //height:100,
                //width:100,
          justifyContent:'center',
          alignSelf:'center',
          marginTop:20
       },
       searchSection:{
       
        marginLeft:10,
        marginRight:10,
       marginBottom:10
      
      
      
       

    },
    head:{
      flexDirection:'row',
      //position:'absolute',
      //bottom:0,
      borderBottomColor:'#E5E5E5',
      borderBottomWidth:2,
      width:wp('100%'),
      height:50
  },

    input: {
        borderWidth:1,
        borderColor: '#E5E5E5',
       // width:wp('90%'),
       fontFamily:'K2D-Regular',
       paddingLeft:10,
       color:'#AFAFAF'
    
    },
    text4: {
        color: '#fff',
        fontSize: 12,
       marginTop:5,
      paddingLeft:5,
        textAlign: "center",
        fontFamily:'K2D-Bold'
      },
      text1: {
        color: '#141821',
        fontSize: 12,
      
      padding:5,
        
        fontFamily:'K2D-Regular'
      },
      pic: {
        color: '#141821',
        fontSize: 12,
      textAlign:'center',
      padding:5,
        
        fontFamily:'K2D-Regular'
      },
      text2: {
        color: '#1474F0',
        fontSize: 12,
       marginTop:5,
      paddingRight:5,
        alignSelf:'flex-end',
        fontFamily:'K2D-Regular'
      },

      text3: {
        color: '#1474F0',
        fontSize: 12,
       marginTop:5,
      paddingRight:5,
        alignSelf:'center',
        fontFamily:'K2D-Regular'
      },
      button:{
          backgroundColor:'#1474F0',
          padding:10,
         
         
      }


})