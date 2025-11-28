import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { resetDemoData } from '@/lib/api';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [name, setName] = useState('Alex Kim');
  const [email, setEmail] = useState('alex.kim@example.com');
  const [notifyOpen, setNotifyOpen] = useState(true);
  const [notifyThreshold, setNotifyThreshold] = useState(true);
  const [notifyOut, setNotifyOut] = useState(true);

  const reset = async () => {
    try { await resetDemoData(); toast.success('Demo data reset'); } catch { toast.error('Failed to reset'); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Card>
        <CardHeader><CardTitle>Account</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between"><span>Remind me when ordering window opens</span><Switch checked={notifyOpen} onCheckedChange={v => setNotifyOpen(Boolean(v))} /></div>
          <div className="flex items-center justify-between"><span>Notify me when hive is close to free delivery threshold</span><Switch checked={notifyThreshold} onCheckedChange={v => setNotifyThreshold(Boolean(v))} /></div>
          <div className="flex items-center justify-between"><span>Notify me when my order is out for delivery</span><Switch checked={notifyOut} onCheckedChange={v => setNotifyOut(Boolean(v))} /></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Addresses (demo)</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Work address" />
          <Input placeholder="Home address" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Demo settings</CardTitle></CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={reset}>Reset demo data</Button>
        </CardContent>
      </Card>
    </div>
  );
}
