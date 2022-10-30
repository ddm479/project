import React, { useContext, useState } from "react";
function useSessionState(initialValue) {
    const session = useContext(SessionContext);
    if (session === undefined){
        throw new Error('useSessionState는 SessionProvider 안에서 사용되야 합니다.');
    }
    return session;
    const [count, setCount] = useState(initialValue);
    const increaseCount = () => setCount((count) => count + 1);
    const decreaseCount = () => setCount((count) => Math.max(count - 1, 0));
    return [count, increaseCount, decreaseCount];
}
export default useSessionState; // 커스텀 hook = 사용자 정의컴포넌트