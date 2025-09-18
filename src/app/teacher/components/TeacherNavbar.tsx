"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TeacherNavbar() {
  const pathname = usePathname();

  const tabs = [
    { name: "Dashboard", href: "/teacher" },
    { name: "รายชื่อนักเรียน", href: "/teacher/students" },
  ];

  return (
    <div className="flex justify-center gap-4 bg-green-600 text-white p-3 shadow-md">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-4 py-2 rounded-lg transition ${
            pathname === tab.href
              ? "bg-white text-green-600 font-semibold"
              : "hover:bg-green-500"
          }`}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
}
