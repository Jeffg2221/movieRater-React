import './App.css';
import {  Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard';
import CreateMovie from './components/CreateMovie';
import View from './views/View';
import Update from './components/Update';


function App() {
  return (
    <div className="App" >

      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
        {/* Create */}
        <Route path='/movies/new' element={<CreateMovie />} />
        {/* Main - One Movie */}
        <Route path='/movies/:id' element={<View />} />
        {/* Update */}
        <Route path='/movies/:id/edit' element={<Update />} />





      </Routes>



    </div>
  );
}

export default App;
