import MainPanel from "$src/component/MainPanel";
import SidePanel from "$src/component/SidePanel";
import React from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
import store from "./configureStore";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
`

const MainPage = () => {
  return (
    <Provider store={store}>
      <Wrapper>
        <SidePanel />
        <MainPanel />
      </Wrapper>
    </Provider>
  )
}

export default MainPage;