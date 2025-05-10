import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faProjectDiagram,
  faBook,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ pages }) {
  let icons = {
    "About Me": faUser,
    "Projects": faProjectDiagram,
    "Devlogs": faBook,
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-fg/80 shadow-md mx-8 backdrop-blur-[2px] rounded-2xl border-2 border-indigo-900">
      <button
        className="flex items-center gap-4 hover:text-purple-500 hover:cursor-pointer transition-colors duration-500"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }}
      >
        <img
          src="../images/ProfileJPG.jpg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://avatars.githubusercontent.com/u/197450097?v=4";
          }}
          alt="Logo"
          className="w-14 h-14 rounded-full"
        />
        <h1 className="text-2xl font-bold">Zxsm</h1>
      </button>
      <ul className="flex gap-6 text-sm font-medium">
        {pages.map((page, index) => (
          <li
            key={index}
            className="hover:text-purple-500 transition-colors duration-500 flex gap-2 items-center text-[18px]"
          >
            <Link to={`/${page.toLowerCase()}`} className="flex gap-2 items-center">
              <FontAwesomeIcon icon={icons[page]} />
              {page}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <button className="hover:text-purple-500 transition-colors duration-500 flex gap-2 items-center text-[18px] hover:cursor-pointer">
          <FontAwesomeIcon icon={faDownload} />
          <h1>Download CV</h1>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
