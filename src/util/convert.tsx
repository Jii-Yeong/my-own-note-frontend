import React from "react";

export const convertHtmlElements = (content: string, sliceTextLineCommand: string, sliceTextLineContent: string) => {
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