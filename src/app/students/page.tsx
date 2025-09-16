"use client";
import Link from "next/link";
import { studentStore } from "../page";

export default function StudentList() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">รายชื่อนักเรียน</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3 text-left">ID</th>
              <th className="border p-3 text-left">ชื่อ-นามสกุล</th>
              <th className="border p-3 text-left">GPA</th>
              <th className="border p-3 text-center">รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {studentStore.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  ยังไม่มีข้อมูล
                </td>
              </tr>
            ) : (
              studentStore.map((s, i) => (
                <tr
                  key={s.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
                >
                  <td className="border p-3">{s.id}</td>
                  <td className="border p-3">{s.firstName} {s.lastName}</td>
                  <td className="border p-3">{s.gpa}</td>
                  <td className="border p-3 text-center">
                    <Link
                      href={`/students/${s.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      ดูรายละเอียด
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
