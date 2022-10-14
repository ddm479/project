import React from 'react';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import {useGoogleLogin as GoogleLoginHook} from 'react-google-login'; // 다른 패키지로 사용
// import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
// import jwt_decode from "jwt-decode";
import axios from "axios";

// https://www.npmjs.com/package/@react-oauth/google 
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLoginButton } from "react-social-login-buttons";
import {OAuth2Client} from "google-auth-library";



// axios.defaults.withCredentials = true;
/* const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/login', {
      target: 'http://ljlee-de.ddns.net:8080', 
      changeOrigin: true,
    })
  );
}; */

const clientId = "1037417891725-d7fnfaa8up490p8ghd6cl6tmc9nbbi4v.apps.googleusercontent.com"; // 로그인을 한 상태에서 하면 구글 로그인창이 안뜸
// 구글 oauth 클라이언트 id

const oAuth2Client = new OAuth2Client(
  process.env.REACT_APP_GOOGLE_CLIENT_ID,
  process.env.REACT_APP_GOOGLE_SECRET_ID,
  'postmessage',
);

function LoginGoogle() {
  


  const navigate = useNavigate();
  const address = "http://ljlee-de.ddns.net:8080";
  // "proxy": "http://ljlee-de.ddns.net:8080"
  const login = useGoogleLogin({
    flow: 'auth-code', // code 모델 방식
    redirect_uri: "http://localhost:3000/Agree",
    // scope: "email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    onSuccess: async (codeResponse) => {
      try {
        console.log("codeResponse입니다.", codeResponse);
        console.log(codeResponse.code);
        const { tokentest } = await oAuth2Client.getToken(codeResponse.code);
        console.log(tokentest); 
        // await는 async 함수 안에서만 사용가능
        const tokens = await axios.post(address + "/login",
          {
            idToken: codeResponse,
          }
        );
        console.log(tokens);
      } catch (error) {
        console.error(error);
      }


    },
    // withCredentials: true, // 쿠키 cors 통신 설정
    onError: (errorResponse) => console.log(errorResponse),

  }); // 커스텀 훅
  
  

  
  return (
    <div>
      <GoogleOAuthProvider clientId={clientId} >
        <GoogleLoginButton onClick={() => login()}>
          Sign in with Google 🚀{' '}
        </GoogleLoginButton>
      </GoogleOAuthProvider>


      
    </div>

  )
}

export default LoginGoogle;


/* const login = useGoogleLogin({

  onSuccess: async (tokenResponse, codeResponse) => {
    console.log("tokenResponse입니다.", tokenResponse);
    console.log("codeResponse입니다.", codeResponse);
    const tokens = await axios.post("/login",
      {
        idToken: tokenResponse,
      });
    // console.log(tokens);
  },
  // withCredentials: true, // 쿠키 cors 통신 설정
  flow: 'auth-code',
  onError: (errorResponse) => console.log(errorResponse),

}); */

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

/* import React from 'react';
>>>>>>> Stashed changes
// import GoogleLogin from 'react-google-login';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

function LoginGoogle() {
  const clientId = "1037417891725-d7fnfaa8up490p8ghd6cl6tmc9nbbi4v.apps.googleusercontent.com"; // 로그인을 한 상태에서 하면 구글 로그인창이 안뜸
  // 구글 oauth 클라이언트 id
  const navigate = useNavigate();

  async function onSuccess(res) {
    const profile = res.getBasicProfile();
    const userdata = {
      email: profile.getEmail(),
      image: profile.getImageUrl(),
      name: profile.getName(),
    };
    // 로그인 성공 후 실행하기 원하는 코드 작성.
    console.log(userdata.email);
    navigate('/Agree');
  }

  const onFailure = (res) => {

    console.log("err", res);
  };

  return (
    {/* <div>

      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        buttonText="Login with Google" // 버튼에 뜨는 텍스트
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
      />
    </div> }
  )
}

export default LoginGoogle; */