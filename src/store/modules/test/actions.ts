import {
  AUTH_CHECK,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
  AUTH_RESET_PASSWORD,
  AUTH_SET_USER,
  AUTH_USER_UPDATE,
} from './actionTypes';

export function authCheck(payload: any) {
  return {
    type: AUTH_CHECK,
    payload,
  };
}

export function authLogin(payload: any) {
  return {
    type: AUTH_LOGIN,
    payload,
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  };
}

export function authRefreshToken(payload: any) {
  return {
    type: AUTH_REFRESH_TOKEN,
    payload,
  };
}

export function authResetPassword() {
  return {
    type: AUTH_RESET_PASSWORD,
  };
}

export function authSetUser(payload: any) {
  return {
    type: AUTH_SET_USER,
    payload,
  };
}

export function authUserUpdate(payload: any) {
  return {
    type: AUTH_USER_UPDATE,
    payload,
  };
}
