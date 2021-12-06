import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';
import Home from '../AfterLogin/Home';
import Logout from '../Logout';
import ForgotPassword from '../ForgotPassword';
import AuthCheck from '../AfterLogin/AuthCheck'
import ScannedScreen from '../AfterLogin/ScannedScreen';
import LinearGradient from 'react-native-linear-gradient';
import AddToWorkout from '../AfterLogin/AddToWorkout';
import Bookmark from '../AfterLogin/Bookmark';
import EquipDetail from '../AfterLogin/EquipDetail'
import Workouts from '../AfterLogin/Workouts';
import Finished from '../AfterLogin/Finished';
import Scheduled from '../AfterLogin/Scheduled';
import AllWorkOuts from '../AfterLogin/AllWorkOuts';
import Excercise from '../AfterLogin/Excercise';
import { DrawerContent } from '../Drawer/DrawerContent'
import ExcerciseDetail from '../AfterLogin/ExcerciseDetail';
import CreateWorkout from '../AfterLogin/CreateWorkout';
import EditProfile from '../AfterLogin/EditProfile';
import Favorites from '../AfterLogin/Favorites';
import WorkoutDetail from '../AfterLogin/WorkoutDetail';
import CreateWorkoutonly from '../AfterLogin/CreateWorkoutonly';
import BookMarkDetail from '../AfterLogin/BookMarkDetail';
import StartWorkout from '../AfterLogin/StartWorkout';
import EditWorkout from '../AfterLogin/EditWorkout';
import WarmUpWorkout from '../AfterLogin/WarmUpWorkout';
import ExerciseWorkout from '../AfterLogin/ExerciseWorkout';
import ArchiveScreen from '../AfterLogin/ArchiveScreen';
import CongratsScreen from '../AfterLogin/CongratsScreen';
import Profile from '../AfterLogin/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Image, View,TouchableOpacity,Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { enableScreens } from 'react-native-screens';
import EditWorkoutNew from '../AfterLogin/EditWorkoutNew';


enableScreens();
const Stack = createStackNavigator();

function SignInScreen() {
  return (


    <Stack.Navigator initialRouteName='AuthCheck'>

      <Stack.Screen
        name="AuthCheck"
        component={AuthCheck}
        options={{
          title: 'AuthCheck',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: 'LoginScreen',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: 'ForgotPassword',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

       <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'RegisterScreen',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  )
}


function MyTabBar({ state, descriptors, navigation }) {
        
  return (
      <View 
      style={{
       
          flexDirection:'row',
         // position:'absolute',
          bottom:0,
      
          borderTopColor:'#E5E5E5',
          borderTopWidth:1,
          width:wp('100%'),
          backgroundColor:'#fff',
          height:50
   
        }}>
      {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
              options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                      ? options.title
                      : route.name;


        const isFocused = state.index === index;
          let showlabel = "";
          let iconNm = "";
          if (label == "AllWorkOuts") {
             // showlabel = "Dashboard";
              iconNm = require('../../Assets/bluedumble.png');


              {isFocused ?
                iconNm = require('../../Assets/bluedumble.png')
                :
                iconNm = require('../../Assets/dumble.png')
              }

            }




          if (label == "Bookmark") {
             // showlabel = "Settings";
              iconNm = require('../../Assets/homeb.png');


              {isFocused ?
              
                iconNm = require('../../Assets/homeb.png')
              
                :
                iconNm = require('../../Assets/homeicon.png')
              }
          }

         
            
          if (label == "Home") {
            //showlabel = "Home";
            iconNm = require('../../Assets/Profile=Selected.png');

            {isFocused ?
              iconNm = require('../../Assets/Profile=Selected.png')
              :
              iconNm = require('../../Assets/login.png')
            }
        }

          // if (label == "bell") {
          //     showlabel = "Notification";
          //     iconNm= label;
          // }

          // if (label == "envelope") {
          //     showlabel = "Contact us";
          //     iconNm = label
          // }
       

          const onPress = () => {
              const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
              }
          };

          const onLongPress = () => {
              navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
              });
          };

          return (
          
              <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityStates={isFocused ? ['selected'] : []}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{flex: 1, justifyContent: 'center', alignItems: 'center' ,padding:8}}
                  key={route.key}
              >
                   {/* <Icon size={24} name={iconNm} color={isFocused ? '#FFFFFF' : '#d3d3d3'} />  */}
                   <View style={{flexDirection:'row',}}>

                   <Image source={iconNm} style={{marginRight:40,marginLeft:40,resizeMode:'contain',width:30,height:30}}/>

             
                  {/* <Text style={{ alignSelf: 'center', color: isFocused ? '#000' : '#0008', fontSize: 13,fontWeight:'bold' }}>
                      {showlabel}
                  </Text> */}
                  </View>  
              </TouchableOpacity>
             
          );
      })}
  </View>
  );
}

const HomeStack = createBottomTabNavigator();

