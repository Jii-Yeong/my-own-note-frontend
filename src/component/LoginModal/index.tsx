import React from "react";
import styled from "styled-components";

type Props = {
  clickClose: () => void;
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
  height: 65%;
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
  background-color: #6667ab9f;
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

const Button = styled.button`
  margin: 25px 0px 0px 50px;
`

const LoginModal = ({ clickClose, formik }: Props) => {
  return (
    <Wrapper>
      <ModalWrapper>
        <Title>
          로그인
          <button onClick={() => clickClose()}>닫기</button>
          </Title>
        <Form onSubmit={formik.handleSubmit}>
          <Label>아이디</Label>
          <Input id="id" name="id" type="text" onChange={formik.handleChange} />
          <Label>비밀번호</Label>
          <Input id="password" name="password" type="text" onChange={formik.handleChange} />
          <Button type="submit">로그인</Button>
        </Form>
      </ModalWrapper>
    </Wrapper>
  )
}

export default LoginModal;