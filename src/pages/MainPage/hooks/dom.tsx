import { insertPageContent } from "$src/stores/modules/pageSlice";
import React from "react";
import { useDispatch } from "react-redux";

export const handleDragStartElement = (e: DragEvent) => {
  const currentTarget = e.target as HTMLElement;
  currentTarget.style.backgroundColor = 'transparent';
  currentTarget.setAttribute("id", 'clicked');
}

export const handleDragOverElement = (e: DragEvent | React.DragEvent<HTMLElement>) => {
  const target = e.target as HTMLElement;
  const firstChild = target.querySelector('input') as HTMLInputElement;
  if (target && target.tagName === 'DIV' && !firstChild.placeholder) {
    e.preventDefault();
    target.style.backgroundColor = '#0000005f';
  }
}

export const handleDragLeaveElement = (e: DragEvent | React.DragEvent<HTMLElement>) => {
  const target = e.target as HTMLElement;
  target.style.backgroundColor = 'transparent';
}

export const handleDragEndElement = (e: DragEvent | React.DragEvent<HTMLElement>) => {
  const target = e.target as HTMLElement;
  target.style.backgroundColor = 'transparent';
}

export const handleDropElement = (
  e: DragEvent | React.DragEvent<HTMLElement>, 
  handleInputKeyUp: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void,
  currentPageId: number | undefined, 
  saveInputAllContent: Function,
  handleChangeToCommand: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void,
  ) => {
  const target = e.target as HTMLElement;
  const firstChild = target.querySelector('input') as HTMLInputElement;
  const wrapper = document.getElementById('wrapper');
  if (target && target.tagName === 'DIV' && !firstChild.placeholder) {
    e.preventDefault();
  }
  const dragDiv = document.getElementById('clicked');
  const dragCloneDiv = dragDiv?.cloneNode(true) as HTMLElement;
  const targetCloneDiv = target?.cloneNode(true) as HTMLElement;

  if (wrapper) {
    addDragEventListener(dragCloneDiv, handleInputKeyUp, wrapper, currentPageId, saveInputAllContent, handleChangeToCommand)
    addDragEventListener(targetCloneDiv, handleInputKeyUp, wrapper, currentPageId, saveInputAllContent, handleChangeToCommand)
  }
  if (dragCloneDiv && dragDiv) {
    const dragCloneInput = dragCloneDiv.querySelector('input');
    const targetCloneInput = targetCloneDiv.querySelector('input');
    const dragInputStyle = dragDiv.querySelector('input')?.dataset.style;
    const targetInputStyle = target.querySelector('input')?.dataset.style;
    console.log("dragInputStyle", dragInputStyle, targetInputStyle);
    if (dragCloneInput && targetCloneInput) {
      dragCloneInput.addEventListener('keydown', handleInputKeyUp);
      dragCloneInput.addEventListener('keyup', handleChangeToCommand);
      dragCloneInput.dataset.style = dragInputStyle;
      targetCloneInput.addEventListener('keydown', handleInputKeyUp);
      targetCloneInput.addEventListener('keyup', handleChangeToCommand);
      targetCloneInput.dataset.style = targetInputStyle;
    }
    dragDiv.replaceWith(targetCloneDiv);
    target.replaceWith(dragCloneDiv);
    targetCloneDiv.style.backgroundColor = 'transparent';
    targetCloneDiv.removeAttribute('id');
    dragCloneDiv.removeAttribute('id');
  }
}

export const addDragEventListener = (
    divEl: HTMLElement, 
    handleInputKeyUp: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void, 
    wrapper: HTMLElement | null, 
    currentPageId: number | undefined, 
    saveInputAllContent: Function,
    handleChangeToCommand: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void, 
  ) => {
  divEl.className = 'new-div'
  divEl.style.display = 'flex';
  divEl.style.zIndex = '200';
  divEl.addEventListener('dragstart', handleDragStartElement);
  divEl.addEventListener('dragover', handleDragOverElement);
  divEl.addEventListener('dragend', handleDragEndElement);
  divEl.addEventListener('dragleave', handleDragLeaveElement);
  divEl.addEventListener('drop', (e: DragEvent) => {
    handleDropElement(e, handleInputKeyUp, currentPageId, saveInputAllContent, handleChangeToCommand);
    if (wrapper && currentPageId) {
      saveInputAllContent(wrapper, currentPageId);
    }
    console.log("실행중");
  });
}

