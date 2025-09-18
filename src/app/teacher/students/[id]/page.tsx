"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getStudentById, updateStudent, deleteStudent, Student } from "../../../store/studentStore";
import TeacherNavbar from "../../components/TeacherNavbar";

export default function TeacherStudentDetail() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const student = getStudentById(id);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Omit<Student, "id">>(student || {} as Omit<Student, "id">);

  if (!student) {
    return (
      <>
        <TeacherNavbar />
        <div className="p-6 text-center">
          <p className="text-red-500 font-semibold">ไม่พบข้อมูลนักเรียน</p>
          <button
            onClick={() => router.push("/teacher/students")}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
          >
            กลับไปหน้ารายชื่อนักเรียน
          </button>
        </div>
      </>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateStudent(id, form);
    router.push("/teacher/students");
  };

  const handleDelete = () => {
    if (confirm("คุณต้องการลบนักเรียนนี้จริงหรือไม่?")) {
      deleteStudent(id);
      router.push("/teacher/students");
    }
  };

  return (
    <>
      <TeacherNavbar />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{student.firstName} {student.lastName}</h1>

        {student.photo ? (
          <Image
            loader={({ src }) => src}
            src={student.photo}
            alt={student.firstName}
            width={128}
            height={128}
            className="h-32 w-32 object-cover rounded-full mb-4"
          />
        ) : (
          <div className="h-32 w-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-500">
            ไม่มีรูป
          </div>
        )}

        {!editing ? (
          <>
            <div className="space-y-2">
              <p><span className="font-semibold">ที่อยู่:</span> {student.address}</p>
              <p><span className="font-semibold">เบอร์โทร:</span> {student.phone}</p>
              <p><span className="font-semibold">โรงเรียน:</span> {student.school}</p>
              <p><span className="font-semibold">GPA:</span> {student.gpa}</p>
              <p><span className="font-semibold">ความสามารถพิเศษ:</span> {student.talent}</p>
              <p><span className="font-semibold">เหตุผลในการสมัคร:</span> {student.reason}</p>
              <p><span className="font-semibold">สาขาที่เลือก:</span> {student.major}</p>
              <p><span className="font-semibold">มหาวิทยาลัย:</span> {student.university}</p>
            </div>

            <button onClick={() => setEditing(true)} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg mr-2">
              แก้ไข
            </button>
            <button onClick={handleDelete} className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg">
              ลบ
            </button>
          </>
        ) : (
          <div className="space-y-2">
            <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="ชื่อ" className="w-full border p-2 rounded"/>
            <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="นามสกุล" className="w-full border p-2 rounded"/>
            <input name="address" value={form.address} onChange={handleChange} placeholder="ที่อยู่" className="w-full border p-2 rounded"/>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="เบอร์โทร" className="w-full border p-2 rounded"/>
            <input name="school" value={form.school} onChange={handleChange} placeholder="โรงเรียน" className="w-full border p-2 rounded"/>
            <input name="gpa" value={form.gpa} onChange={handleChange} placeholder="GPA" className="w-full border p-2 rounded"/>
            <textarea name="reason" value={form.reason} onChange={handleChange} placeholder="เหตุผล" className="w-full border p-2 rounded"/>
            <div className="flex gap-2 mt-2">
              <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">
                บันทึก
              </button>
              <button onClick={() => setEditing(false)} className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg">
                ยกเลิก
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
