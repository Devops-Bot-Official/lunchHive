import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useHive } from '@/contexts/HiveContext';
import { Link } from 'react-router-dom';

export function CartSummary() {
  const { items, subtotal } = useCart();
  const { stats } = useHive();

  const deliveryFeeEstimate = useMemo(() => {
    if (!stats) return 2.5;
    const { todaysOrders, thresholds } = stats;
    if (todaysOrders >= thresholds.freeDelivery) return 0;
    if (todaysOrders >= thresholds.smallDiscount) return 1.5;
    return 2.5;
  }, [stats]);

  const total = useMemo(() => subtotal + deliveryFeeEstimate, [subtotal, deliveryFeeEstimate]);

  return (
    <Card className="sticky bottom-4">
      <CardHeader>
        <CardTitle>Today’s Lunch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No items selected yet.</p>
        ) : (
          <div className="space-y-2">
            <ul className="space-y-1 text-sm">
              {items.map(i => (
                <li key={i.id} className="flex justify-between">
                  <span>{i.name} × {i.quantity}</span>
                  <span>€{(i.price * i.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Estimated delivery fee</span>
              <span>€{deliveryFeeEstimate.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <Button asChild className="w-full bg-orange-500 text-white hover:bg-orange-600">
              <Link to="/checkout">Go to checkout</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
