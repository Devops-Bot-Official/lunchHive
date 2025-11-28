import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MenuItem } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface MealCardProps {
  item: MenuItem;
}

export function MealCard({ item }: MealCardProps) {
  const [qty, setQty] = useState<number>(1);
  const { addItem } = useCart();

  const inc = () => setQty(q => Math.min(9, q + 1));
  const dec = () => setQty(q => Math.max(1, q - 1));

  const handleAdd = () => {
    addItem(item, qty);
    toast.success(`${item.name} added to lunch (${qty})`);
  };

  return (
    <Card className="group overflow-hidden transition hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{item.name}</span>
          {item.officeFriendly && <Badge className="bg-green-500 text-white">Office-friendly</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-36 w-full rounded-md bg-gradient-to-br from-orange-100 to-green-100 flex items-center justify-center text-muted-foreground">
          <span className="text-sm">Image placeholder</span>
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.dietaryTags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="text-lg font-semibold">€{item.price.toFixed(2)}</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={dec} aria-label="Decrease">-</Button>
            <span className="w-6 text-center">{qty}</span>
            <Button variant="outline" size="sm" onClick={inc} aria-label="Increase">+</Button>
            <Button size="sm" className="bg-orange-500 text-white hover:bg-orange-600" onClick={handleAdd}>Add to lunch</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
