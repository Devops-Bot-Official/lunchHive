import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqs = [
  {
    question: 'What is a hive?',
    answer:
      'A hive is a shared delivery group tied to an office floor, building, coworking space, or neighbourhood zone. Orders are batched per hive to create predictable delivery windows.'
  },
  {
    question: 'Do you process real payments yet?',
    answer:
      'Not yet. The current app is demo-first and uses mock data, demo payment choices, and local browser persistence while the backend is still being planned.'
  },
  {
    question: 'Why batch deliveries instead of dispatching each order separately?',
    answer:
      'Batching lowers delivery overhead, gives users more predictable arrival windows, and makes office or building-scale lunch programs much easier to operate.'
  },
  {
    question: 'Can companies subsidise meals?',
    answer:
      'Yes — the product model supports company-subsidised hives, and some demo hives already simulate subsidy rates and caps in the checkout flow.'
  },
  {
    question: 'Will there be a backend later?',
    answer:
      'Yes. The current frontend is being shaped so we can later add a real backend for authentication, menus, order orchestration, payments, notifications, and analytics.'
  }
];

export default function FAQPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4 text-center">
        <Badge className="bg-orange-500 text-white hover:bg-orange-500">FAQ</Badge>
        <h1 className="text-3xl font-bold md:text-5xl">Answers to the obvious LunchHive questions</h1>
        <p className="mx-auto max-w-3xl text-muted-foreground">
          This page is intentionally product-facing: it explains how LunchHive works today, what is still mocked, and what the roadmap is aiming toward.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Frequently asked questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
