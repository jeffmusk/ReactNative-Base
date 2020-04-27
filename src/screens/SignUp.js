import React from 'react';
import { connect } from "react-redux";
import { View, Text } from 'react-native';

const SignUp = () => {
  return (
    <View>
      <Text>Registrate</Text>
    </View>
  );
};


function mapStateToProps(state) {
  return {
    state: state
  };
}

export default connect(mapStateToProps)(SignUp) ;

