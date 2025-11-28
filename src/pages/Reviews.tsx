import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string; // ISO string or display-ready
}

const Stars = ({ value }: { value: number }) => {
  return (
    <div className="flex items-center gap-1" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={n <= value ? 'h-4 w-4 text-yellow-500' : 'h-4 w-4 text-muted-foreground'}
          fill={n <= value ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      user: 'Alice Johnson',
      rating: 5,
      comment: 'Absolutely love the batch lunch concept! Fresh, on time, and great value.',
      date: '2025-10-05',
    },
    {
      id: '2',
      user: 'Bob Smith',
      rating: 4,
      comment: 'Tasty meals and convenient pickup. Would love even more veggie options.',
      date: '2025-10-12',
    },
    {
      id: '3',
      user: 'Charlie Lee',
      rating: 5,
      comment: 'Our office hive is thriving! Subscriptions made lunch worry-free.',
      date: '2025-11-01',
    },
  ]);

  const [name, setName] = useState('');
  const [rating, setRating] = useState<string>('5');
  const [comment, setComment] = useState('');

  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  const onSubmit = () => {
    const parsedRating = parseInt(rating, 10);
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!comment.trim() || comment.trim().length < 3) {
      toast.error('Please enter a longer comment');
      return;
    }
    if (Number.isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      toast.error('Please select a rating between 1 and 5');
      return;
    }

    const newReview: Review = {
      id: String(Date.now()),
      user: name.trim(),
      rating: parsedRating,
      comment: comment.trim(),
      date: new Date().toISOString().slice(0, 10),
    };

    setReviews((prev) => [newReview, ...prev]);
    toast.success('Thanks for your review!');
    setName('');
    setRating('5');
    setComment('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reviews</h1>
          <p className="text-muted-foreground">See what the hive thinks about LunchHive</p>
        </div>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Stars value={Math.round(avgRating)} />
            <div className="text-sm">
              <div className="font-semibold">{avgRating.toFixed(1)} / 5</div>
              <div className="text-muted-foreground">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Leave a review</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">Your name</label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Rating</label>
              <Select value={rating} onValueChange={setRating}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 - Excellent</SelectItem>
                  <SelectItem value="4">4 - Good</SelectItem>
                  <SelectItem value="3">3 - Okay</SelectItem>
                  <SelectItem value="2">2 - Poor</SelectItem>
                  <SelectItem value="1">1 - Bad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="comment" className="text-sm font-medium">Comment</label>
              <Textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience..." className="mt-1" rows={4} />
            </div>
            <Button onClick={onSubmit} className="bg-orange-500 hover:bg-orange-600">Submit review</Button>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {reviews.map((r) => (
            <Card key={r.id} className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{r.user.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="font-semibold">{r.user}</div>
                      <Badge variant="outline" className="text-xs">{r.date}</Badge>
                    </div>
                    <Stars value={r.rating} />
                  </div>
                  <p className="mt-3 text-sm text-foreground">{r.comment}</p>
                </div>
              </div>
            </Card>
          ))}
          {reviews.length === 0 && (
            <Card className="p-6">
              <p className="text-sm text-muted-foreground">No reviews yet. Be the first to leave one!</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
