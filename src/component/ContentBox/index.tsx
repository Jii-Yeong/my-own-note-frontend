import React, { DragEvent, KeyboardEvent, RefObject } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  & > div {
    width: 80%;
    margin: 0 auto;
  }
`

const Input = styled.input`
  display: block;
  height: 30px;
  width: 93%;
  margin: 0 auto;
  border: none;
  font-size: 15px;
  font-family: 'nanum';
  &: focus {
    outline: none;
  }
`

type Props = {
  inputWrapperRef: RefObject<HTMLDivElement>;
  divRef: RefObject<HTMLDivElement>;
  pressEnterKey: (e: KeyboardEvent<HTMLInputElement>) => void;
  dragOverElement: (e: DragEvent<HTMLDivElement>) => void;
  dropElement: (e: DragEvent<HTMLDivElement>) => void;
}

const ContentBox = ({ inputWrapperRef, divRef, pressEnterKey, dragOverElement, dropElement }: Props) => {
  return (
    <Wrapper ref={divRef}>
      <div ref={inputWrapperRef} draggable={true} onDragOver={(e) => dragOverElement(e)}
        onDrop={(e) => dropElement(e)}
      >
        <Input type="text" onKeyUp={(e) => pressEnterKey(e)} placeholder="글 작성하기" />
      </div>
    </Wrapper >
  )
}

export default ContentBox;