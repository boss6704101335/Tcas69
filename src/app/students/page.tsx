"use client";
import Image from "next/image";
import Link from "next/link";
import { getStudents } from "../store/studentStore";

export default function StudentsPage() {
  const students = getStudents();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">รายชื่อนักเรียน</h1>
      {students.length === 0 ? (
        <p className="text-center text-gray-500">ยังไม่มีนักเรียนในระบบ</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {students.map((student) => (
            <Link key={student.id} href={`/students/${student.id}`}>
              <div className="border p-4 rounded-lg hover:shadow-lg transition cursor-pointer flex items-center gap-4">
                {student.photo ? (
                  <Image
                    loader={({ src }) => src}
                    src={student.photo}
                    alt={student.firstName}
                    width={64}
                    height={64}
                    className="h-16 w-16 object-cover rounded-full"
                  />
                ) : (
                  <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                    ?
                  </div>
                )}
                <div>
                  <p className="font-semibold">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-gray-500 text-sm">{student.school}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
