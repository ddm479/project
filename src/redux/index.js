import { persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionReducer";
// import storage from "redux-persist/lib/storage/session"; // session storage, 새로고침, 현재 떠있는 탭 내에서만 유지
import storage from "redux-persist/lib/storage" // local storage, 새로고침 모든 탭에서 유지
import persistStore from "redux-persist/es/persistStore";


// 작은 slice들을 한 곳에 모아 store로 만듦
// const store = configureStore({
//     reducer:{
//         session: sessionReducer, // sessionReducer가 의미하는 것은 sessionSlice에 있는 reducer들을 하나로 합쳐서 자동으로 만들어진 reducer임
//     }
// })

const persistConfig = {
    key: "root",
    storage, // 웹의 스토리지
    whitelist: ['session']
}; 

const rootReducer = combineReducers({
    session: sessionReducer,
});

// persisConfig가 추가된 rootReducer 반환
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

// persistStore -> 새로 고침, 종료해도(로컬스토리지인 경우) 지속될 store 생성
export const persistor = persistStore(store);
export default store;

// combinereducer , 자동으로 셋업되어있는 부분
// thunk , 자동으로 셋업되어있는 부분, 비동기 작업을 처리하는 용도
// applyMiddleware , 자동으로 셋업되어있는 부분
// composeWithTools 네개 다 모르겠지만 redux를 안 쓰고 toolkit을 사용한다면 몰라도 되는 듯