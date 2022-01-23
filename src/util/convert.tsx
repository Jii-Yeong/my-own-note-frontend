import React from "react";
import { COMMEND_REGEX } from "./constant";

export const convertHtmlElements = (content: string, sliceTextLineCommand: string) => {
  if (content.match(/^\*\*.*\*\*$/g)) {
    return <b>{content}</b>
  }
  if (sliceTextLineCommand === '# ') {
    return {
      fontSize: '30px',
      height: '50px',
      placeholder: '제목1',
      styleName: 'h1',
      fontWeight: 'bolder',
    }
  } else if (sliceTextLineCommand === '## ') {
    return {
      fontSize: '25px',
      height: '30px',
      placeholder: '제목2',
      styleName: 'h2',
      fontWeight: 'bolder',
    }
  } else if (sliceTextLineCommand === '### ') {
    return {
      fontSize: '20px',
      height: '25px',
      placeholder: '제목3',
      styleName: 'h3',
      fontWeight: 'bolder',
    }
  } else if (sliceTextLineCommand === '-[] ') {
    return {
      fontSize: '30px',
      height: '50px',
    }
  } else if (sliceTextLineCommand === '- ' || sliceTextLineCommand === '* ') {
    return {
      fontSize: '30px',
      height: '50px',
      placeholder: '리스트',
    }
  } else if (sliceTextLineCommand === '> ') {
    return {
      fontSize: '30px',
      height: '50px',
      placeholder: '인용문',
    }
  } else {
    return {};
  }
}

export const convertInputValue = (currentTarget: HTMLInputElement, setStyleObject: React.Dispatch<{[key: string]: any}>) => {
  console.log("currentTarget", currentTarget.value);
  const content = currentTarget.value;
  const matchCommand = content.match(COMMEND_REGEX);
  const sliceTextLineCommand = matchCommand ? matchCommand[0] : '';
  const sliceTextLineContent = content.replace(COMMEND_REGEX, ``);
  const replaceText = convertHtmlElements(content, sliceTextLineCommand) as { [key: string]: any };
  const styleList = Object.keys(replaceText);
  console.log("styleList", styleList);
  if (styleList.length !== 0) {
    currentTarget.dataset.style = replaceText.styleName;
    const targetStyle = currentTarget.style as { [key: string]: any };
    styleList.forEach(style => {
      targetStyle[style] = replaceText[`${style}`];
    })
    setStyleObject(replaceText);
  }
  currentTarget.value = sliceTextLineContent;
}