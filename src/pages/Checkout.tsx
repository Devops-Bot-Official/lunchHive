import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { useHive } from '@/contexts/HiveContext';
import { createOrder } from '@/lib/api';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { items, subtotal, updateQty, removeItem, clearCart } = useCart();
  const { selectedHive, stats, reloadStats } = useHive();
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'company' | 'card_4242' | 'demo_card'>(stats?.companySubsidised ? 'company' : 'card_4242');
  const [demoCard, setDemoCard] = useState({ number: '', name: '', exp: '' });
  const [placing, setPlacing] = useState(false);
  const [confirmation, setConfirmation] = useState<{ id: string; total: number } | null>(null);

  const deliveryFeeEstimate = useMemo(() => {
    if (!stats) return 2.5;
    const { todaysOrders, thresholds } = stats;
    if (todaysOrders >= thresholds.freeDelivery) return 0;
    if (todaysOrders >= thresholds.smallDiscount) return 1.5;
    return 2.5;
  }, [stats]);

  const totalEstimate = useMemo(() => subtotal + deliveryFeeEstimate, [subtotal, deliveryFeeEstimate]);

  const placeOrder = async () => {
    if (!selectedHive) {
      toast.error('Please select a hive first');
      navigate('/hives');
      return;
    }
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setPlacing(true);
    try {
      const order = await createOrder({
        items: items.map(i => ({ itemId: i.id, quantity: i.quantity })),
        hiveId: selectedHive.id,
        note,
        paymentMethod
      });
      toast.success('Order placed!');
      clearCart();
      reloadStats();
      setConfirmation({ id: order.id, total: order.total });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Order failed');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-xl">
        <img src="https://images.pexels.com/photos/7214828/pexels-photo-7214828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="laptop with lunch container on desk water bottle minimal clean modern daylight office - Photo by Hanna Pad" className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="relative p-6">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <p className="text-sm text-muted-foreground">{selectedHive ? `${selectedHive.name} • ${selectedHive.deliveryWindow}` : 'No hive selected'}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your cart</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">No items in cart.</p>
            ) : (
              <ul className="space-y-3">
                {items.map(i => (
                  <li key={i.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{i.name}</p>
                      <p className="text-sm text-muted-foreground">€{i.price.toFixed(2)} × {i.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => updateQty(i.id, Math.max(1, i.quantity - 1))}>-</Button>
                      <span className="w-6 text-center">{i.quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => updateQty(i.id, i.quantity + 1)}>+</Button>
                      <Button variant="destructive" size="sm" onClick={() => removeItem(i.id)}>Remove</Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="space-y-2 pt-4">
              <div className="flex justify-between"><span>Subtotal</span><span>€{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Estimated delivery fee</span><span>€{deliveryFeeEstimate.toFixed(2)}</span></div>
              <div className="flex justify-between font-semibold"><span>Estimated total</span><span>€{totalEstimate.toFixed(2)}</span></div>
            </div>
            <div className="space-y-2 pt-4">
              <Label htmlFor="note">Delivery note</Label>
              <Input id="note" placeholder="Leave at reception" value={note} onChange={e => setNote(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment (demo)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <RadioGroup value={paymentMethod} onValueChange={val => setPaymentMethod(val as any)}>
              {stats?.companySubsidised && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="company" />
                  <Label htmlFor="company">Company account</Label>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card_4242" id="card_4242" />
                <Label htmlFor="card_4242">Card ending •••• 4242</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="demo_card" id="demo_card" />
                <Label htmlFor="demo_card">Add demo card</Label>
              </div>
            </RadioGroup>

            {paymentMethod === 'demo_card' && (
              <div className="space-y-2">
                <Input placeholder="Card number" value={demoCard.number} onChange={e => setDemoCard({ ...demoCard, number: e.target.value })} />
                <Input placeholder="Name on card" value={demoCard.name} onChange={e => setDemoCard({ ...demoCard, name: e.target.value })} />
                <Input placeholder="MM/YY" value={demoCard.exp} onChange={e => setDemoCard({ ...demoCard, exp: e.target.value })} />
              </div>
            )}

            <Button className="w-full bg-orange-500 text-white hover:bg-orange-600" disabled={placing || items.length === 0} onClick={placeOrder}>
              {placing ? 'Placing…' : 'Place order'}
            </Button>

            {confirmation && (
              <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 mt-3">
                Order confirmed! ID {confirmation.id}. Total €{confirmation.total.toFixed(2)}. View in <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/orders')}>Orders</Button>.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}