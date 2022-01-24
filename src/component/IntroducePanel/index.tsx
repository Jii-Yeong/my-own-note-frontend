import React from "react";
import styled from "styled-components";
import Button from "../Button";

const Wrapper = styled.div`
  position: absolute;
  top: 20%;
  left: 25%;
`

const MarketingText = styled.p`
  font-size: 50px;
`

const IntroduceText = styled.div`
  position: absolute;
  top: 110%;
  left: 1%
`

const SubText = styled.p`
  font-size: 20px;
`

type Props = {
  openRegisterModal: () => void;
}

const IntroducePanel = ({ openRegisterModal }: Props) => {
  return (
    <Wrapper>
      <MarketingText>
        당신이 기록하고 싶은 것은 어느것이든.
      </MarketingText>

      <IntroduceText>
        <SubText>
          글로 표현 가능하다면 학습, 일기, 영감 어떤것이라도 상관 없습니다.
        </SubText>
        <SubText>
          오로지 자신만을 위한 노트를 만들어보세요.
        </SubText>
      </IntroduceText>
      <Button name="시작하기"
        cssObject={
          {
            width: 18,
            height: 30,
            borderRadius: 20,
            position: 'absolute',
            top: 190,
            fontSize: 1,
          }
        }
        buttonType="button"
        buttonClick={openRegisterModal} />
    </Wrapper>
  )
}

export default IntroducePanel;