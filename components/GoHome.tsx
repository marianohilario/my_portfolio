"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const GoHome = () => {
  const [show, setShow] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="#home"
      className={`fixed bottom-20 right-[5%] glass-card w-10 aspect-square rounded-full flex items-center justify-center cursor-pointer z-50 transition-transform! duration-300 ease-in-out hover:scale-110 ${show ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}`}
    >
      <i
        className="ri-arrow-up-wide-line text-3xl"
        style={{ color: "var(--text-primary)" }}
      />
    </a>
  );
};

export default GoHome;
