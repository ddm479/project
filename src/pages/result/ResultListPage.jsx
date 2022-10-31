import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import axios from 'axios';
import ResultListView from '../../components/view/ResultView';
import sampleImageContents from "../../jsonDataset/sampleImageContents";
import sampleResults from '../../jsonDataset/sampleResults.json';

import {sessionActions} from "../../redux/sessionReducer";
import { useSelector, useDispatch} from 'react-redux';

const Wrapper = styled.div``;

function ResultListPage() {
    const [requests, setRequests] = useState([]);
    //////////////////////////////////////////
    const dispatch = useDispatch();
    const serverSession = useSelector((state) => {
        //console.log("state", state);
        //console.log("state.session", state.session);
        console.log("결과목록 페이지의 state.session.session_id", state.session.session_id);
        return state.session.session_id;
    });
    /////////////////////////////////////////

    useEffect( () => {
        console.log(serverSession);
        axios
            .post('https://bitwise.ljlee37.com:8080/requestList', {
                session_id: serverSession,
            })
            .then((response) => {
                const out = response.data.queryResult.map((request) => ({
                    resultId: request.request_id,
                    imageUrl: request.path,
                    imageAlt: decodeURIComponent(request.name),
                    inference_status: request.status,
                    class_category: request.request_result,
                    date: request.upload_date_time,
                }));
                setRequests(() => out);
            })
            .catch(() => {
                const results = sampleResults.map((result) => ({
                    ...result,
                    imageUrl: sampleImageContents[Number(result.imageId)].url,
                    imageAlt: sampleImageContents[Number(result.imageId)].alt,
                }));
                setRequests(() => results);
            });
    }, []);
    return (
        <Wrapper>
            <Typography variant="h5" gutterBottom>
                결과 목록 페이지
            </Typography>
            <ResultListView
                results={requests.sort(
                    (a, b) => Date.parse(b.date) - Date.parse(a.date),
                )}
            />
        </Wrapper>
    );
}

export default ResultListPage;