function MainNavigation1() {

  return (

    <HomeStack.Navigator initialRouteName='Homep' tabBar={props => <MyTabBar {...props} />} >

      


      {/* <HomeStack.Screen
        name="Homep"
        component={Home}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      /> */}


{/* <HomeStack.Screen
        name="ScannedScreen"
        component={ScannedScreen}
        options={{
          title: 'ScannedScreen',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      /> */}


      <HomeStack.Screen
        
        name="Bookmark"
        component={MyTabs}
        options={{
        title: 'Bookmark',
      
        headerStyle: {
        backgroundColor: '#e85b3d',
          
          },

          headerShown: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
          fontWeight: 'bold',
          },
        }}
      />
{/* 
<HomeStack.Screen
        
        name="CreateWorkout"
        component={CreateWorkout}
        options={{
        title: 'CreateWorkout',
        headerStyle: {
        backgroundColor: '#e85b3d',
          
          },

          headerShown: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
          fontWeight: 'bold',
          },
        }}
      />

<HomeStack.Screen
        
        name="Profile"
        component={Profile}
        options={{
        title: 'Profile',
        headerStyle: {
        backgroundColor: '#e85b3d',
          
          },

          headerShown: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
          fontWeight: 'bold',
          },
        }}
      />

<HomeStack.Screen
        
        name="EditProfile"
        component={EditProfile}
        options={{
        title: 'EditProfile',
        headerStyle: {
        backgroundColor: '#e85b3d',
          
          },

          headerShown: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
          fontWeight: 'bold',
          },
        }}
      /> 
     

<HomeStack.Screen
        
        name="EquipDetail"
        component={EquipDetail}
        options={{
        title: 'EquipDetail',
        headerStyle: {
        backgroundColor: '#e85b3d',
          
          },

          headerShown: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
          fontWeight: 'bold',
          },
        }}
      />

<HomeStack.Screen
        
        name="ExcerciseDetail"
        component={ExcerciseDetail}
        options={{
        title: 'ExcerciseDetail',
        headerStyle: {
        backgroundColor: '#e85b3d',
          
          },

          headerShown: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
          fontWeight: 'bold',
          },
        }}
      />
{/* 
<HomeStack.Screen
        
        name="ArchiveScreen"
        component={ArchiveScreen}
        options={{
        title: 'ArchiveScreen',
        headerStyle: {
        backgroundColor: '#e85b3d',
          
          },

          headerShown: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
          fontWeight: 'bold',
          },
        }}
      />


<HomeStack.Screen
        
        name="WorkoutDetail"
        component={WorkoutDetail}
        options={{
        title: 'WorkoutDetail',
        headerStyle: {
        backgroundColor: '#e85b3d',
          
          },

          headerShown: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
          fontWeight: 'bold',
          },
        }}
      />



    <HomeStack.Screen
        name="Excercise"
        component={Excercise}
        options={{
          title: 'Excercise',
          headerStyle: {

            backgroundColor: '#e85b3d',
          
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

<HomeStack.Screen
        name="AddToWorkout" 
        component={AddToWorkout}
        options={{
          title: 'AddToWorkout',
          headerStyle: {

            backgroundColor: '#e85b3d',
          
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

<HomeStack.Screen
        name="Favorites" 
        component={Favorites}
        options={{
          title: 'Favorites',
          headerStyle: {

            backgroundColor: '#e85b3d',
          
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />   

      <HomeStack.Screen
        name="CongratsScreen" 
        component={CongratsScreen}
        options={{
          title: 'CongratsScreen',
          headerStyle: {

            backgroundColor: '#e85b3d',
          
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />      */}
{/* 
<HomeStack.Screen
        name="Workouts" 
        component={Workouts}
        options={{
          title: 'Workouts',
          headerStyle: {

            backgroundColor: '#e85b3d',
          
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
 */}


<HomeStack.Screen
        name="AllWorkOuts" 
        component={WorkoutTabs}
        options={{
          title: 'AllWorkOuts',
          headerStyle: {

            backgroundColor: '#e85b3d',
          
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

<HomeStack.Screen
        name="Homep"
        component={Home}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

{/*       
<HomeStack.Screen
        name="CreateWorkoutonly" 
        component={CreateWorkoutonly}
        options={{
          title: 'CreateWorkoutonly',
          headerStyle: {

            backgroundColor: '#e85b3d',
          
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

<HomeStack.Screen
        name="BookMarkDetail" 
        component={BookMarkDetail}
        options={{
          title: 'BookMarkDetail',
          headerStyle: {

            backgroundColor: '#e85b3d',
          
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />


<HomeStack.Screen
        name="StartWorkout" 
        component={StartWorkout}
        options={{
          title: 'StartWorkout',
          headerStyle: {

            backgroundColor: '#e85b3d',
          
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

<HomeStack.Screen
        name="EditWorkout" 
        component={EditWorkout}
        options={{
          title: 'EditWorkout',
          headerStyle: {

            backgroundColor: '#e85b3d',
          
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

    <HomeStack.Screen
        name="WarmUpWorkout" 
        component={WarmUpWorkout}
        options={{
          title: 'WarmUpWorkout',
          headerStyle: {

            backgroundColor: '#e85b3d',
          
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

<HomeStack.Screen
        name="ExerciseWorkout" 
        component={ExerciseWorkout}
        options={{
          title: 'ExerciseWorkout',
          headerStyle: {

            backgroundColor: '#e85b3d',
          
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      /> 

<HomeStack.Screen
        name="Scheduled" 
        component={Scheduled}
        options={{
          title: 'Scheduled',
          headerStyle: {

            backgroundColor: '#e85b3d',
          
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

<HomeStack.Screen
        name="Finished" 
        component={Finished}
        options={{
          title: 'Finished',
          headerStyle: {

            backgroundColor: '#e85b3d',
          
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      

      <HomeStack.Screen
        name="Logout"
        component={Logout}
        options={{
          title: 'Logout',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      */}
    </HomeStack.Navigator>


  )
}


const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (


    <Tab.Navigator initialRouteName='Bookmark'
    tabBarOptions={{
      labelStyle: { textTransform: 'none' }
    }}

    >
    
      <Tab.Screen
        name="Equipment"
        component={Bookmark}
       
        options={{
          title: 'Equipment',
        
          headerStyle: {
            backgroundColor: '#e85b3d',
           
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      

      <Tab.Screen
        name="Exercises"
        component={Excercise}
        options={{
          title: 'Exercises',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

       <Tab.Screen
        name="Workouts"
        component={Workouts}
        options={{
          title: 'Bookmarks',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  )
}




const workTab = createMaterialTopTabNavigator();

function WorkoutTabs() {
  return (


    <workTab.Navigator initialRouteName='AllWorkOuts'
    tabBarOptions={{
      labelStyle: { textTransform: 'none' }
    }}
    >

     
      
      <workTab.Screen
        name="AllWorkOuts"
        component={AllWorkOuts}
        options={{
          title: 'All Workouts',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      

      <workTab.Screen
        name="Scheduled"
        component={Scheduled}
        options={{
          title: 'Scheduled',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

       <workTab.Screen
        name="Finished"
        component={Finished}
        options={{
          title: 'Finished',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </workTab.Navigator>
  )
}





const BottomTab = createBottomTabNavigator();

function BottomTabs() {
  return (


    <BottomTab.Navigator initialRouteName='Bookmark'>
     
      <BottomTab.Screen
        name="Equipment"
        component={MyTabs}
        options={{
       
          title: 'Bookmark',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,
        
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <BottomTab.Screen
        name="Exercises"
        component={WorkoutTabs}
        options={{
          title: 'AllWorkOuts',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

<BottomTab.Screen
        name="Homep"
        component={Home}
        options={{
          title: 'User',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      
    </BottomTab.Navigator>
  )
}




const Drawer = createDrawerNavigator();
function MyDrawer() {

  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={MainNavigation1} />
      {/* <Drawer.Screen name="Home" component={MainNavigation1} /> */}
    
    </Drawer.Navigator>
  );

}


const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={false} >
        {/* <Stack.Screen name="AuthCheck" component={AuthCheck} /> */}
          <Stack.Screen name="Auth" component={SignInScreen} />  
         <Stack.Screen name="BookmarkTab" component={MyTabs} />
         {/* <Stack.Screen name="BottomTab" component={BottomTabs} /> */}
         <Stack.Screen name="EquipDetail" component={EquipDetail} />
         <Stack.Screen name="WarmUpWorkout" component={WarmUpWorkout} />
         <Stack.Screen name="ExerciseWorkout" component={ExerciseWorkout} />

         <Stack.Screen name="CongratsScreen" component={CongratsScreen} />
         <Stack.Screen name="EditWorkout" component={EditWorkout} />
         <Stack.Screen name="EditWorkoutNew" component={EditWorkoutNew} />

         <Stack.Screen name="ArchiveScreen" component={ArchiveScreen} />
         <Stack.Screen name="EditProfile" component={EditProfile} />

    
        <Stack.Screen name="ExcerciseDetail" component={ExcerciseDetail} />
        <Stack.Screen name="BookMarkDetail" component={BookMarkDetail} />
        <Stack.Screen name="CreateWorkout" component={CreateWorkout} />
        <Stack.Screen name="AddToWorkout" component={AddToWorkout} />

        <Stack.Screen name="WorkoutTab" component={WorkoutTabs} />
        <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} />
        <Stack.Screen name="StartWorkout" component={StartWorkout} />
        <Stack.Screen name="CreateWorkoutonly" component={CreateWorkoutonly} />
        <Stack.Screen name="Logout" component={Logout} />
        
         <Stack.Screen name="Home" component={MyDrawer} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default MainNavigation;