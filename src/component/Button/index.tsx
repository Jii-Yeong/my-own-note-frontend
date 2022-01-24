import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.button<{object: any}>`
  border: 1px solid #6667ab;
  color: #6667ab;
  background-color: #ffffff;
  ${({object}) => object && css`font-size: ${object.fontSize ?? 1}vmax;`}
  ${({object}) => object && css`width: ${object.width}%;`}
  ${({object}) => object && css`height: ${object.height}%;`}
  ${({object}) => object && css`border-radius: ${object.borderRadius}px;`}
  ${({object}) => object && css`position: ${object.position};`}
  ${({object}) => object && css`top: ${object.top}%;`}
  ${({object}) => object && css`left: ${object.left}%;`}
  ${({object}) => object && css`margin: ${object.margin};`}
  font-family: 'nanum';
  cursor: pointer;
  &:hover {
    background-color: #6667ab;
    color: #ffffff;
  }
  font-weight: bolder;
`

type Props = {
  name: string;
  buttonClick: (e?: React.MouseEvent<HTMLElement>) => void;
  cssObject: {[key: string]: any};
  buttonType: 'button' | 'submit' | 'reset' | undefined;
}


const Button = ({ name, buttonClick, cssObject, buttonType }: Props) => {
  console.log("cssObject", buttonType);
  return (
    <Wrapper onClick={(e) => buttonClick(e)} object={cssObject} type={buttonType ?? 'button'}>
      {name}
    </Wrapper>
  )
}

export default Button;