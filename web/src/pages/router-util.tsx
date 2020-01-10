import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {getToken} from "service/auth";
export function AuthRoute({ ...rest }) {

  if(!getToken()){
    location.href='#/account/login';
  }

  return (
    <Route  {...rest}  />
  );
}