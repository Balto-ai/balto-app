import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthContextProvider } from "./contexts/auth"
import AdminProtectedRoute from './components/AdminProtectedRoute/AdminProtectedRoute'
import UserProtectedRoute from './components/UserProtectedRoute/UserProtectedRoute'
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
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import './App.css';
import './custom.scss';

const baltoMUItheme = createTheme({
  typography: {
    fontFamily: [
      'var(--body-font-family)',
      'sans serif',
    ].join(','),
  }
});

function AppContainer() {
  return (
    <ThemeProvider theme={baltoMUItheme}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeProvider>
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
                <UserProtectedRoute element={<StarredPage />} />} />
              <Route path="/admin-dashboard/*" element={
                <AdminProtectedRoute element={<AdminDashboard />} />} />
              <Route path="dog/:dogId" element={
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
