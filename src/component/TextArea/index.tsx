import React, { KeyboardEvent, RefObject } from "react";
import styled from "styled-components";

type Props = {
  textAreaRef: RefObject<HTMLTextAreaElement>;
  changeTextArea: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const Wrapper = styled.textarea`
  width: 100%;
  height: 1000px;
  border: none;
  font-size: 20px;
  position: absolute;
  &:focus {
    outline: none;
  }
`;

const TextArea = ({ textAreaRef, changeTextArea }: Props) => {
  return (
    <Wrapper ref={textAreaRef} onKeyUp={(e) => changeTextArea(e)}>
    </Wrapper>
  )
}

export default TextArea;