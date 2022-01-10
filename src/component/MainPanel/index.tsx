import TextArea from "$src/component/TextArea";
import TextModal from "$src/component/TextModal";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const MainPanel = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textContent, setTextContent] : [string, any] = useState("");
  const [splitContent, setSplitContent] : [Array<string>, any] = useState([]);
  const [keyEventObject, setKeyEventObject] : [any, any] = useState({});
  let [lineNumber, setLineNumber] : [number, any] = useState(0);

  const [isOpenTextModal, setOpenTextModal] : [boolean, any] = useState(false);

  const handleChangeTextareaValue = (e : KeyboardEvent<HTMLTextAreaElement>) => {
    setKeyEventObject(e);
    const value = textAreaRef.current?.value;
    setSplitContent(value?.split('\n'));
  }

  useEffect(() => {
    const keyName = keyEventObject.key;
    
    if (keyName === "Enter") {
      setLineNumber(++lineNumber);
    }
    if (isOpenTextModal) {
      if (keyName === "Enter") {
        setOpenTextModal(false);
        splitContent.pop();
        setTextContent(splitContent.join(""));
        if (textAreaRef.current) {
          splitContent.push("");
          textAreaRef.current.value = splitContent.join("\n");
          setLineNumber(--lineNumber);
        }
      }
    }
    if (keyName === 'Backspace') {
      if (splitContent[splitContent.length - 1] === '') {
        if (lineNumber <= 0) {
          setLineNumber(0);
        } else {
          setLineNumber(--lineNumber);
        }
        setOpenTextModal(false);
      }
      if (splitContent[splitContent.length - 1].length === 1) {
        setOpenTextModal(false);
      }
    }
    const makeTextLine = splitContent[lineNumber];
    if (makeTextLine === "/ ") {
      setOpenTextModal(true);
    }
    console.log(splitContent, splitContent[lineNumber], lineNumber);
  }, [splitContent]);

  return (
  <Wrapper>
    <TextArea textAreaRef={textAreaRef} changeTextArea={handleChangeTextareaValue} />
    {isOpenTextModal && <TextModal />}
  </Wrapper>
  )
}

export default MainPanel;