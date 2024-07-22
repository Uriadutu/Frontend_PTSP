import { NavLink } from "react-router-dom";

function MobileNav({ toggleMobileNav }) {
  return (
    <div className="fixed top-0 right-0 w-full h-full bg-gray-900 bg-opacity-90 z-50 flex justify-end">
      <div className="flex flex-col items-end p-6">
        <button
          className="text-white focus:outline-none"
          onClick={toggleMobileNav}
        >
          <svg
            className="w-8 h-8 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.293 4.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <NavLink
          to="/"
          exact
          className="text-white py-2 hover:text-blue-500"
          onClick={toggleMobileNav}
        >
          BERANDA
        </NavLink>
        <NavLink
          to="/bantuan"
          className="text-white py-2 hover:text-blue-500"
          onClick={toggleMobileNav}
        >
          BANTUAN
        </NavLink>
        <NavLink
          to="/tentangkami"
          className="text-white py-2 hover:text-blue-500"
          onClick={toggleMobileNav}
        >
          TENTANG KAMI
        </NavLink>
        <NavLink
          to="/login"
          className="text-white py-2 hover:text-blue-500"
          onClick={toggleMobileNav}
        >
          LOGIN
        </NavLink>
      </div>
    </div>
  );
}

export default MobileNav;
