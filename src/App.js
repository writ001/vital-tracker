import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import HealthRecord from "./component/healthRecord/HealthRecord";
import Dashboard from "./component/dasboard/Dashboard";
import Navigator from "./component/navigator/Navigator";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <div className="bg-blue-50 min-h-screen w-screen flex p-8">
          <div className="hidden sm:block sm:w-52">
            <Navigator />
          </div>
          <div className="w-full ml-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/health-record" element={<HealthRecord />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
