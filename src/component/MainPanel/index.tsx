import React, { MouseEvent, useEffect, useState } from "react";
import { SLICE_REGEX } from "$src/util/constant";
import { convertHtmlElements, convertInputValue } from "$src/util/convert";
import styled from "styled-components";
import InputTitle from "../InputTitle";
import ContentBox from "../ContentBox";
import { shallowEqual, useSelector } from "react-redux";
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
import * as Yup from "yup";
import { useAppDispatch } from "$src/pages/MainPage/configureStore";
import { IMAGE_URL } from "$config/proxy";

const Wrapper = styled.div`
  width: 100%;
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
    background-color: #6667ab8f;
    border-radius: 100px;
  }
`


let timer: NodeJS.Timeout | null;

const Image = styled.div`
  opacity: 0.7;
  width: 35px;
  height: 35px;
  cursor: pointer;
  margin: 25px 25px 25px 25px;
  background: url(${IMAGE_URL}/images/delete_page_icon.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  &:hover {
    width: 35px;
    height: 35px;
    background: url(${IMAGE_URL}/images/delete_forever_icon.svg);
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
  const [isClickSubmitButton, setClickSubmitButtonState] = useState(false);
  const pageContent = useSelector((state: RootState) => state.page.pageContent);
  const currentPageId = useSelector((state: RootState) => state.page.currentPageId);
  const { createInputEl, insertInpulElToMiddleInput, insertInputElToLastInput, saveInputAllContent } = useDom();
  const dispatch = useAppDispatch();

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
      });
      pageContent.text.forEach((content: { [key: string]: any }) => {
        const divEl = createInputEl(handleInputKeyUp, handleChangeToCommand, wrapper, currentPageId, content.text, content.style) as HTMLElement;
        wrapper?.prepend(divEl);
      });
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
      insertInpulElToMiddleInput(handleInputKeyUp, parentNode, handleChangeToCommand);
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

    timer = setTimeout(() => {
      if (wrapper) {
        saveInputAllContent(wrapper, currentPageId);
      }
    }, 600);
  }

  const handleChangeToCommand = (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => {
    const currentTarget = e.target as HTMLInputElement;
    convertInputValue(currentTarget, setStyleObject);
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
    const wrapper = document.getElementById('wrapper') as HTMLDivElement;
    const currentTarget = e.target as HTMLInputElement;
    const parentNode = currentTarget.parentNode as HTMLElement;
    const prevParentNode = parentNode.previousSibling as HTMLElement;
    const prevTarget = prevParentNode?.querySelector('input') as HTMLElement;
    if (e.key === 'Enter') {
      setStyleObject({});
      insertInputElToLastInput(handleInputKeyUp, inputWrapperRef, styleObject, divRef, currentPageId, handleChangeToCommand);
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
    if (e.key === 'Backspace' && currentTarget.selectionStart === 0 && prevTarget) {
      prevTarget.focus();
    }
    convertInputValue(currentTarget, setStyleObject);
  }

  const handleOpenRegisterModal = () => {
    setRegisterModalOpenState(true);
    setRegisterButtonState(true);
    setLoginModalOpenState(false);
    setLoginButtonState(false);
    setClickSubmitButtonState(false);
  }

  const handleCloseRegisterModal = () => {
    setRegisterModalOpenState(false);
    setClickSubmitButtonState(false);
  }

  const handleOpenLoginModal = () => {
    setLoginModalOpenState(true);
    setLoginButtonState(true);
    setRegisterModalOpenState(false);
    setRegisterButtonState(false);
    setRegisterButtonState(false);
    setClickSubmitButtonState(false);
  }

  const handleClickCloseButton = (e: React.MouseEvent<HTMLElement>) => {
    setLoginModalOpenState(false);
    setLoginButtonState(false);
    setRegisterButtonState(false);
    setRegisterModalOpenState(false);
    setRegisterButtonState(false);
    setClickSubmitButtonState(false);
    registerFormik.handleReset(e);
  }

  const registerFormik = useFormik({
    initialValues: {
      id: '',
      password: '',
      nickname: '',
    },
    validationSchema: Yup.object().shape({
      id: Yup.string().min(6, '6자 이상 입력해주세요.').required('아이디를 입력해주세요.'),
      password: Yup.string().min(8, '8자 이상 입력해주세요.').required('비밀번호를 입력해주세요.'),
      nickname: Yup.string().max(12, '12글자 이하로 입력해주세요.').required('닉네입을 입력해주세요.'),
    }),
    enableReinitialize: true,
    onSubmit: async info => {
      await dispatch(registerInPage(info))
      await dispatch(logInPage(info));
      setRegisterModalOpenState(false);
    },
  });
  const [isSuccessLogin, setSuccessLoginState] = useState(false);

  const loginFormik = useFormik({
    initialValues: {
      id: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      id: Yup.string().required('아이디를 입력해주세요.'),
      password: Yup.string().required('비밀번호를 입력해주세요.'),
    }),
    enableReinitialize: true,
    onSubmit: async info => {
      await dispatch(logInPage(info)).unwrap().then(result => {
        if (result.loginError === 'failed') {
          setClickSubmitButtonState(true);
          setSuccessLoginState(false);
        } else {
          setSuccessLoginState(true);
          setClickSubmitButtonState(true);
          setLoginModalOpenState(false);
        }
      });
    }
  })

  const handleClickLogout = (e?: React.MouseEvent<HTMLElement>) => {
    dispatch(logoutUser({}));
    dispatch(initPageList({}));
    dispatch(initPageContent({}));
    dispatch(initCurrentPageId({}));
    setLoginButtonState(false);
    setRegisterButtonState(false);
    setClickSubmitButtonState(false);
    loginFormik.handleReset(e);
  }

  const deletePageToId = async () => {
    if (currentPageId && userId){
      await dispatch(deletePage(currentPageId));
      await dispatch(selectAllPageList(userId));
      dispatch(initPageContent({}));
      dispatch(initCurrentPageId({}));
    } 
  }

  const handleOnInputText = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^a-z0-9]/ig, '');
  }

  return (
    <Wrapper>
      {/* {isOpenTextModal && <TextModal clickTextList={handleClickTextList} />} */}
      {(isRegisterModalOpen || (!userId && isClickedRegisterButton)) &&
        <RegisterModal formik={registerFormik} clickClose={handleCloseRegisterModal} clickCloseIcon={handleClickCloseButton} clickLogin={handleOpenLoginModal} onInputText={handleOnInputText} />
      }
      {(isLoginModalOpen || (!userId && isClickedLoginButton)) &&
        <LoginModal 
          formik={loginFormik} 
          clickCloseIcon={handleClickCloseButton}
          clickRegister={handleOpenRegisterModal}
          isLoginModalOpen={isLoginModalOpen}
          isSuccessLogin={isSuccessLogin}
          isClickSubmitButton={isClickSubmitButton}
          onInputText={handleOnInputText}
          />
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