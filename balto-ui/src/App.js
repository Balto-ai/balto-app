import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthContextProvider } from "./contexts/auth"
import { ComponentContextProvider, useComponentContext } from "./contexts/component"
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
import BaltoToast from "./components/BaltoToast/BaltoToast"
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
  },

  palette: {
    primary: {
      main: '#5d74bb'
    },
  },

  props: {
    MuiButtonBase: {
      disableRipple: "true",
    },
  },

  shape: {
    borderRadius: 4,
  },

  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#e9e8fe",
          color: "#5d74bb",
          boxShadow: "var(--card-box-shadow)",
          fontSize: "14px"
        }
      }
    }
  }
});

function AppContainer() {
  return (
    <ThemeProvider theme={baltoMUItheme}>
      <ComponentContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ComponentContextProvider>
    </ThemeProvider>
  )
}

function App() {

  const { showToast, setShowToast, toastHeader, toastBody } = useComponentContext()

  return (
      <div className="App">
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
            <BaltoToast
              show={showToast}
              setShow={setShowToast}
              header={toastHeader}
              body={toastBody}
              />
          </BrowserRouter>
        }</React.Fragment>
      </div>
  );
}

export default AppContainer;
