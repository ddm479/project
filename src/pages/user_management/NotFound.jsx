import { useNavigate } from 'react-router-dom';
function NotFound() {
    const navigate = useNavigate();
    setTimeout(() => { navigate("/"); }, 5000);
    return (
        <div>
            <h1>요청하신 페이지를 찾을 수 없습니다. 404 Error</h1>
            <div>잠시 후 로그인 페이지로 돌아갑니다. 로그인을 해주세요.</div>
        </div>
    )
}
export default NotFound;
