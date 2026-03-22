import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Hexagon, ShoppingCart, UserRound, Building2, MapPin, UtensilsCrossed, Bike, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useHive } from '@/contexts/HiveContext';
import { useUser } from '@/contexts/UserContext';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';
import { useRider } from '@/contexts/RiderContext';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { selectedHive } = useHive();
  const { user, signOut } = useUser();
  const { items } = useCart();
  const { status } = useRider();
  const navigate = useNavigate();

  const count = items.reduce((s, i) => s + i.quantity, 0);

  const handleDeliverClick = () => {
    if (status === 'approved') navigate('/driver');
    else navigate('/deliver');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <motion.div initial={{ rotate: 0 }} animate={{ rotate: 10 }} transition={{ duration: 0.6 }}>
            <Hexagon className="h-8 w-8 text-orange-500" />
          </motion.div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold">LunchHive</span>
            <span className="text-xs text-muted-foreground">Smart batch lunch</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/menu" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-orange-600' : 'text-foreground hover:text-orange-600'}`}>Today’s Menu</NavLink>
          <NavLink to="/pricing" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-orange-600' : 'text-foreground hover:text-orange-600'}`}>Pricing</NavLink>
          <NavLink to="/faq" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-orange-600' : 'text-foreground hover:text-orange-600'}`}>FAQ</NavLink>
          <NavLink to="/my-hive" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-orange-600' : 'text-foreground hover:text-orange-600'}`}>My Hive</NavLink>
          <NavLink to="/orders" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-orange-600' : 'text-foreground hover:text-orange-600'}`}>Orders</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="flex items-center gap-2 sm:hidden" onClick={() => navigate('/menu')} aria-label="Today’s Menu">
            <UtensilsCrossed className="h-4 w-4" />
            <span className="text-sm">Menu</span>
          </Button>
          <Button variant="ghost" className="hidden sm:flex items-center gap-2" onClick={() => navigate('/hives')}>
            {selectedHive ? <Building2 className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
            <span className="text-sm">{selectedHive ? selectedHive.name : 'Choose Hive'}</span>
          </Button>
          <Button variant="ghost" className="hidden sm:flex items-center gap-2" onClick={handleDeliverClick} aria-label="Deliver with LunchHive">
            <Bike className="h-4 w-4" />
            <span className="text-sm">Deliver with LunchHive</span>
          </Button>
          <ThemeToggle />
          <Button variant="ghost" onClick={() => navigate('/notifications')} aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="relative" onClick={() => navigate('/checkout')} aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <Badge className="absolute -right-2 -top-2 bg-green-500 text-white hover:bg-green-500" aria-label={`${count} items in cart`}>{count}</Badge>}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{user ? user.name.slice(0, 2).toUpperCase() : 'U'}</AvatarFallback>
                </Avatar>
                <UserRound className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user ? user.name : 'Guest'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/about')}>About LunchHive</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/contact')}>Contact support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => { signOut(); navigate('/'); }}>Sign out (demo)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
