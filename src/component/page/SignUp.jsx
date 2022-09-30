import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, FormHelperText } from "@mui/material/";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // 신규 사용자 가입

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";

/* function Copyright(props) {
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
} */

const theme = createTheme();
// createTheme({}) {} 내부에 만들고 싶은 테마 style을 작성.(여러개를 만들어도 됨)
// theme(변수명은 수정)이라는 변수에 할당한다.
// ThemeProvider 안의 theme attribute 값으로 위에서 만들었던 테마를 연결하면 css에 적용된다.

export default function SignUp() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const auth = getAuth();

  const navigate = useNavigate();
  const [values, setValues] = useState({
    // state with multiple keys
    nickname: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const ChangePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
    console.log(values, event.target.name, event.target.value);

    // 비밀번호 유효성 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password))
      setPasswordError(
        "숫자, 영문자, 특수문자 세 가지 모두를 사용해서 8자리 이상 입력하세요."
      );
    else setPasswordError("");
  };
  // https://phrygia.github.io/react/2021-11-25-mui-react/
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value }); // ...는 객체에 속한 값만 들고오게 한다., spread operator

    // state를 한 번에 관리하면 값이 느리게 바뀜
    console.log(values, event.target.name, event.target.value);
    // 이메일 유효성 체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(values.email))
      setEmailError("올바른 이메일 형식이 아닙니다.");
    else setEmailError("");
  };

  /* const onChange = e => {
        const { name, value } = e.target;
        setValues({
          ...inputs,
          [name]: value
        });
    }; */

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /* const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  }; */

  /* const register = () => {
    fetch("ljlee-de.ddns.net:8080")
      .then((res) => res.json())
      ;
  }; */

  const config = { headers: { "Content-Type": "application/json" } };
  const register = (e) => {
    e.preventDefault(); // 새로고침 방지
    axios
      .post(
        "https://ljlee-de.ddns.net:8080",
        {
          usernickname: values["nickname"],
          email: values["email"],
          password: values["password"],
        },
        config
      )
      // response를 받아온다
      .then((response) => {
        // Handle success.
        console.log("Well done!");
        console.log(response);
        console.log(response.data);
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };

  /* const handleSubmit = async () => {
        await axios.post('/api/createUser', values)
        .then((Response)=>{
            alert(Response.data)
        })
        .catch((Error)=>{
            console.log("통신 실패 + \n" + Error)
        })
    }; */
  /* const sighUp = async () => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        console.log(result);
    } */

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2} /*레이아웃을 결정하는 property*/>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-nickname"
                  name="nickname"
                  required // 필수
                  fullWidth
                  id="nickname"
                  label="Nick Name" // 버튼 위에 뜨는 내용
                  helperText="Incorrect entry." // 버튼 밑에 뜨는 내용
                  value={values.nickname}
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  helperText="ex) gachon@google.com"
                  name="email"
                  error={emailError !== "" || false}
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Pass word
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    required
                    label="Password"
                    name="password"
                    value={password}
                    error={passwordError !== "" || false}
                    onChange={ChangePassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
                                <TextField // input에 해당함
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    id="password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Grid> */}
              <Grid xs={12}>
                <Link
                  href="/Agree"></Link>
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={register}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/"
                  variant="body2"
                /* onClick={() => {
                  navigate("/SignIn");
                }} */
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider >
  );
}
