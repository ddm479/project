import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { AppBar, Box, Button, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CollectionsIcon from '@mui/icons-material/Collections';
import ArticleIcon from '@mui/icons-material/Article';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
// import BugReportIcon from '@mui/icons-material/BugReport';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import PageNavigator from '../../components/navigation/PageNavigator';

import { sessionActions } from "../../redux/sessionReducer";
import { useSelector, useDispatch} from 'react-redux';

const Wrapper = styled.div``;

const NavigatorWrapper = styled.nav`
  min-width: 13rem;
  min-height: 48rem;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const urlContents = [
    { title: '이미지 업로드', url: '/upload', icon: <UploadIcon /> },
    // { title: '테스트', url: '/test', icon: <BugReportIcon /> },
    { title: '이미지 목록', url: '/images', icon: <CollectionsIcon /> },
    { title: '결과 목록', url: '/results', icon: <ArticleIcon /> },
    { title: '회원 탈퇴', url: '/removeUser', icon: <NoAccountsIcon /> },
]; // 왼쪽 부분 Naviagation

const address = "https://bitwise.ljlee37.com:8080";

function PageLayout({ Article }) {
    const navigate = useNavigate();
    ///////////////////////////////////////////////////////
    // 다른 컴포넌트에서 일일이 useEffect를 통해서 로그인 여부 검사를 진행하지 않아도 된다. 여기서 진행하기 때문에 그리고 useEffect를 사용하더라도 잠깐이나마 페이지가 렌더링되서 로드되었는데 여기서 isLoggedIn을 사용해서 조건부 렌더링을 적용해서 아예 안보이게끔 성공함 
    const dispatch = useDispatch();
    const serverSession = useSelector((state) => {
        //console.log("state", state);
        //console.log("state.session", state.session);
        console.log("PageLayout의 state.session.session_id", state.session.session_id);
        return state.session.session_id;
    });
    const isLoggedIn = useSelector((state) => {
        //console.log("state", state);
        //console.log("state.session", state.session);
        console.log("PageLayout의 state.session.session_id", state.session.isLoggedIn);
        return state.session.isLoggedIn;
    }); // store에서 isLoggedIn 가져오기
  ///////////////////////////////////////////////////////////
    useEffect(() => {
        // 로그인이 안 되어 있고 session_id가 null이면 url로 접근불가
        if (isLoggedIn === false || serverSession === null) {
            dispatch(sessionActions.setLogout()); // 세션 로그아웃 처리
            navigate('/');
        }
    }, []);

    // <Button variant="outlined" onClick={onLogoutClick}>로그아웃</Button>
    const onLogoutClick = async () => {
        try {
            // await는 async 함수 안에서만 사용가능
            const responseLogout = await axios.post(address + "/logout",
                { session_id: serverSession},
                { withCredentials: true },
            );
            console.log(responseLogout, responseLogout.data);
            dispatch(sessionActions.setLogout()); // 세션 로그아웃 처리
            navigate('/');

        } catch (error) {
            console.error("console.error(error);", error);
            console.log("console.log(error)", error);
            alert(error, "로그아웃 실패!");
        }
    }
    return (
        <Wrapper>
            {(isLoggedIn && serverSession) &&
                <AppBar sx={{ padding: 1 }}>
                    <TopWrapper>
                        <Typography
                            sx={{ fontSize: '2rem', cursor: 'pointer' }}
                            onClick={() => {
                                navigate('/images');
                            }}
                        >
                            Road Sign Service
                        </Typography>
                        <Button variant="contained" onClick={onLogoutClick}>로그아웃</Button>
                    </TopWrapper>
                </AppBar>}
            {(isLoggedIn && serverSession) &&
                <Box
                    sx={{
                        paddingTop: 8,
                        borderBottom: '1px solid grey',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'left',
                        alignItems: 'stretch',
                    }}
                >
                    <NavigatorWrapper>
                        <PageNavigator urlContents={urlContents} />
                    </NavigatorWrapper>
                    <Box
                        sx={{
                            flexGrow: 1,
                            padding: '1rem',
                            minWidth: '32rem',
                            backgroundColor: grey[100],
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: '64rem',
                            }}
                        >
                            <Article />
                        </Box>
                    </Box>
                </Box>}
        </Wrapper>
    );
}
PageLayout.propTypes = {
    Article: PropTypes.func.isRequired,
};

export default PageLayout;