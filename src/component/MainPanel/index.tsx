import TextArea from "$src/component/TextArea";
import TextModal from "$src/component/TextModal";
import { store } from "$src/pages/MainPage/configureStore";
import { changeTextContetns, setTextContents } from "$src/stores/modules/textContentSlice";
import { RootState } from "$src/stores/types/text-content";
import { COMMEND_REGEX } from "$src/util/constant";
import { convertHtmlElements } from "$src/util/convert";
import { CombinedState, EnhancedStore } from "@reduxjs/toolkit";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const textContent = (state: EnhancedStore<CombinedState<RootState>>) => state.getState().textContent;

const MainPanel = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [keyEventObject, setKeyEventObject]: [any, any] = useState({});
  const [isOpenTextModal, setOpenTextModal]: [boolean, any] = useState(false);
  let [lineNumber, setLineNumber]: [number, any] = useState(0);
  const textContents = textContent(store);

  const dispatch = useDispatch();

  const handleChangeTextareaValue = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    setKeyEventObject(e);
    const contents = textAreaRef?.current?.value.split('\n');
    dispatch(setTextContents({ contents }));
  }

  useEffect(() => {
    if (textContents.length === 0) {
      setLineNumber(0)
    } else {
      setLineNumber(textContents.length - 1);
    }

    if (textContents[lineNumber] === '/ ') {
      setOpenTextModal(true);
    } else {
      setOpenTextModal(false);
    }

    if (keyEventObject.key === 'Enter') {
      setOpenTextModal(false);
    }

    if (keyEventObject.target) {
      keyEventObject.target.value = textContents.join('\n');
    }
  }, [textContents]);

  const handleClickTextConvertButton = (e : React.MouseEvent<Element, MouseEvent>) => {
    const currentElement = e.currentTarget as HTMLElement;
    const textLine = currentElement?.dataset.command;;
    dispatch(changeTextContetns({ lineNumber, textLine }));
    keyEventObject.target.focus();
    setOpenTextModal(false);
  }
  
  return (
    <Wrapper>
      {isOpenTextModal && <TextModal clickTextList={handleClickTextConvertButton} />}
      <TextArea textAreaRef={textAreaRef} changeTextArea={handleChangeTextareaValue} />
      <div>
        {textContents.map((content: string, index: number) => {
          const matchCommand = content.match(COMMEND_REGEX);
          const sliceTextLineCommand = matchCommand ? matchCommand[0] : '';
          const sliceTextLineContent = content.replace(COMMEND_REGEX, ``);
          const replaceText = convertHtmlElements(content, sliceTextLineCommand, sliceTextLineContent);
          return (
            <div key={`contents-${index}`}>
              {replaceText}
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}

export default MainPanel;