import React,{ useEffect, useState } from 'react';
import { connect } from "react-redux";
import { View, Text , StyleSheet , TouchableOpacity,ScrollView} from 'react-native';

import {  Input , Icon, Button,Image } from 'react-native-elements';

import {signup , clearErrorMessage} from '../../store/actions'
import logo from '../../../assets/minilogo.png'
console.ignoredYellowBox = ['Setting a timer'];


const SignIn = (props) => {
  
  const _textInput  = React.createRef();
  const _pass1  = React.createRef();
  const _pass2  = React.createRef();

  const [emailMessage, setEmailMessage] = useState('');
  const [passMessage, setPassMessage] = useState('');
  const [email, setEmail] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [emailValid , setEmailValit] = useState('');

  const {dispatch} = props


  const signInWithEmail = () => {
    setPassMessage('')
    if(validateEmail() ){
      setEmailMessage('')
      if(pass1 !== '' && pass2 !== '' && pass1 === pass2 && pass1.length > 5){
        setPassMessage('');
          /* creacion de cuenta*/
        dispatch(clearErrorMessage(''))
        dispatch(signup(email ,pass1));
      }else{
        _pass1.current.shake();
        _pass2.current.shake();
        if(pass1.length > 5 ){
          /* creacion de cuenta*/
          pass1 !== pass2 ? setPassMessage('Las contraseñas no coinciden') : 
            setPassMessage('El campo de contraseña no puede estar vacio') ;
        }else{
          setPassMessage('La contraseña debe contener minimo 6 caracteres')
        }
      }
    }else{
      setEmailMessage('El email tiene un formato incorrecto')
      _textInput.current.shake(); 
    }
  }

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    emailValid ? setEmailMessage('') : false;
    return emailValid; 
  }

  return (
    <ScrollView  keyboardShouldPersistTaps="handled"
    contentContainerStyle={styles.container} >

        <Image
          style={styles.logo}
          source={logo}
        />
        
        <Input style={styles.input} placeholder='Email' 
        ref={_textInput}
        onChangeText={inputEmail => setEmail(inputEmail) }
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainer}
        onChange={() => {validateEmail()}}
        errorMessage={ emailMessage === '' ? null : emailMessage }
        leftIcon={
          <Icon name={'envelope'} type={'simple-line-icon'} color="#FD8712" size={18} />
        }
        />

        <Input style={styles.input} placeholder='Contraseña' 
        secureTextEntry={true}
        ref={_pass1}
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainer}
        onChangeText={pass1 => setPass1(pass1) }
        leftIcon={
          <Icon name={'lock'} type={'simple-line-icon'} color="#FD8712" size={18} />
        }

        />
  
        <Input style={styles.input} placeholder='Confirmar Contraseña' 
        ref={_pass2}
        autoCapitalize="none"
        keyboardAppearance="dark"
        secureTextEntry={true}
        onChangeText={pass2 => setPass2(pass2) }
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainer}
        errorMessage={ passMessage === '' ? null : passMessage }
        leftIcon={
          <Icon name={'lock'} type={'simple-line-icon'} color="#FD8712" size={18} />
        }
        />
        <Button
            loading={props.checkIn}
            title="Registrarse"
            buttonStyle={styles.button}
            onPress={(e)=> {signInWithEmail(e)}} 
          />

        {/* Mensaje de exito */}
        {
          props.successfulRegistration ? <Text style={styles.message}> {props.message}  </Text>  
          : <Text/>
        }
        {/* Mensaje de error */}
        {
          props.errorRegistration ? <Text style={styles.errorMessage}> {props.errorMessage}  </Text>  
          : <Text/>
        }
 
        
        
        <TouchableOpacity style={styles.footer}  
        onPress={() => props.navigation.navigate('Login')} >
          
          <Text  style={styles.footerText}>
            Ya tengo cuenta
          </Text>          
        </TouchableOpacity>

      </ScrollView>
   
  );
};


function mapStateToProps(state) {
  return {
    checkIn: state.auth.checkIn,
    message: state.auth.message,
    errorMessage: state.auth.errorMessage,
    errorRegistration: state.auth.errorRegistration,
    successfulRegistration : state.auth.successfulRegistration
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
    color: '#FD8712',
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
    position: 'absolute',
    bottom: 15,
  },
  footerText:{
    color: 'grey',
  }
})


export default connect(mapStateToProps)(SignIn) ;

