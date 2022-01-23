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

const Title = styled.div`
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
  margin: 50px 0px 5px 50px;
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
const RedirectRegister = styled.p`
  position: absolute;
  top: 85%;
  left: 25%;
  cursor: pointer;
`

const AlertMessage = styled.p`
  color: #ff0000;
  position: absolute;
  left: 29%;
`

const InCorrectMessage = styled.p`
  color: #ff0000;
  position: absolute;
  left: 26%;
  top: 75%;
`

type Props = {
  clickCloseIcon: (e: React.MouseEvent<HTMLElement>) => void;
  formik: any;
  clickRegister: () => void;
  isLoginModalOpen: boolean;
  isClickSubmitButton: boolean;
  isSuccessLogin: boolean;
  onInputText: (e: React.FormEvent<HTMLInputElement>) => void;
}

const LoginModal = ({ clickCloseIcon, formik, clickRegister, isLoginModalOpen, isClickSubmitButton, isSuccessLogin, onInputText }: Props) => {
  return (
    <Wrapper>
      <ModalWrapper>
        <Title>
          로그인
          <Cancel onClick={(e) => clickCloseIcon(e)} src="../build/images/cancel_icon.svg"/>
        </Title>
        <Form onSubmit={formik.handleSubmit}>
          <Label>아이디</Label>
          <Input id="id" name="id" type="text" onChange={formik.handleChange} onInput={(e) => onInputText(e)}/>
          {formik.errors['id'] && <AlertMessage>{formik.errors['id']}</AlertMessage>}
          <Label>비밀번호</Label>
          <Input id="password" name="password" type="password" onChange={formik.handleChange} />
          {formik.errors['password'] && <AlertMessage>{formik.errors['password']}</AlertMessage>}
          <Button buttonType="submit"
            cssObject={{
              width: 360,
              height: 45,
              borderRadius: 4,
              fontSize: 20,
              position: 'absolute',
              top: 115,
              left: 8,
            }}
            buttonClick={() => {}}
            name="로그인"
          />
        </Form>
        {(!isSuccessLogin && isLoginModalOpen && isClickSubmitButton) && <InCorrectMessage>아이디 또는 비밀번호가 틀렸습니다.</InCorrectMessage>}
        <RedirectRegister onClick={() => clickRegister()}>아직 아이디가 없으시다면 회원가입</RedirectRegister>
      </ModalWrapper>
    </Wrapper>
  )
}

export default LoginModal;