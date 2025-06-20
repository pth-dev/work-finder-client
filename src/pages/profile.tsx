import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Typography } from "../components/ui/typography";
import { User, Edit } from "lucide-react";

const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Typography variant="h2">Profile</Typography>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="text-center pt-6">
              <Avatar className="w-30 h-30 mx-auto mb-4">
                <AvatarImage src="" />
                <AvatarFallback>
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              <Typography variant="h4" className="mb-2">
                John Doe
              </Typography>
              <Typography variant="muted" className="mb-4">
                john.doe@example.com
              </Typography>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <Typography variant="h4" className="mb-4">
                  Profile Management
                </Typography>
                <Typography variant="muted" className="mb-6">
                  This section is ready for you to implement profile management
                  features. Add forms for editing user information, uploading
                  avatars, and managing account settings.
                </Typography>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button>Edit Information</Button>
                  <Button variant="outline">Change Password</Button>
                  <Button variant="outline">Upload Avatar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
