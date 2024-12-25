import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import AuthLayout from './Companents/Layout/Auth/Index';
import UnAuthLayout from './Companents/Layout/UnAuth/Main';
import Login from './pages/unauth/Login';
import Register from './pages/unauth/Register';
import Authenticated from './Middlewares/Authenticated';
import UserPermission from './Middlewares/UserPermission';
import { hasPermission } from './Helpers/hasPermission';
import Dashboard from './pages/auth/Dashbord';
import Users from './pages/auth/Users/List';
import UserCreate from './pages/auth/Users/Create';
import Companies from './pages/auth/Companies/List';
import CreateCompany from './pages/auth/Companies/Create';

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UnAuthLayout />} >
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='/' element={<Authenticated />} >
            <Route path='/' element={<UserPermission />} >
              <Route path='/' element={<AuthLayout />} >
                <Route index element={<Dashboard />} />
                <Route path='/users' element={ hasPermission(['user.*', 'user.index']) ? <Users /> : <Dashboard /> } />
                <Route path='/users/create' element={ hasPermission(['user.*', 'user.create']) ? <UserCreate /> : <Dashboard /> } />
                <Route path='/users/edit/:id?' element={ hasPermission(['user.*', 'user.show']) ? <UserCreate /> : <Dashboard /> } />
                <Route path='/companies' element={ hasPermission(['companies.*', 'companies.index']) ? <Companies /> : <Dashboard /> } />
                <Route path='/companies/create' element={ hasPermission(['companies.*', 'companies.create']) ? <CreateCompany /> : <Dashboard /> } />
                <Route path='/companies/edit/:id?' element={ hasPermission(['companies.*', 'companies.show']) ? <CreateCompany /> : <Dashboard /> } />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App