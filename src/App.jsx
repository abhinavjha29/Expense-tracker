import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import SignUpForm from "./components/SignupForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import ForgotPassword from "./pages/ForgotPasswordPage";
import UpdatePassword from "./components/UpdatePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/updatePassword/:resetToken"
          element={<UpdatePassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
