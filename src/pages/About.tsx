import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Clock3, Leaf, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-green-500/10 p-8 md:p-12">
        <div className="max-w-3xl space-y-4">
          <Badge className="bg-orange-500 text-white hover:bg-orange-500">About LunchHive</Badge>
          <h1 className="text-3xl font-bold md:text-5xl">We make shared lunch delivery actually work.</h1>
          <p className="text-base text-muted-foreground md:text-lg">
            LunchHive is built around grouped delivery windows for offices, apartment buildings, and neighbourhood pickup points.
            Instead of one courier per order, we batch demand into hives so lunch arrives faster, cheaper, and with less delivery chaos.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Users className="h-5 w-5 text-orange-500" /> Shared demand</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Colleagues and neighbours order together through the same hive so delivery becomes operationally efficient.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Clock3 className="h-5 w-5 text-orange-500" /> Predictable windows</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Users get a clear delivery window instead of vague “arriving soon” updates that drift all lunch hour.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Building2 className="h-5 w-5 text-orange-500" /> Workplace ready</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Office floors, coworking spaces, and building lobbies can run as their own LunchHive with team-friendly dropoffs.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Leaf className="h-5 w-5 text-green-600" /> Lower waste</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Grouped trips reduce delivery overhead and make more sustainable lunch logistics possible.
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>How LunchHive works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p><strong className="text-foreground">1.</strong> Join a hive tied to your office, building, or home area.</p>
            <p><strong className="text-foreground">2.</strong> Order from a curated daily menu before the cutoff.</p>
            <p><strong className="text-foreground">3.</strong> Lunches are grouped into a scheduled delivery batch.</p>
            <p><strong className="text-foreground">4.</strong> The hive unlocks lower fees and better delivery economics as demand grows.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Current product state</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              This app currently runs as a frontend-first demo with mock data, prototype flows, and production-minded UI structure.
            </p>
            <p>
              The next step is a real backend for accounts, menus, live order management, payment handling, and company operations.
            </p>
            <p>
              We’re building the interface so it can evolve cleanly into that backend-backed version later.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
