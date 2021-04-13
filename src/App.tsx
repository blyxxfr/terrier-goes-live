import React from "react";
import { Header } from "./views/Common/Header/Header";
import { LiveStreamPage } from "./views/LiveStreamPage/LiveStreamPage";

const App = (): JSX.Element => (
  <div>
    <Header />
    <LiveStreamPage />
  </div>
);

export default App;
