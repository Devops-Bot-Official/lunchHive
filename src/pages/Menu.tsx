import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useHive } from '@/contexts/HiveContext';
import { toast } from 'sonner';

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  calories?: number;
  tags?: string[];
}

export default function MenuPage() {
  const navigate = useNavigate();
  const { selectedHive } = useHive();

  const meals = useMemo<Meal[]>(
    () => [
      {
        id: 'grilled-chicken-bowl',
        name: 'Grilled Chicken Bowl',
        description: 'Herbed chicken over brown rice with seasonal veggies and lemon tahini.',
        price: 11.5,
        calories: 620,
        tags: ['high-protein', 'dairy-free'],
      },
      {
        id: 'vegan-buddha-bowl',
        name: 'Vegan Buddha Bowl',
        description: 'Roasted chickpeas, quinoa, kale, avocado, and maple-miso dressing.',
        price: 10.75,
        calories: 540,
        tags: ['vegan', 'gluten-free'],
      },
      {
        id: 'pasta-primavera',
        name: 'Pasta Primavera',
        description: 'Fresh vegetables, basil pesto, parmesan, and cherry tomatoes.',
        price: 12.0,
        calories: 680,
        tags: ['vegetarian'],
      },
      {
        id: 'beef-bulgogi-box',
        name: 'Beef Bulgogi Box',
        description: 'Marinated beef, jasmine rice, pickled carrots, cucumber, and gochujang.',
        price: 12.5,
        calories: 700,
        tags: ['spicy-option'],
      },
      {
        id: 'salmon-teriyaki',
        name: 'Salmon Teriyaki',
        description: 'Grilled salmon with teriyaki glaze, soba noodles, and greens.',
        price: 13.25,
        calories: 610,
        tags: ['omega-3'],
      },
      {
        id: 'halloumi-wrap',
        name: 'Halloumi Wrap',
        description: 'Grilled halloumi, hummus, cucumber, tomato, and mint yogurt.',
        price: 9.95,
        calories: 530,
        tags: ['vegetarian'],
      },
    ],
    []
  );

  const handleAdd = (meal: Meal) => {
    toast.success(`${meal.name} added to cart (demo)`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Today’s Menu</h1>
          <p className="text-muted-foreground">Curated batch lunches for your hive. Place your order before the cutoff.</p>
        </div>
        {selectedHive && (
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Serving</p>
            <p className="text-sm font-medium">{selectedHive.name}</p>
          </div>
        )}
      </div>

      {!selectedHive && (
        <Alert>
          <AlertTitle>No hive selected</AlertTitle>
          <AlertDescription>
            Choose a hive to view and order today’s menu. Your hive ensures pickup location and batch schedule.
          </AlertDescription>
          <div className="mt-4">
            <Button onClick={() => navigate('/hives')} className="bg-orange-500 hover:bg-orange-600">
              Choose Hive
            </Button>
          </div>
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <Card key={meal.id} className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">{meal.name}</h2>
                <p className="text-sm text-muted-foreground">{meal.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {meal.tags?.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                  {meal.calories && (
                    <Badge variant="outline" className="text-xs">{meal.calories} kcal</Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">${meal.price.toFixed(2)}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Button onClick={() => handleAdd(meal)} aria-label={`Add ${meal.name} to cart`} className="bg-orange-500 hover:bg-orange-600">
                Add to cart
              </Button>
              <Button variant="outline" onClick={() => navigate('/checkout')} aria-label="Go to checkout">
                Checkout
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">Demo only — orders and payments are not real.</p>
    </div>
  );
}
