import { insertPageToUser, selectAllPageList, selectPageListToPageId, setPageId } from "$src/stores/modules/pageSlice";
import { RootState } from "$src/stores/types/root";
import { PAGES } from "$src/types/page";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AddPage from "../AddPage";
import TreeNode from "../TreeNode";

const Wrapper = styled.div`
  background-color: #6667ab;
  width: 19%;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 9px;
  } 
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 100px;
  } 
  &::-webkit-scrollbar-thumb {
    background-color: #d0368a9f;
    border-radius: 100px;
  }
`

const NoteTitle = styled.div`
  color: #ffffff;
  font-size: 1.5vmax;
  font-weight: bold;
  margin: 10% 7%;
`

const SidePanel = () => {
  const userId = useSelector((state: RootState) => state.userInfo.id, shallowEqual);
  const pageList = useSelector((state: RootState) => state.page.pageList, shallowEqual);
  const [selectedPageList, setSelectedPageList] = useState<Array<PAGES>>([]);
  console.log("pageList", pageList);
  const [isAdditingPage, setAdditionPageState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const executedispatch = async () => {
      if (userId) {
        await dispatch(selectAllPageList(userId));
      }
    }
    executedispatch();
  }, [userId]);

  const handleClickToggleDepths = (pageId: number) => {
    const makePageList = pageList.pages.map((page) => {
      if (pageId === page.parentPageId) {
        return {
          ...page,
          isSelected: !page.isSelected,
        }
      }
      return page;
    })
    const makeSelectedPageList = makePageList.filter(page => page.isSelected);
    setSelectedPageList(makeSelectedPageList);
  }

  const handleToggleAddPost = () => {
    setAdditionPageState(!isAdditingPage);
  }

  const handleEnterAddPage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userId) {
      const title = e.currentTarget.value;
      await dispatch(insertPageToUser({ title, userId }));
      await dispatch(selectAllPageList(userId));
      setAdditionPageState(false);
    }
  }

  const handleClickPageTitle = (pageId: number, title: string) => {
    console.log("handle", pageId);
    dispatch(setPageId({ pageId }));
    dispatch(selectPageListToPageId({pageId, title}));
  }

  return (
    <>
    <Wrapper>
      <NoteTitle>✨ MY OWN NOTE</NoteTitle>
      <TreeNode pageList={pageList.pages} selectedPageList={selectedPageList} clickToggleDepths={handleClickToggleDepths} clickPageTitle={handleClickPageTitle}/>
      {userId && <AddPage isAdditing={isAdditingPage} clickAddMode={handleToggleAddPost} enterAddPage={handleEnterAddPage} />}
    </Wrapper>
    </>
  )
}

export default SidePanel;