import React from 'react';
import GoogleLogin from 'react-google-login';
function LoginGoogle() {
    const clientId = "1037417891725 - d7fnfaa8up490p8ghd6cl6tmc9nbbi4v.apps.googleusercontent.com";
    // 구글 oauth 클라이언트 id

    const onSuccess = async (response) => {
        console.log(response);
    }

    const onFailure = (error) => {
        console.log(error);
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy="single_host_origin"
            />
        </div>
    )
}

export default LoginGoogle;