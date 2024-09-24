import { Gamepad2, Library, CircleUserRound, Globe, UsersRound } from "lucide-react";
import { IoGameController } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const items = [
  { icon: <Globe />, label: "Explore", to: "/" },
  { icon: <Gamepad2 />, label: "Collection", to: "/collection" },
  { icon: <Library />, label: "Wishlist", to: "/wishlist" },
  { icon: <UsersRound />, label: "Friends", to: "/friends" },
  { icon: <CircleUserRound />, label: "Profile", to: "/profile" },
];

export default function Navbar() {
  return (
    <>
      <nav className="fixed md:hidden bottom-0 w-full bg-color2 border-t border-white/5  h-12 z-30 flex justify-between px-10 items-center">
        {items.map(({ icon, to, label }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            {({ isActive }) => (
              <div
                className={`flex items-center justify-center  ${
                  isActive ? "[&>svg]:stroke-[2.5px]" : "[&>svg]:stroke-[1.2px]"
                }`}
              >
                {icon}
              </div>
            )}
          </NavLink>
        ))}
      </nav>
      <nav className="sticky hidden md:flex top-0 w-full bg-color2  h-16 z-30 items-center gap-12 px-10">
        <div>
          <NavLink to="/">
            <div className="py-8 flex items-center gap-3">
              <IoGameController className="text-2xl" />
              <h5>GameSwipe</h5>
            </div>
          </NavLink>
        </div>
        <div className="flex gap-3 flex-1">
          {items.slice(0, 4).map(({ to, label }) => (
            <NavLink key={label} to={to}>
              {({ isActive }) => (
                <div>
                  <p
                    className={`flex items-center text-sm gap-3  ${
                      isActive ? "font-bold" : "font-light"
                    }`}
                  >
                    {label}
                  </p>
                </div>
              )}
            </NavLink>
          ))}
        </div>
        <div>
          <NavLink to="/profile">
            <div className="flex items-center gap-3">
              <CircleUserRound size={30} strokeWidth={1.5} />
            </div>
          </NavLink>
        </div>
      </nav>
    </>
  );
}
