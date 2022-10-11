import React, { useEffect } from 'react';

import styled from "styled-components";
import { useNavigate } from 'react-router-dom';



/* 
지원 중단한 구글 라이브러리 다음 사이트는 쓰지말자 
https://developers.google.com/identity/sign-in/web/sign-in
function GoogleLogin() {
    const clientId = "1037417891725-d7fnfaa8up490p8ghd6cl6tmc9nbbi4v.apps.googleusercontent.com"; // 로그인을 한 상태에서 하면 구글 로그인창이 안뜸
    // 구글 oauth 클라이언트 id
    const navigate = useNavigate(); 

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/platform.js";
        script.async = true;
        document.body.appendChild(script);
    });

    return (
        <div>
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
        </div>
    )
}
export default GoogleLogin; */

// https://developers.google.com/identity/gsi/web/guides/client-library
function GoogleLogin() {
    const clientId = "1037417891725-d7fnfaa8up490p8ghd6cl6tmc9nbbi4v.apps.googleusercontent.com"; // 로그인을 한 상태에서 하면 구글 로그인창이 안뜸
    // 구글 oauth 클라이언트 id
    const navigate = useNavigate();

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    function handleCallbackResponse(response){

    }
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);
        /* google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCallbackResponse
        }) */

        /* google.accounts.id.renderButton(
            
        ) */
    }, []);


    return (
        <div>
            <div id="g_id_onload"
                data-client_id={clientId}
                data-login_uri="http://localhost:3000"
                data-auto_prompt="false">
            </div>
            <div className="g_id_signin"
                data-type="standard"
                data-size="large"
                data-theme="outline"
                data-text="sign_in_withfff"
                data-shape="rectangular"
                data-logo_alignment="left">
            </div>
        </div>
    )
}
export default GoogleLogin;