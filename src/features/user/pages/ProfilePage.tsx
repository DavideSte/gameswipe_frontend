import { useUserSelector } from "@/core/store/slice/user/userSelector";
import { NavLink } from "react-router-dom";
import UserInfo from "@/core/components/UserInfo";
import { User } from "@/core/types";
import { Button } from "@/core/components/Button";

export default function ProfilePage() {
  const user = useUserSelector();

  return (
    <div className="flex flex-col gap-4 items-center pt-12 p-8">
      <UserInfo user={user as User} />
      <NavLink to="/logout" className="mt-8 w-full">
        <Button className="bg-red-700 w-full md:w-72">Logout</Button>
      </NavLink>
    </div>
  );
}
