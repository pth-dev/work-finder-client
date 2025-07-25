import { Button } from "@/components/ui/button";

export function UserMenu() {
  // TODO: Integrate with actual auth state
  const isLoggedIn = false;

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" className="text-black hover:text-black/80">
        Đăng nhập
      </Button>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        Đăng ký
      </Button>
    </div>
  );
}

export default UserMenu;
