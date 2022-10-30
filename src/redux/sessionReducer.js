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
        // session상태를 검사하기 위함, url로 접근할 때 로그인 여부 검사
        getAllSessions(state){
            console.log("이거 하면 달리지는 게 잇나");
        },
        // login 성공시에 실행, action은 외부 값을 나타내는 매개변수
        setLoginSuccess(state){
            state.isLoggedIn =  true; // state의 로그인여부를 true로 바꾼다
        },
        // 서버로부터 받은 세션으로 설정한다
        setSessionFromServer(state, action){
            console.log("서버로부터 세션 받는 중", action); // action은 객체 구조인데 payload속성이 있음 
            state.session_id = action.payload; // return { ...state, session: payload} 와 똑같은데 redux와 달리 toolkit은 저 표현식으로 가능함 
        },
    },
});

// createSlice가 만든 unique한 action 값들을 export함, actions를 사용할 때 action이라는 매개변수에 값을 넘기면 payload속성에 담김
export const sessionActions = sessionSlice.actions;
export default sessionSlice.reducer // 마지막엔 결국 하나의 reducer여서 reducers로 쓰지 않음