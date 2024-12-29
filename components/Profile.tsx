"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Image from "next/image";
import {  Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export type User = {
  id: string;
  githubId: string;
  username: string;
  email: string;
  avatarUrl: string; // Match the API response key
  createdAt: Date;
};

const Profile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const id = Cookies.get("id");

  useEffect(() => {
    if (id) {
      getProfile(id);
    }
  }, [id]);

  const getProfile = async (userId: string) => {
    try {
      const res = await axios.get(`/api/profile/${userId}`);
      if (res.data) {
        console.log("API response:", res.data); 
        setProfile(res.data);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  return (
    <motion.section
        initial={{opacity: 0, y: 20}}
        animate={{opacity:1, y:0}}
        transition={{duration: 0.5}}
    className="absolute top-10 right-10 z-50 p-4 bg-white shadow-xl rounded-md">
      {profile ? (
        <motion.div
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5, delay: 0.2 }} 
        className="flex items-start justify-between gap-6">
          <Image
            src={profile.avatarUrl} // Use camelCase key from the API response
            alt={`${profile.username}'s avatar`}
            className="w-12 h-12 rounded-full mb-2"
            width={48}
            height={48}
          />
          <div>
          <p className="font-semibold text-black mb-6">{profile.username}</p>
          <p className="text-sm text-gray-600">{profile.email}</p>
          <p className="text-sm text-gray-600">
            Member since{" "}
            {new Date(profile.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          </div>
        </motion.div>
      ) : (
        <div className="flex items-center justify-center text-gn-notes">
          <motion.div
            animate={{ rotate: 360 }} 
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }} 
          >
            <Loader2 size={30} />
          </motion.div>
        </div>
      )}
    </motion.section>
  );
};

export default Profile;
