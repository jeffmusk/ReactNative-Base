import React from 'react';
import { connect } from "react-redux";
import { View, Text , Button} from 'react-native';
import {logoutUser} from '../store/actions';

const HomeScreen = (props) => {
  const {dispatch} = props
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {console.log(props)}
      <Text>Hola Jeff HOME</Text>
      <Button
        title="Cerrar sesion"
        onPress={() => {dispatch(logoutUser())}}
      />
    </View>
  );
};

function mapStateToProps(state) {
  return {
    checkIn: state.auth.checkIn,
    message: state.auth.message,
    errorMessage: state.auth.errorMessage,
  };
}

export default connect(mapStateToProps)(HomeScreen) ;

