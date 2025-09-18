"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const tabs = [
    { name: "หน้าแรก", href: "/" },
    { name: "เพิ่ม Portfolio", href: "/portfolio-form" },
    { name: "รายชื่อนักเรียน", href: "/students" },
    { name: "หน้าอาจารย์", href: "/teacher/students" },
  ];

  return (
    <div className="flex justify-center gap-4 bg-blue-600 text-white p-3 shadow-md">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-4 py-2 rounded-lg transition ${
            pathname === tab.href
              ? "bg-white text-blue-600 font-semibold"
              : "hover:bg-blue-500"
          }`}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
}
