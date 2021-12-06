import React, { Component } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,TextInput,
  Image,Alert,ActivityIndicator,
  useColorScheme,
  View,TouchableOpacity
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ApiScreen } from "./Api/ApiScreen";
import AsyncStorage from "@react-native-community/async-storage";


export default class RegisterScreen
 extends Component {
    constructor(props){
        super(props);
        this.state={
          isLoading:false,

          name:"App User Lipo",   
          email:"Prince+app_user_lipo@delimp.com",
          phone:"9953862900",
          password:"admin@123"

        }

    }


    on_login(){
      
      console.log('click to login');
      const name = this.state.name;
      const email = this.state.email;
      const phone = this.state.phone;
      const password = this.state.password;
      console.log('mail'+email,'pass'+password,name,phone);

      this.setState({
        isLoading:true
      })

      const url = ApiScreen.base_url + ApiScreen.Register ;
      console.log(url,email,password);

      fetch(url,
  
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(
            {
              
              name:name,
              email :email,
              phone: phone,
              password:password,
              device_type:"android",
              device_token:"e-CyFdgcPYM:APA91bHHewWA7Qh"
              
            })

        }).then((response) => response.json()).then((responseJson) =>
        
        {
          console.log("from login*** ");
          console.log("from login*** ",responseJson.data.message);
          this.setState({  isLoading:false })
           if(responseJson.status == '1'){
            console.log(responseJson.status)
              //console.log("from login ",responseJson.data);
            
           
            Alert.alert(responseJson.data.message);
           //this.props.navigation.goBack(null);
           // this.props.navigation.navigate("Home");

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

                     <ScrollView>
                    <View style={styles.BackColor}>
                   
                    <ImageBackground   source={require('../Assets/loginbanner.png')} style={styles.image}>
                            <Image source={require('../Assets/logo.png')} style={styles.logo}>

                            </Image>
                    </ImageBackground>
                    </View>
                    <View style={{marginTop:20}}>
                         <Text style={{fontFamily:'K2D-Medium',fontSize:20,textAlign:'center'}}> Register</Text>  
                         <Text style={{color:'#696D76',fontFamily:'K2D-Regular',fontSize:12,textAlign:'center'}}>Lorem Ipsum dolor sit amet consectetur{'\n'}adipiscing elit, sed do eiusmod tempor. </Text>  
                    </View> 

                <View style={{marginTop:20}}>
                   
                    <View style={styles.searchSection}> 
                        <TextInput autoCorrect={false}
                              onChangeText={(name) => this.setState({name})}
                              //value='garun@delimp.com'
                              placeholder="Name"
                              style={styles.input}
                            >
                          </TextInput>
                    </View>
                    <View style={styles.searchSection}> 
                        <TextInput autoCorrect={false}
                              onChangeText={(email) => this.setState({email})}
                              //value='garun@delimp.com'
                              placeholder="Email Address"
                              style={styles.input}
                            >
                          </TextInput>
                    </View>
                    <View style={styles.searchSection}> 
                        <TextInput autoCorrect={false}
                              onChangeText={(phone) => this.setState({phone})}
                              //value='garun@delimp.com'
                              placeholder="Phone"
                              keyboardType = 'numeric'
                              style={styles.input}
                            >
                          </TextInput>
                    </View>

                    <View style={styles.searchSection}> 
                   
                        <TextInput autoCorrect={false}
                         onChangeText ={(password) => this.setState({password})}
                        //value='123456'
                        secureTextEntry={true}
                          placeholder="Password"
                          style={styles.input}
                          >
                      </TextInput>

                      <TouchableOpacity
                       onPress = {() =>this.props.navigation.navigate('LoginScreen') }
                      >
                    <Text style={styles.text2}>Login</Text>
                 </TouchableOpacity>
                 </View>
                 <View style={styles.searchSection}> 
                 <TouchableOpacity style={styles.button}
                     onPress={() => this.on_login()}  >
                    <Text style={styles.text4}>Register</Text>
                 </TouchableOpacity>
                 </View>
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

     

       logo:{
           resizeMode:'cover',
                //height:100,
                //width:100,
         alignSelf:'center'
       },
       searchSection:{
       
        marginLeft:10,
        marginRight:10,
       marginBottom:10
      
      
      
       

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
      text2: {
        color: '#1474F0',
        fontSize: 12,
       marginTop:5,
      paddingRight:5,
        alignSelf:'flex-end',
        fontFamily:'K2D-Regular'
      },
      button:{
          backgroundColor:'#1474F0',
          padding:10,
         
         
      }


})