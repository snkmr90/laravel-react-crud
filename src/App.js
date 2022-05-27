import logo from './logo.svg';
import { Routes, Route , withRouter} from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar';
import ListUsers from './components/ListUsers';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
function App() {
  return (
    <div className="container">
      <NavBar />
      <Routes>
      <Route path='/' element={<ListUsers />}></Route>
      <Route path='/create-user' element={<CreateUser />}></Route>
      <Route path='/edit/:id' element={<EditUser />}/>
    </Routes>
    </div>
  );
}

export default App;
