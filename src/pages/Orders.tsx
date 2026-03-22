import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getOrders, Order, OrderStatus } from '@/lib/api';

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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = () => {
    setLoading(true);
    setError(null);
    getOrders()
      .then(setOrders)
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not load orders'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Track current and recent LunchHive orders.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={loadOrders}>Refresh</Button>
          <Button asChild>
            <Link to="/menu">Order again</Link>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        {loading ? (
          <div className="p-6 text-muted-foreground">Loading orders…</div>
        ) : error ? (
          <div className="space-y-3 p-6">
            <p className="text-destructive">{error}</p>
            <Button variant="outline" onClick={loadOrders}>Try again</Button>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-6 text-muted-foreground">
            You have no orders yet. Browse today's menu to place your first order.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivery window</TableHead>
                <TableHead className="text-right">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm')}</TableCell>
                  <TableCell className="text-right">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                  <TableCell className="text-right">€{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={statusBadgeClass(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>{order.deliveryWindow}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/orders/${order.id}`}>Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <p className="text-sm text-muted-foreground">This is a demo — no real payments or deliveries.</p>
    </section>
  );
}
