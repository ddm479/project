/* action 함수를 호출하려면 sessionReducer.js에서 
export const sessionActions = sessionSlice.actions;를 해야 하고 
사용할 곳에서 import {sessionActions} from "./sessionReducer"; 해야한다. */

import { sessionActions } from "./sessionReducer";
const data = {}; // 사용법 숙지를 위한 테스트

dispatch(sessionActions.getAllSessions()); // action함수 호출 방법

// payload값 넘기는 방법은 매개변수로 전달하면 된다. 매개변수로 전달된 값은 알아서 payload라는 필드 아래로 들어감 
dispatch(sessionActions.setSessionFromServer({data})); // data라는 이름의 객체를 보낸다