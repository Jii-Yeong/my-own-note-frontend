import React, { useEffect, useState } from "react";
import { SLICE_REGEX } from "$src/util/constant";
import { convertHtmlElements, convertInputValue } from "$src/util/convert";
import styled from "styled-components";
import InputTitle from "../InputTitle";
import ContentBox from "../ContentBox";
import TextModal from "../TextModal";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "$src/stores/types/root";
import useDom, { handleDragOverElement } from "$src/pages/MainPage/hooks/dom";
import { useFormik } from "formik";
import { logInPage, logoutUser, registerInPage } from "$src/stores/modules/userSlice";
import RegisterModal from "../RegisterModal";
import LoginModal from "../LoginModal";
import { deletePage, initCurrentPageId, initPageContent, initPageList, selectAllPageList } from "$src/stores/modules/pageSlice";
import Header from "../Header/Header";
import IntroducePanel from "../IntroducePanel";
import EmptyPagePanel from "../EmptyPagePanel";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`


let timer: NodeJS.Timeout | null;

const Image = styled.div`
  opacity: 0.7;
  width: 35px;
  height: 35px;
  cursor: pointer;
  margin: 45px;
  background: url(../../images/delete_page_icon.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  &:hover {
    width: 36px;
    height: 36px;
    background: url(../../images/delete_forever_icon.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    border: none;
  }
`

const MainPanel = () => {
  const divRef = React.createRef() as React.RefObject<HTMLDivElement>;
  const inputWrapperRef = React.createRef() as React.RefObject<HTMLDivElement>;
  const userId = useSelector((state: RootState) => state.userInfo.id, shallowEqual);
  const [styleObject, setStyleObject] = useState<{ [key: string]: any }>({});
  const [isOpenTextModal, setOpenTextModalState] = useState<boolean>(false);
  const [currentInputEl, setCurrentInputEl] = useState<HTMLInputElement>();
  const [isRegisterModalOpen, setRegisterModalOpenState] = useState(false);
  const [isLoginModalOpen, setLoginModalOpenState] = useState(false);
  const [isClickedLoginButton, setLoginButtonState] = useState(false);
  const [isClickedRegisterButton, setRegisterButtonState] = useState(false);
  const pageContent = useSelector((state: RootState) => state.page.pageContent);
  const currentPageId = useSelector((state: RootState) => state.page.currentPageId);
  const { createInputEl, insertInpulElToMiddleInput, insertInputElToLastInput, saveInputAllContent } = useDom();
  const dispatch = useDispatch();

  useEffect(() => {
    const startInput = inputWrapperRef.current?.querySelector('input') as HTMLElement;
    if (currentPageId) {
      startInput.focus();
    }
  }, [])

  useEffect(() => {
    const wrapper = document.getElementById('wrapper') as HTMLDivElement;
    const wrapperNodeList = wrapper?.querySelectorAll('.new-div') as NodeList;
    if (currentPageId && pageContent.text && wrapper) {
      const newDivElList = Array.from(wrapperNodeList);
      newDivElList.forEach(div => {
        wrapper?.removeChild(div);
      })
      pageContent.text.forEach((content: { [key: string]: any }) => {
        const divEl = createInputEl(handleInputKeyUp, wrapper, currentPageId, content.text) as HTMLElement;
        wrapper?.prepend(divEl);
      })
    }
  }, [pageContent]);

  const handleInputKeyUp = (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => {
    const currentTarget = e.target as HTMLInputElement;
    const parentNode = currentTarget.parentNode as HTMLElement;
    const nextParetNode = parentNode.nextSibling as HTMLElement;
    const prevParentNode = parentNode.previousSibling as HTMLElement;
    const nextTarget = nextParetNode?.querySelector('input') as HTMLElement;
    const prevTarget = prevParentNode?.querySelector('input') as HTMLElement;
    const wrapper = document.getElementById('wrapper') as HTMLDivElement;

    if (e.key === 'Enter') {
      insertInpulElToMiddleInput(handleInputKeyUp, parentNode);
    }

    if (e.key === 'ArrowDown') {
      nextTarget?.focus();
    }

    if (e.key === 'ArrowUp') {
      prevTarget?.focus();
    }

    if (e.key === '/') {
      const focusNode = window.getSelection()?.focusNode as HTMLElement;
      const windowSelection = focusNode?.querySelector('input') as HTMLInputElement;
      setCurrentInputEl(windowSelection);
      setOpenTextModalState(true);
    }

    if (e.key === 'Backspace' && currentTarget.selectionStart === 0 && prevTarget) {
      prevTarget.focus();
      parentNode.remove();
      if (wrapper) {
        saveInputAllContent(wrapper, currentPageId);
      }
    }

    if (timer) {
      clearTimeout(timer);
    }

    convertInputValue(currentTarget, setStyleObject);

    timer = setTimeout(() => {
      if (wrapper) {
        saveInputAllContent(wrapper, currentPageId);
      }
    }, 600);
  }

  const handleClickTextList = (e: React.MouseEvent<HTMLElement>) => {
    const currentTargetCommand = e.currentTarget.dataset.command as string;
    const replaceText = convertHtmlElements('', currentTargetCommand) as { [key: string]: any };
    const styleList = Object.keys(replaceText);
    if (currentInputEl) {
      const currentInputStyle = currentInputEl?.style as { [key: string]: any };
      styleList.forEach(style => {
        currentInputStyle[style] = replaceText[`${style}`];
      })
      const currentInputContent = currentInputEl?.value;
      currentInputEl.value = currentInputContent?.replace(SLICE_REGEX, '');
      setStyleObject(replaceText);
      setOpenTextModalState(false);
      currentInputEl.focus();
    }
  }

  const handlePressEnterKey = (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => {
    const currentTarget = e.target as HTMLInputElement;
    const wrapper = document.getElementById('wrapper') as HTMLDivElement;
    console.log("wrapper", wrapper);
    if (e.key === 'Enter') {
      setStyleObject({});
      insertInputElToLastInput(handleInputKeyUp, inputWrapperRef, styleObject, divRef, currentPageId);
      if (wrapper) {
        saveInputAllContent(wrapper, currentPageId);
      }
    }

    if (e.key === 'ArrowUp') {
      const prevParentNode = currentTarget?.parentNode?.previousSibling as HTMLElement;
      const prevInputEl = prevParentNode?.querySelector('input') as HTMLElement;
      prevInputEl.focus()
    }

    if (e.key === '/') {
      const focusNode = window.getSelection()?.focusNode as HTMLElement;
      const windowSelection = focusNode.querySelector('input') as HTMLInputElement;
      setCurrentInputEl(windowSelection);
      setOpenTextModalState(true);
    }
    convertInputValue(currentTarget, setStyleObject);
  }

  const handleOpenRegisterModal = () => {
    setRegisterModalOpenState(true);
    setRegisterButtonState(true);
    setLoginModalOpenState(false);
    setLoginButtonState(false);
  }

  const handleCloseRegisterModal = () => {
    setRegisterModalOpenState(false);
  }

  const handleOpenLoginModal = () => {
    setLoginModalOpenState(true);
    setLoginButtonState(true);
    setRegisterModalOpenState(false);
    setRegisterButtonState(false);
    setRegisterButtonState(false);
  }

  const handleCloseLoginModal = () => {
    setLoginModalOpenState(false);
  }

  const handleClickCloseButton = () => {
    setLoginModalOpenState(false);
    setLoginButtonState(false);
    setRegisterButtonState(false);
    setRegisterModalOpenState(false);
    setRegisterButtonState(false);
  }

  const registerFormik = useFormik({
    initialValues: {
      id: '',
      password: '',
      nickname: '',
    },
    onSubmit: async info => {
      await dispatch(registerInPage(info))
      await dispatch(logInPage(info));
    },
  });

  const loginFormik = useFormik({
    initialValues: {
      id: '',
      password: ''
    },
    onSubmit: async info => {
      dispatch(logInPage(info));
    }
  })

  const handleClickLogout = () => {
    dispatch(logoutUser({}));
    dispatch(initPageList({}));
    dispatch(initPageContent({}));
    dispatch(initCurrentPageId({}));
    setLoginButtonState(false);
    setRegisterButtonState(false);
  }

  const deletePageToId = async () => {
    if (currentPageId && userId){
      console.log("userId", userId);
      await dispatch(deletePage(currentPageId));
      await dispatch(selectAllPageList(userId));
      dispatch(initPageContent({}));
      dispatch(initCurrentPageId({}));
    } 
  }

  return (
    <Wrapper>
      {isOpenTextModal && <TextModal clickTextList={handleClickTextList} />}
      {(isRegisterModalOpen || (!userId && isClickedRegisterButton)) &&
        <RegisterModal formik={registerFormik} clickClose={handleCloseRegisterModal} clickCloseIcon={handleClickCloseButton} clickLogin={handleOpenLoginModal} />
      }
      {(isLoginModalOpen || (!userId && isClickedLoginButton)) &&
        <LoginModal formik={loginFormik} clickClose={handleCloseLoginModal} clickCloseIcon={handleClickCloseButton} clickRegister={handleOpenRegisterModal}/>
      }
      <Header
        clickLogout={handleClickLogout}
        openLoginModal={handleOpenLoginModal}
        openRegisterModal={handleOpenRegisterModal}
      />

      {userId && currentPageId ?
        <>
        <div style={{ display: 'flex' }}>
          <InputTitle title={pageContent.title ?? ''} />
          <Image onClick={() => deletePageToId()}/>
        </div>
          <ContentBox
            divRef={divRef}
            inputWrapperRef={inputWrapperRef}
            pressEnterKey={handlePressEnterKey}
            dragOverElement={handleDragOverElement}
            dropElement={handleDragOverElement} />
        </>
        : userId && !currentPageId ?
        <EmptyPagePanel />
        :
        <IntroducePanel openRegisterModal={handleOpenRegisterModal} />
      }
    </Wrapper>
  )
}

export default MainPanel;