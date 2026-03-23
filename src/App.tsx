import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import Home from '@/pages/Home';
import Hives from '@/pages/Hives';
import MenuPage from '@/pages/Menu';
import CheckoutPage from '@/pages/Checkout';
import OrdersPage from '@/pages/Orders';
import OrderDetailPage from '@/pages/OrderDetail';
import NotificationsPage from '@/pages/Notifications';
import SubscriptionsPage from '@/pages/Subscriptions';
import MyHivePage from '@/pages/MyHive';
import ProfilePage from '@/pages/Profile';
import SettingsPage from '@/pages/Settings';
import CompanyAdminPage from '@/pages/CompanyAdmin';
import ReviewsPage from '@/pages/Reviews';
import AboutPage from '@/pages/About';
import PricingPage from '@/pages/Pricing';
import FAQPage from '@/pages/FAQ';
import ContactPage from '@/pages/Contact';
import PrivacyPage from '@/pages/Privacy';
import TermsPage from '@/pages/Terms';
import HelpCenterPage from '@/pages/HelpCenter';
import NotFound from '@/pages/NotFound';
import { Layout } from '@/components/Layout';
import { UserProvider } from '@/contexts/UserContext';
import { HiveProvider } from '@/contexts/HiveContext';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from 'sonner';
import DeliverLanding from '@/pages/DeliverLanding';
import RiderApply from '@/pages/RiderApply';
import RiderStatus from '@/pages/RiderStatus';
import DriverDashboard from '@/pages/DriverDashboard';
import DriverSettings from '@/pages/DriverSettings';
import { RiderProvider } from '@/contexts/RiderContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UserProvider>
          <HiveProvider>
            <CartProvider>
              <RiderProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/help" element={<HelpCenterPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/hives" element={<Hives />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/orders/:orderId" element={<OrderDetailPage />} />
                    <Route path="/subscriptions" element={<SubscriptionsPage />} />
                    <Route path="/my-hive" element={<MyHivePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/company-admin" element={<CompanyAdminPage />} />
                    <Route path="/reviews" element={<ReviewsPage />} />
                    <Route path="/deliver" element={<DeliverLanding />} />
                    <Route path="/deliver/apply" element={<RiderApply />} />
                    <Route path="/deliver/status" element={<RiderStatus />} />
                    <Route path="/driver" element={<DriverDashboard />} />
                    <Route path="/driver/settings" element={<DriverSettings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
                <Toaster position="top-right" richColors />
              </RiderProvider>
            </CartProvider>
          </HiveProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
