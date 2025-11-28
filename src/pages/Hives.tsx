import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getHives, Hive } from '@/lib/api';
import { useHive } from '@/contexts/HiveContext';
import { toast } from 'sonner';

export default function Hives() {
  const [searchWork, setSearchWork] = useState('');
  const [workHives, setWorkHives] = useState<Hive[]>([]);
  const [homeHives, setHomeHives] = useState<Hive[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { selectHive } = useHive();
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const wh = await getHives({ type: 'work' });
      const hh = await getHives({ type: 'home' });
      setWorkHives(wh);
      setHomeHives(hh);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleJoin = async (id: string) => {
    try {
      await selectHive(id);
      toast.success('Hive selected!');
      navigate('/menu');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not select hive');
    }
  };

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-xl">
        <img src="https://images.pexels.com/photos/6899401/pexels-photo-6899401.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="coworking space open office daylight communal tables modern minimal clean - Photo by Max Vakhtbovycn" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="relative p-8">
          <h1 className="text-3xl font-bold">Select your LunchHive</h1>
          <p className="text-muted-foreground">Your hive determines your delivery batch time, group discounts, and who shares deliveries with you.</p>
        </div>
      </section>

      {error && (
        <Card className="border-destructive">
          <CardHeader><CardTitle>Error loading hives</CardTitle></CardHeader>
          <CardContent>
            <p className="text-destructive mb-2">{error}</p>
            <Button onClick={load}>Retry</Button>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="work">
        <TabsList>
          <TabsTrigger value="work">Workplace</TabsTrigger>
          <TabsTrigger value="home">Home</TabsTrigger>
        </TabsList>
        <TabsContent value="work" className="space-y-4">
          <div className="flex items-center gap-2">
            <Input placeholder="Search your office or co-working space…" value={searchWork} onChange={e => setSearchWork(e.target.value)} />
            <Button variant="outline" onClick={load} disabled={loading}>Refresh</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workHives.filter(h => h.name.toLowerCase().includes(searchWork.toLowerCase())).map(h => (
              <Card key={h.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{h.name}</span>
                    {h.companySubsidised && <Badge className="bg-green-500 text-white">Company-subsidised</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{h.address}</p>
                  <p className="text-sm">Yesterday: {h.dailyStats.previousOrders} orders</p>
                  <p className="text-sm">Delivery window: {h.deliveryWindow}</p>
                  <Button className="mt-2 bg-orange-500 text-white hover:bg-orange-600" onClick={() => handleJoin(h.id)}>Join this hive</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="home" className="space-y-4">
          <section className="relative overflow-hidden rounded-xl">
            <img src="https://images.pexels.com/photos/5845669/pexels-photo-5845669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="apartment building entrance daytime neighborhood stoop modern clean - Photo by Charles Parker" className="absolute inset-0 h-full w-full object-cover opacity-20" />
            <div className="relative p-6">
              <p className="text-sm text-muted-foreground">Home hives group nearby addresses into timed deliveries.</p>
            </div>
          </section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {homeHives.map(h => (
              <Card key={h.id} className="overflow-hidden">
                <CardHeader><CardTitle>{h.name}</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">Delivery window: {h.deliveryWindow}</p>
                  <p className="text-sm">Typical orders: {h.dailyStats.previousOrders}</p>
                  <Button className="mt-2 bg-orange-500 text-white hover:bg-orange-600" onClick={() => handleJoin(h.id)}>Join this hive</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Use my address</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter your home address (demo)</DialogTitle>
              </DialogHeader>
              <form className="space-y-3" onSubmit={async e => {
                e.preventDefault();
                await handleJoin('hive_rose_12_18');
              }}>
                <Input placeholder="Street and number" required />
                <Input placeholder="Apartment / building" />
                <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600">Assign to a demo hive</Button>
              </form>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}