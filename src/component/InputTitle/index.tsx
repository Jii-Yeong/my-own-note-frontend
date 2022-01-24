import React, { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`

const InputBox = styled.input`
  font-size: 3vw;
  margin: 25px 0px 10px 70px;
  border: none;
  font-family: 'nanum';
  &:focus {
    outline: none;
  }
`

type Props = {
  title: string;
}

const InputTitle = ({ title }: Props) => {
  const inputRef = React.createRef() as React.RefObject<HTMLInputElement>;
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = title;
    }
  }, [title])
  return (
    <Wrapper>
      <InputBox ref={inputRef} placeholder="제목을 입력하세요." readOnly />
    </Wrapper>
  )
}

export default InputTitle;