import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { Provider } from 'react-redux'
import { store } from './redux/store';
import CreateListing from './pages/CreateListing'

function App() {
 

  return (
    <Provider store={store}>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-listing" element={<CreateListing />} />
            </Routes>
        </BrowserRouter>
      
    </Provider>
  )
}

export default App
