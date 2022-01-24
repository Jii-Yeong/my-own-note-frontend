import { RootState } from "$src/stores/types/root";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../Button";

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  height: 10%;
`

const Nickname = styled.p`
  color: #6667ab;
  font-family: 'nanum';
  font-size: 2vh;
  font-weight: bolder;
  margin: 1.7%;
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
                width: 8,
                height: 40,
                borderRadius: 20,
                margin: '1%',
                fontSize: 0.9,
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
                width: 8,
                height: 40,
                borderRadius: 20,
                margin: '1%',
                fontSize: 0.9,
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