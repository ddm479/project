import React from "react";
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const address = "https://bitwise.ljlee37.com:8080";

const Wrapper = styled.div``;
function RemoveUser() {
    const user_id = "test";
    const navigate = useNavigate();
    const removeUser = async()=>{
        try {
            // await는 async 함수 안에서만 사용가능
            const response = await axios.delete(address + "/removeAccount",
                {
                    user_id: user_id,
                },
                { withCredentials: true } // 쿠키 cors 통신 설정, 서버도 같이 처리해줘야함
            );
            console.log(response);
            console.log(response.data);

            // console.log(response.json());
            const removeSuccess = response.data.removed;
            // if (response.data.description !== undefinded)
            if (removeSuccess) {
                // alert("로그인 성공");
                navigate("/");
            }
            else { alert("회원탈퇴 실패"); }
        } catch (error) {
            console.error(error);
            alert("회원탈퇴 실패!");
        }
    }
    return (
        <Wrapper>
            <Typography variant="h5" gutterBottom>
                회원탈퇴 페이지
            </Typography>

            <Typography>
                제목:

            </Typography>
            <Typography>
                날짜:
                
            </Typography>
            <Button variant="outlined" onClick={removeUser}>Outlined</Button>
        </Wrapper>
        
    );
}
export default RemoveUser;
