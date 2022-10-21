import styled from "styled-components";
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
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box // div 같은 느낌
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
            }} /* 구글 우상단에 있는 profile 사진같은 css 효과를 줄 수 있는 컴포넌트*/
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5" /* h1 태그로 감싼다 디자인은 h5 태그, 텍스트 설정을 해줄 수 있는 컴포넌트 */
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required // 필수 입력
              fullWidth
              id="email"
              label="Email Address" // 보이는 내용
              name="email"
              autoComplete="email"
              autoFocus // 처음에 자동으로 커서 이동
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me" // label 값을 클릭해도 체크됨
            />
            <Button
              type="submit"
              fullWidth
              variant="contained" // 모양 결정, 색이꽉찬
              sx={{ mt: 3, mb: 2 }} // 간단한 css, margintop, bottom
            >
              Sign In
            </Button>
            <GoogleLogin/>
            <Grid container /* container가 있는게 행*/>
              <Grid item>
                <Link
                  href="/Signup"
                  variant="body2"
                  /* onClick={() => {
                    navigate("/");
                  }} */
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;


