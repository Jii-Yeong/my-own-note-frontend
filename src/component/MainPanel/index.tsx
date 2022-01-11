import TextArea from "$src/component/TextArea";
import TextModal from "$src/component/TextModal";
import { convertHtmlElements, NBSP, SPACE } from "$src/util/convert";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
const MainPanel = () => {
  const textAreaRef = useRef<HTMLDivElement>(null);
  const [keyEventObject, setKeyEventObject]: [any, any] = useState({});
  let [lineNumber, setLineNumber]: [number, any] = useState(0);

  const [isOpenTextModal, setOpenTextModal]: [boolean, any] = useState(false);

  const handleChangeTextareaValue = (e: KeyboardEvent<HTMLDivElement>) => {
    setKeyEventObject(e);
  }

  useEffect(() => {
    if (textAreaRef.current) {
      const childNodes = textAreaRef.current.childNodes;

      if (childNodes?.length === 1 || childNodes?.length === 0) {
        setLineNumber(0);
      } else {
        setLineNumber(childNodes?.length - 1);
      }

      const makeTextLine = childNodes[lineNumber] as HTMLElement;
      const textLineParentNode = makeTextLine?.parentNode as HTMLElement;
      const textLineLastChild = makeTextLine?.lastChild as HTMLElement;

      convertHtmlElements(makeTextLine, textLineParentNode, textLineLastChild);

      if (textLineParentNode?.innerHTML === `/${NBSP}`) {
        setOpenTextModal(true);
      } else {
        setOpenTextModal(false);
      }

      if (makeTextLine?.innerText === `/${SPACE}`) {
        setOpenTextModal(true);
      } else {
        setOpenTextModal(false);
      }

      if (makeTextLine?.innerText?.slice(-2, -1) === "/") {
        setOpenTextModal(true);
      } else {
        setOpenTextModal(false);
      }
      
    }
  }, [textAreaRef.current?.innerHTML]);

  return (
    <Wrapper>
      {isOpenTextModal && <TextModal />}
      <TextArea textAreaRef={textAreaRef} changeTextArea={handleChangeTextareaValue} />
    </Wrapper>
  )
}

export default MainPanel;