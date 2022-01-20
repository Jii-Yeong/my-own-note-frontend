import { COMMEND_REGEX, SLICE_REGEX } from "$src/util/constant";
import { convertHtmlElements } from "$src/util/convert";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import InputTitle from "../InputTitle";
import ContentBox from "../ContentBox";
import TextModal from "../TextModal";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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

const MainPanel = () => {
  const divRef = React.createRef() as React.RefObject<HTMLDivElement>;
  const inputWrapperRef = React.createRef() as React.RefObject<HTMLDivElement>;
  const [styleObject, setStyleObject] = useState<{[key: string]: any}>({});
  const [isOpenTextModal, setOpenTextModalState] = useState<boolean>(false);
  const [currentInputEl, setCurrentInputEl] = useState<HTMLInputElement>();

  useEffect(() => {
    const startInput = inputWrapperRef.current?.firstChild as HTMLElement;
    startInput.focus();
  }, [])

  const handleDragStartElement = (divEl: HTMLDivElement) => {
    divEl.setAttribute("id", 'clicked');
  }

  const handleDragOverElement = (e: DragEvent | React.DragEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const firstChild = target.firstChild as HTMLInputElement;
    if (target && target.tagName === 'DIV' && !firstChild.placeholder) {
      e.preventDefault();
      target.style.borderBottom = '2px solid #0000005f';
    }
  }

  const handleDragLeaveElement = (e: DragEvent | React.DragEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    target.style.borderBottom = 'none';
  }

  const handleDragEndElement = (e: DragEvent | React.DragEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    target.style.borderBottom = 'none';
  }

  const handleDropElement = (e: DragEvent | React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const currentTarget = e.target as HTMLElement;
    const dragDiv = document.getElementById('clicked');
    const dragInput = dragDiv?.firstChild?.cloneNode() as HTMLElement;
    const dropInput = currentTarget.firstChild?.cloneNode() as HTMLElement;
    if (dragInput && dropInput) {
      dragInput.addEventListener('keyup', handleInputKeyUp);
      dropInput.addEventListener('keyup', handleInputKeyUp);
      dragDiv?.firstChild?.remove();
      dragDiv?.appendChild(dropInput);
      currentTarget.firstChild?.remove();
      currentTarget.appendChild(dragInput);
      dragDiv?.removeAttribute('id');
    }
    target.style.borderBottom = 'none';
  }

  const handleInputKeyUp = (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => {
    const currentTarget = e.target as HTMLInputElement;
    const parentNode = currentTarget.parentNode as HTMLElement;
    const nextTarget = parentNode.nextSibling?.firstChild as HTMLElement;
    const prevTarget = parentNode.previousSibling?.firstChild as HTMLElement;
    
    if (e.key === 'Enter') {
      const divEl = document.createElement('div');
      divEl.draggable = true;
      divEl.addEventListener('dragstart', () => {
        handleDragStartElement(divEl);
      });
      divEl.addEventListener('dragover', handleDragOverElement);
      divEl.addEventListener('dragend', handleDragEndElement);
      divEl.addEventListener('dragleave', handleDragLeaveElement);
      divEl.addEventListener('drop', handleDropElement);
      ReactDOM.render(<Input onKeyUp={(e) => handleInputKeyUp(e)} />, divEl);
      parentNode.after(divEl);

      const divFirstChild = divEl.firstChild as HTMLElement;
      divFirstChild.focus();
    }

    if (e.key === 'ArrowDown') {
      nextTarget.focus();
    }

    if (e.key === 'ArrowUp') {
      prevTarget.focus();
    }

    if (e.key === '/') {
      const windowSelection = window.getSelection()?.focusNode?.firstChild as HTMLInputElement;
      setCurrentInputEl(windowSelection);
      setOpenTextModalState(true);
    }

    if (e.key === 'Backspace' && currentTarget.selectionStart === 0) {
      prevTarget.focus();
      parentNode.remove();
    }
  }

  const handleClickTextList = (e: React.MouseEvent<HTMLElement>) => {
    const currentTargetCommand = e.currentTarget.dataset.command as string;
    const replaceText = convertHtmlElements('', currentTargetCommand, '') as {[key: string]: any};
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
    if (e.key === 'Enter') {
      const divEl = document.createElement('div');
      divEl.draggable = true;
      divEl.addEventListener('dragstart', () => {
        handleDragStartElement(divEl);
      });
      divEl.addEventListener('dragover', handleDragOverElement);
      divEl.addEventListener('dragend', handleDragEndElement);
      divEl.addEventListener('dragleave', handleDragLeaveElement);
      divEl.addEventListener('drop', handleDropElement);
      ReactDOM.render(<Input onKeyUp={(e) => handleInputKeyUp(e)} />, divEl);
      let newInputEl = divEl.firstChild as HTMLInputElement
      let oldInputEl = inputWrapperRef.current?.firstChild as HTMLInputElement;
      newInputEl.value = oldInputEl.value;
      oldInputEl.value = '';
      const changeStyleList = Object.keys(styleObject) as Array<string>;
      const newInputElStyle = newInputEl.style as {[key: string]: any};
      changeStyleList.forEach(style => {
        newInputElStyle[style] = styleObject[`${style}`];
        oldInputEl.removeAttribute('style');
      })
      divRef.current?.insertBefore(divEl, inputWrapperRef.current);
    }

    if (e.key === 'ArrowUp') {
      const currentTarget = e.target as HTMLElement;
      const prevInputEl = currentTarget?.parentNode?.previousSibling?.firstChild as HTMLElement;
      prevInputEl.focus()
    }

    if (e.key === '/') {
      const windowSelection = window.getSelection()?.focusNode?.firstChild as HTMLInputElement;
      setCurrentInputEl(windowSelection);
      setOpenTextModalState(true);
    }
    const currentTarget = e.target as HTMLInputElement;
    const content = currentTarget.value;
    const matchCommand = content.match(COMMEND_REGEX);
    const sliceTextLineCommand = matchCommand ? matchCommand[0] : '';
    const sliceTextLineContent = content.replace(COMMEND_REGEX, ``);
    const replaceText = convertHtmlElements(content, sliceTextLineCommand, sliceTextLineContent) as { [key: string]: any };
    const styleList = Object.keys(replaceText);
    const targetStyle = currentTarget.style as { [key: string]: any };
    styleList.forEach(style => {
      targetStyle[style] = replaceText[`${style}`];
    })
    currentTarget.value = content.replace(SLICE_REGEX, '');

    setStyleObject(replaceText);
  }

  return (
    <Wrapper>
      {isOpenTextModal && <TextModal clickTextList={handleClickTextList} />}
      <InputTitle />
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