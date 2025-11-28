import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRider } from '@/contexts/RiderContext';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function RiderStatus() {
  const { status, application, setAppStatus, refresh } = useRider();
  const navigate = useNavigate();
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    (async () => {
      await refresh();
    })();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Application Status</h1>

      {status === 'none' && (
        <Card className="p-6">
          <p className="mb-4">You haven’t applied yet.</p>
          <Button asChild>
            <Link to="/deliver/apply">Apply now</Link>
          </Button>
        </Card>
      )}

      {status === 'pending' && application && (
        <Card className="p-6 space-y-3">
          <Badge className="bg-yellow-500 text-white">Pending Review</Badge>
          <p>Your application is under review.</p>
          <div className="text-sm text-muted-foreground">
            <p><span className="font-medium">Name:</span> {application.fullName}</p>
            <p><span className="font-medium">City:</span> {application.city}</p>
            <p><span className="font-medium">Transport:</span> {application.transportType}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/deliver/apply">Edit application</Link>
            </Button>
          </div>
        </Card>
      )}

      {status === 'approved' && (
        <Card className="p-6">
          <Badge className="bg-green-600 text-white mb-3">Approved</Badge>
          <p className="mb-4">You’ve been approved as a LunchHive delivery partner!</p>
          <Button onClick={() => navigate('/driver')}>Go to Driver Dashboard</Button>
        </Card>
      )}

      {status === 'rejected' && (
        <Card className="p-6 space-y-3">
          <Badge className="bg-red-600 text-white">Rejected</Badge>
          <Alert>
            <AlertTitle>Application rejected (demo)</AlertTitle>
            <AlertDescription>
              Unfortunately, your application was not approved. You can update it and re-apply.
            </AlertDescription>
          </Alert>
          <Button variant="outline" asChild>
            <Link to="/deliver/apply">Update application and re-apply</Link>
          </Button>
        </Card>
      )}

      <div className="pt-4">
        <Button variant="ghost" size="sm" onClick={() => setShowDebug(s => !s)}>
          {showDebug ? 'Hide' : 'Show'} demo admin controls
        </Button>
        {showDebug && (
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => setAppStatus('pending')}>Set Pending</Button>
            <Button size="sm" variant="outline" onClick={() => setAppStatus('approved')}>Set Approved</Button>
            <Button size="sm" variant="outline" onClick={() => setAppStatus('rejected')}>Set Rejected</Button>
            <Button size="sm" variant="destructive" onClick={() => setAppStatus('none')}>Clear Application</Button>
          </div>
        )}
      </div>
    </div>
  );
}
