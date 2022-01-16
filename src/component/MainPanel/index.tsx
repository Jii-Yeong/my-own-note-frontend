import { COMMEND_REGEX } from "$src/util/constant";
import { convertHtmlElements } from "$src/util/convert";
import React, { DragEvent, KeyboardEvent, useEffect, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import InputTitle from "../InputTitle";
import ContentBox from "../ContentBox";

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
  const [styleObject, setStyleObject] = useState({});

  const handleInputKeyUp = (e: KeyboardEvent) => {
    const currentTarget = e.target as HTMLElement;
    const nextTarget = currentTarget.parentNode?.nextSibling?.firstChild as HTMLElement;
    const prevTarget = currentTarget.parentNode?.previousSibling?.firstChild as HTMLElement;
    if (e.key === 'Enter' || e.key === 'ArrowDown') {
      nextTarget.focus();
    }
    if (e.key === 'ArrowUp') {
      prevTarget.focus();
    }
  }

  useEffect(() => {
    const startInput = inputWrapperRef.current?.firstChild as HTMLElement;
    startInput.focus();
  }, [])

  const handleDragOverElement = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const handleDragStartElement = (divEl: HTMLDivElement) => {
    divEl.setAttribute("id", 'clicked');
  }

  const handleDropElement = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const currentTarget = e.target as HTMLElement;
    const dragDiv = document.getElementById('clicked');
    const dragInput = dragDiv?.firstChild?.cloneNode();
    const dropInput = currentTarget.firstChild?.cloneNode() as Node;
    dragInput?.addEventListener('keyup', handleInputKeyUp);
    dropInput?.addEventListener('keyup', handleInputKeyUp);
    if (dragInput) {
      dragDiv?.firstChild?.remove();
      dragDiv?.appendChild(dropInput);
      currentTarget.firstChild?.remove();
      currentTarget.appendChild(dragInput);
      dragDiv?.removeAttribute('id');
    }
  }

  const handlePressEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const divEl = document.createElement('div');
      divEl.draggable = true;
      divEl.addEventListener('dragover', handleDragOverElement);
      divEl.addEventListener('dragstart', () => {
        handleDragStartElement(divEl);
      });
      divEl.addEventListener('drop', handleDropElement);
      ReactDOM.render(<Input onKeyUp={(e) => handleInputKeyUp(e)} />, divEl);
      let newInputEl = divEl.firstChild as HTMLInputElement
      let oldInputEl = inputWrapperRef.current?.firstChild as HTMLInputElement;
      newInputEl.value = oldInputEl.value;
      oldInputEl.value = '';
      const changeStyleList = Object.keys(styleObject) as Array<string>;
      changeStyleList.forEach(style => {
        newInputEl.style[style] = styleObject[`${style}`];
        oldInputEl.removeAttribute('style');
      })
      divRef.current?.insertBefore(divEl, inputWrapperRef.current);
    }

    if (e.key === 'ArrowUp') {
      const currentTarget = e.target as HTMLElement;
      const prevInputEl = currentTarget?.parentNode?.previousSibling?.firstChild as HTMLElement;
      prevInputEl.focus()
    }

    const currentTarget = e.target as HTMLInputElement;
    const content = currentTarget.value;
    const matchCommand = content.match(COMMEND_REGEX);
    const sliceTextLineCommand = matchCommand ? matchCommand[0] : '';
    const sliceTextLineContent = content.replace(COMMEND_REGEX, ``);
    const replaceText = convertHtmlElements(content, sliceTextLineCommand, sliceTextLineContent);
    const styleList = Object.keys(replaceText);
    styleList.forEach(style => {
      currentTarget.style[style] = replaceText[`${style}`];
    })
    setStyleObject(replaceText);
  }

  return (
    <Wrapper>
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