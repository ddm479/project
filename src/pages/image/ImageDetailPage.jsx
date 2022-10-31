import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';
import sampleImageContents from '../../jsonDataset/sampleDetailImageContents.json';

import {sessionActions} from "../../redux/sessionReducer";
import { useSelector, useDispatch} from 'react-redux';

const Wrapper = styled.div``;

function ImageDetailPage() {
    const { imageId } = useParams();
    const [image, setImage] = useState([]);
    ///////////////////////////////////////////////////////
    const dispatch = useDispatch();
    const serverSession = useSelector((state) => {
        //console.log("state", state);
        //console.log("state.session", state.session);
        console.log("이미지 상세 페이지의 state.session.session_id", state.session.session_id);
        return state.session.session_id;
    });
    ///////////////////////////////////////////////////////////
    useEffect(() => {
        axios
            .post('https://bitwise.ljlee37.com:8080/imageDetail', {
                session_id: serverSession,
                imageId,
            })
            .then((response) => {
                const out = response.data.queryResult.map((img) => ({
                    key: img.hash,
                    alt: decodeURIComponent(img.name),
                    url: img.path,
                    date: img.upload_date_time,
                }));
                setImage(() => out);
            })
            .catch(() => {
                setImage(sampleImageContents);
            });
    }, []);

    return (
        <Wrapper>
            <Typography variant="h5" gutterBottom>
                이미지 상세 페이지
            </Typography>
            {image.map((img) => (
                <div>
                    <Typography>
                        이름:
                        {img.alt}
                    </Typography>
                    <Typography>
                        날짜:
                        {new Date(img.date).toLocaleString()}
                    </Typography>
                    <img key={img.key} src={img.url} alt={img.alt} />
                </div>
            ))}
        </Wrapper>
    );
}

export default ImageDetailPage;