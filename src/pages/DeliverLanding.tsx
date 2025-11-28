import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bike, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DeliverLanding() {
  return (
    <div className="space-y-8">
      <section className="rounded-lg bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-orange-500/10 p-8 border">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">Deliver Lunch with LunchHive</h1>
            <p className="mt-3 text-muted-foreground">Earn money delivering batch lunch orders to offices and neighbourhoods by bike.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/deliver/apply" className="flex items-center gap-2"><Bike className="h-4 w-4" /> Apply to be a rider</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/deliver/status">Check your application status</Link>
              </Button>
            </div>
          </div>
          <Badge className="bg-orange-500 text-white">Demo only</Badge>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Go online during lunch hours', desc: 'Switch your availability to Online during lunch time windows.' },
          { title: 'Pick up one batch', desc: 'Collect pre-packed lunches from a partner kitchen.' },
          { title: 'Deliver to one hive', desc: 'Bring multiple labelled bags to one office building/hive.' },
        ].map((step, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Fewer trips', desc: 'Batch deliveries mean more orders per run.' },
            { title: 'Fixed slots', desc: 'Predictable lunch time windows.' },
            { title: 'Bike-friendly', desc: 'Routes optimized for bikes and short distances.' },
          ].map((b, i) => (
            <Card key={i} className="p-6">
              <h3 className="text-lg font-semibold">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{b.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-sm text-muted-foreground">
        This is a demo – no real delivery assignments or payments.
      </section>
    </div>
  );
}
