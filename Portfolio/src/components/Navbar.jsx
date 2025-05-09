import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faProjectDiagram,
  faBook,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ pages }) {
  let icons = {
    "About Me": faUser,
    Projects: faProjectDiagram,
    Devlogs: faBook,
    Resume: faFileLines,
  };

  return (
    <div className="bg-bg/50 pt-6">
      <nav className="flex justify-between items-center px-8 py-4 bg-fg/80 shadow-md mx-8 backdrop-blur-[2px] rounded-2xl border-2 border-indigo-900">
        <Link to="/" className="flex items-center gap-4">
          <img
            src="https://avatars.githubusercontent.com/u/197450097?s=400&u=8b3ee4b0479139e21d2cfd4435698a5935fe9af5&v=4"
            alt="Logo"
            className="w-14 h-14 rounded-full"
          />
          <h1 className="text-2xl font-bold">Zxsm</h1>
        </Link>
        <ul className="flex gap-6 text-sm font-medium">
          {pages.map((page, index) => (
            <li
              key={index}
              className="hover:text-purple-500 transition-colors flex gap-2 items-center text-[18px]"
            >
              <FontAwesomeIcon icon={icons[page]} />
              <Link to={`/${page.toLowerCase()}`}>{page}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
