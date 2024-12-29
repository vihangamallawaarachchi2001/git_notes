'use client'
import { Github, User } from "lucide-react";
import { useEffect, useState } from "react";
import Profile from "./Profile";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

const Navbar = () => {
    const [displayProfile, setDisplayProfile] = useState(false);
  
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
  
    useEffect(() => {
      if (id) {
        Cookies.set("id", id);
      }
    }, [id]);
  
    const handleDisplayProfile = () => {
      setDisplayProfile(!displayProfile);
    };

  return (
    <nav className="max-w-7xl flex items-center justify-between bg-gn-notes py-3 px-6 mx-auto">
      <div className="flex items-center justify-center gap-3">
        <Github size={20} />
        <p>Git_Notes</p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <p>vihangamallawaarachchi2001</p>
        <div className="p-2 bg-gray-200 rounded-full text-gn-notes">
          <User size={20} onClick={handleDisplayProfile} className="cursor-pointer"/>
        </div>
        {displayProfile ? <Profile /> : ""}
      </div>
    </nav>
  );
};

export default Navbar;
