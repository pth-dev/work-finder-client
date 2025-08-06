import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import WorkFinderIcon from "@/assets/icon.svg";

const Logo = () => {
  return (
    <Link className="flex items-center" to={paths.home.getHref()}>
      <img src={WorkFinderIcon} alt="WorkFinder" className="h-12 w-auto" />
    </Link>
  );
};

export function SidebarHeader() {
  return (
    <div className="h-16 flex items-center px-6 border-b border-gray-200">
      <Logo />
    </div>
  );
}
