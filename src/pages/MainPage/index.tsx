import TextArea from "$src/component/TextArea";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const MainPage = () => {

  useEffect(() => {
    textAreaRef.current?.focus();
  }, [])

  const handleChangeTextareaValue = () => {
    console.log(textAreaRef.current?.value);
  }

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  return (
  <Wrapper>
    <TextArea textAreaRef={textAreaRef} changeTextArea={handleChangeTextareaValue} />
  </Wrapper>
  )
}

export default MainPage;