import React, { Component } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,Animated,
  Text,TextInput,
  Image,
  useColorScheme,
  View,TouchableOpacity, Alert,
  ActivityIndicator
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ApiScreen } from "./Api/ApiScreen";
import AsyncStorage from "@react-native-community/async-storage";

export default class LoginScreen
 extends Component {
    constructor(props){
        super(props);
        this.state={

          isLoading:false,
          //email:'prince@delimp.com',
          //email:'tysellespencer@aol.com',
           email:'sudhanshu+axces@delimp.com',
           //password:'zoom@123',
          //password:'zoom@123',
          password:'admin@123',
          //password:'gocgoq-2futto-bezGub',
        

        }

    }

componentDidMount () {
setTimeout(() => {
  this.setState({isLoading:true});
  this.setState({isLoading:false});
  
}, 2000);
 
}

    on_login = async () => {
      
      console.log('click to login');
      const email = this.state.email;
      const password = this.state.password;
      console.log('mail'+email,'pass'+password);
 
      this.setState({
        isLoading:true
      })

      const url = ApiScreen.base_url + ApiScreen.Login ;
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
              
              email :email,
              password:password,
              device_type:"android",
              device_token:"p-CyFdgcPYM:APA91bHHewWA7Qh"
              
            })

        }).then((response) => response.json()).then((responseJson) =>
             
        {
          
          console.log("from login*** ");
          console.log("from login*** ",responseJson.data);
          this.setState({  isLoading:false })
           if(responseJson.status == '1'){
            console.log(responseJson.status)
              console.log("from login>>>>>>>>>>>> ",responseJson.data.user.name);
              AsyncStorage.setItem("login",JSON.stringify(responseJson.data.accessToken));
            AsyncStorage.setItem("id",JSON.stringify(responseJson.data.user.id));
       

            
            this.props.navigation.navigate("Home",{
                name: responseJson.data.user.name
            }); 
          
           }

           else{

              console.log(responseJson.status)
              const invalid =  responseJson.data.error[0]
              Alert.alert(invalid);
           
            }

          // this.setState({ ActivityIndicator_Loading : false });

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
                         <Text style={{fontFamily:'K2D-Medium',fontSize:20,textAlign:'center'}}> Welcome Back</Text>  
                         <Text style={{color:'#696D76',fontFamily:'K2D-Regular',fontSize:12,textAlign:'center'}}>Lorem Ipsum dolor sit amet consectetur{'\n'}adipiscing elit, sed do eiusmod tempor. </Text>  
                    </View> 

                <View style={{marginTop:20}}>
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
                         onChangeText ={(password) => this.setState({password})}
                        //value='123456'
                        secureTextEntry={true}
                          placeholder="Password"
                          style={styles.input}
                          >
                      </TextInput>

                      <TouchableOpacity
                      onPress = {() =>this.props.navigation.navigate('ForgotPassword') }
                      >
                    <Text style={styles.text2}>Forgot Password</Text>
                 </TouchableOpacity>
                 </View>
                 <View style={styles.searchSection}> 
                 <TouchableOpacity style={styles.button}
                    onPress={() => this.on_login()}>
                      
                    <Text style={styles.text4}>LOGIN</Text>
                 </TouchableOpacity>
                 </View>
                 <TouchableOpacity
                      onPress = {() =>this.props.navigation.navigate('RegisterScreen') }
                      >
                    <Text style={styles.text3}>Don't have an account? Sign Up</Text>
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