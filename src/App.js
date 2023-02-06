import * as React from 'react';
import ScrollTop from './components/scrollTop';
import {
  Routes,
  Route
} from "react-router-dom";

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/protected';
import Home from './pages/Home/Home';
import { Notifications } from 'react-push-notification';
import AdminLayout from './components/headers/Admin';
import SignUp from './pages/signup';
import BookAdmin from './pages/Admin/Books/Book';
import AddBook from './pages/Admin/Books/addBook';
import PdfViewer from './components/Viewer/PdfViewer';
import { CookiesProvider } from 'react-cookie';
import AboutHome from './pages/About';
import HomeContact from './pages/Contact';
import CatalogueHome from './pages/Catalogue';
import Player from './components/Viewer/VideoPlayer';
import VerifyAccount from './pages/Auth/verify';
import Profile from './pages/Profile';
import ChangePassword from './pages/Auth/change_password';
import VerifyToken from './pages/Auth/verify_token';
import { ConfirmProvider } from 'material-ui-confirm';
import BookCategory from './pages/Admin/categories/categories';
import Users from './pages/Admin/Users/users';
import EditUser from './pages/Admin/Users/editUser';
import Plans from './pages/Transactions';
import Subscription from './pages/Admin/Users/transactions';
import EditBook from './pages/Admin/Books/editBook';
import Statistic from './pages/Admin/statistics';
import Page from './pages/Admin/Pages/Page';
import AddPage from './pages/Admin/Pages/addPage';
import ListPageSection from './pages/Admin/Pages/listSection';
import AddSection from './pages/Admin/Pages/addSection';
import EditPage from './pages/Admin/Pages/editPage';
import Contact from './pages/Admin/Contact/Contacts';
import ViewMessage from './pages/Admin/Contact/ViewMessage';
import SendMessage from './pages/Admin/Contact/SendMessage';

const App = () =>{
  return (

    <> 
      <CookiesProvider> 
        <ConfirmProvider>
          <ScrollTop />
          <Notifications position="bottom-right"/>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/home" element={<Home/>} />
            <Route path="/login" element={ <Login/>} />
            <Route path="/signup" element={ <SignUp/>} />
            <Route path="/about"  element={ <AboutHome/>} />
            <Route path="/contact" element={<HomeContact/>} />
            <Route path="/catalogue" element={<CatalogueHome/>} />
            
              {/** ADMIN ROUTES */}
            <Route path="/dashboard" element={
              
                <AdminLayout></AdminLayout>
            }>


              <Route path="" element={<Statistic />} /> 
              <Route path="profile" element={<Profile />} /> 
              <Route path="users" element={<Users />} />
              <Route path="users/edit" element={<EditUser />} />
              
              <Route path="plans" element={<Plans />} />
              <Route path="subscriptions" element={<Subscription />} />
              
              
              
              <Route path="books" element={<BookAdmin />} /> 
              <Route path="books/edit" element={<EditBook />} /> 
              <Route path="books/add" element={<AddBook />} />
              
              <Route path="books/category" element={<BookCategory />} />  
              
              <Route path="pages" element={<Page />} /> 
              <Route path="pages/add" element={<AddPage />} />
              <Route path="pages/edit" element={<EditPage />} />
              <Route path="pages/section/add" element={<AddSection />} />
              <Route path="contacts" element={<Contact />} /> 
              <Route path="contacts/view" element={<ViewMessage />} /> 
              <Route path="contacts/reply" element={<SendMessage />} /> 
              
              
       
              
            </Route>
            <Route path="/book/pdf" element={<PdfViewer />} />
            <Route path="/book/video" element={<Player />} />
            <Route path="/verify" element={<VerifyAccount />} />
            <Route path="/change_password" element={<ChangePassword />} />
            <Route path="/verify_token" element={<VerifyToken />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ConfirmProvider>
      </CookiesProvider>
    </>
  )
}

export default App