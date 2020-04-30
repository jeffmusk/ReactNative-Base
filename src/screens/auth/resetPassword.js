import React,{ useEffect, useState } from 'react';
import { connect } from "react-redux";
import { View, Text , StyleSheet , TouchableOpacity,Dimensions} from 'react-native';

import {  Input , Icon, Button,Image } from 'react-native-elements';
import { clearErrorMessage ,  firebaseResetPassword} from '../../store/actions'
import logo from '../../../assets/minilogo.png'


console.ignoredYellowBox = ['Setting a timer'];

const window = Dimensions.get('window');

const resetPassword = (props) => {
  
  const {dispatch} = props
  const _textInput  = React.createRef();
  const [emailMessage, setEmailMessage] = useState('');
  const [email, setEmail] = useState('');

  const sendResetPassword = () => {

    setEmailMessage('')
    if(validateEmail() ){
      /* envio de email parar restaurar contraseña */
      dispatch(firebaseResetPassword(email)) 
      console.log("email enviado");
    }else{
      setEmailMessage('Formato de email incorrecto')
      _textInput.current.shake(); 
    }
  }

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    return emailValid; 
  }

  return (
    <View style={styles.container}  >

        <Image
          style={styles.logo}
          source={logo}
        />
        

        <Input style={styles.input} placeholder='Email con el que creaste la cuenta' 
          ref={_textInput}
          onChangeText={inputEmail => setEmail(inputEmail) }
          inputStyle={styles.inputStyle}
          inputContainerStyle={styles.inputContainer}
          errorMessage={ emailMessage === '' ? null : emailMessage }
          leftIcon={
            <Icon name={'envelope'} type={'simple-line-icon'} color="#FD8712" size={18} />
          }
        />


        <Button
            loading={props.checkIn}
            title="Restablecer contraseña"
            buttonStyle={styles.button}
            onPress={()=> {sendResetPassword()}} 
          />

        {/* Mensaje de exito */}
        {
          props.resetPasswordMessage !== '' ? <Text style={styles.message}> {props.resetPasswordMessage}  </Text>  
          : <Text/>
        }
        {/* Mensaje de error */}
       

        <View style={styles.footer} >
          <View style={styles.footerElement}>
          <TouchableOpacity  onPress={() => props.navigation.navigate('Login')} >
              <Text  style={styles.footerText}>
              Iniciar sesion
              </Text>          
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => props.navigation.navigate('SignUp')} >
              <Text  style={styles.footerText}>
                Registrarme
              </Text>          
            </TouchableOpacity>

          </View>
        </View>
       
      </View>
   
  );
};


function mapStateToProps(state) {
  return {
    checkIn: state.auth.checkIn,
    message: state.auth.message,
    errorMessage: state.auth.errorMessage,
    isLoading: state.auth.isLoading,
    resetPasswordMessage: state.auth.resetPasswordMessage
  };
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: 70, 
    height: 70,
    marginBottom:20, 
  },
  inputs:{
   backgroundColor: '#fff',
   justifyContent: 'space-around',
  },
  input: {
    paddingLeft: 8,
    marginTop: 10
  },
  button:{
    marginTop: 10,
    backgroundColor: '#FD8712',
    borderRadius: 40,
    paddingLeft: 80,
    paddingRight: 80
  },
  message:{
    marginTop: 20,
    padding: 20 ,
    color: 'grey',
    textAlign:'justify'
  },
  errorMessage: {
    marginTop: 20,
    padding: 20 ,
    fontWeight: 'bold',
    color: 'red',
    textAlign:'justify'
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#FD8712',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'grey',
    fontSize: 16,
  },
  footer:{
    width: window.width -  25 ,
    position: 'absolute',
    bottom: 15,
  },
  footerElement:{
    flex:1 ,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText:{
    color: 'grey',
  }
})

export default connect(mapStateToProps)(resetPassword) ;

