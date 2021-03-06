import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import store from './redux/store';
import App from "./pages/App";
import * as serviceWorker from "./serviceWorker";
import { LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import { Provider } from 'react-redux'

if(!window.checkSdk){
  window.checkSdk={
    dao:{
      taskCateDao:{},
      taskRecordDao:{},
      taskDao:{
        db:[
          {
            id: '123123',
            title: 'teststst',
          },
          {
            id: '1231233423',
            title: 'teststst11',
          },
        ]
      }
    }
  }
}


ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
