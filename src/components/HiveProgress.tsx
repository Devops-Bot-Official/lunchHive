import { motion } from 'framer-motion';
import { HiveStats } from '@/lib/api';
import { Badge } from '@/components/ui/badge';

interface HiveProgressProps {
  stats: HiveStats;
}

export function HiveProgress({ stats }: HiveProgressProps) {
  const { todaysOrders, thresholds } = stats;
  const target = thresholds.freeDelivery;
  const percentage = Math.min(100, Math.round((todaysOrders / target) * 100));
  const freeUnlocked = todaysOrders >= thresholds.freeDelivery;
  const discountUnlocked = todaysOrders >= thresholds.smallDiscount;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm">{todaysOrders} / {target} orders for free delivery</p>
        <div className="flex gap-2">
          <Badge variant={discountUnlocked ? 'default' : 'secondary'}>{discountUnlocked ? 'Discount unlocked' : `${thresholds.smallDiscount} for discount`}</Badge>
          <Badge variant={freeUnlocked ? 'default' : 'secondary'} className={freeUnlocked ? 'bg-green-500 text-white' : ''}>{freeUnlocked ? 'Free delivery unlocked!' : `${thresholds.freeDelivery} for free delivery`}</Badge>
        </div>
      </div>
      <div className="h-3 w-full rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className="h-3 rounded-full bg-orange-500"
        />
      </div>
    </div>
  );
}
