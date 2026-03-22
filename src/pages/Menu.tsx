import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useHive } from '@/contexts/HiveContext';
import { useCart } from '@/contexts/CartContext';
import { MenuItem, getTodayMenu } from '@/lib/api';
import { toast } from 'sonner';

export default function MenuPage() {
  const navigate = useNavigate();
  const { selectedHive } = useHive();
  const { addItem } = useCart();
  const [meals, setMeals] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedHive) {
      setMeals([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    getTodayMenu(selectedHive.id)
      .then(setMeals)
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not load menu'))
      .finally(() => setLoading(false));
  }, [selectedHive]);

  const officeFriendlyCount = useMemo(
    () => meals.filter((meal) => meal.officeFriendly).length,
    [meals]
  );

  const handleAdd = (meal: MenuItem) => {
    addItem(meal);
    toast.success(`${meal.name} added to cart`);
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
            <p className="text-xs text-muted-foreground">{officeFriendlyCount} office-friendly options today</p>
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

      {selectedHive && error && (
        <Alert>
          <AlertTitle>Couldn’t load today’s menu</AlertTitle>
          <AlertDescription className="space-y-3">
            <p>{error}</p>
            <Button variant="outline" onClick={() => navigate(0)}>Retry</Button>
          </AlertDescription>
        </Alert>
      )}

      {selectedHive && loading && (
        <div className="text-sm text-muted-foreground">Loading menu…</div>
      )}

      {selectedHive && !loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <Card key={meal.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">{meal.name}</h2>
                  <p className="text-sm text-muted-foreground">{meal.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {meal.dietaryTags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                    {meal.officeFriendly && (
                      <Badge variant="outline" className="text-xs">Office friendly</Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">€{meal.price.toFixed(2)}</div>
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
      )}

      <p className="text-xs text-muted-foreground">Demo only — orders and payments are not real.</p>
    </div>
  );
}
