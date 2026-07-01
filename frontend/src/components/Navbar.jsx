import { useLocation } from "react-router-dom";
import PillNav from "../components/PillNav";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { label: "Feed", href: "/" },
    { label: "Search", href: "/search" },
    { label: "Teams", href: "/team" },
    { label: "Profile", href: "/profile" },
  ];

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]"
      >
        <div className="absolute -top-40 left-1/4 h-[28rem] w-[28rem] rounded-full bg-violet-700/15 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[24rem] w-[24rem] rounded-full bg-fuchsia-700/10 blur-[120px]" />
      </div>

      <nav className=" top-0 z-50 py-6">
        <div className="flex justify-center">
          <PillNav
              items={navLinks}
              activeHref={location.pathname}
              baseColor="#000000"
              pillColor="#000000"
              pillTextColor="#ffffff"
              hoveredPillTextColor="#ffffff"
              initialLoadAnimation={false}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;