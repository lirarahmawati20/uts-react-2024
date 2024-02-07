import { Link } from "react-router-dom";
import { NotebookPen } from "lucide-react";
import {  Home } from "lucide-react";
import { CircleUser } from "lucide-react";


export default function Header() {
  return (
    <header className="py-4 px-6 bg-white flex items-center justify-between shadow-lg">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-4 w-1/2">
          <img src="vite.svg" alt="Logo" className="w-10" />
          <h1 className="text-orange-700 text-xl">Uts React 2024</h1>
        </div>
        <nav className="flex w-1/2">
          <ul className="flex w-full justify-evenly">
            <li className="list-none flex items-center gap-2 cursor-pointer">
              <Home  size={25} />
              <Link to="home" className="no-underline text-black text-xl">
                Home
              </Link>
            </li>
            <li className="list-none flex items-center gap-2 cursor-pointer">
              <NotebookPen size={25} />
              <Link to="about" className="no-underline text-black text-xl">
                Tugas
              </Link>
            </li>
            <li className="list-none flex items-center gap-2 cursor-pointer">
              <CircleUser size={25} />
              <Link to="contac" className="no-underline text-black text-xl">
                Account
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
