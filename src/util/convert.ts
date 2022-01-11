export const SPACE = ' ';
export const NBSP = '&nbsp;';

export const convertHtmlElements = (makeTextLine: HTMLElement, textLineParentNode: HTMLElement, textLineLastChild: HTMLElement) => {
  console.log("makeTextLine", makeTextLine);
  if (textLineParentNode?.innerHTML === `-${NBSP}`) {
    textLineParentNode.innerHTML = "<ul><li></li></ul>";
  }

  if (makeTextLine?.innerText === `-${SPACE}`) {
    makeTextLine.innerHTML = `<ul><li></li></ul>`;

  }if (makeTextLine?.innerText?.slice(-2, -1) === "-") {
    textLineLastChild.outerHTML = "<ul><li></li></ul>";
  }
}