import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionReducer";

// 작은 slice들을 한 곳에 모아 store로 만듦
const store = configureStore({
    reducer:{
        session: sessionReducer, // sessionReducer가 의미하는 것은 sessionSlice에 있는 reducer들을 하나로 합쳐서 자동으로 만들어진 reducer임
    }
})

export default store;
// combinereducer , 자동으로 셋업되어있는 부분
// thunk , 자동으로 셋업되어있는 부분, 비동기 작업을 처리하는 용도
// applyMiddleware , 자동으로 셋업되어있는 부분
// composeWithTools 네개 다 모르겠지만 redux를 안 쓰고 toolkit을 사용한다면 몰라도 되는 듯

