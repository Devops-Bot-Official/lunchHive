import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/contexts/UserContext';
import { useHive } from '@/contexts/HiveContext';
import { MapPin, Settings, UserRound } from 'lucide-react';

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
          <CardDescription>Your personal details and hive membership</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{user?.name ?? 'Guest User'}</h2>
                <Badge variant="secondary">{user ? 'Member' : 'Guest'}</Badge>
              </div>
              {user?.email && (
                <p className="text-sm text-muted-foreground">{user.email}</p>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-muted">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  Current Hive
                </CardTitle>
                <CardDescription>Your selected delivery location</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedHive ? (
                  <div className="space-y-1">
                    <p className="font-medium">{selectedHive.name}</p>
                    {selectedHive.address && (
                      <p className="text-sm text-muted-foreground">{selectedHive.address}</p>
                    )}
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
                  Settings
                </CardTitle>
                <CardDescription>Manage preferences and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Update your preferences including dietary restrictions and notification settings.</p>
                <div className="mt-4">
                  <Button asChild>
                    <Link to="/settings">Go to Settings</Link>
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
