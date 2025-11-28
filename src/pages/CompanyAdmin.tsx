import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CompanyAdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Company Admin (Demo)</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardHeader><CardTitle>Employees using LunchHive</CardTitle></CardHeader><CardContent>125</CardContent></Card>
        <Card><CardHeader><CardTitle>Total lunches this month</CardTitle></CardHeader><CardContent>620</CardContent></Card>
        <Card><CardHeader><CardTitle>Avg subsidy per lunch</CardTitle></CardHeader><CardContent>€5.20</CardContent></Card>
      </div>
      <Tabs defaultValue="hives">
        <TabsList>
          <TabsTrigger value="hives">Hives</TabsTrigger>
          <TabsTrigger value="settings">Company settings</TabsTrigger>
        </TabsList>
        <TabsContent value="hives" className="space-y-3">
          <Card><CardHeader><CardTitle>ACME Tower – Floor 5</CardTitle></CardHeader><CardContent>80 lunches</CardContent></Card>
          <Card><CardHeader><CardTitle>ACME Tower – Floor 7</CardTitle></CardHeader><CardContent>45 lunches</CardContent></Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-3">
          <Card>
            <CardHeader><CardTitle>Company pays 50% up to €8</CardTitle></CardHeader>
            <CardContent>Visual-only controls (no real logic).</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
