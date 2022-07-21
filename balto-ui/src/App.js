import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthContextProvider } from "./contexts/auth"
import NavBar from "./components/NavBar/NavBar.jsx"
import LandingPage from "./components/LandingPage/LandingPage"
import LoginPage from "./components/LoginPage/LoginPage"
import RegistrationPage from "./components/RegistrationPage/RegistrationPage"
import DogSearchPage from "./components/DogSearchPage/DogSearchPage"
import DogProfile from "./components/DogProfile/DogProfile"
import AdminDashboard from "./components/AdminDashboard/AdminDashboard"
import NotFound from "./components/NotFound/NotFound"
import Footer from "./components/Footer/Footer"
import StarredPage from "./components/StarredPage/StarredPage"
import './App.css';
import './custom.scss';
import Container from "react-bootstrap/esm/Container"

function AppContainer() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  )
}

function App() {
  return (
      <div className="App">
        {/* <header className="App-header">
        <h1>Welcome to Balto</h1>
      </header> */}

        <React.Fragment>{
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={
                <LandingPage />} />
              <Route path="/login" element={
                <LoginPage />} />
              <Route path="/register" element={
                <RegistrationPage />} />
              <Route path="/search" element={
                <DogSearchPage />} />
              <Route path="/star" element={
                <StarredPage />} />
              <Route path="/admin-dashboard" element={
                <AdminDashboard />} />
              <Route path="/dog-profile" element={
                <DogProfile />} />
              <Route path="*" element={
                <NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        }</React.Fragment>


      </div>
  );
}

export default AppContainer;
