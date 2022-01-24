import { IMAGE_URL } from "$config/proxy";
import React from "react";
import styled from "styled-components";
import Button from "../Button";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff5f;
  position: absolute;
  z-index: 1;
`

const ModalWrapper = styled.div`
  width: 600px;
  height: 75%;
  background-color: #ffffff;
  border: 1px solid #0000002f;
  position: absolute;
  top: 15%;
  left: 20%;
  overflow-y: auto;
    &::-webkit-scrollbar {
    width: 9px;
  } 
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 100px;
  } 
  &::-webkit-scrollbar-thumb {
    background-color: #6667ab8f;
    border-radius: 100px;
  }
`

const Title = styled.div`
  font-size: 2.5vh;
  padding: 4%;
  margin: 0 auto;
  color: #ffffff;
  background-color: #6667ab;
  display: flex;
  justify-content: space-between;
`

const Form = styled.form`
  position: relative;
  width: 73%;
  height: 70%;
  margin: 0 auto;
  & > * {
    display: block;
  }
`

const Label = styled.label`
  margin: 10% 0% 5% 0%;
  font-size: 2.5vh;
`

const Input = styled.input`
  width: 100%;
  height: 9%;
  border: 1px solid #0000005f;
  border-radius: 3px;
  margin: 25px 0px 0px 0px;
  font-size: 1.2rem;
`

const Cancel = styled.img`
  width: 6%;
  height: 6%;
  cursor: pointer;
`

const RedirectLogin = styled.p`
  cursor: pointer;
  width: 65%;
  height: 10%;
  margin: 0 auto;
  font-size: 20px;
`
const AlertMessage = styled.p`
  color: #ff0000;
  font-size: 1.8vh;
`

type Props = {
  formik: any;
  clickClose: () => void;
  clickCloseIcon: (e: React.MouseEvent<HTMLElement>) => void;
  clickLogin: () => void;
  onInputText: (e: React.FormEvent<HTMLInputElement>) => void;
}

const RegisterModal = ({ formik, clickClose, clickCloseIcon, clickLogin, onInputText }: Props) => {
  return (
    <Wrapper>
      <ModalWrapper>
        <Title>
          회원가입
          <Cancel onClick={(e) => clickCloseIcon(e)} src={`${IMAGE_URL}/images/cancel_icon.svg`} />
        </Title>
        <Form onSubmit={formik.handleSubmit}>
          <Label>아이디</Label>
          <Input id="id" name="id" type="text" onChange={formik.handleChange} onInput={(e) => onInputText(e)} />
          {formik.errors['id'] && <AlertMessage>{formik.errors['id']}</AlertMessage>}

          <Label>비밀번호</Label>
          <Input id="password" name="password" type="password" onChange={formik.handleChange} />
          {formik.errors['password'] && <AlertMessage>{formik.errors['password']}</AlertMessage>}

          <Label>비밀번호 확인</Label>
          <Input id="passwordConfirm" name="passwordConfirm" type="password" onChange={formik.handleChange} />
          {formik.errors['passwordConfirm'] && <AlertMessage>{formik.errors['passwordConfirm']}</AlertMessage>}

          <Label>닉네임</Label>
          <Input id="nickname" name="nickname" type="text" onChange={formik.handleChange} />
          {formik.errors['nickname'] && <AlertMessage>{formik.errors['nickname']}</AlertMessage>}

          <Button name="회원가입"
            buttonType="submit"
            cssObject={{
              width: 445,
              height: 60,
              borderRadius: 4,
              fontSize: 25,
              top: 130,
              margin: '15% 0% 10% 0%'
            }}
            buttonClick={() => { }}
          />
          <RedirectLogin onClick={() => { clickLogin() }}>
            이미 아이디가 존재한다면 로그인
          </RedirectLogin>
        </Form>
      </ModalWrapper>
    </Wrapper>
  )
}

export default RegisterModal;