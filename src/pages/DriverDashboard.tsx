import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useRider } from '@/contexts/RiderContext';
import { toast } from 'sonner';

export default function DriverDashboard() {
  const navigate = useNavigate();
  const { status, rider, setOnline, currentBatch, fetchCurrentBatch, batches, fetchBatches, changeBatchStatus, earnings, fetchEarnings } = useRider();
  const [loading, setLoading] = useState<boolean>(true);
  const today = format(new Date(), 'PPP');

  useEffect(() => {
    if (status !== 'approved') {
      toast.error('You must be an approved delivery partner to access the driver dashboard');
      navigate('/deliver/status');
      return;
    }
    (async () => {
      setLoading(true);
      await Promise.all([fetchCurrentBatch(), fetchBatches(), fetchEarnings()]);
      setLoading(false);
    })();
  }, [status]);

  if (status !== 'approved') return null;

  const progressValue = (() => {
    if (!currentBatch) return 0;
    switch (currentBatch.status) {
      case 'not_started':
        return 33;
      case 'in_progress':
        return 45;
      case 'picked_up':
        return 66;
      case 'delivered':
        return 100;
      default:
        return 0;
    }
  })();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Driver Dashboard</h1>
          <p className="text-sm text-muted-foreground">{rider?.profile.fullName} · {today}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm">{rider?.isOnline ? 'Online' : 'Offline'}</span>
          <Switch checked={!!rider?.isOnline} onCheckedChange={(c) => setOnline(!!c)} />
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-3">Next Batch</h2>
        {loading ? (
          <Card className="p-6">
            <p className="text-muted-foreground">Loading…</p>
          </Card>
        ) : currentBatch ? (
          <Card className="p-6 space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge className="bg-orange-500 text-white">{currentBatch.orderCount} lunches</Badge>
              <Badge variant="outline">{currentBatch.hiveName}</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p><span className="font-medium">Pickup:</span> {currentBatch.pickupLocation.name} — {currentBatch.pickupLocation.address}</p>
                <p><span className="font-medium">Pickup window:</span> {currentBatch.pickupWindow}</p>
              </div>
              <div>
                <p><span className="font-medium">Delivery hive:</span> {currentBatch.hiveName}</p>
                <p><span className="font-medium">Delivery window:</span> {currentBatch.deliveryWindow}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Not started</span>
                <span>Picked up</span>
                <span>Delivered</span>
              </div>
              <Progress value={progressValue} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => currentBatch && changeBatchStatus(currentBatch.id, 'in_progress')}>Start batch</Button>
              <Button variant="outline" onClick={() => currentBatch && changeBatchStatus(currentBatch.id, 'picked_up')}>Mark as picked up</Button>
              <Button onClick={() => currentBatch && changeBatchStatus(currentBatch.id, 'delivered')}>Mark as delivered</Button>
            </div>
          </Card>
        ) : (
          <Card className="p-6">
            <p>No active batches. Go Online to receive new ones.</p>
            <div className="mt-3">
              <Button variant="outline" onClick={() => fetchCurrentBatch()}>Refresh</Button>
            </div>
          </Card>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Today’s Batches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {batches.map((b) => (
            <Card key={b.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{b.hiveName}</span>
                <Badge variant={b.status === 'delivered' ? 'default' : b.status === 'cancelled' ? 'destructive' : 'outline'}>
                  {b.status === 'delivered' ? 'Completed' : b.status === 'cancelled' ? 'Cancelled' : 'Active'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{b.orderCount} lunches · Pickup {b.pickupWindow} · Delivery {b.deliveryWindow}</p>
              <p className="text-sm">Paid amount: €{b.earnings.toFixed(2)}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Earnings</h2>
        <Card className="p-6">
          {earnings ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Today’s earnings</p>
                <p className="text-2xl font-bold">€{earnings.today.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This week</p>
                <p className="text-2xl font-bold">€{earnings.week.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total batches this week</p>
                <p className="text-2xl font-bold">{earnings.totalBatchesWeek}</p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Loading…</p>
          )}
        </Card>
      </section>
    </div>
  );
}
