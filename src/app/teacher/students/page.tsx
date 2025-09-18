"use client";
import TeacherNavbar from "../components/TeacherNavbar";
import Link from "next/link";
import { useState } from "react";
import { getStudents, Student } from "../../store/studentStore";


export default function TeacherStudentsPage() {
  const [students, setStudents] = useState<Student[]>(getStudents());
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter(s =>
    s.firstName.toLowerCase().includes(search.toLowerCase()) ||
    s.lastName.toLowerCase().includes(search.toLowerCase()) ||
    s.school.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <TeacherNavbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">รายชื่อนักเรียน</h1>

        <input
          type="text"
          placeholder="ค้นหาชื่อ, นามสกุล, โรงเรียน..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        {filteredStudents.length === 0 ? (
          <p className="text-center p-4">ไม่พบข้อมูลนักเรียน</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">ชื่อ-นามสกุล</th>
                <th className="border p-2">GPA</th>
                <th className="border p-2">รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(s => (
                <tr key={s.id}>
                  <td className="border p-2 text-center">{s.id}</td>
                  <td className="border p-2">{s.firstName} {s.lastName}</td>
                  <td className="border p-2 text-center">{s.gpa}</td>
                  <td className="border p-2 text-center">
                    <Link
                      href={`/teacher/students/${s.id}`}
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
    </>
  );
}
