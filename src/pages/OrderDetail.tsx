import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getOrderById, Order, OrderStatus } from '@/lib/api';

const statusBadgeClass = (status: OrderStatus) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-500 text-white hover:bg-green-500';
    case 'Out for delivery':
      return 'bg-blue-500 text-white hover:bg-blue-500';
    case 'Being prepared':
      return 'bg-yellow-500 text-white hover:bg-yellow-500';
    case 'Pending batch':
      return 'bg-orange-500 text-white hover:bg-orange-500';
    case 'Failed':
      return 'bg-red-500 text-white hover:bg-red-500';
    default:
      return '';
  }
};

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError('Missing order id');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    getOrderById(orderId)
      .then((result) => {
        if (!result) {
          setError('Order not found');
          return;
        }
        setOrder(result);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not load order'))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return <div className="text-muted-foreground">Loading order…</div>;
  }

  if (error || !order) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertTitle>Couldn’t load this order</AlertTitle>
          <AlertDescription>{error ?? 'Order not found'}</AlertDescription>
        </Alert>
        <Button asChild variant="outline">
          <Link to="/orders">Back to orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Order {order.id}</h1>
          <p className="text-muted-foreground">Placed {format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm')}</p>
        </div>
        <Badge className={statusBadgeClass(order.status)}>{order.status}</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.items.map((item) => (
              <div key={item.itemId} className="flex items-start justify-between gap-4 border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  {item.dietaryTags?.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.dietaryTags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="text-right text-sm font-medium">€{(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>€{order.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span>-€{order.discount.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery fee</span><span>€{order.deliveryFee.toFixed(2)}</span></div>
            <div className="flex justify-between border-t pt-3 font-semibold"><span>Total</span><span>€{order.total.toFixed(2)}</span></div>
            <div className="rounded-md bg-muted p-3 text-muted-foreground">
              <p><strong className="text-foreground">Delivery window:</strong> {order.deliveryWindow}</p>
              {order.note ? <p className="mt-2"><strong className="text-foreground">Note:</strong> {order.note}</p> : null}
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button asChild><Link to="/menu">Order again</Link></Button>
              <Button asChild variant="outline"><Link to="/orders">Back to orders</Link></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
