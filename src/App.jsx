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
import Header from "./components/Header";
import UserProvider from "./store/UserStore/UserProvider";
import ExpensePage from "./pages/ExpensePage";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.theme.isDarkTheme);
  console.log(theme);

  // Define a variable to hold the class name for the container
  const containerClassName = theme ? "bg-secondary" : "";

  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        {/* Apply the class to the container element */}
        <div className={containerClassName}>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/features" element={<ExpensePage />} />
            <Route
              path="/updatePassword/:resetToken"
              element={<UpdatePassword />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
