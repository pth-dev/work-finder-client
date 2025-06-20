import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Typography } from "../components/ui/typography";
import { Switch } from "../components/ui/switch";
import { Settings, Bell, Shield } from "lucide-react";

const SettingsPage: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <div className="space-y-6">
      <Typography variant="h2">Settings</Typography>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Typography variant="small">Email Notifications</Typography>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <Typography variant="small">Push Notifications</Typography>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <Typography variant="small">SMS Notifications</Typography>
              <Switch
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Typography variant="small">Two-Factor Authentication</Typography>
              <Switch
                checked={twoFactorAuth}
                onCheckedChange={setTwoFactorAuth}
              />
            </div>
            <div className="flex items-center justify-between">
              <Typography variant="small">Login Alerts</Typography>
              <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
            </div>
            <Button className="mt-4">Change Password</Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Application Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <Typography variant="h4" className="mb-4">
                  Settings Management
                </Typography>
                <Typography variant="muted" className="mb-6">
                  This section is ready for you to implement application
                  settings. Add preferences, themes, language settings, and
                  other configuration options.
                </Typography>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button>Theme Settings</Button>
                  <Button variant="outline">Language</Button>
                  <Button variant="outline">Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
