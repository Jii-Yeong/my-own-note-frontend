import { insertPageToUser, selectAllPageList, selectPageListToPageId, setPageId } from "$src/stores/modules/pageSlice";
import { logInPage } from "$src/stores/modules/userSlice";
import { RootState } from "$src/stores/types/root";
import { PAGE_LIST } from "$src/types/page";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AddPage from "../AddPage";
import Button from "../Button";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";
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
  const userId = useSelector((state: RootState) => state.userInfo.id, shallowEqual);
  const pageList = useSelector((state: RootState) => state.page.pageList, shallowEqual);
  const [selectedPageList, setSelectedPageList]: [Array<PAGE_LIST>, any] = useState([]);
  const [isRegisterModalOpen, setRegisterModalOpenState] = useState(false);
  const [isLoginModalOpen, setLoginModalOpenState] = useState(false);
  const [isAdditingPage, setAdditionPageState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const executedispatch = async () => {
      await dispatch(selectAllPageList(userId));
    }
    executedispatch();
  }, []);

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

  const handleOpenRegisterModal = () => {
    setRegisterModalOpenState(true);
  }

  const handleCloseRegisterModal = () => {
    setRegisterModalOpenState(false);
  }

  const handleOpenLoginModal = () => {
    setLoginModalOpenState(true);
  }

  const handleCloseLoginModal = () => {
    setLoginModalOpenState(false);
  }

  const registerFormik = useFormik({
    initialValues: {
      id: '',
      password: '',
      nickname: '',
    },
    onSubmit: values => {
      console.log("values", values);
    },
  });

  const loginFormik = useFormik({
    initialValues: {
      id: '',
      password: ''
    },
    onSubmit: async info => {
      console.log("info", info);
      dispatch(logInPage(info));
    }
  })

  const handleToggleAddPost = () => {
    setAdditionPageState(!isAdditingPage);
  }

  const handleEnterAddPage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
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
      {isRegisterModalOpen && 
        <RegisterModal formik={registerFormik} clickClose={handleCloseRegisterModal} />
      }
      {isLoginModalOpen && 
        <LoginModal formik={loginFormik} clickClose={handleCloseLoginModal} />
      }
      
    <Wrapper>
      <Button name="로그인" buttonClick={handleOpenLoginModal} />
      <Button name="회원가입" buttonClick={handleOpenRegisterModal} />
      <NoteTitle>✨ 내 노트</NoteTitle>
      <TreeNode pageList={pageList.pages} selectedPageList={selectedPageList} clickToggleDepths={handleClickToggleDepths} clickPageTitle={handleClickPageTitle}/>
      <AddPage isAdditing={isAdditingPage} clickAddMode={handleToggleAddPost} enterAddPage={handleEnterAddPage} />
    </Wrapper>
    </>
  )
}

export default SidePanel;