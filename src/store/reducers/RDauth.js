import {
  IS_LOADING,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS
} from "../actions";


export default (
  state = {
    checkIn: false ,
    isLoading: true,
    emailVerified: false,
    successfulRegistration: false,
    errorRegistration: false,
    message: '',
    errorMessage: '',
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    logoutError: false,
    isAuthenticated: false,
    user: {},
    error: {}
  },
  action
) => {
  switch (action.type) {
    case IS_LOADING:
      return{
        ...state,
        isLoading: action.payload
      }
    case SIGNUP_REQUEST:
      return {
        ...state,
        checkIn: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        successfulRegistration: true,
        message: action.payload,
        checkIn: false
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        errorRegistration: true,
        message: action.payload ,
        errorMessage: action.errorMessage,
        checkIn: false,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true,
        error: action.error
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {}
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true
      };
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false
      };
    default:
      return state;
  }
};