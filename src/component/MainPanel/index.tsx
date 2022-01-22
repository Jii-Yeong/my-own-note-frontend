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
import { logInPage, logoutUser } from "$src/stores/modules/userSlice";
import RegisterModal from "../RegisterModal";
import LoginModal from "../LoginModal";
import { initPageList } from "$src/stores/modules/pageSlice";
import Header from "../Header/Header";
import IntroducePanel from "../IntroducePanel";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`


let timer: NodeJS.Timeout | null;

const MainPanel = () => {
  const divRef = React.createRef() as React.RefObject<HTMLDivElement>;
  const inputWrapperRef = React.createRef() as React.RefObject<HTMLDivElement>;
  const [styleObject, setStyleObject] = useState<{ [key: string]: any }>({});
  const [isOpenTextModal, setOpenTextModalState] = useState<boolean>(false);
  const [currentInputEl, setCurrentInputEl] = useState<HTMLInputElement>();
  const pageContent = useSelector((state: RootState) => state.page.pageContent);
  const currentPageId = useSelector((state: RootState) => state.page.currentPageId);
  const { createInputEl, insertInpulElToMiddleInput, insertInputElToLastInput, saveInputAllContent } = useDom();
  const dispatch = useDispatch();

  useEffect(() => {
    const startInput = inputWrapperRef.current?.firstChild as HTMLElement;
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
    const nextTarget = parentNode.nextSibling?.firstChild as HTMLElement;
    const prevTarget = parentNode.previousSibling?.firstChild as HTMLElement;
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
      const windowSelection = window.getSelection()?.focusNode?.firstChild as HTMLInputElement;
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
  const userId = useSelector((state: RootState) => state.userInfo.id, shallowEqual);

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
      insertInputElToLastInput(handleInputKeyUp, inputWrapperRef, styleObject, divRef);
      if (wrapper) {
        saveInputAllContent(wrapper, currentPageId);
      }
    }

    if (e.key === 'ArrowUp') {
      const prevInputEl = currentTarget?.parentNode?.previousSibling?.firstChild as HTMLElement;
      prevInputEl.focus()
    }

    if (e.key === '/') {
      const windowSelection = window.getSelection()?.focusNode?.firstChild as HTMLInputElement;
      setCurrentInputEl(windowSelection);
      setOpenTextModalState(true);
    }
    convertInputValue(currentTarget, setStyleObject);
  }

  const [isRegisterModalOpen, setRegisterModalOpenState] = useState(false);
  const [isLoginModalOpen, setLoginModalOpenState] = useState(false);
  const [isClickedLoginButton, setLoginButtonState] = useState(false);

  const handleOpenRegisterModal = () => {
    setRegisterModalOpenState(true);
  }

  const handleCloseRegisterModal = () => {
    setRegisterModalOpenState(false);
  }

  const handleOpenLoginModal = () => {
    setLoginModalOpenState(true);
    setLoginButtonState(true);
  }

  const handleCloseLoginModal = () => {
    setLoginModalOpenState(false);
  }

  const handleClickCloseButton = () => {
    setLoginModalOpenState(false);
    setLoginButtonState(false);
    setRegisterModalOpenState(false);
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
      dispatch(logInPage(info));
    }
  })

  const handleClickLogout = () => {
    dispatch(logoutUser({}));
    dispatch(initPageList({}));
    setLoginButtonState(false);
  }

  return (
    <Wrapper>
      {isOpenTextModal && <TextModal clickTextList={handleClickTextList} />}
      {isRegisterModalOpen &&
        <RegisterModal formik={registerFormik} clickClose={handleCloseRegisterModal} clickCloseIcon={handleClickCloseButton} />
      }
      {(isLoginModalOpen || (!userId && isClickedLoginButton)) &&
        <LoginModal formik={loginFormik} clickClose={handleCloseLoginModal} clickCloseIcon={handleClickCloseButton} />
      }
      <Header
        clickLogout={handleClickLogout}
        openLoginModal={handleOpenLoginModal}
        openRegisterModal={handleOpenRegisterModal}
      />

      {userId && currentPageId ?
        <>
          <InputTitle title={pageContent.title ?? ''} />
          <ContentBox
            divRef={divRef}
            inputWrapperRef={inputWrapperRef}
            pressEnterKey={handlePressEnterKey}
            dragOverElement={handleDragOverElement}
            dropElement={handleDragOverElement} />
        </>
        : userId ?
        <IntroducePanel />
        :
        <div>로그인 해줘</div>
      }
    </Wrapper>
  )
}

export default MainPanel;