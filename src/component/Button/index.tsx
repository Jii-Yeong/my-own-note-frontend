import React from "react";
import styled from "styled-components";

type Props = {
  name: string;
  buttonClick: () => void;
}

const Wrapper = styled.button`
  border: 1px solid #ffffff;
  background-color: transparent;
  color: #ffffff;
  font-size: 15px;
  width: 90px;
  height: 30px;
  border-radius: 30px;
  font-family: 'nanum';
  cursor: pointer;
  margin: 15px 2px 0px 8px;
  &:hover {
    background-color: #ffffff;
    color: #6667ab;
  }
`

const Button = ({ name, buttonClick }: Props) => {
  return (
    <Wrapper onClick={() => buttonClick()}>
      {name}
    </Wrapper>
  )
}

export default Button;