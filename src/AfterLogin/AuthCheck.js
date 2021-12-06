import React, {Component} from 'react';

import {View, StyleSheet, Alert, Image, ActivityIndicator} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

export default class AuthCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
     
    };
  }

  componentDidMount = async () => {
    console.log('wokring from Auth check');

    setTimeout(() => {
    this.setState({isLoading:true});
    this.setState({isLoading:false});     
    this.readData();
    }, 2000);
  }

  readData = async () => {
 

   
     
      const login = await AsyncStorage.getItem('login');
     // const name = await AsyncStorage.getItem('name');
      

      if (login !== null  ) {
       

        this.props.navigation.replace('Home');
      } else {
        
        this.setState({isLoading:true})
        this.props.navigation.replace('LoginScreen');
        this.setState({isLoading:false})
      }
   
  };

  render() {
    

    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      
      <ActivityIndicator 
    
    color="#ffffff"
           size="large"
           style={{
             backgroundColor: "rgba(20,116,240,.8)",
             height: 80,
             width: 80,
             zIndex: 999,
             borderRadius: 15
           }}
           size="small"
           
            /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width:'100%',
    height:'100%',
    
    
        resizeMode: 'stretch'
        
  }
});
