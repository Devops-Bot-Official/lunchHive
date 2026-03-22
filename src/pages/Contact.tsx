import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <section className="space-y-4 lg:col-span-1">
        <Badge className="bg-orange-500 text-white hover:bg-orange-500">Contact</Badge>
        <h1 className="text-3xl font-bold md:text-4xl">Talk to the LunchHive team</h1>
        <p className="text-muted-foreground">
          Use this page for partnerships, workplace pilots, delivery operations questions, or early access conversations.
        </p>

        <Card>
          <CardContent className="space-y-4 p-6 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-orange-500" />
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p>support@lunchhive.app</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-orange-500" />
              <div>
                <p className="font-medium text-foreground">Phone</p>
                <p>+1 (000) 000-0000</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-orange-500" />
              <div>
                <p className="font-medium text-foreground">Coverage</p>
                <p>Selected office and neighbourhood pilots</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Send a message</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success('Demo message submitted — no real email was sent.');
            }}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Alex Kim" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="alex@company.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="ACME Tower" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input id="topic" placeholder="Workplace pilot, partnerships, support, delivery ops..." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Tell us what you need from LunchHive." className="min-h-[140px]" required />
            </div>
            <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600">Send message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
