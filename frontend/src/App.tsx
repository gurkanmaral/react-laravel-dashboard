

import { Navigate, Route, Routes } from 'react-router-dom'
import SignInForm from './_auth/forms/SignInForm'
import SignUpForm from './_auth/forms/SignUpForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import Dashboard from './_root/pages/Dashboard'
import { Toaster } from "@/components/ui/sonner"
import RedirectRoute from "@/lib/protected/RedirectedRoute";
import ProtectedRoute from './lib/protected/ProtectedRoute'
import Users from './_root/pages/Users'
import Inventory from './_root/pages/Inventory'
import TotalOrders from './_root/pages/TotalOrders'
import PopularProducts from './_root/pages/PopularProducts'
import CancellationPage from './_root/pages/CancellationPage'
import RevenuePage from './_root/pages/RevenuePage'
import ReviewPage from './_root/pages/ReviewPage'

function App() {
  

  return (
  <main className=''>
    <Routes>
        <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<RedirectRoute><SignInForm /></RedirectRoute>} />
              <Route path="/sign-up" element={<RedirectRoute><SignUpForm /></RedirectRoute>} />
        </Route>
      <Route element={<RootLayout />}>
         <Route index element={<Navigate to="/dashboard" replace />} />
             <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
             <Route path="/users" element={<Users />}  />
             <Route path="/inventory" element={<Inventory />}  />
             <Route path="/total-orders" element={<TotalOrders />}  />
             <Route path="/products" element={<PopularProducts />}  />
             <Route path="/cancellation" element={<CancellationPage />}  />
             <Route path="/revenue" element={<RevenuePage />}  />
             <Route path="/reviews" element={<ReviewPage />} />
      </Route>
    </Routes>
    <Toaster />
  </main>
  )
}

export default App
