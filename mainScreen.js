import * as React from 'react';
import { connect } from "react-redux";
import { View, Text , Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './src/screens/SignUp';
import Login  from './src/screens/Login';
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
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" huy={props} component={Home} />
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen  name="SignUp" component={SignIn} options={{
          title: 'Registro'
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function mapStateToProps(state) {
  return {
    state: state
  };
}


export default connect(mapStateToProps)(MainScreen) ;

