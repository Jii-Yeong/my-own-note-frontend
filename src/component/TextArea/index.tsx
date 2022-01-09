import React, { RefObject, useEffect } from "react";
import styled from "styled-components";

type Props = {
  textAreaRef: RefObject<HTMLTextAreaElement>;
  changeTextArea: () => void;
}

const Wrapper = styled.textarea`
  width: 100%;
  height: 1000px;
  border: none;
  font-size: 20px;
  &:focus {
    outline: none;
  }
`;

const TextArea = ({ textAreaRef, changeTextArea }: Props) => {
  useEffect(() => {
    console.log("gg", textAreaRef.current?.value);
  }, [textAreaRef.current?.value]);
  return (
    <Wrapper ref={textAreaRef} onChange={changeTextArea}>

    </Wrapper>
  )
}

export default TextArea;