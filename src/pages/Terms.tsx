import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <Badge className="bg-orange-500 text-white hover:bg-orange-500">Terms of Service</Badge>
        <h1 className="text-3xl font-bold md:text-5xl">Terms of Service</h1>
        <p className="max-w-3xl text-muted-foreground">
          These terms outline how LunchHive is expected to operate as a product once real ordering, payments, and account services move beyond the current demo environment.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader><CardTitle>Service scope</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>LunchHive provides batch-oriented lunch ordering and delivery coordination for workplace and neighbourhood hives.</p>
            <p>The current application is still a demo environment, so orders, billing, and logistics shown here are not real production transactions.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>User responsibilities</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Users should provide accurate delivery information, respect order cutoffs, and use the service in good faith.</p>
            <p>Company and admin users should manage subsidy and rollout settings responsibly.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Payments and subsidies</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Once production payments are enabled, charges, refunds, and subsidy rules should be governed by clear payment and company policy terms.</p>
            <p>Any current references to cards, company billing, or subsidies in this demo are illustrative only.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Availability and changes</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>LunchHive may update routes, interfaces, product features, and operational policies as the service evolves.</p>
            <p>These terms should later be revised to reflect production uptime commitments, service levels, and legal jurisdiction.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
