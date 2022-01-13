import MainPanel from "$src/component/MainPanel";
import reducers from "$src/stores/reducers";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./configureStore";

const MainPage = () => {

  return (
    <Provider store={store}>
      <MainPanel />
    </Provider>
  )
}

export default MainPage;