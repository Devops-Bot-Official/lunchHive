import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSubscription, createSubscription, updateSubscription, Subscription } from '@/lib/api';
import { toast } from 'sonner';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function SubscriptionsPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Wed', 'Fri']);
  const [budget, setBudget] = useState('12');
  const [vegetarianAllowed, setVegetarianAllowed] = useState(true);
  const [veganAllowed, setVeganAllowed] = useState(true);

  useEffect(() => {
    getSubscription()
      .then((sub) => {
        if (sub) {
          setSubscription(sub);
          setSelectedDays(sub.daysOfWeek);
          setBudget(String(sub.preferences.budgetPerLunch));
          setVegetarianAllowed(sub.preferences.vegetarianAllowed);
          setVeganAllowed(sub.preferences.veganAllowed);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((item) => item !== day) : [...prev, day]
    );
  };

  const saveSubscription = async () => {
    if (selectedDays.length === 0) {
      toast.error('Select at least one delivery day');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        planName: 'Weekly Lunch Plan',
        daysOfWeek: selectedDays,
        preferences: {
          vegetarianAllowed,
          veganAllowed,
          budgetPerLunch: Number(budget) || 0
        }
      };

      const next = subscription
        ? await updateSubscription(subscription.id, payload)
        : await createSubscription(payload);

      setSubscription(next);
      toast.success(subscription ? 'Subscription updated' : 'Subscription created');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save subscription');
    } finally {
      setSaving(false);
    }
  };

  const pauseSubscription = async () => {
    if (!subscription) return;
    setSaving(true);
    try {
      const next = await updateSubscription(subscription.id, {
        status: subscription.status === 'active' ? 'paused' : 'active'
      });
      setSubscription(next);
      toast.success(next.status === 'active' ? 'Subscription resumed' : 'Subscription paused');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not update subscription');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Subscriptions</h1>
          <p className="text-muted-foreground">Set recurring lunch preferences for your hive.</p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/menu">Add meals</Link>
        </Button>
      </div>

      {loading ? (
        <Card className="p-6 text-muted-foreground">Loading subscription…</Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{subscription ? 'Manage subscription' : 'Create subscription'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Delivery days</Label>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                  {weekdays.map((day) => (
                    <label key={day} className="flex items-center gap-2 rounded-md border p-3 text-sm">
                      <Checkbox checked={selectedDays.includes(day)} onCheckedChange={() => toggleDay(day)} />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget per lunch (€)</Label>
                  <Input id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Meal preferences</Label>
                <label className="flex items-center gap-2 rounded-md border p-3 text-sm">
                  <Checkbox checked={vegetarianAllowed} onCheckedChange={(checked) => setVegetarianAllowed(Boolean(checked))} />
                  <span>Vegetarian meals allowed</span>
                </label>
                <label className="flex items-center gap-2 rounded-md border p-3 text-sm">
                  <Checkbox checked={veganAllowed} onCheckedChange={(checked) => setVeganAllowed(Boolean(checked))} />
                  <span>Vegan meals allowed</span>
                </label>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-orange-500 text-white hover:bg-orange-600" onClick={saveSubscription} disabled={saving}>
                  {saving ? 'Saving…' : subscription ? 'Save changes' : 'Create subscription'}
                </Button>
                {subscription && (
                  <Button variant="outline" onClick={pauseSubscription} disabled={saving}>
                    {subscription.status === 'active' ? 'Pause subscription' : 'Resume subscription'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              {subscription ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">{subscription.planName}</span>
                    <Badge className={subscription.status === 'active' ? 'bg-green-500 text-white hover:bg-green-500' : 'bg-yellow-500 text-white hover:bg-yellow-500'}>
                      {subscription.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Days</p>
                    <p>{subscription.daysOfWeek.join(', ')}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Next deliveries</p>
                    <ul className="mt-2 space-y-1">
                      {subscription.nextDeliveries.map((date) => (
                        <li key={date}>• {date}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <p>No recurring plan yet. Create one to reserve your weekly lunch cadence.</p>
              )}
              <p>Demo only — subscriptions are not billed.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
