import { RootState } from "$src/stores/types/root";
import { FormikHandlers } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../Button";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
`

const Nickname = styled.p`
  color: #6667ab;
  font-family: 'nanum';
  font-size: 17px;
  font-weight: bolder;
  margin: 23px 10px 0px 8px;
`

type Props = {
  clickLogout: (e?: React.MouseEvent<HTMLElement>) => void;
  openLoginModal: () => void;
  openRegisterModal: () => void;
}

const Header = ({
  clickLogout,
  openLoginModal,
  openRegisterModal
}: Props) => {
  const userId = useSelector((state: RootState) => state.userInfo.id);
  const nickname = useSelector((state: RootState) => state.userInfo.nickname);
  return (
    <Wrapper>
      {userId ?
        <>
          <Nickname>{nickname} 님의 소즁한 노트</Nickname>
          <Button name="로그아웃"
            cssObject={
              {
                width: 100,
                height: 30,
                borderRadius: 30,
              }
            }
            buttonType="button"
            buttonClick={clickLogout} />
        </>
        :
        <>
          <Button name="로그인"
            cssObject={
              {
                width: 100,
                height: 30,
                borderRadius: 30,
              }
            }
            buttonType="button"
            buttonClick={openLoginModal} />
        </>
      }
    </Wrapper>
  )
}

export default Header;