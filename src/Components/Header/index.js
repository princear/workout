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
    Linking,SafeAreaView,
    ScrollView,
  } from "react-native";
import React, { Component } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ApiScreen } from "../../API/ApiScreen";
import AsyncStorage from "@react-native-community/async-storage";
import { back } from "react-native/Libraries/Animated/Easing";

  export default class Home extends Component {

    constructor(props) {
        
      super(props);
        this.state = {
        dataSource:[],
        name:''
        };
      
      }

      componentDidMount = async () => {

      
      }


      render(){
        
        return(

            <View style={styles.header}>
              
            <TouchableOpacity style={{width:wp('48%')}}
            onPress={() => this.props.navigation.openDrawer()}
            >
                   <Image
                       style={{
                       margin: 10,
                       // tintColor: '#f05c54',
                       width: 30,
                       resizeMode:'contain',
                       height: 30,
                       
                       }}
                       source={require('../../../Assets/02.png')}
                   />
            </TouchableOpacity>
            <View style={{width:wp('48%'),flexDirection:'row',marginTop:10,justifyContent:'flex-end'}}>
            <TouchableOpacity >
            <Image
                       style={{
                       marginRight: 10,
                       // tintColor: '#f05c54',
                       resizeMode:'contain',
                       width: 30,
                       height: 30,
                       
                       }}
                       source={require('../../../Assets/bell.png')}
                   />
              </TouchableOpacity>
            </View>
           
       </View>


        )
      }
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1, 
            backgroundColor:'#F8F8F8'
       
          
        },
        header:{
                flexDirection:'row',
                borderBottomWidth:2,
                borderBottomColor:'#F2F2F2',
               
                padding:10
        },
        usertext:{
            fontFamily:'Poppins-SemiBold',
            color:'#5F5F5F',
            paddingTop:5,
            fontSize:14,
           
        },
        userimg:{
                height:30,
                width:30,
                
        },

    })
