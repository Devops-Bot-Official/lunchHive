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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            <div>
              <div className="mb-3 flex items-center gap-2">
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
              <h3 className="mb-3 text-sm font-semibold">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Home</Link></li>
                <li><Link to="/about" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> About</Link></li>
                <li><Link to="/pricing" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Pricing</Link></li>
                <li><Link to="/faq" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> FAQ</Link></li>
                <li><Link to="/help" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Help Center</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">Customers</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/hives" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Choose Hive</Link></li>
                <li><Link to="/menu" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Today’s Menu</Link></li>
                <li><Link to="/orders" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Orders</Link></li>
                <li><Link to="/subscriptions" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Subscriptions</Link></li>
                <li><Link to="/checkout" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Checkout</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">Operations</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/deliver" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Deliver with LunchHive</Link></li>
                <li><Link to="/deliver/apply" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Apply to ride</Link></li>
                <li><Link to="/driver" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Driver dashboard</Link></li>
                <li><Link to="/company-admin" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Company admin</Link></li>
                <li><Link to="/contact" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">Trust & Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:support@lunchhive.app" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Mail className="h-4 w-4" /> support@lunchhive.app
                  </a>
                </li>
                <li>
                  <a href="tel:+10000000000" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Phone className="h-4 w-4" /> +1 (000) 000-0000
                  </a>
                </li>
                <li><Link to="/privacy" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Privacy Policy</Link></li>
                <li><Link to="/terms" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Terms of Service</Link></li>
                <li><Link to="/help" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" /> Support docs</Link></li>
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
