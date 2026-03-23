import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const articles = [
  {
    title: 'How to join a hive',
    summary: 'Pick a workplace or home hive so LunchHive can route your deliveries into the right batch window.'
  },
  {
    title: 'How subscriptions work',
    summary: 'Recurring lunch plans let users preselect delivery days and meal preference rules for the week.'
  },
  {
    title: 'Understanding delivery windows',
    summary: 'LunchHive batches multiple orders into one timed delivery window instead of dispatching every meal separately.'
  },
  {
    title: 'Company subsidy basics',
    summary: 'Some workplace hives can reduce meal cost through company-funded subsidy rules.'
  }
];

export default function HelpCenterPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <Badge className="bg-orange-500 text-white hover:bg-orange-500">Help Center</Badge>
        <h1 className="text-3xl font-bold md:text-5xl">Help Center</h1>
        <p className="max-w-3xl text-muted-foreground">
          A support and documentation layer for users, workplace admins, and pilot teams. Today it’s lightweight, but it gives the product a more trustworthy operational feel.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <Card key={article.title}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{article.summary}</p>
              <Button variant="outline" size="sm">Read article</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Need direct help?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild className="bg-orange-500 text-white hover:bg-orange-600">
            <Link to="/contact">Contact support</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/faq">Open FAQ</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
