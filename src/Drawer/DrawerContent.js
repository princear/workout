import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView,TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { widthPercentageToDP } from 'react-native-responsive-screen';



export function DrawerContent(props) {




//  Capitalize(str){
    // return str.charAt(0).toUpperCase() + str.slice(1);
    // }

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
                <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>

                    <View style={{
                          borderBottomWidth:2,
                          borderBottomColor:'#E5E5E5',
                          flexDirection:'row',
                        
                        
                          
                        }}>
                    <View style={{width:wp('60%')}}>
                        <Text
                        style={{
                            textAlign:'center',
                            padding:15,
                            fontFamily:'K2D-Normal',
                            fontSize:16
                        }}
                        >Account Menu</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.closeDrawer()}
                    >
                            <Image
                            source={require('../../Assets/cross.png')}
                            style={{ resizeMode:'contain',height:20,width:20,marginTop:16}}
                     />
                     
                     </TouchableOpacity>      
                      
                    </View>
                      
                      <TouchableOpacity style={styles.ListContainer}
                      onPress={()=> {props.navigation.navigate('EditProfile')}}
                      >

                      <Image
                        source={require('../../Assets/editprofile.png')}
                        style={{ height: 20, width:20,marginLeft:13}}
                        
                        />

                        <Text style={styles.ListText}>Edit Profile</Text>

                        <Image
                        source={require('../../Assets/next.png')}
                        style={{ resizeMode:"contain",height:10,width:10,marginTop:5}}
                        
                        />

                      </TouchableOpacity>



                      <TouchableOpacity style={styles.ListContainer}
                      onPress={()=> {props.navigation.navigate('ArchiveScreen')}}
                      >

                      <Image
                        source={require('../../Assets/inbox.png')}
                        style={{ height: 20, width:20,marginLeft:13}}
                        
                        />

                        <Text style={styles.ListText}>Archives</Text>

                        <Image
                        source={require('../../Assets/next.png')}
                        style={{ resizeMode:"contain",height:10,width:10,marginTop:5}}
                        
                        />

                      </TouchableOpacity>

                      <TouchableOpacity style={styles.ListContainer}
                      onPress={()=> {props.navigation.navigate('EditProfile')}}
                      >

                      <Image
                        source={require('../../Assets/setting.png')}
                        style={{ height: 20, width:20,marginLeft:13}}
                        
                        />

                        <Text style={styles.ListText}>Settings</Text>

                        <Image
                        source={require('../../Assets/next.png')}
                        style={{ resizeMode:"contain",height:10,width:10,marginTop:5}}
                        
                        />

                      </TouchableOpacity>

                      <TouchableOpacity style={styles.ListContainer}
                      onPress={()=> {props.navigation.navigate('EditProfile')}}
                      >

                      <Image
                        source={require('../../Assets/help.png')}
                        style={{ height: 20, width:20,marginLeft:13}}
                        
                        />

                        <Text style={styles.ListText}>Help Center</Text>

                        <Image
                        source={require('../../Assets/next.png')}
                        style={{ resizeMode:"contain",height:10,width:10,marginTop:5}}
                        
                        />

                      </TouchableOpacity>

                      <TouchableOpacity style={styles.ListContainer}
                      onPress={()=> {props.navigation.navigate('Logout'),props.navigation.closeDrawer()}}
                      >

                      <Image
                        source={require('../../Assets/logout.png')}
                        style={{ height: 20, width:20,marginLeft:13}}
                        
                        />

                        <Text style={styles.ListText}>Logout</Text>

                      

                      </TouchableOpacity>

                    
 
                    {/*    <Drawer.Section style={styles.drawerSection}>
                        
               <DrawerItem style={{marginTop:0,}}

                        icon={({ focused, color, size }) => (
                        <Image
                        source={require('../../Assets/editprofile.png')}
                        style={{ height: 15, width:15}}
                        
                        />
                        )}


                        onPress={() => { props.navigation.navigate('EditProfile') }}

                        label="Edit Profile"
                        labelStyle={{ color: '#5F5F5F', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}


                />



</Drawer.Section>


<Drawer.Section style={styles.drawerSection}>

<DrawerItem style={{marginTop:0,}}

icon={({ focused, color, size }) => (
<Image
source={require('../../Assets/inbox.png')}
style={{ height: 15, width:15}}

/>
)}


onPress={() => { props.navigation.navigate('ArchiveScreen') }}

label="Archives"
labelStyle={{ color: '#5F5F5F', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}

/>
</Drawer.Section>

<Drawer.Section style={styles.drawerSection}>

<DrawerItem style={{marginTop:0,}}

icon={({ focused, color, size }) => (
<Image
source={require('../../Assets/setting.png')}
style={{ height: 15, width:15}}

/>
)}


//onPress={() => { props.navigation.navigate('Logout') }}

label="Settings"
labelStyle={{ color: '#5F5F5F', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}

/>
</Drawer.Section>

<Drawer.Section style={styles.drawerSection}>

<DrawerItem style={{marginTop:0,}}

icon={({ focused, color, size }) => (
<Image
source={require('../../Assets/help.png')}
style={{ height: 15, width:15}}

/>
)}


//onPress={() => { props.navigation.navigate('Logout') }}

label="Help Center"
labelStyle={{ color: '#5F5F5F', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}

/>
</Drawer.Section> */}

{/* <Drawer.Section style={styles.drawerSection}>

<DrawerItem style={{marginTop:0,}}

icon={({ focused, color, size }) => (
<Image
source={require('../../Assets/logout.png')}
style={{ height: 15, width:15}}

/>
)}


onPress={() => { props.navigation.navigate('Logout') }}

label="Logout"
labelStyle={{ color: '#5F5F5F', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}

/>
</Drawer.Section> */}


</View>
                </DrawerContentScrollView>
              
            </View>


        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        margin: 0,
        padding: 0,
    },
    userInfoSection: {

        height: 140,
        justifyContent: 'center',
        marginTop: 0
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',

    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    ListContainer: {
        flexDirection:'row',
       marginTop:10,
        padding:10
       // marginTop: 10,
        //paddingTop: 10

    },
    ListText:{

        color: '#5F5F5F',
        paddingLeft:15,
        fontSize: 14,
        width:wp('51%'),
        //backgroundColor:'red',
        fontFamily: 'Poppins-SemiBold' 
    },
   
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,

        paddingHorizontal: 16,
    },
});
