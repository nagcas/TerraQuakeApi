import './App.css'
import { Analytics } from '@vercel/analytics/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NavbarMenu from './components/navbar/NavbarMenu'
import Footer from '@components/footer/Footer'
import ScrollToTop from '@components/modules/ScrollToTop'
import { AuthProvider } from '@components/modules/AuthProvider'

// Pages
import Home from '@pages/home/Home'
import ExploreData from '@pages/exploreData/ExploreData'
import ApiAccess from '@pages/apiAccess/ApiAccess'
import DocsEarthquakes from './pages/docs/DocsEarthquakes'
import UseCases from '@pages/useCases/UseCases'
import About from '@pages/about/About'
import Contact from '@pages/contact/Contact'
import Blog from '@pages/blog/Blog'
import BlogDetail from '@pages/blog/BlogDetail'
import BlogPost from '@pages/blog/BlogPost'
import SignUp from '@pages/auth/SignUp'
import SignIn from '@pages/auth/SignIn'
import Profile from '@pages/profile/Profile'
import EditProfile from '@pages/profile/EditProfile'
import DeleteProfile from '@pages/profile/DeleteProfile'
import ForgotPassword from '@pages/auth/ForgotPassword'
import ResetPassword from '@pages/auth/ResetPassword'
import ChangePassword from '@pages/auth/ChangePassword'
import TermsAndConditions from '@pages/termsAndConditions/TermsAndConditions'
import PrivacyPolicy from '@pages/privacyPolicy/PrivacyPolicy'
import Contribute from '@pages/contribute/Contribute'
import GithubAuth from '@pages/auth/GithubAuth'
import HandleOAuth from '@pages/auth/HandleOAuth'
import NoPage from '@pages/noPage/NoPage'
import TableViewEarthquakes from './pages/tableView/TableViewEarthquakes'
import TableViewStations from './pages/tableView/TableViewStations'
import Faq from './components/faq/Faq'
import Unsubscribe from './components/newsletter/Unsubscribe'
import AdminDashboard from '@pages/adminDashboard/Dashboard'
import NoAccess from '@pages/NoAccess'
import RequireAuth from '@components/RequireAuth'
import TablePosts from './pages/adminDashboard/posts/TablePosts'
import TableUsers from './pages/adminDashboard/users/TableUsers'
import TableMessages from './pages/adminDashboard/messages/TableMessages'
import TableFaqs from './pages/adminDashboard/faq/TableFaqs'
import StationsData from './pages/stationsData/StationsData'

export default function App() {
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
              <Route path='/explore-data/earthquakes' element={<ExploreData />} />
              <Route path='/explore-data/stations' element={<StationsData />} />
              <Route path='/explore-data/table-earthquakes' element={<TableViewEarthquakes />} />
              <Route path='/explore-data/table-stations' element={<TableViewStations />} />
              <Route path='/api-access' element={<ApiAccess />} />
              <Route path='/docs-earthquakes' element={<DocsEarthquakes />} />
              <Route path='/use-cases' element={<UseCases />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/blog/:slug' element={<BlogDetail />} />
              <Route path='/post/:slug' element={<BlogPost />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/edit-profile' element={<EditProfile />} />
              <Route path='/delete-profile' element={<DeleteProfile />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/change-password' element={<ChangePassword />} />
              <Route
                path='/reset-password/:token'
                element={<ResetPassword />}
              />
              <Route path='/auth/callback' element={<GithubAuth />} />
              <Route path='/login-success' element={<HandleOAuth />} />
              <Route
                path='/terms-and-conditions'
                element={<TermsAndConditions />}
              />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/faq' element={<Faq />} />
              <Route path='/contribute' element={<Contribute />} />
              <Route path='/newsletter/unsubscribe' element={<Unsubscribe />} />
              <Route
                path='/admin'
                element={
                  <RequireAuth requiredRole='admin'>
                    <AdminDashboard />
                  </RequireAuth>
                }
              />
              <Route
                path='/table-users'
                element={
                  <RequireAuth requiredRole='admin'>
                    <TableUsers />
                  </RequireAuth>
                }
              />
              <Route
                path='/table-posts'
                element={
                  <RequireAuth requiredRole='admin'>
                    <TablePosts />
                  </RequireAuth>
                }
              />
              <Route
                path='/table-messages'
                element={
                  <RequireAuth requiredRole='admin'>
                    <TableMessages />
                  </RequireAuth>
                }
              />
              <Route
                path='/table-faqs'
                element={
                  <RequireAuth requiredRole='admin'>
                    <TableFaqs />
                  </RequireAuth>
                }
              />
              <Route path='/no-access' element={<NoAccess />} />
              <Route path='*' element={<NoPage />} />
            </Routes>

            <Footer />

            {/* Vercel Analytics */}
            <Analytics />
          </div>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}
