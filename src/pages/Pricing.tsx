import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Individual',
    price: '€0',
    subtitle: 'Join a hive and pay per lunch',
    features: [
      'Access the daily LunchHive menu',
      'Join work or home delivery hives',
      'Track hive thresholds and delivery windows',
      'Place one-off demo orders'
    ],
    cta: 'Choose your hive',
    href: '/hives'
  },
  {
    name: 'Team',
    price: '€49 / month',
    subtitle: 'For offices coordinating recurring team lunches',
    features: [
      'Shared company lunch management',
      'Company-subsidised order support',
      'Admin visibility into team demand',
      'Priority onboarding for workplace hives'
    ],
    cta: 'Talk to sales',
    href: '/contact'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    subtitle: 'For multi-site companies and building operators',
    features: [
      'Multi-location rollout planning',
      'Building-wide delivery orchestration',
      'Custom operational workflows',
      'Dedicated account support'
    ],
    cta: 'Book a consultation',
    href: '/contact'
  }
];

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4 text-center">
        <Badge className="bg-orange-500 text-white hover:bg-orange-500">Pricing</Badge>
        <h1 className="text-3xl font-bold md:text-5xl">Pricing that scales with shared lunch demand</h1>
        <p className="mx-auto max-w-3xl text-muted-foreground">
          LunchHive pricing is built around demand aggregation. Individual users can start free, while offices and operators can layer on administration,
          subsidies, and rollout support as the product moves toward a full backend platform.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex h-full flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-2xl">
                <span>{plan.name}</span>
              </CardTitle>
              <div>
                <div className="text-3xl font-bold">{plan.price}</div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.subtitle}</p>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between space-y-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="bg-orange-500 text-white hover:bg-orange-600">
                <Link to={plan.href}>{plan.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>What’s included today</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            The current LunchHive app is a polished demo environment: flows are real at the UI level, but data and payments are mocked while backend work is still ahead.
          </p>
          <p>
            That means pricing shown here is product-direction placeholder pricing, useful for product strategy, design reviews, and future sales positioning.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
