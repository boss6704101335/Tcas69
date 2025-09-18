"use client";
import TeacherNavbar from "./components/TeacherNavbar";

export default function TeacherDashboard() {
  return (
    <>
      <TeacherNavbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard อาจารย์</h1>
        <p>ยินดีต้อนรับเข้าสู่ระบบอาจารย์</p>
      </div>
    </>
  );
}
