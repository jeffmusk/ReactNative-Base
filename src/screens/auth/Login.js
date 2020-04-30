import React,{ useEffect, useState } from 'react';
import { connect } from "react-redux";
import { View, Text , StyleSheet , TouchableOpacity,Dimensions,ScrollView} from 'react-native';

import {  Input , Icon, Button,Image } from 'react-native-elements';
import {  loginUser} from '../../store/actions'
import logo from '../../../assets/minilogo.png'
console.ignoredYellowBox = ['Setting a timer'];

const window = Dimensions.get('window');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Login = (props) => {
  
  const {dispatch} = props
  const _textInput  = React.createRef();
  const _pass1  = React.createRef();
  
  const [email, setEmail] = useState('');
  const [pass1, setPass1] = useState('');
  
  const [emailMessage, setEmailMessage] = useState('');
  const [passMessage, setPassMessage] = useState('');


  const loginWithEmail = () => {
    setPassMessage('')
    setEmailMessage('')
    if(validateEmail() ){
      if(pass1.length > 5) {
        dispatch(loginUser(email , pass1))
      }else{
        setPassMessage('La contraseña contiene minimo 6 caracteres')
        _pass1.current.shake(); 
      }
    }else{
      setEmailMessage('Formato de email incorrecto')
      _textInput.current.shake(); 
    }
  }

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    emailValid ? setEmailMessage('') : false ;
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
        onChange={() => {validateEmail()}}
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainer}
        errorMessage={ emailMessage === '' ? null : emailMessage }
        leftIcon={
          <Icon name={'envelope'} type={'simple-line-icon'} color="#FD8712" size={18} />
        }
        
        />
        <View style={{width: SCREEN_WIDTH}} >
          <Input style={styles.input} placeholder='Contraseña' 
          /* secureTextEntry={true} */
          ref={_pass1}
          secureTextEntry={true}
          inputStyle={styles.inputStyle}
          inputContainerStyle={styles.inputContainer}
          onChangeText={pass1 => setPass1(pass1) }
          leftIcon={
            <Icon name={'lock'} type={'simple-line-icon'} color="#FD8712" size={18} />
          }
          errorMessage={ passMessage === '' ? null : passMessage }
          />
        </View>
  
        <Button
            loading={props.isLoggingIn}
            title="Iniciar sesion"
            buttonStyle={styles.button}
            onPress={()=> {loginWithEmail()}} 
          />

        {/* Mensaje de exito */}
        {
          props.emailVerifiedMessage !== '' ? <Text style={styles.message}> {props.emailVerifiedMessage}  </Text>  
          : <Text/>
        }
        {/* Mensaje de error */}
        {
          props.error !== '' ? <Text style={styles.errorMessage}> {props.error.message}  </Text>  
          : <Text/>
        }


        <View style={styles.footer} >
          <View style={styles.footerElement}>
          <TouchableOpacity  onPress={() => props.navigation.navigate('resetPassword')} >
              <Text  style={styles.footerText}>
              Olvide mi contraseña 
              </Text>          
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => props.navigation.navigate('SignUp')} >
              <Text  style={styles.footerText}>
                Registrarme
              </Text>          
            </TouchableOpacity>

          </View>
        </View>
       
      </ScrollView>
   
  );
};


function mapStateToProps(state) {
  return {
    message: state.auth.message,
    errorMessage: state.auth.errorMessage,
    isLoggingIn: state.auth.isLoggingIn,
    emailVerifiedMessage: state.auth.emailVerifiedMessage,
    error: state.auth.error
  };
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fefefe',
   
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
    color: 'green',
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

export default connect(mapStateToProps)(Login) ;

