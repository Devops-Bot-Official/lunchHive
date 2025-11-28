import { useEffect, useState } from 'react';
import { useRider } from '@/contexts/RiderContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import type { HiveZone, TransportType } from '@/lib/riderApi';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function DriverSettings() {
  const { rider, updateProfile, hives, leaveProgram } = useRider();
  const [profile, setProfile] = useState({
    fullName: rider?.profile.fullName || '',
    phone: rider?.profile.phone || '',
    city: rider?.profile.city || '',
    transportType: (rider?.profile.transportType || 'bike') as TransportType,
    preferredZones: rider?.profile.preferredZones || [],
    payoutDetails: rider?.profile.payoutDetails || '',
    availabilityDays: rider?.profile.availabilityDays || {},
    availabilityWindow: rider?.profile.availabilityWindow || { startHour: 11, endHour: 15 },
  });

  useEffect(() => {
    if (rider) {
      setProfile({
        fullName: rider.profile.fullName,
        phone: rider.profile.phone,
        city: rider.profile.city,
        transportType: rider.profile.transportType,
        preferredZones: rider.profile.preferredZones,
        payoutDetails: rider.profile.payoutDetails || '',
        availabilityDays: rider.profile.availabilityDays || {},
        availabilityWindow: rider.profile.availabilityWindow || { startHour: 11, endHour: 15 },
      });
    }
  }, [rider]);

  const toggleDay = (day: string, checked: boolean) => {
    setProfile(p => ({ ...p, availabilityDays: { ...(p.availabilityDays || {}), [day]: checked } }));
  };

  const toggleZone = (zoneId: string, checked: boolean) => {
    setProfile(p => {
      const set = new Set(p.preferredZones);
      if (checked) set.add(zoneId); else set.delete(zoneId);
      return { ...p, preferredZones: Array.from(set) };
    });
  };

  const saveBasic = async () => {
    await updateProfile({
      fullName: profile.fullName,
      phone: profile.phone,
      city: profile.city,
      transportType: profile.transportType,
    });
  };

  const saveAvailability = async () => {
    await updateProfile({
      availabilityDays: profile.availabilityDays,
      availabilityWindow: profile.availabilityWindow,
    });
  };

  const saveZones = async () => {
    await updateProfile({
      preferredZones: profile.preferredZones,
    });
  };

  const savePayout = async () => {
    await updateProfile({
      payoutDetails: profile.payoutDetails,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Rider Settings</h1>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Basic info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Full Name</Label>
            <Input value={profile.fullName} onChange={(e) => setProfile(p => ({ ...p, fullName: e.target.value }))} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={profile.phone} onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))} />
          </div>
          <div>
            <Label>City</Label>
            <Input value={profile.city} onChange={(e) => setProfile(p => ({ ...p, city: e.target.value }))} />
          </div>
          <div>
            <Label>Transport type</Label>
            <Select value={profile.transportType} onValueChange={(v) => setProfile(p => ({ ...p, transportType: v as TransportType }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bike">Bike</SelectItem>
                <SelectItem value="ebike">E-bike</SelectItem>
                <SelectItem value="scooter">Scooter</SelectItem>
                <SelectItem value="foot">On foot</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={saveBasic}>Save basic info</Button>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Availability</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {days.map((d) => (
            <label key={d} className="flex items-center gap-2">
              <Checkbox checked={!!profile.availabilityDays?.[d]} onCheckedChange={(c) => toggleDay(d, !!c)} />
              <span>{d}</span>
            </label>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Start hour</Label>
            <Input type="number" min={0} max={23} value={profile.availabilityWindow.startHour} onChange={(e) => setProfile(p => ({ ...p, availabilityWindow: { ...p.availabilityWindow, startHour: Number(e.target.value) } }))} />
          </div>
          <div>
            <Label>End hour</Label>
            <Input type="number" min={0} max={23} value={profile.availabilityWindow.endHour} onChange={(e) => setProfile(p => ({ ...p, availabilityWindow: { ...p.availabilityWindow, endHour: Number(e.target.value) } }))} />
          </div>
        </div>
        <Button onClick={saveAvailability}>Save availability</Button>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Preferred zones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {hives.map((z: HiveZone) => (
            <label key={z.id} className="flex items-center gap-2">
              <Checkbox checked={profile.preferredZones.includes(z.id)} onCheckedChange={(c) => toggleZone(z.id, !!c)} />
              <span>{z.name}</span>
            </label>
          ))}
        </div>
        <Button onClick={saveZones}>Save zones</Button>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Payout details (demo)</h2>
        <div>
          <Label>Bank/Wallet</Label>
          <Input value={profile.payoutDetails} onChange={(e) => setProfile(p => ({ ...p, payoutDetails: e.target.value }))} placeholder="DE89 3704 0044 0532 0130 00" />
        </div>
        <Button onClick={savePayout}>Save payout settings</Button>
      </Card>

      <Card className="p-6 space-y-3 border-destructive">
        <h2 className="text-xl font-semibold text-destructive">Danger zone (demo)</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Leave delivery program</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle>
            </AlertDialogHeader>
            <p className="text-sm text-muted-foreground">This will clear your application and assignments (demo only).</p>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => leaveProgram()}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </div>
  );
}
