import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography"; // 텍스트 font를 지정할수 있게함
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleLogin from "./GoogleLogin";
import LoginGoogle from "./LoginGoogle";
import styled from "styled-components";
// import GoogleLogin from "react-google-login";


const Wrapper = styled.div`
    padding: 1em;
    background: grey;
    
    
    text-align: center;
    

    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: flex-start;
`;
// 반응형 웹 고민중

const Item = styled.div`
    width: 35em;
    margin: 5vh;
    backgroud: green;
    border: 0.2rem solid black;
`
const Title = styled.div`
  padding-top: 1rem;
  font-size: 5em;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica
      Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
`;
// min-width:
// display: block; /* 브라우져 크기와 같이 자동조절 */ 
function SignIn() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Wrapper>
      <Item>
        <Title>Bitwise</Title>
        <LoginGoogle />
        <Link
          href="/Agree"
          variant="body2"
        /* onClick={() => {
          navigate("/");
        }} */
        >
          {"Don't have an account? Sign Up"}
        </Link>
      </Item>



    </Wrapper>



  );
}

export default SignIn;