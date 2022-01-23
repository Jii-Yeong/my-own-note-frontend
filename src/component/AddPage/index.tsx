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
  margin: 0px 0px 50px 0px;
`

const Text = styled.p`
  color: #ffffff;
  margin: 15px 0px 10px 26px;
`

const Input = styled.input`
  width: 200px;
  height: 25px;
  margin: 0px 0px 0px 23px;
  border-radius: 5px;
  border: 1px solid #0000005f;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`

const Image = styled.img`
  width: 23px;
  height: 23px;
  cursor: pointer;
  margin: 13px 0px 10px 10px;
`

const AddPage = ({ isAdditing, clickAddMode, enterAddPage }: Props) => {
  const imageSrc = !isAdditing ? `${IMAGE_URL}/build/images/add_input_icon.svg` : `${IMAGE_URL}/build/images/cancel_input_icon.svg`;
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