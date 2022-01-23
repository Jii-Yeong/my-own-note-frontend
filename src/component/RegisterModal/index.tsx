import { IMAGE_URL } from "$config/proxy";
import { FormikHandlers } from "formik";
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
  width: 30%;
  height: 75%;
  background-color: #ffffff;
  border: 1px solid #0000002f;
  position: absolute;
  top: 15%;
  left: 25%;
`

const Title = styled.p`
  font-size: 25px;
  padding: 20px;
  margin: 0 auto;
  color: #ffffff;
  background-color: #6667ab;
  display: flex;
  justify-content: space-between;
`

const Form = styled.form`
  position: relative;
  left: 3%;
  & > * {
    display: block;
  }
`

const Label = styled.label`
  margin: 25px 0px 5px 50px;
  font-size: 20px;
`

const Input = styled.input`
  width: 350px;
  height: 35px;
  border: 1px solid #0000005f;
  border-radius: 3px;
  margin: 25px 0px 0px 50px;
`
const Cancel = styled.img`
  width: 6%;
  height: 6%;
  cursor: pointer;
`

const RedirectLogin = styled.p`
  position: absolute;
  top: 87%;
  left: 25%;
  cursor: pointer;
`
const AlertMessage = styled.p`
  color: #ff0000;
  position: absolute;
  left: 29%;
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
          <Cancel onClick={(e) => clickCloseIcon(e)} src={`${IMAGE_URL}/build/images/cancel_icon.svg`} />
        </Title>
        <Form onSubmit={formik.handleSubmit}>
          <Label>아이디</Label>
          <Input id="id" name="id" type="text" onChange={formik.handleChange} onInput={(e) => onInputText(e)} />
          {formik.errors['id'] && <AlertMessage>{formik.errors['id']}</AlertMessage>}

          <Label>비밀번호</Label>
          <Input id="password" name="password" type="password" onChange={formik.handleChange} />
          {formik.errors['password'] && <AlertMessage>{formik.errors['password']}</AlertMessage>}

          <Label>닉네임</Label>
          <Input id="nickname" name="nickname" type="text" onChange={formik.handleChange} />
          {formik.errors['nickname'] && <AlertMessage>{formik.errors['nickname']}</AlertMessage>}

          <Button name="회원가입"
            buttonType="submit"
            cssObject={{
              width: 360,
              height: 40,
              borderRadius: 4,
              position: 'absolute',
              fontSize: 20,
              top: 110,
              left: 8,
            }}
            buttonClick={() => {}}
          />
        </Form>
        <RedirectLogin onClick={() => { clickLogin() }}>
          이미 아이디가 존재한다면 로그인
        </RedirectLogin>
      </ModalWrapper>
    </Wrapper>
  )
}

export default RegisterModal;