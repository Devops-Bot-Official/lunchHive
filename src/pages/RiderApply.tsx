import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { useRider } from '@/contexts/RiderContext';
import type { HiveZone, TransportType } from '@/lib/riderApi';
import { toast } from 'sonner';

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(6, 'Phone number required'),
  city: z.string().min(2, 'City/Area required'),
  transportType: z.enum(['bike', 'ebike', 'scooter', 'foot']),
  preferredZones: z.array(z.string()).min(1, 'Select at least one zone'),
  availability: z.object({
    weekdaysLunch: z.boolean().default(true),
    weekends: z.boolean().default(false),
    notes: z.string().optional(),
  }),
  bio: z.string().optional(),
  payoutDetails: z.string().optional(),
  idDocumentName: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function RiderApply() {
  const navigate = useNavigate();
  const { apply, hives } = useRider();
  const [loading, setLoading] = useState<boolean>(false);
  const [zones, setZones] = useState<HiveZone[]>([]);

  useEffect(() => {
    setZones(hives);
  }, [hives]);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      city: '',
      transportType: 'bike' as TransportType,
      preferredZones: [],
      availability: { weekdaysLunch: true, weekends: false, notes: '' },
      bio: '',
      payoutDetails: '',
      idDocumentName: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await apply({
        ...data,
      });
      toast.success('Application submitted! You can check your status anytime.');
      navigate('/deliver/status');
    } catch (e) {
      toast.error('Failed to submit application (demo)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Apply to deliver with LunchHive</h1>
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField name="fullName" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <Input placeholder="Jane Rider" {...field} />
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="email" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="jane@example.com" {...field} />
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="phone" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <Input placeholder="+123456789" {...field} />
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="city" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>City / Area</FormLabel>
                  <Input placeholder="Central City" {...field} />
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField name="transportType" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Transportation type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <FormMessage />
              </FormItem>
            )} />

            <FormItem>
              <FormLabel>Preferred delivery zones</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {zones.map((z) => (
                  <label key={z.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={form.watch('preferredZones').includes(z.id)}
                      onCheckedChange={(checked) => {
                        const current = new Set(form.getValues('preferredZones'));
                        if (checked) current.add(z.id);
                        else current.delete(z.id);
                        form.setValue('preferredZones', Array.from(current));
                      }}
                    />
                    <span>{z.name}</span>
                  </label>
                ))}
              </div>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Availability</FormLabel>
              <div className="space-y-3 mt-2">
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={form.watch('availability.weekdaysLunch')}
                    onCheckedChange={(c) => form.setValue('availability.weekdaysLunch', !!c)}
                  />
                  <span>Mon–Fri / 11:00–14:00</span>
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={form.watch('availability.weekends')}
                    onCheckedChange={(c) => form.setValue('availability.weekends', !!c)}
                  />
                  <span>Weekends</span>
                </label>
                <FormField name="availability.notes" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom notes</FormLabel>
                    <Textarea placeholder="Any specific notes about your availability" {...field} />
                  </FormItem>
                )} />
              </div>
            </FormItem>

            <FormField name="bio" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Short bio / experience</FormLabel>
                <Textarea placeholder="Tell us about your delivery or biking experience" {...field} />
              </FormItem>
            )} />

            <FormField name="payoutDetails" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Bank/IBAN or payout method (demo)</FormLabel>
                <Input placeholder="DE89 3704 0044 0532 0130 00" {...field} />
              </FormItem>
            )} />

            <FormField name="idDocumentName" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Fake ID document upload (demo)</FormLabel>
                <Input type="file" onChange={(e) => {
                  const file = e.target.files?.[0];
                  form.setValue('idDocumentName', file ? file.name : '');
                }} />
                {form.watch('idDocumentName') && (
                  <p className="text-xs text-muted-foreground mt-1">Selected: {form.watch('idDocumentName')}</p>
                )}
              </FormItem>
            )} />

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={loading}>{loading ? 'Submitting…' : 'Submit application'}</Button>
              <Button type="button" variant="outline" onClick={() => navigate('/deliver')}>Cancel</Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
