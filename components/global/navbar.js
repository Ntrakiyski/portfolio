import Link from "next/link";
import { FaHamburger } from "react-icons/fa";

export const Navbar = () => {
  return (
    <div className="p-2 absolute rounded-md hamburger ">
      <ul className="flex gap-9 ">
        {/* <li className="hover:text-blue-100" >
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/services">
            <a>Services</a>
          </Link>
        </li> */}
        <li>
          <FaHamburger className="text-lightorange text-3xl" />
        </li>
      </ul>
    </div>
  );
};
