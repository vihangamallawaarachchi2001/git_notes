'use client'
import { Github, User } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <nav className="max-w-7xl flex items-center justify-between bg-gn-notes py-3 px-6 mx-auto">
      <div className="flex items-center justify-center gap-3">
        <Github size={20} />
        <p>Git_Notes</p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <p>vihangamallawaarachchi2001</p>
        <div className="p-2 bg-gray-200 rounded-full text-gn-notes">
          <User size={20} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
