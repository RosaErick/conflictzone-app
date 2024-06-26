import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import headerNavLinks from "@/data/headerNavLinks";
import { ModeToggle } from "./ModeToggle";

const Nav = () => {
  return (
    <header className="flex items-center justify-between max-w-4xl self-center w-full py-1">
      <div>
        <Link href="/">
          <div className="flex items-center justify-between">
            <p className="mr-3 font-bold">PatrolAnalytics</p>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== "/")
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-semibold text-gray-900 dark:text-gray-100 sm:block"
            >
              {link.title}
            </Link>
          ))}

        {/* <ThemeSwitch /> */}
        <ModeToggle />
        <MobileNav />
      </div>
    </header>
  );
};

export default Nav;
