import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  width: 340px;
  max-height: 500px;
  background-color: #ffffff;
  box-shadow: -2px 2px 15px 1px #0000005f;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #0000001f;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0000003f;
  }
  position: absolute;
  z-index: 100;
`

const Title = styled.p`
  height: 20px;
  font-size: 12px;
  color: #0000005f;
  padding: 7px;
  margin: 0;
`

const TextTransitionWrapper = styled.ul`
  list-style:none;
  padding: 0;
`

const TextTransitionList = styled.li`
  display: flex;
  padding: 10px 10px 10px 20px;
  &:hover {
    background-color: #0000001f;
  }
`

const ThumbnailImage = styled.img<{imageURL: string}>`
  min-width: 50px;
  height: 50px;
  ${({ imageURL }) => css`background: url(${imageURL});`}
  margin: 0px 10px 0px 0px;
`

const DescriptionText = styled.p`
  font-size: 12px;
  color: #0000005f;
  margin: 2px;
`

const textTranditionListData = [
  {
    title: '텍스트',
    image: 'text_thumbnail_icon.png',
    description: '일반 텍스트를 사용해 쓰기를 시작하세요.'
  },
  {
    title: '할 일 목록',
    image: 'todolist_thumbnail_icon.png',
    description: '할 일 목록으로 작업을 추적하세요.'
  },
  {
    title: '제목1',
    image: 'h1_thumbnail_icon.png',
    description: '섹션 제목(대)'
  },
  {
    title: '제목2',
    image: 'h2_thumbnail_icon.png',
    description: '섹션 제목(중)'
  },
  {
    title: '제목3',
    image: 'h3_thumbnail_icon.png',
    description: '섹션 제목(소)'
  },
  {
    title: '글머리 기호 목록',
    image: 'textheaderlist_thumbnail_icon.png',
    description: '간단한 글머리 기호 목록을 생성하세요.'
  },
  {
    title: '번호 매기기 목록',
    image: 'numberlist_thumbnail_icon.png',
    description: '번호가 매겨진 목록을 생성하세요.'
  },
  {
    title: '인용',
    image: 'numberlist_thumbnail_icon.png',
    description: '인용문을 작성하세요.'
  },
]

const TextModal = () => {
  return (
    <Wrapper>
      <Title>
        기본 블록
      </Title>
      <TextTransitionWrapper>
      {textTranditionListData.map((data) => (
          <TextTransitionList>
            <ThumbnailImage imageURL={data.image} />
            <div>
              {data.title}
              <DescriptionText>
                {data.description}
              </DescriptionText>
            </div>
          </TextTransitionList>
      ))}
      </TextTransitionWrapper>
    </Wrapper>
  )
}

export default TextModal;