"use client";

import Link from "next/link";
import { useState } from "react";
import { getStudents, Student } from "../store/studentStore";


type SortKey = "name" | "gpa";
type SortDir = "asc" | "desc";

export default function TeacherPage() {
  const [students, setStudents] = useState<Student[]>(getStudents());
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<{ key: SortKey; dir: SortDir }>({
    key: "name",
    dir: "asc",
  });

  const sortStudents = (key: SortKey) => {
    const dir = sortBy.key === key && sortBy.dir === "asc" ? "desc" : "asc";
    const sorted = [...students].sort((a, b) => {
      if (key === "name") {
        const nameA = a.firstName + a.lastName;
        const nameB = b.firstName + b.lastName;
        if (nameA < nameB) return dir === "asc" ? -1 : 1;
        if (nameA > nameB) return dir === "asc" ? 1 : -1;
        return 0;
      } else if (key === "gpa") {
        const gpaA = parseFloat(a.gpa) || 0;
        const gpaB = parseFloat(b.gpa) || 0;
        return dir === "asc" ? gpaA - gpaB : gpaB - gpaA;
      }
      return 0;
    });
    setStudents(sorted);
    setSortBy({ key, dir });
  };

  const filteredStudents = students.filter((s) => {
    const keyword = search.toLowerCase();
    return (
      s.firstName.toLowerCase().includes(keyword) ||
      s.lastName.toLowerCase().includes(keyword) ||
      s.school.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">หน้าอาจารย์ - รายชื่อนักเรียน</h1>

      <input
        type="text"
        placeholder="ค้นหาชื่อ, นามสกุล, โรงเรียน..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      {filteredStudents.length === 0 ? (
        <p className="text-center p-4">ไม่พบข้อมูลนักเรียน</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => sortStudents("name")}
              >
                ชื่อ-นามสกุล {sortBy.key === "name" ? (sortBy.dir === "asc" ? "↑" : "↓") : ""}
              </th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => sortStudents("gpa")}
              >
                GPA {sortBy.key === "gpa" ? (sortBy.dir === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="border p-2">รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id}>
                <td className="border p-2 text-center">{s.id}</td>
                <td className="border p-2">{s.firstName} {s.lastName}</td>
                <td className="border p-2 text-center">{s.gpa}</td>
                <td className="border p-2 text-center">
                  <Link
                    href={`/students/${s.id}`}
                    className="text-blue-600 underline"
                  >
                    ดูรายละเอียด
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
