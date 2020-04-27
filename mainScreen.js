import * as React from 'react';
import { connect } from "react-redux";
import { View, Text , Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './src/screens/SignUp';



function HomeScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hola Jeff</Text>
    </View>
  );
}

function Login({navigation}) {
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

const Stack = createStackNavigator();

function MainScreen(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        {console.log(props)}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
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

