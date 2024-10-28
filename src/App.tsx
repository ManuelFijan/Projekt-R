import './App.css';
import {Route, Routes} from "react-router-dom";
import Landing from "./components/Landing";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";


function App() {
  return (
      <Routes>
        <Route path={"/"} element={<Landing/>}></Route>
        <Route path={"/sign-in"} element={<LoginPage/>}></Route>
        <Route path={"/register"} element={<RegisterPage/>}></Route>
        <Route path={"*"} element={<NotFoundPage/>}></Route>
          <Route path={"/homepage"} element={<HomePage/>}></Route>
      </Routes>
  );
}

export default App;
