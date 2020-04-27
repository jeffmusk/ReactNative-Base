import { myFirebase, firebaseInit } from "../../configFirebase";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGIN_GOOGLE_REQUEST = "LOGIN_GOOGLE_REQUEST";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

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

// Signing up with Firebase
export const signup = (email, password) => async dispatch => {
  try {
    myFirebase.auth().createUserWithEmailAndPassword(email,password)
    .then(dataBeforeEmail => {
      myFirebase.auth().onAuthStateChanged(user => {
        user.sendEmailVerification();
      })
    })
    .then(dataBeforeEmail => {
      myFirebase.auth().onAuthStateChanged(user => {
        if(user.emailVerified){
          //Email is verified
          dispatch({
            type: SIGNUP_SUCCESS,
              payload:
                "Su cuenta fue creada exitosamente! Ahora necesita verificar su dirección de correo electrónico, vaya a revisar su bandeja de entrada"
          })
        }
      })
    })
  } catch (err) {
    /*  */
  }
};


export const loginUser = (email, password) => dispatch => {
  dispatch(requestLogin());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res.user.email);
      dispatch(receiveLogin(res.user));
    })
    .catch(error => {
      //Do something with the error if you want!
      console.log(error);
      dispatch(loginError());
    });
};



export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch(error => {
      //Do something with the error if you want!
      dispatch(logoutError());
    });
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  myFirebase.auth().onAuthStateChanged(user => {
    if (user !== null) {
      dispatch(receiveLogin(user));
    }
    dispatch(verifySuccess());
  });
};
