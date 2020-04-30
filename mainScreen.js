import * as React from 'react';
import { connect } from "react-redux";
import { View, Text , Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from './src/screens/GeneralScreen/Loading';

import SignIn from './src/screens/auth/SignUp';
import Login  from './src/screens/auth/Login';
import resetPassword from './src/screens/auth/resetPassword';

import Home  from './src/screens/HomeScreen';
import {logoutUser} from './src/store/actions';



/* function Login({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login </Text>
      <Button
        title="Registrate"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}
 */
const Stack = createStackNavigator();

function MainScreen(props) {
  return (
    <NavigationContainer>
      {props.isLoading ? 
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Loading" component={Loading} />
      </Stack.Navigator>
      :
      !props.isAuthenticated ? 
        <Stack.Navigator initialRouteName={"resetPassword"} headerMode="none">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen  name="SignUp" component={SignIn} options={{
            title: 'Registro'
          }} />
          <Stack.Screen name="resetPassword" component={resetPassword} options={{
            title: 'Recuperar contraseña'
          }} />


        </Stack.Navigator>
        :
        <Stack.Navigator initialRouteName={"Home"}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>   
    }
    </NavigationContainer>
  );
}

function mapStateToProps(state) {
  return {
    state: state,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
  };
}


export default connect(mapStateToProps)(MainScreen) ;