export const makeInputElement = (
    handleInputKeyUp: (e: KeyboardEvent) => void, 
    style: string, text: string,
    handleChangeToCommand: (e: KeyboardEvent) => void, 
  ) => {
  const inputEl = document.createElement('input');
  inputEl.addEventListener('keydown', handleInputKeyUp);
  inputEl.addEventListener('keyup', handleChangeToCommand);
  inputEl.style.display = 'block';
  inputEl.style.height = '40px';
  inputEl.style.width = '93%';
  inputEl.style.margin = '0px 0px 0px 36px';
  inputEl.style.border = 'none';
  inputEl.style.fontSize = '15px';
  inputEl.style.fontFamily = '"nanum"';
  inputEl.style.backgroundColor = 'transparent';
  inputEl.style.outline = 'none';
  inputEl.dataset.style = style ?? '';
  if (style === 'h1') {
    inputEl.style.fontSize = '30px';
    inputEl.style.height = '50px';
    inputEl.style.fontWeight = 'bolder';
  }
  if (style === 'h2') {
    inputEl.style.fontSize = '25px';
    inputEl.style.height = '30px;'
    inputEl.style.fontWeight = 'bolder';
  } 
  if (style === 'h3') {
    inputEl.style.fontSize = '20px';
    inputEl.style.height = '25px;'
    inputEl.style.fontWeight = 'bolder';
  }
  inputEl.value = text ?? '';
  return inputEl;
}

const useDom = () => {
  const dispatch = useDispatch();
  const createInputEl = (
    handleInputKeyUp: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void,
    handleChangeToCommand: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void,
    wrapper?: HTMLDivElement, 
    currentPageId?: number, 
    text?: string, 
    style?: string,
  ) => {
    const divEl = document.createElement('div');
    addDragEventListener(divEl, handleInputKeyUp, wrapper ?? null, currentPageId ?? undefined, saveInputAllContent, handleChangeToCommand)
    divEl.style.background = 'url(../../images/move_bar.svg)';
    divEl.style.backgroundSize = 'contain';
    divEl.style.backgroundRepeat = 'no-repeat';
    divEl.style.backgroundColor = 'transparent';
    divEl.style.display = 'flex';
    divEl.style.zIndex = '50';
    divEl.style.alignItems = 'center';
    divEl.style.height = '30px';
    divEl.style.margin = '10px 0px 10px 0px';
    divEl.draggable = true;
    const inputEl = makeInputElement(handleInputKeyUp, style ?? '', text ?? '', handleChangeToCommand);
    divEl.appendChild(inputEl);
    return divEl;
  }

  const insertInpulElToMiddleInput = (handleInputKeyUp: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void, 
  parentNode: HTMLElement,
  handleChangeToCommand: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void,
  ) => {
    const divEl = createInputEl(handleInputKeyUp, handleChangeToCommand);
    divEl.style.display = 'flex';
    divEl.draggable = true;
    divEl.className = 'new-div';
    parentNode.after(divEl);
    const divFirstChild = divEl.querySelector('input') as HTMLElement;
    divFirstChild.focus();
  }

  const insertInputElToLastInput = (handleInputKeyUp: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void,
    inputWrapperRef: React.RefObject<HTMLDivElement>,
    styleObject: any,
    divRef: React.RefObject<HTMLDivElement>,
    currentPageId: number,
    handleChangeToCommand: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void,
    ) => {
    const wrapper = document.getElementById('wrapper');
    const divEl = createInputEl(handleInputKeyUp, handleChangeToCommand);
    if (wrapper) {
      addDragEventListener(divEl, handleInputKeyUp, wrapper, currentPageId, saveInputAllContent, handleChangeToCommand);
    }
    let newInputEl = divEl.querySelector('input') as HTMLInputElement
    let oldInputEl = inputWrapperRef.current?.querySelector('input') as HTMLInputElement;
    newInputEl.value = oldInputEl.value;
    oldInputEl.value = '';
    newInputEl.dataset.style = oldInputEl.dataset.style;
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
      const textList = inputElList.map(input => {
        const currentInput = input as HTMLInputElement;
        return {
          text: currentInput.value,
          style: currentInput.dataset.style ?? '',
        }
      });
      if (!textList[textList.length - 1].text) {
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