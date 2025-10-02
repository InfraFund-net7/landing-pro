"use client";
import React from "react";
import { usePathname } from "next/navigation";
import FooterHome from "./footerhome";
import FooterDefault from "./footerdefault";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return isHome ? <FooterHome /> : <FooterDefault />;
}
