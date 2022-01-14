import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`

`

const InputBox = styled.input`
  font-size: 45px;
  margin: 34px;
  border: none;
  font-family: 'nanum';
  &:focus {
    outline: none;
  }
`

const InputTitle = () => {
  return (
    <Wrapper>
      <InputBox placeholder="제목을 입력하세요."/>
    </Wrapper>
  )
}

export default InputTitle;