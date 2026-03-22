import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Clock3, Sparkles, Truck } from 'lucide-react';

const notifications = [
  {
    id: 'notif_1',
    type: 'delivery',
    title: 'Your hive is close to free delivery',
    body: 'ACME Tower – Floor 5 needs 2 more orders to unlock free delivery for today’s batch.',
    time: '5 min ago',
    unread: true,
    icon: Truck
  },
  {
    id: 'notif_2',
    type: 'order',
    title: 'Lunch prep window opened',
    body: 'Today’s menu is live and orders are open for your selected hive.',
    time: '22 min ago',
    unread: true,
    icon: Clock3
  },
  {
    id: 'notif_3',
    type: 'product',
    title: 'New office-friendly meals added',
    body: 'LunchHive now highlights office-friendly menu items directly in the daily menu.',
    time: 'Yesterday',
    unread: false,
    icon: Sparkles
  }
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">A simple inbox for order, hive, and product updates.</p>
        </div>
        <Button variant="outline">Mark all as read</Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <Card key={notification.id} className={notification.unread ? 'border-orange-500/40' : ''}>
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-4 text-lg">
                  <span className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-orange-500" />
                    {notification.title}
                  </span>
                  {notification.unread && <Badge className="bg-orange-500 text-white hover:bg-orange-500">New</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>{notification.body}</p>
                <div className="flex items-center gap-2 text-xs">
                  <Bell className="h-3.5 w-3.5" />
                  <span>{notification.time}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-sm text-muted-foreground">Demo only — notifications are currently mocked in the frontend.</p>
    </div>
  );
}
