import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Typography } from "../components/ui/typography";
import { Plus, BarChart3, Users } from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2" className="mb-2">
          Dashboard
        </Typography>
        <Typography variant="muted">
          Welcome to your Work Finder dashboard. This is your main control
          center.
        </Typography>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Item
            </Button>
            <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder Content */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <Typography variant="h4" className="mb-4">
              Ready for Development
            </Typography>
            <Typography variant="muted">
              This dashboard is ready for you to implement your specific
              features. Add statistics, charts, recent activities, and other
              relevant content here.
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
