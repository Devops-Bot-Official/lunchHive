import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <Badge className="bg-orange-500 text-white hover:bg-orange-500">Privacy Policy</Badge>
        <h1 className="text-3xl font-bold md:text-5xl">Privacy Policy</h1>
        <p className="max-w-3xl text-muted-foreground">
          This page explains how LunchHive would handle personal data as the product evolves from a frontend demo into a backend-backed service.
          Right now the app primarily stores mock state in the browser, but this policy page gives the product a production-shaped trust surface.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader><CardTitle>What we collect</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>LunchHive may process account details, delivery preferences, hive membership, order history, meal preferences, and support messages.</p>
            <p>In the current demo app, much of this is simulated and stored locally in browser storage for prototyping purposes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>How data is used</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Data would be used to run lunch ordering, coordinate batch delivery windows, manage subscriptions, notify users, and support company-level reporting.</p>
            <p>Operational data may also be used to improve reliability, delivery efficiency, and workplace rollout planning.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Storage and retention</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Once LunchHive has a real backend, retention rules should be defined around account records, order history, and company operational reporting.</p>
            <p>Until then, demo data can usually be cleared locally via the app’s demo reset controls.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>User rights</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Future production users should be able to request access, correction, or deletion of their account-related data where applicable by law.</p>
            <p>This page should later be updated with jurisdiction-specific compliance language once the real service architecture is in place.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
