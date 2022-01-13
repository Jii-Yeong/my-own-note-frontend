import React from "react";

export const convertHtmlElements = (content: string, sliceTextLineCommand: string, sliceTextLineContent: string) => {
  if (content.match(/^\*\*.*\*\*$/g)) {
    return <b>{content}</b>
  }
  if (sliceTextLineCommand === '# ') {
    return <h1>{sliceTextLineContent}</h1>
  } else if (sliceTextLineCommand === '## ') {
    return <h2>{sliceTextLineContent}</h2>
  } else if (sliceTextLineCommand === '### ') {
    return <h3>{sliceTextLineContent}</h3>
  } else if (sliceTextLineCommand === '- ' || sliceTextLineCommand === '* ') {
    return <li>{sliceTextLineContent}</li>
  } else if (sliceTextLineCommand === '> ') {
    return <blockquote>{sliceTextLineContent}</blockquote>
  } else {
    return content;
  }
}