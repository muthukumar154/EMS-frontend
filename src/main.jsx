import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dashboard from './Pages/Dashboard.jsx';
import Employee from './Pages/Employee.jsx';
import EmployeeDetail from './Pages/EmployeeDetail.jsx';
import EmployeeAdd from './Pages/EmployeeAdd.jsx';
import EmployeeEdit from './Pages/EmployeeEdit.jsx';
import Login from './Pages/Login.jsx';
import Calender from './Pages/Calender.jsx';
import Message from './Pages/Message.jsx';
import store from './redux/store.js';
import { Provider } from 'react-redux'
import { HashRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employee" element={<Employee />} />
          <Route path="calendar" element={<Calender />} />
          <Route path="message" element={<Message />} />
          <Route path="employee/new" element={<EmployeeAdd />} />
          <Route path="employee/:id" element={<EmployeeDetail />} />
          <Route path="employee/edit/:id" element={<EmployeeEdit />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
)
