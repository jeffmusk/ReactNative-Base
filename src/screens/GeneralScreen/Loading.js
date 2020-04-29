import React from 'react';
import { View,StyleSheet , ActivityIndicator} from 'react-native';

const styles = StyleSheet.create({
  continer:{
    flex: 1 ,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const Loading = () => {
  return (
    <View style={styles.continer}>
      <ActivityIndicator size="large" color="#FD8712"  />
    </View>
  );
};

export default Loading;