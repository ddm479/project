import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { AppBar, Box, Button, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CollectionsIcon from '@mui/icons-material/Collections';
import ArticleIcon from '@mui/icons-material/Article';
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
    { title: '회원 탈퇴', url: '/removeUser', icon: <ArticleIcon /> },
]; // 왼쪽 부분 Naviagation

const address = "https://bitwise.ljlee37.com:8080";

function PageLayout({ Article }) {
    const navigate = useNavigate();
    ///////////////////////////////////////////////////////
    const dispatch = useDispatch();
    const serverSession = useSelector((state) => {
        //console.log("state", state);
        //console.log("state.session", state.session);
        console.log("state.session.session_id", state.session.session_id);
        return state.session.session_id;
    });
  ///////////////////////////////////////////////////////////
    /* useEffect(() => {
        authCheck(); // 로그인 체크 함수
    }); */

    // <Button variant="outlined" onClick={onLogoutClick}>로그아웃</Button>
    const onLogoutClick = async () => {
        try {
            // await는 async 함수 안에서만 사용가능
            //const sess = await axios.get(address + "/session");
            //console.log(sess, sess.data);
            const responseLogout = await axios.post(address + "/logout",
                { session_id: serverSession},
                { withCredentials: true },
            );
            console.log(responseLogout, responseLogout.data);
            const resCheck = await axios.post(address + "/checkLogin",
                { session_id: serverSession },
                { withCredentials: true },
            );
            console.log(resCheck, resCheck.data);
        } catch (error) {
            console.error("console.error(error);", error);
            console.log("console.log(error)", error);
            alert(error, "에러 발생!");
        }
    }
    return (
        <Wrapper>
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
            </AppBar>

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
            </Box>
        </Wrapper>
    );
}
PageLayout.propTypes = {
    Article: PropTypes.func.isRequired,
};

export default PageLayout;