import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";


const Wrapper = styled.div`
    paddign: 1em;
    background: grey
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const Content = styled.h1`
    font-size: 1.5em;
    color: black;
    text-align: center;
`;
const Checkbox = styled.input`
    font-size: 1.5em;
    color: black;
    text-align: center;
`;

function Agree() {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <Content>
                testtest
            </Content>
            <p>dafsdasdf</p>
            <input type="checkbox" />test1
            <button type="button" onClick={() => {
                navigate('/');
            }}>회원가입하기</button>

        </Wrapper >
    )
}

export default Agree;