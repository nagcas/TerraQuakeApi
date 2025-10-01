import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NavbarMenu from '@components/navbar/navbarMenu'

import Home from '@pages/home/home'
import Footer from '@components/footer/footer'
import ExploreData from '@pages/exploreData/exploreData'
import ApiAccess from '@pages/apiAccess/apiAccess'
import Docs from './pages/docs/docs'
import UseCases from '@pages/useCases/useCases'
import About from '@pages/about/about'
import Contact from './pages/contact/contact'
import Blog from '@pages/blog/blog'
import BlogDetail from '@pages/blog/blogDetail'
import BlogPost from '@pages/blog/BlogPost'
import NoPage from '@pages/noPage/noPage'
import SignUp from '@pages/auth/signUp'
import SignIn from '@pages/auth/signIn'
import Profile from './pages/profile/profile'
import ForgotPassword from '@pages/auth/forgotPassword'
import ResetPassword from '@pages/auth/resetPassword'
import ChangePassword from './pages/auth/changePassword'
import TermsAndConditions from './pages/termsAndConditions/termsAndConditions'
import PrivacyPolicy from './pages/privacyPolicy/privacyPolicy'
import Faq from '@components/FAQ/FAQ'

import { AuthProvider } from '@components/modules/authProvider'
import ScrollToTop from '@components/modules/scrollToTop'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <main>
          <div className='max-w-full min-h-screen items-center [background:radial-gradient(140%_140%_at_80%_20%,#000_40%,#63e_100%)] scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-gray-800'>
            <div className='sky'>
              <div className='stars'></div>
            </div>
            <NavbarMenu />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/explore-data' element={<ExploreData />} />
              <Route path='/api-access' element={<ApiAccess />} />
              <Route path='/docs' element={<Docs />} />
              <Route path='/use-cases' element={<UseCases />} />
              <Route path='/about' element={<About />} /> 
              <Route path='/contact' element={<Contact />} /> 
              <Route path='/blog' element={<Blog />} />
              <Route path='/blog/:slug' element={<BlogDetail />} />
              <Route path='/post/:slug' element={<BlogPost />} />
              <Route path='/signup' element={<SignUp />} /> 
              <Route path='/signin' element={<SignIn />} /> 
              <Route path='/profile' element={<Profile />} /> 
              <Route path='/forgot-password' element={<ForgotPassword />} /> 
              <Route path='/change-password' element={<ChangePassword />} /> 
              <Route path='/reset-password/:token' element={<ResetPassword />} /> 
              <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/faq' element={<Faq />} />
              <Route path='*' element={<NoPage />} />
            </Routes>
            <Footer />
          </div>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
