import { IMAGE_URL } from "$config/proxy";
import React from "react";
import styled from "styled-components";

type Props = {
  isAdditing: boolean;
  clickAddMode: () => void;
  enterAddPage: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Wrapper = styled.div`
  display: flex;
  font-size: 1vw;
  margin: 0% 7%;
`

const Text = styled.p`
  color: #ffffff;
`

const Input = styled.input`
  width: 80%;
  height: 25px;
  margin: 5%;
  border-radius: 5px;
  border: 1px solid #0000005f;
  font-size: 0.8vw;
  &:focus {
    outline: none;
  }
`

const Image = styled.img`
  width: 10%;
  margin: 3%;
  cursor: pointer;
`

const AddPage = ({ isAdditing, clickAddMode, enterAddPage }: Props) => {
  const imageSrc = !isAdditing ? `${IMAGE_URL}/images/add_input_icon.svg` : `${IMAGE_URL}/images/cancel_input_icon.svg`;
  const text = !isAdditing ? '페이지 추가하기' : '닫기';
  return (
    <>
      {isAdditing && <Input onKeyUp={(e) => enterAddPage(e)} />}
      <Wrapper>
        <Text>{text}</Text>
        <Image onClick={() => { clickAddMode() }} src={imageSrc} />
      </Wrapper>
    </>
  )
}

export default AddPage;