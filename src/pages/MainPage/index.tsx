import MainPanel from "$src/component/MainPanel";
import SidePanel from "$src/component/SidePanel";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import styled from "styled-components";
import { persistor, store } from "./configureStore";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
`

const MainPage = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Wrapper>
          <SidePanel />
          <MainPanel />
       </Wrapper>
      </PersistGate>
    </Provider>
  )
}

export default MainPage;