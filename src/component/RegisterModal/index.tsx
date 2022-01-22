import { FormikConfig } from "formik";
import React from "react";
import styled from "styled-components";
import Button from "../Button";

type Props = {
  clickClose: () => void;
  clickCloseIcon: () => void;
  formik: any;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff5f;
  position: absolute;
`

const ModalWrapper = styled.div`
  width: 30%;
  height: 75%;
  background-color: #ffffff;
  border: 1px solid #0000002f;
  position: absolute;
  top: 15%;
  left: 35%;
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

const RegisterModal = ({ clickClose, formik, clickCloseIcon }: Props) => {
  return (
    <Wrapper>
      <ModalWrapper>
        <Title>
          회원가입
          <Cancel onClick={() => clickCloseIcon()} src="../../images/cancel_icon.svg"/>
        </Title>
        <Form onSubmit={formik.handleSubmit}>
          <Label>아이디</Label>
          <Input id="id" name="id" type="text" onChange={formik.handleChange} />
          <Label>비밀번호</Label>
          <Input id="password" name="password" type="text" onChange={formik.handleChange} />
          <Label>닉네임</Label>
          <Input id="nickname" name="nickname" type="text" onChange={formik.handleChange} />
          <Button name="회원가입" 
            buttonType="submit"
            cssObject={{
              width: 360,
              height: 40,
              borderRadius: 4,
              position: 'absolute',
              fontSize: 20,
              top: 80,
              left: 8,
            }}
            buttonClick={clickCloseIcon}
          />
        </Form>
      </ModalWrapper>
    </Wrapper>
  )
}

export default RegisterModal;