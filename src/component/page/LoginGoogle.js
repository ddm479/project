import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
const Wrapper = styled.div`
    paddign: 1em;
    background: grey
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;
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
    <div>

      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        buttonText="Login with Google" // 버튼에 뜨는 텍스트
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  )
}

export default LoginGoogle;