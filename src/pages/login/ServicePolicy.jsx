import React from "react";
import styled from "styled-components";
import Content from "../../components/Content";
import Title from '../../components/Title';
// em은 해당 단위가 사용되고 있는 요소의 font-size 속성 값이 기준으로 비례함
// rem은 최상위 요소(root)를 기준, HTML에서는 <html>요소의 font-size 속성 값이 기준으로 비례 
const Wrapper = styled.div`
    paddign: 1em;
    background: grey;
    margin: 2vh 25vw;  
    text-align: center;
    border: 0.2rem solid black;

    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: flex-start;
`;

function ServicePolicy(){
    return(
        <Wrapper>
            <p>test</p>
            <p>ServicePolicy</p>
            <h1>ServicePolicy</h1>
        </Wrapper>
    )
}

export default ServicePolicy;