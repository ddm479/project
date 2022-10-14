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
    paddign: 1em;
    background: grey;
    margin: 2vh 25vw;  
    text-align: center;
    border: 0.2rem solid black;

    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: flex-start;
`;

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



    </Wrapper>



  );
}

export default SignIn;