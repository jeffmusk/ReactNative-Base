import { myFirebase, firebaseInit } from "../../../configFirebase";

export const IS_LOADING = "IS_LOADING";
export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
// SIGN UP
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const EMAIL_VERIFIED = "EMAIL_VERIFIED";

// LOGIN
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGIN_GOOGLE_REQUEST = "LOGIN_GOOGLE_REQUEST";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const isLoading = (boolean) => {
  return {
    type: IS_LOADING,
    payload: boolean
  }
}

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const loginError = (error) => {
  return {
    type: LOGIN_FAILURE,
    error
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};

const signUpRequest = () => {
  return {
    type: SIGNUP_REQUEST,
  }
}

const errorMessage = () => {
  return{
    type: SIGNUP_ERROR,
    payload: "",
    errorMessage: ''
  }
}


// Signing up with Firebase
export const signup = (email, password) => async  dispatch => {
  dispatch(signUpRequest()) 
  try {
    myFirebase.auth().createUserWithEmailAndPassword(email,password)
    .then(dataBeforeEmail => {
      console.log(dataBeforeEmail);
      myFirebase.auth().onAuthStateChanged(user => {
        user.sendEmailVerification();
      })
    })
    .then(dataBeforeEmail => {
      console.log(dataBeforeEmail);
      myFirebase.auth().onAuthStateChanged(user => {
        if(!user.emailVerified){
          //email is not verified
          console.log('sin respuesta');
          dispatch({
            type: SIGNUP_SUCCESS,
            payload: "Su cuenta fue creada exitosamente! Ahora necesita verificar su dirección de correo electrónico, vaya a revisar su bandeja de entrada"
          })
        }
      })
    }).catch((err) =>{
      console.log('primer catch');
      console.log(err);
      dispatch({
        type: SIGNUP_ERROR,
        payload: "Algo salío mal",
        errorMessage: err.message
      })
    } )
  } catch (err) {
    console.log('segundo catch');
    console.log(err);
    dispatch({
      type: SIGNUP_ERROR,
      payload: {
        type: SIGNUP_ERROR,
        payload: "Algo salío mal, No pudimo crear tu cuenta ,Por favor intentalo nuevamente"
      }
    })
  } 
};

export const clearErrorMessage = () => dispatch => {
  dispatch(errorMessage())
}

export const loginUser = (email, password) => dispatch => {
  console.log(" Enviando Email y password")
  dispatch(requestLogin());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res.user.email);
      user.emailVerified ? dispatch(receiveLogin(res.user)) : false ;
    })
    .catch(error => {
      //Do something with the error if you want!
      console.log(error);
      dispatch(loginError());
    });
};

export const firebaseResetPassword = (email) =>  dispatch =>{
  dispatch({
    type: UPDATE_MESSAGE,
    message: ''
  })
  myFirebase.auth().sendPasswordResetEmail(email).then(()=> {
    console.log("Email enviado");
    dispatch({
      type: UPDATE_MESSAGE,
      message: 'Te hemos enviado un email,revisa tu bandeja de entrada'
    })
  }).catch((err)=> {
    dispatch({
      type: UPDATE_MESSAGE,
      message: 'Este email no aparece en nuestra base de datos'
    })

    console.log(err);
  })
}

export const logoutUser = () => dispatch => {
  dispatch(isLoading(true));
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
      dispatch(isLoading(false));
    })
    .catch(error => {
      //Do something with the error if you want!
      console.log(error);
      dispatch(logoutError());
      dispatch(isLoading(false));
    });
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  myFirebase.auth().onAuthStateChanged(user => {
    if (user !== null) {
      if(user.emailVerified){
        dispatch(isLoading(false));
        dispatch(receiveLogin(user));
        dispatch({
          type: EMAIL_VERIFIED,
          emailVerifiedMessage: ''
        })
      }else{
        dispatch(isLoading(false));
        dispatch({
          type: EMAIL_VERIFIED,
          emailVerifiedMessage: 'Por favor verifique su email'
        })
        console.log("cuenta no verificada")
        console.log(user)
      }
    }
    dispatch(isLoading(false));
    dispatch(verifySuccess());
  });
};
