import { useEffect, useState } from 'react';
import { useHive } from '@/contexts/HiveContext';
import { getHiveStats, HiveStats } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HiveProgress } from '@/components/HiveProgress';
import { toast } from 'sonner';

export default function MyHivePage() {
  const { selectedHive, stats, reloadStats } = useHive();
  const [members, setMembers] = useState<string[]>(['Anna', 'Ben', 'Chloe', 'David', 'Ella', 'Finn']);
  const [feed, setFeed] = useState<string[]>(['Anna ordered Greek Salad', 'Ben ordered Curry Bowl', 'Chloe ordered Low-Carb Salmon']);
  const [details, setDetails] = useState<HiveStats | null>(stats || null);

  useEffect(() => {
    if (selectedHive) {
      getHiveStats(selectedHive.id).then(s => setDetails(s)).catch(() => {});
    }
  }, [selectedHive]);

  if (!selectedHive) return <p>Select a hive to see details.</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Hive: {selectedHive.name}</h1>
      <p className="text-sm text-muted-foreground">Location: {selectedHive.address}</p>

      {details && <HiveProgress stats={details} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Hive stats</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>People in hive: ~{selectedHive.dailyStats.previousOrders}</p>
            <p>Average daily orders: {Math.round(selectedHive.dailyStats.previousOrders * 0.7)}</p>
            <p>Usual delivery window: {selectedHive.deliveryWindow}</p>
            <p>Today’s progress: {selectedHive.dailyStats.todaysOrders} ordered today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Community</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex -space-x-2">
              {members.map(m => (
                <Avatar key={m} className="h-8 w-8 border">
                  <AvatarFallback>{m.slice(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <ul className="text-sm">
              {feed.map((f, idx) => <li key={idx}>• {f}</li>)}
            </ul>
            <Button variant="outline" onClick={() => toast.info('Share link copied!')}>Invite colleagues / neighbours</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Hive perks</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Free delivery unlocked when your hive hits {selectedHive.thresholds.freeDelivery} orders.</p>
          <p>• Weekly surprise dessert for one random hive member if 15+ orders.</p>
          <Button variant="outline" onClick={reloadStats}>Refresh progress</Button>
        </CardContent>
      </Card>
    </div>
  );
}
