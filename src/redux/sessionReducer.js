import { createSlice } from '@reduxjs/toolkit'

// session상태를 기록, initailState는 초깃값
const initialState = {
    session_id: null,
    isLoggedIn: false,
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        // url로 서비스 접근 제한하기 위함, 로그인 여부를 false로 바꾼다.
        setLogout(state){
            state.isLoggedIn = false;
            state.session_id = null; // session_id를 null로 설정한다.
        },
        // login 성공시에 실행, action은 외부 값을 나타내는 매개변수
        setLoginSuccess(state){
            state.isLoggedIn =  true; // state의 로그인여부를 true로 바꾼다
        },
        // 서버로부터 받은 세션으로 session_id를 설정한다
        setSessionFromServer(state, action){
            console.log("서버로부터 세션 받는 중", action); // action은 객체 구조인데 payload속성이 있음 
            state.session_id = action.payload; // return { ...state, session: payload} 와 똑같은데 redux와 달리 toolkit은 저 표현식으로 가능함 
        },
    },
});

// createSlice가 만든 unique한 action 값들을 export함, actions를 사용할 때 action이라는 매개변수에 값을 넘기면 payload속성에 담김
export const sessionActions = sessionSlice.actions;
export default sessionSlice.reducer // 마지막엔 결국 하나의 reducer여서 reducers로 쓰지 않음
/* action 함수를 호출하려면 sessionReducer.js에서 
export const sessionActions = sessionSlice.actions;를 해야 하고 
사용할 곳에서 import {sessionActions} from "./sessionReducer"; 해야한다. */
/* 
import { sessionActions } from "./sessionReducer";
const data = {}; // 사용법 숙지를 위한 테스트

dispatch(sessionActions.getAllSessions()); // action함수 호출 방법

// payload값 넘기는 방법은 매개변수로 전달하면 된다. 매개변수로 전달된 값은 알아서 payload라는 필드 아래로 들어감 
dispatch(sessionActions.setSessionFromServer({data})); // data라는 이름의 객체를 보낸다 */