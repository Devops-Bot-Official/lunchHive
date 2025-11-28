import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type OrderStatus = 'Processing' | 'Delivered' | 'Cancelled';

interface Order {
  id: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
}

const demoOrders: Order[] = [
  { id: 'ORD-1001', date: '2025-01-10', items: 3, total: 24.95, status: 'Delivered' },
  { id: 'ORD-1002', date: '2025-01-12', items: 1, total: 8.5, status: 'Processing' },
];

const statusBadgeClass = (status: OrderStatus) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-500 text-white hover:bg-green-500';
    case 'Processing':
      return 'bg-yellow-500 text-white hover:bg-yellow-500';
    case 'Cancelled':
      return 'bg-red-500 text-white hover:bg-red-500';
    default:
      return '';
  }
};

export default function OrdersPage() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Button asChild>
          <Link to="/menu">Order again</Link>
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        {demoOrders.length === 0 ? (
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">{order.items}</TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={statusBadgeClass(order.status)}>{order.status}</Badge>
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
