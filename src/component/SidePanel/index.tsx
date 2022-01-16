import { useAppDispatch } from "$src/pages/MainPage/configureStore";
import { selectAllPageList } from "$src/stores/modules/pageSlice";
import { PAGE_LIST } from "$src/types/page";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TreeNode from "../TreeNode";

const Wrapper = styled.div`
  background-color: #6667ab;
  width: 15%;
  height: 100%;
`

const NoteTitle = styled.div`
  color: #ffffff;
  font-size: 25px;
  font-weight: bold;
  margin: 40px;
`

const SidePanel = () => {
  const dispatch = useAppDispatch();
  const [pageList, setPageList]: [Array<PAGE_LIST>, any] = useState([]);
  const [selectedPageList, setSelectedPageList]: [Array<PAGE_LIST>, any] = useState([]);

  useEffect(() => {
    const executedispatch = async () => {
      const resultAction = await dispatch(selectAllPageList({}));
      if (selectAllPageList.fulfilled.match(resultAction)) {
        const getPageList = resultAction.payload;
        setPageList(getPageList);
      } else {
        if (!resultAction.payload) {
        }
      }
    }
    executedispatch();
  }, [])

  const handleClickToggleDepths = (pageId: string) => {
    const makePageList = pageList.map((page) => {
      if (pageId === page.parentPageId) {
        return {
          ...page,
          isSelected: !page.isSelected,
        }
      }
      return page;
    })
    const makeSelectedPageList = makePageList.filter(page => page.isSelected);
    setPageList(makePageList);
    setSelectedPageList(makeSelectedPageList);
  }

  return (
    <Wrapper>
      <NoteTitle>✨ 내 노트</NoteTitle>
      <TreeNode pageList={pageList} selectedPageList={selectedPageList} clickToggleDepths={handleClickToggleDepths} />
    </Wrapper>
  )
}

export default SidePanel;