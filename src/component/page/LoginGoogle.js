import React from 'react';
// import GoogleLogin from 'react-google-login'; // 다른 패키지로 사용
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";

// https://www.npmjs.com/package/@react-oauth/google 
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

// axios.defaults.withCredentials = true;

function LoginGoogle() {
  const clientId = "1037417891725-d7fnfaa8up490p8ghd6cl6tmc9nbbi4v.apps.googleusercontent.com"; // 로그인을 한 상태에서 하면 구글 로그인창이 안뜸
  // 구글 oauth 클라이언트 id
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse, codeResponse) => {
      console.log("tokenResponse입니다.", tokenResponse);
      console.log("codeResponse입니다.", codeResponse);
      const tokens = await axios.post("/login",
      {
        idToken: codeResponse,
      });
      console.log(tokens);
    },
    onError: (errorResponse) => console.log(errorResponse),
    flow: 'auth-code',
  });

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <MyCustomButton onClick={() => login()}>
        Sign in with Google 🚀{' '}
      </MyCustomButton>;
      
    </GoogleOAuthProvider>
  )
}

export default LoginGoogle;
/* function LoginGoogle() {
  const clientId = "1037417891725-d7fnfaa8up490p8ghd6cl6tmc9nbbi4v.apps.googleusercontent.com"; // 로그인을 한 상태에서 하면 구글 로그인창이 안뜸
  // 구글 oauth 클라이언트 id
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log("credentialResponse.credential입니다 ", credentialResponse.credential);
          var decoded = jwt_decode(credentialResponse.credential);
          console.log("jwt_decode(credentialResponse.credential)의 내용입니다", decoded);
          console.log("test", decoded.name, decoded.email);
          
           // package.json에 proxy 설정하면 한가지 origin으로부터의 cors처리만 가능
           // https관련 추가문제 발생? 
          axios.post("/register", 
          // https로 하면 error남 http로 (net::ERR_SSL_PROTOCOL_ERROR) 해결
          {
            email: decoded.email,
            nickname: decoded.name,
            email: "testtest",
            // withCredentials: true, // 쿠키 cors 통신 설정
          },
          )
            .then(function (response) {
              console.log(response);
              console.log(JSON.stringify(response));
            }).catch(function (error) {
              console.log(error);
              console.log(error.response);
            })
        }}
        onError={() => {
          console.log('Login Failed');
        }} />
    </GoogleOAuthProvider>
  )
} */

