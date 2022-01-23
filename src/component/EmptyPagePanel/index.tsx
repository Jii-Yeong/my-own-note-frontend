import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 25%;
  left: 30%;
`

const Title = styled.p`
  font-size: 50px;
  color: #0000003f;
  font-weight: bolder;
`

const SubText = styled.p`
  font-size: 40px;
  color: #0000003f;
  font-weight: bolder;
  position: absolute;
  top: 70%;
  left: 30%;
`

const EmptyPagePanel = () => {
  return (
    <Wrapper>
      <Title>(●'◡'●) 아직 페이지를 클릭하지 않았어요.</Title>
      <SubText>페이지를 클릭해 주세요!</SubText>
    </Wrapper>
  )
}

export default EmptyPagePanel;