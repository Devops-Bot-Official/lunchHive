import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, ChartColumn, CircleDollarSign, Download, Factory, Users } from 'lucide-react';
import { toast } from 'sonner';

const hiveRows = [
  {
    name: 'ACME Tower – Floor 5',
    members: 68,
    todaysOrders: 24,
    deliveryWindow: '12:00–12:15',
    subsidy: '50% up to €8',
    status: 'Healthy'
  },
  {
    name: 'ACME Tower – Floor 7',
    members: 41,
    todaysOrders: 15,
    deliveryWindow: '12:10–12:25',
    subsidy: 'No subsidy',
    status: 'Growing'
  },
  {
    name: 'CoWork Hub Downtown',
    members: 23,
    todaysOrders: 9,
    deliveryWindow: '12:20–12:35',
    subsidy: '25% up to €5',
    status: 'Pilot'
  }
];

const rolloutSites = [
  { site: 'Berlin HQ', readiness: 'Live', seats: 280, adoption: '48%' },
  { site: 'Munich Sales Office', readiness: 'Pilot', seats: 85, adoption: '22%' },
  { site: 'Hamburg Ops Hub', readiness: 'Planned', seats: 110, adoption: '—' }
];

export default function CompanyAdminPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <Badge className="bg-orange-500 text-white hover:bg-orange-500">Company Admin</Badge>
          <h1 className="text-3xl font-bold">Workplace lunch operations dashboard</h1>
          <p className="max-w-3xl text-muted-foreground">
            A production-shaped admin surface for subsidy control, hive performance, rollout planning, and team lunch reporting.
            The data is still demo data, but the structure is intended to map cleanly to a future backend.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => toast.info('Demo CSV export prepared.')}> <Download className="mr-2 h-4 w-4" /> Export report</Button>
          <Button className="bg-orange-500 text-white hover:bg-orange-600" onClick={() => toast.success('Demo rollout plan shared with facilities and HR.')}>Share rollout plan</Button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Users className="h-4 w-4 text-orange-500" /> Active employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">132</div>
            <p className="text-sm text-muted-foreground">+18% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><ChartColumn className="h-4 w-4 text-orange-500" /> Lunches this month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">684</div>
            <p className="text-sm text-muted-foreground">Average 31 lunches per workday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><CircleDollarSign className="h-4 w-4 text-orange-500" /> Subsidy spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">€3,216</div>
            <p className="text-sm text-muted-foreground">€4.70 average subsidy per lunch</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Building2 className="h-4 w-4 text-orange-500" /> Live hives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">2 more locations in pipeline</p>
          </CardContent>
        </Card>
      </section>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0 text-foreground">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="hives">Hives</TabsTrigger>
          <TabsTrigger value="subsidies">Subsidies</TabsTrigger>
          <TabsTrigger value="rollout">Rollout</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Program health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <p className="text-xs uppercase tracking-widest">Adoption</p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">47%</p>
                    <p className="mt-1">Eligible employees ordering at least once this month.</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs uppercase tracking-widest">Repeat rate</p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">64%</p>
                    <p className="mt-1">Users returning for 3+ lunches in a 30-day window.</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs uppercase tracking-widest">On-time delivery</p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">96%</p>
                    <p className="mt-1">Batches delivered inside the promised hive window.</p>
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  LunchHive is performing best in the subsidised ACME Tower floor 5 hive. Next operational focus: increase Floor 7 participation and convert coworking pilots into stable recurring demand.
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Admin actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-orange-500 text-white hover:bg-orange-600" onClick={() => toast.success('Demo invite email sent to team leads.')}>Invite team leads</Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast.info('Demo subsidy policy editor opened.')}>Edit subsidy policy</Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast.info('Demo finance summary shared.')}>Send finance summary</Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast.info('Demo facilities checklist downloaded.')}>Download launch checklist</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hives" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {hiveRows.map((hive) => (
              <Card key={hive.name}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-3 text-lg">
                    <span>{hive.name}</span>
                    <Badge variant="secondary">{hive.status}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">Members:</strong> {hive.members}</p>
                  <p><strong className="text-foreground">Today’s orders:</strong> {hive.todaysOrders}</p>
                  <p><strong className="text-foreground">Delivery window:</strong> {hive.deliveryWindow}</p>
                  <p><strong className="text-foreground">Subsidy:</strong> {hive.subsidy}</p>
                  <div className="pt-3">
                    <Button variant="outline" size="sm" onClick={() => toast.info(`Demo hive manager opened for ${hive.name}.`)}>Manage hive</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subsidies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subsidy policy builder</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Default subsidy rate</label>
                <Input value="50" readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subsidy cap (€)</label>
                <Input value="8" readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Eligible weekdays</label>
                <Input value="Mon-Fri" readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Monthly budget guardrail</label>
                <Input value="€5,000" readOnly />
              </div>
              <div className="md:col-span-2 xl:col-span-4 flex flex-wrap gap-3 pt-2">
                <Button className="bg-orange-500 text-white hover:bg-orange-600" onClick={() => toast.success('Demo subsidy policy saved.')}>Save policy</Button>
                <Button variant="outline" onClick={() => toast.info('Demo subsidy simulator launched.')}>Run cost simulation</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rollout" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site rollout tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {rolloutSites.map((site) => (
                <div key={site.site} className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-medium">{site.site}</p>
                    <p className="text-sm text-muted-foreground">{site.seats} eligible seats • Adoption {site.adoption}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{site.readiness}</Badge>
                    <Button variant="outline" size="sm" onClick={() => toast.info(`Demo rollout checklist opened for ${site.site}.`)}>View checklist</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Finance snapshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Projected monthly subsidy:</strong> €4,180</p>
                <p><strong className="text-foreground">Average employee contribution:</strong> €7.90</p>
                <p><strong className="text-foreground">Estimated delivery savings from batching:</strong> 28%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Operations snapshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Most efficient hive:</strong> ACME Tower – Floor 5</p>
                <p><strong className="text-foreground">Highest missed opportunity:</strong> Floor 7 adoption is below target</p>
                <p><strong className="text-foreground">Recommended next action:</strong> run a 2-week subsidy boost campaign</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Backend readiness note</CardTitle>
        </CardHeader>
        <CardContent className="flex items-start gap-3 text-sm text-muted-foreground">
          <Factory className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
          <p>
            This admin page still uses demo data, but it is now shaped like a real operational console. Later it can map to backend resources for companies, sites, hives, subsidy policies, employee eligibility, and reporting exports.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
