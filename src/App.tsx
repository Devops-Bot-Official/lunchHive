import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ThemeProvider } from 'next-themes';
import { Layout } from '@/components/Layout';
import { UserProvider } from '@/contexts/UserContext';
import { HiveProvider } from '@/contexts/HiveContext';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from 'sonner';
import { RiderProvider } from '@/contexts/RiderContext';

const Home = lazy(() => import('@/pages/Home'));
const AboutPage = lazy(() => import('@/pages/About'));
const PricingPage = lazy(() => import('@/pages/Pricing'));
const FAQPage = lazy(() => import('@/pages/FAQ'));
const ContactPage = lazy(() => import('@/pages/Contact'));
const HelpCenterPage = lazy(() => import('@/pages/HelpCenter'));
const PrivacyPage = lazy(() => import('@/pages/Privacy'));
const TermsPage = lazy(() => import('@/pages/Terms'));
const NotificationsPage = lazy(() => import('@/pages/Notifications'));
const Hives = lazy(() => import('@/pages/Hives'));
const MenuPage = lazy(() => import('@/pages/Menu'));
const CheckoutPage = lazy(() => import('@/pages/Checkout'));
const OrdersPage = lazy(() => import('@/pages/Orders'));
const OrderDetailPage = lazy(() => import('@/pages/OrderDetail'));
const SubscriptionsPage = lazy(() => import('@/pages/Subscriptions'));
const MyHivePage = lazy(() => import('@/pages/MyHive'));
const ProfilePage = lazy(() => import('@/pages/Profile'));
const SettingsPage = lazy(() => import('@/pages/Settings'));
const CompanyAdminPage = lazy(() => import('@/pages/CompanyAdmin'));
const ReviewsPage = lazy(() => import('@/pages/Reviews'));
const DeliverLanding = lazy(() => import('@/pages/DeliverLanding'));
const RiderApply = lazy(() => import('@/pages/RiderApply'));
const RiderStatus = lazy(() => import('@/pages/RiderStatus'));
const DriverDashboard = lazy(() => import('@/pages/DriverDashboard'));
const DriverSettings = lazy(() => import('@/pages/DriverSettings'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UserProvider>
          <HiveProvider>
            <CartProvider>
              <RiderProvider>
                <Layout>
                  <Suspense fallback={<div className="py-10 text-sm text-muted-foreground">Loading page…</div>}>
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
                  </Suspense>
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
