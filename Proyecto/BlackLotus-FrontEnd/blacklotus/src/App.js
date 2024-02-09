import './App.css';
import Home from './components/mainIssues';
import Profile  from './components/Profile';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import EditProfile from './components/editProfile';
import Crea from './components/creaIssueFolder/creaIssue'
import Issue from './components/singleIssue';
const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Layout/>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/edit/:username" element={<EditProfile/>} />
        <Route path="/issue/:id" element={<Issue/>} />
        <Route path="/create" element={<Crea/>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;
