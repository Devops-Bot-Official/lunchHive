import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom';
import { Hexagon, MapPin, ArrowRight, Mail, Phone } from 'lucide-react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="border-t">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Hexagon className="h-6 w-6 text-orange-500" />
                <span className="text-lg font-semibold">LunchHive</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Smart batch lunch for your office and neighbourhood. Grouped deliveries reduce fees, waste, and wait time.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Operating in selected cities • Demo</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" /> Home
                  </Link>
                </li>
                <li>
                  <Link to="/menu" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" /> Today’s Menu
                  </Link>
                </li>
                <li>
                  <Link to="/hives" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" /> Choose Hive
                  </Link>
                </li>
                <li>
                  <Link to="/my-hive" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" /> My Hive
                  </Link>
                </li>
                <li>
                  <Link to="/reviews" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" /> Reviews
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Orders</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/orders" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" /> Orders
                  </Link>
                </li>
                <li>
                  <Link to="/subscriptions" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" /> Subscriptions
                  </Link>
                </li>
                <li>
                  <Link to="/checkout" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" /> Checkout
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Deliver</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/deliver" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" /> Deliver with LunchHive
                  </Link>
                </li>
                <li>
                  <Link to="/deliver/apply" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" /> Apply to ride
                  </Link>
                </li>
                <li>
                  <Link to="/deliver/status" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" /> Application status
                  </Link>
                </li>
                <li>
                  <Link to="/driver" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" /> Driver dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/driver/settings" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" /> Driver settings
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:support@lunchhive.app" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" /> support@lunchhive.app
                  </a>
                </li>
                <li>
                  <a href="tel:+10000000000" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" /> +1 (000) 000-0000
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} LunchHive — Demo only, no real orders or payments.
          </div>
        </div>
      </footer>
    </div>
  );
}
