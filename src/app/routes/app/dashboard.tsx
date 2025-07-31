import { Navigate } from "react-router-dom";
import { paths } from "@/config/paths";

export default function DashboardRoute() {
  // Redirect to applications page as default dashboard
  return <Navigate to={paths.app.applications.getHref()} replace />;
}
