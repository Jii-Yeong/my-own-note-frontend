import { insertPageContent } from "$src/stores/modules/pageSlice";
import React from "react";
import { useDispatch } from "react-redux";

export const handleDragStartElement = (divEl: HTMLDivElement) => {
  divEl.setAttribute("id", 'clicked');
}

export const handleDragOverElement = (e: DragEvent | React.DragEvent<HTMLElement>) => {
  const target = e.target as HTMLElement;
  const firstChild = target.firstChild as HTMLInputElement;
  if (target && target.tagName === 'DIV' && !firstChild.placeholder) {
    e.preventDefault();
    target.style.borderBottom = '2px solid #0000005f';
  }
}

export const handleDragLeaveElement = (e: DragEvent | React.DragEvent<HTMLElement>) => {
  const target = e.target as HTMLElement;
  target.style.borderBottom = 'none';
}

export const handleDragEndElement = (e: DragEvent | React.DragEvent<HTMLElement>) => {
  const target = e.target as HTMLElement;
  target.style.borderBottom = 'none';
}

export const handleDropElement = (e: DragEvent | React.DragEvent<HTMLElement>, handleInputKeyUp: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void) => {
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

const useDom = () => {
  const dispatch = useDispatch();
  const createInputEl = (handleInputKeyUp: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void, wrapper?: HTMLDivElement, currentPageId?: number, text?: string) => {
    const divEl = document.createElement('div');
    divEl.draggable = true;
    divEl.className = 'new-div'
    divEl.addEventListener('dragstart', () => {
      handleDragStartElement(divEl);
    });
    divEl.addEventListener('dragover', handleDragOverElement);
    divEl.addEventListener('dragend', handleDragEndElement);
    divEl.addEventListener('dragleave', handleDragLeaveElement);
    divEl.addEventListener('drop', (e) => {
      handleDropElement(e, handleInputKeyUp);
      if (wrapper && currentPageId) {
        saveInputAllContent(wrapper, currentPageId);
      }
      console.log("실행중");
    });
    const inputEl = document.createElement('input');
    inputEl.addEventListener('keyup', handleInputKeyUp);
    inputEl.style.display = 'block';
    inputEl.style.height = '30px';
    inputEl.style.width = '93%';
    inputEl.style.margin = '0 auto';
    inputEl.style.border = 'none';
    inputEl.style.fontSize = '15px';
    inputEl.style.fontFamily = '"nanum"';
    inputEl.value = text ?? '';
    divEl.appendChild(inputEl);
    return divEl;
  }

  const insertInpulElToMiddleInput = (handleInputKeyUp: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void, parentNode: HTMLElement) => {
    const divEl = createInputEl(handleInputKeyUp);
    parentNode.after(divEl);
    const divFirstChild = divEl.firstChild as HTMLElement;
    divFirstChild.focus();
  }

  const insertInputElToLastInput = (handleInputKeyUp: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void,
    inputWrapperRef: React.RefObject<HTMLDivElement>,
    styleObject: any,
    divRef: React.RefObject<HTMLDivElement>) => {

    const divEl = createInputEl(handleInputKeyUp);
    let newInputEl = divEl.firstChild as HTMLInputElement
    let oldInputEl = inputWrapperRef.current?.firstChild as HTMLInputElement;
    newInputEl.value = oldInputEl.value;
    oldInputEl.value = '';
    const changeStyleList = Object.keys(styleObject) as Array<string>;
    const newInputElStyle = newInputEl.style as { [key: string]: any };
    changeStyleList.forEach(style => {
      newInputElStyle[style] = styleObject[`${style}`];
      oldInputEl.removeAttribute('style');
    })
    divRef.current?.insertBefore(divEl, inputWrapperRef.current);
  }

  const saveInputAllContent = (wrapper: HTMLDivElement, currentPageId: number) => {
    const inputElNodeList = wrapper?.querySelectorAll('input') as NodeList;
    if (inputElNodeList) {
      const inputElList = Array.from(inputElNodeList);
      const textList = inputElList.map(input => (input as HTMLInputElement).value);
      if (!textList[textList.length - 1]) {
        textList.pop();
      }
      dispatch(insertPageContent({ currentPageId, textList }));
    }
  }

  return {
    createInputEl,
    insertInpulElToMiddleInput,
    insertInputElToLastInput,
    saveInputAllContent,
  }
}

export default useDom;