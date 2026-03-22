import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resetDemoData } from '@/lib/api';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [name, setName] = useState('Alex Kim');
  const [email, setEmail] = useState('alex.kim@example.com');
  const [phone, setPhone] = useState('+49 170 0000000');
  const [notifyOpen, setNotifyOpen] = useState(true);
  const [notifyThreshold, setNotifyThreshold] = useState(true);
  const [notifyOut, setNotifyOut] = useState(true);
  const [vegetarian, setVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [spicyOkay, setSpicyOkay] = useState(true);
  const [workAddress, setWorkAddress] = useState('123 Enterprise Ave');
  const [homeAddress, setHomeAddress] = useState('Rose Street 12–18');
  const [deliveryNote, setDeliveryNote] = useState('Leave at reception if batch arrives early.');

  const saveSettings = () => {
    toast.success('Demo settings saved locally in UI state.');
  };

  const reset = async () => {
    try {
      await resetDemoData();
      toast.success('Demo data reset');
    } catch {
      toast.error('Failed to reset');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Badge className="bg-orange-500 text-white hover:bg-orange-500">Settings</Badge>
        <h1 className="text-3xl font-bold">Account and preference settings</h1>
        <p className="max-w-3xl text-muted-foreground">
          This page is structured like a real account settings surface. It still runs on demo data today, but the sections are ready to map onto future backend-backed profile, preference, and notification APIs.
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0 text-foreground">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Meal preferences</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="demo">Demo controls</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account profile</CardTitle>
              <CardDescription>Basic identity and contact details for the future account model.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full name</label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Phone</label>
                <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification preferences</CardTitle>
              <CardDescription>Controls for order, hive, and operational updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4 rounded-md border p-4">
                <div>
                  <p className="font-medium">Ordering window opens</p>
                  <p className="text-sm text-muted-foreground">Get a prompt when your hive starts taking orders for the day.</p>
                </div>
                <Switch checked={notifyOpen} onCheckedChange={v => setNotifyOpen(Boolean(v))} />
              </div>
              <div className="flex items-center justify-between gap-4 rounded-md border p-4">
                <div>
                  <p className="font-medium">Hive threshold alerts</p>
                  <p className="text-sm text-muted-foreground">Know when your hive is close to unlocking reduced delivery fees.</p>
                </div>
                <Switch checked={notifyThreshold} onCheckedChange={v => setNotifyThreshold(Boolean(v))} />
              </div>
              <div className="flex items-center justify-between gap-4 rounded-md border p-4">
                <div>
                  <p className="font-medium">Order status updates</p>
                  <p className="text-sm text-muted-foreground">Receive updates when your lunch is being prepared or out for delivery.</p>
                </div>
                <Switch checked={notifyOut} onCheckedChange={v => setNotifyOut(Boolean(v))} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Meal preferences</CardTitle>
              <CardDescription>Preferences we can later persist against a real user profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4 rounded-md border p-4">
                <div>
                  <p className="font-medium">Prefer vegetarian options</p>
                  <p className="text-sm text-muted-foreground">Show more vegetarian-friendly lunch suggestions.</p>
                </div>
                <Switch checked={vegetarian} onCheckedChange={v => setVegetarian(Boolean(v))} />
              </div>
              <div className="flex items-center justify-between gap-4 rounded-md border p-4">
                <div>
                  <p className="font-medium">Prefer vegan options</p>
                  <p className="text-sm text-muted-foreground">Prioritise fully plant-based choices in future personalisation.</p>
                </div>
                <Switch checked={vegan} onCheckedChange={v => setVegan(Boolean(v))} />
              </div>
              <div className="flex items-center justify-between gap-4 rounded-md border p-4">
                <div>
                  <p className="font-medium">Comfortable with spicy meals</p>
                  <p className="text-sm text-muted-foreground">Allow spicier menu recommendations in daily picks.</p>
                </div>
                <Switch checked={spicyOkay} onCheckedChange={v => setSpicyOkay(Boolean(v))} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery">
          <Card>
            <CardHeader>
              <CardTitle>Delivery preferences</CardTitle>
              <CardDescription>Saved addresses and drop-off instructions for work and home hives.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Work address</label>
                  <Input value={workAddress} onChange={e => setWorkAddress(e.target.value)} placeholder="Work address" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Home address</label>
                  <Input value={homeAddress} onChange={e => setHomeAddress(e.target.value)} placeholder="Home address" />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <label className="text-sm font-medium">Delivery note</label>
                <Input value={deliveryNote} onChange={e => setDeliveryNote(e.target.value)} placeholder="Leave at reception" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demo">
          <Card>
            <CardHeader>
              <CardTitle>Demo controls</CardTitle>
              <CardDescription>Utilities for testing flows while the app still uses mock state.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4 text-sm text-muted-foreground">
                Resetting demo data clears local mock state such as selected hive, orders, and subscription data.
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-orange-500 text-white hover:bg-orange-600" onClick={saveSettings}>Save settings</Button>
                <Button variant="destructive" onClick={reset}>Reset demo data</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
