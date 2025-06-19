import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../src/redux/store";
import Dashboard from "./component/dasboard/Dashboard";
import Header from "./component/header/Header";
import HealthRecord from "./component/healthRecord/HealthRecord";
import Navigator from "./component/navigator/Navigator";

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <div className="bg-blue-50 min-h-screen w-screen flex p-8">
          <Header/>
          {/* main container */}
          <div className="flex pt-8 sm:p-8 w-full h-full">
            <div className="hidden sm:block sm:w-52">
              <Navigator/>
            </div>
            <div className="w-full sm:ml-8 h-full">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/health-record" element={<HealthRecord />} />
              </Routes>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={4000} />
      </Router>
    </Provider>
  );
};

export default App;
