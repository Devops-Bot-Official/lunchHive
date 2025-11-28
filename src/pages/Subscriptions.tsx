import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type SubscriptionStatus = 'Active' | 'Paused' | 'Cancelled';

interface Subscription {
  id: string;
  plan: string;
  startedOn: string;
  renewsOn: string;
  status: SubscriptionStatus;
}

const demoSubscriptions: Subscription[] = [
  {
    id: 'SUB-2001',
    plan: 'Weekly Lunch Plan',
    startedOn: '2025-01-08',
    renewsOn: '2025-01-15',
    status: 'Active',
  },
];

const statusBadgeClass = (status: SubscriptionStatus) => {
  switch (status) {
    case 'Active':
      return 'bg-green-500 text-white hover:bg-green-500';
    case 'Paused':
      return 'bg-yellow-500 text-white hover:bg-yellow-500';
    case 'Cancelled':
      return 'bg-red-500 text-white hover:bg-red-500';
    default:
      return '';
  }
};

export default function SubscriptionsPage() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <Button variant="outline" asChild>
          <Link to="/menu">Add meals</Link>
        </Button>
      </div>

      {demoSubscriptions.length === 0 ? (
        <Card className="p-6">
          <div className="space-y-3">
            <p className="text-muted-foreground">No active subscriptions yet.</p>
            <div className="flex gap-2">
              <Button asChild>
                <Link to="/menu">Explore plans</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/my-hive">Find a hive</Link>
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {demoSubscriptions.map((sub) => (
            <Card key={sub.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{sub.plan}</h3>
                  <p className="text-sm text-muted-foreground">Started {sub.startedOn} • Renews {sub.renewsOn}</p>
                </div>
                <Badge className={statusBadgeClass(sub.status)}>{sub.status}</Badge>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline">Manage</Button>
                <Button size="sm" variant="ghost" asChild>
                  <Link to="/menu">Add meals</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">Demo only — subscriptions are not billed.</p>
    </section>
  );
}
