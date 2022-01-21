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
    }
  } else if (sliceTextLineCommand === '## ') {
    return {
      fontSize: '20px',
      height: '30px',
      placeholder: '제목2',
    }
  } else if (sliceTextLineCommand === '### ') {
    return {
      fontSize: '15px',
      height: '20px',
      placeholder: '제목3',
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
  const content = currentTarget.value;
  const matchCommand = content.match(COMMEND_REGEX);
  const sliceTextLineCommand = matchCommand ? matchCommand[0] : '';
  const sliceTextLineContent = content.replace(COMMEND_REGEX, ``);
  const replaceText = convertHtmlElements(content, sliceTextLineCommand) as { [key: string]: any };
  const styleList = Object.keys(replaceText);
  if (styleList.length !== 0) {
    const targetStyle = currentTarget.style as { [key: string]: any };
    console.log("styleList", styleList);
    styleList.forEach(style => {
      targetStyle[style] = replaceText[`${style}`];
    })
    setStyleObject(replaceText);
  }
  currentTarget.value = sliceTextLineContent;
}