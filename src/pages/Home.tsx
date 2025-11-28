import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Salad, Truck } from 'lucide-react';
import { useHive } from '@/contexts/HiveContext';
import { motion } from 'framer-motion';

export default function Home() {
  const { selectedHive } = useHive();
  const navigate = useNavigate();

  const goMenu = () => {
    if (selectedHive) navigate('/menu');
    else navigate('/hives');
  };

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-xl">
        <img src="https://images.pexels.com/photos/6169054/pexels-photo-6169054.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="office lunch delivery courier carrying multiple paper bags lobby midday professional modern clean - Photo by Tima Miroshnichenko" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="relative z-10 p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Lunch, batched for your office and street.</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">Order from a curated daily menu, delivered in one batch to your hive—hot, on time, and cheaper than traditional delivery.</p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-orange-500 text-white hover:bg-orange-600" asChild>
              <Link to="/hives">Choose your hive</Link>
            </Button>
            <Button variant="outline" onClick={goMenu}>View today’s menu</Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <img src="https://images.pexels.com/photos/5087167/pexels-photo-5087167.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="office building lobby directory sign coworking entrance daytime professional clean - Photo by Brett Sayles" className="h-40 w-full object-cover" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5 text-orange-500" /> Join a Hive</CardTitle>
            </CardHeader>
            <CardContent>
              Choose your office building or home area.
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <img src="https://images.pexels.com/photos/29765803/pexels-photo-29765803.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="hand holding smartphone ordering lunch app at work desk keyboard professional clean - Photo by Jilly Noble" className="h-40 w-full object-cover" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Salad className="h-5 w-5 text-green-600" /> Pick Your Lunch</CardTitle>
            </CardHeader>
            <CardContent>
              Select one of today’s curated meals.
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <img src="https://images.pexels.com/photos/11356987/pexels-photo-11356987.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="bicycle courier with multiple insulated delivery bags city midday professional - Photo by hans middendorp" className="h-40 w-full object-cover" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5 text-orange-500" /> Batch Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              Everything arrives together in a time window.
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="overflow-hidden">
            <img src="https://images.pexels.com/photos/7706524/pexels-photo-7706524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="delivery courier checking wristwatch midday schedule professional city - Photo by MART  PRODUCTION" className="h-32 w-full object-cover" />
            <CardHeader><CardTitle>Predictable delivery</CardTitle></CardHeader>
            <CardContent>Fixed windows for reliable lunch timing.</CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader><CardTitle>Lower fees via batching</CardTitle></CardHeader>
            <CardContent>Share delivery costs with your hive.</CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader><CardTitle>Healthier curated menu</CardTitle></CardHeader>
            <CardContent>Balanced options, not a chaotic marketplace.</CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader><CardTitle>Office & home friendly</CardTitle></CardHeader>
            <CardContent>Spill-safe meals and convenient drop-offs.</CardContent>
          </Card>
        </div>
      </section>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-md bg-orange-50 p-4 text-sm text-orange-700">
        This is a demo — no real orders or payments are made.
      </motion.div>
    </div>
  );
}