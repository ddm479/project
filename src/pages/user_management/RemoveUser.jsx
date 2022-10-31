import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

import { sessionActions } from "../../redux/sessionReducer";
import { useSelector, useDispatch} from 'react-redux';

const address = "https://bitwise.ljlee37.com:8080";

const Wrapper = styled.div``;
function RemoveUser() {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    ///////////////////////////////////////////////////////
    const dispatch = useDispatch();
    const serverSession = useSelector((state) => {
        //console.log("state", state);
        //console.log("state.session", state.session);
        console.log("회원탈퇴 페이지의 state.session.session_id", state.session.session_id);
        return state.session.session_id;
    }); // store에서 session_id 가져오기
    ///////////////////////////////////////////////////////////
    
    
    const onClickCheckBox = (event) => {
        setChecked(event.target.checked);
    }
    const removeUser = async () => {
        if(checked){
            try {
                // await는 async 함수 안에서만 사용가능, 회원탈퇴 부분
                const response = await axios.delete(address + "/account",
                    {
                        data: {
                            session_id: serverSession,
                        },
                    }, // delete 요청할 때에는 { data: {} } 형식으로 body를 보낸다.
                    { withCredentials: true } // 쿠키 cors 통신 설정, 서버도 같이 처리해줘야함
                );
                console.log(response);
                console.log(response.data);
                dispatch(sessionActions.setLogout());
                navigate('/'); // try catch에서 통신이나 다른 오류나면 바로 catch로 가는 듯 아래 로직처럼 할 필요 없다

                // console.log(response.json());
                // const removeSuccess = response.data.removed;
                // if (response.data.description !== undefinded)
                /* if (removeSuccess) {
                    // alert("로그인 성공");
                    
                    navigate("/");
                }
                else { alert("회원탈퇴 실패(else)"); } */
            } catch (error) {
                console.error(error);
                alert("회원탈퇴 실패!(catch)");
            }
        } else{
            alert('회원탈퇴를 하려면 동의를 해야 합니다.')
        }
        
    }
    return (
        <Wrapper>
            <Typography variant="h5" gutterBottom>
                회원탈퇴 페이지
            </Typography>

            <Typography>
                회원탈퇴를 하더라도 bitwise는 이미지를 보관하고 사용합니다.
            </Typography>
            <Typography>
                <input type="checkbox" checked={checked}
                    onChange={onClickCheckBox} /> 동의합니다
                {/* <Checkbox checked={checked}
                    onClick={onClickCheckBox} />동의합니다 */}
            </Typography>

            <Button variant="outlined" onClick={removeUser}>회원탈퇴하기</Button>
        </Wrapper>
    );
}
export default RemoveUser;
