import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/contexts/UserContext';
import { useHive } from '@/contexts/HiveContext';
import { ChartColumn, Heart, MapPin, Settings, UserRound } from 'lucide-react';

function getInitials(name?: string) {
  if (!name) return 'U';
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function ProfilePage() {
  const { user } = useUser();
  const { selectedHive } = useHive();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserRound className="h-5 w-5 text-orange-600" />
            My Profile
          </CardTitle>
          <CardDescription>Your account snapshot, LunchHive activity, and current delivery setup</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Avatar className="h-16 w-16">
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold">{user?.name ?? 'Guest User'}</h2>
                <Badge variant="secondary">{user ? 'Member' : 'Guest'}</Badge>
                {selectedHive?.type === 'work' && <Badge className="bg-orange-500 text-white hover:bg-orange-500">Work hive</Badge>}
                {selectedHive?.type === 'home' && <Badge className="bg-green-600 text-white hover:bg-green-600">Home hive</Badge>}
              </div>
              {user?.email && <p className="text-sm text-muted-foreground">{user.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><ChartColumn className="h-4 w-4 text-orange-600" /> Lunch stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Total lunches:</strong> {user?.stats.totalLunches ?? 0}</p>
                <p><strong className="text-foreground">Healthy picks:</strong> {user?.stats.healthyPercent ?? 0}%</p>
                <p><strong className="text-foreground">Preferred location:</strong> {user?.stats.preferredLocation ?? '—'}</p>
              </CardContent>
            </Card>

            <Card className="border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><Heart className="h-4 w-4 text-orange-600" /> Taste profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Favourite meal:</strong> {user?.stats.favouriteMeal ?? '—'}</p>
                <p><strong className="text-foreground">Saved favourites:</strong> {user?.favourites.length ?? 0}</p>
                <p><strong className="text-foreground">Saved hives:</strong> {user?.savedHives.length ?? 0}</p>
              </CardContent>
            </Card>

            <Card className="border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><MapPin className="h-4 w-4 text-orange-600" /> Current hive</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {selectedHive ? (
                  <>
                    <p className="font-medium text-foreground">{selectedHive.name}</p>
                    <p>{selectedHive.address}</p>
                    <p>Delivery window: {selectedHive.deliveryWindow}</p>
                  </>
                ) : (
                  <p>No hive selected yet.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="border-muted">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  Delivery setup
                </CardTitle>
                <CardDescription>Your current delivery location and hive routing</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedHive ? (
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">{selectedHive.name}</p>
                    <p>{selectedHive.address}</p>
                    <p>Window: {selectedHive.deliveryWindow}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No hive selected. Choose your hive to get batch lunches at your location.</p>
                )}
                <div className="mt-4">
                  <Button asChild variant="outline">
                    <Link to="/hives">Change Hive</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-muted">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings className="h-4 w-4 text-orange-600" />
                  Account settings
                </CardTitle>
                <CardDescription>Manage profile, notifications, preferences, and demo state</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Use Settings to prepare the account side of the app for future backend-backed user management.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild>
                    <Link to="/settings">Open Settings</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/notifications">View notifications</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {!user && (
        <Card>
          <CardHeader>
            <CardTitle>Signed out (demo)</CardTitle>
            <CardDescription>This is a demo app. Sign-in is mocked. Use Settings to configure preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link to="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
