import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-5">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <AlertTriangle className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
          <CardDescription className="text-lg">
            Sorry, the page you visited does not exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={handleBackHome} className="w-full">
            <Home className="mr-2 h-4 w-4" />
            Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
