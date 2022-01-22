import React, { useEffect, useState } from "react";
import { SLICE_REGEX } from "$src/util/constant";
import { convertHtmlElements, convertInputValue } from "$src/util/convert";
import styled from "styled-components";
import InputTitle from "../InputTitle";
import ContentBox from "../ContentBox";
import TextModal from "../TextModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "$src/stores/types/root";
import useDom, { handleDragOverElement } from "$src/pages/MainPage/hooks/dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
let timer: NodeJS.Timeout | null;

const MainPanel = () => {
  const divRef = React.createRef() as React.RefObject<HTMLDivElement>;
  const inputWrapperRef = React.createRef() as React.RefObject<HTMLDivElement>;
  const [styleObject, setStyleObject] = useState<{ [key: string]: any }>({});
  const [isOpenTextModal, setOpenTextModalState] = useState<boolean>(false);
  const [currentInputEl, setCurrentInputEl] = useState<HTMLInputElement>();
  const pageContent = useSelector((state: RootState) => state.page.pageContent);
  const currentPageId = useSelector((state: RootState) => state.page.currentPageId);
  const { createInputEl, insertInpulElToMiddleInput, insertInputElToLastInput, saveInputAllContent } = useDom();
  const dispatch = useDispatch();

  useEffect(() => {
    const startInput = inputWrapperRef.current?.firstChild as HTMLElement;
    startInput.focus();
  }, [])

  useEffect(() => {
    const wrapper = divRef.current;
    const wrapperNodeList = wrapper?.querySelectorAll('.new-div') as NodeList;
    const newDivElList = Array.from(wrapperNodeList);
    newDivElList.forEach(div => {
      wrapper?.removeChild(div);
    })
    if (pageContent.text) {
      pageContent.text.forEach((content: { [key: string]: any }) => {
        const divEl = createInputEl(handleInputKeyUp, content.text) as HTMLElement;
        wrapper?.prepend(divEl);
      })
    }
  }, [pageContent]);

  const handleInputKeyUp = (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => {
    const currentTarget = e.target as HTMLInputElement;
    const parentNode = currentTarget.parentNode as HTMLElement;
    const nextParentNode = parentNode.nextSibling as HTMLElement;
    const nextTarget = parentNode.nextSibling?.firstChild as HTMLElement;
    const prevTarget = parentNode.previousSibling?.firstChild as HTMLElement;
    const wrapper = document.getElementById('wrapper');

    if (e.key === 'Enter') {
      insertInpulElToMiddleInput(handleInputKeyUp, parentNode);
    }

    if (e.key === 'ArrowDown') {
      nextTarget?.focus();
    }

    if (e.key === 'ArrowUp') {
      prevTarget?.focus();
    }

    if (e.key === '/') {
      const windowSelection = window.getSelection()?.focusNode?.firstChild as HTMLInputElement;
      setCurrentInputEl(windowSelection);
      setOpenTextModalState(true);
    }

    if (e.key === 'Backspace' && currentTarget.selectionStart === 0 && prevTarget) {
      prevTarget.focus();
      parentNode.remove();
      if (wrapper) {
        saveInputAllContent(wrapper, currentPageId);
      }
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      if (wrapper) {
        saveInputAllContent(wrapper, currentPageId);
      }
    }, 600);
  }

  const handleClickTextList = (e: React.MouseEvent<HTMLElement>) => {
    const currentTargetCommand = e.currentTarget.dataset.command as string;
    const replaceText = convertHtmlElements('', currentTargetCommand) as { [key: string]: any };
    const styleList = Object.keys(replaceText);
    if (currentInputEl) {
      const currentInputStyle = currentInputEl?.style as { [key: string]: any };
      styleList.forEach(style => {
        currentInputStyle[style] = replaceText[`${style}`];
      })
      const currentInputContent = currentInputEl?.value;
      currentInputEl.value = currentInputContent?.replace(SLICE_REGEX, '');
      setStyleObject(replaceText);
      setOpenTextModalState(false);
      currentInputEl.focus();
    }
  }

  const handlePressEnterKey = (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => {
    const currentTarget = e.target as HTMLInputElement;
    const wrapper = document.getElementById('wrapper');
    console.log("wrapper", wrapper);
    if (e.key === 'Enter') {
      setStyleObject({});
      insertInputElToLastInput(handleInputKeyUp, inputWrapperRef, styleObject, divRef);
      if (wrapper) {
        saveInputAllContent(wrapper, currentPageId);
      }
    }

    if (e.key === 'ArrowUp') {
      const prevInputEl = currentTarget?.parentNode?.previousSibling?.firstChild as HTMLElement;
      prevInputEl.focus()
    }

    if (e.key === '/') {
      const windowSelection = window.getSelection()?.focusNode?.firstChild as HTMLInputElement;
      setCurrentInputEl(windowSelection);
      setOpenTextModalState(true);
    }
    convertInputValue(currentTarget, setStyleObject);
  }

  return (
    <Wrapper>
      {isOpenTextModal && <TextModal clickTextList={handleClickTextList} />}
      <InputTitle title={pageContent.title ?? ''} />
      <ContentBox
        divRef={divRef}
        inputWrapperRef={inputWrapperRef}
        pressEnterKey={handlePressEnterKey}
        dragOverElement={handleDragOverElement}
        dropElement={handleDragOverElement} />
    </Wrapper>
  )
}

export default MainPanel;