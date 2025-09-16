"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { getStudentById } from "../../store/studentStore";

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const student = getStudentById(id);

  if (!student) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-semibold">ไม่พบข้อมูลนักเรียน</p>
        <button
          onClick={() => router.push("/students")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          กลับไปหน้ารายชื่อ
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        {student.firstName} {student.lastName}
      </h1>

      {student.photo && (
        <Image
          loader={({ src }) => src}
          src={student.photo}
          alt={student.firstName}
          width={128}
          height={128}
          className="h-32 w-32 object-cover rounded-full mb-4"
        />
      )}

      <div className="space-y-2">
        <p>
          <span className="font-semibold">ที่อยู่:</span> {student.address}
        </p>
        <p>
          <span className="font-semibold">เบอร์โทร:</span> {student.phone}
        </p>
        <p>
          <span className="font-semibold">โรงเรียน:</span> {student.school}
        </p>
        <p>
          <span className="font-semibold">GPA:</span> {student.gpa}
        </p>
        <p>
          <span className="font-semibold">ความสามารถพิเศษ:</span> {student.talent}
        </p>
        <p>
          <span className="font-semibold">เหตุผลในการสมัคร:</span> {student.reason}
        </p>
        <p>
          <span className="font-semibold">สาขาที่เลือก:</span> {student.major}
        </p>
        <p>
          <span className="font-semibold">มหาวิทยาลัย:</span> {student.university}
        </p>
      </div>

      {student.awards && student.awards.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold mb-2">ผลงาน / รางวัล</h2>
          <div className="flex flex-wrap gap-2">
            {student.awards.map((url, i) => (
              <Image
                key={i}
                loader={({ src }) => src}
                src={url}
                alt={`Award ${i}`}
                width={80}
                height={80}
                className="h-20 w-20 object-cover border rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => router.push("/students")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
      >
        กลับไปหน้ารายชื่อ
      </button>
    </div>
  );
}
