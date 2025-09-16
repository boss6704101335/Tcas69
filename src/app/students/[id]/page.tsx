"use client";
import { useParams } from "next/navigation";
import { studentStore } from "../../page";

export default function StudentDetail() {
  const params = useParams();
  const id = Number(params?.id);
  const student = studentStore.find((s) => s.id === id);

  if (!student)
    return (
      <p className="text-center p-6 text-red-600 font-semibold">
        ไม่พบนักเรียน
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        รายละเอียด: {student.firstName} {student.lastName}
      </h1>

      {/* ข้อมูลส่วนตัว */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>ที่อยู่:</strong> {student.address}</p>
          <p><strong>เบอร์โทร:</strong> {student.phone}</p>
          <p><strong>โรงเรียน:</strong> {student.school}</p>
          <p><strong>GPA:</strong> {student.gpa}</p>
        </div>
        <div>
          <p><strong>ความสามารถพิเศษ:</strong> {student.talent}</p>
          <p><strong>เหตุผล:</strong> {student.reason}</p>
          <p><strong>สาขาที่เลือก:</strong> {student.major}</p>
          <p><strong>มหาวิทยาลัย:</strong> {student.university}</p>
        </div>
      </div>

      {/* รูปนักเรียน */}
      {student.photo && (
        <div>
          <strong>รูปนักเรียน:</strong>
          <img
            src={student.photo}
            alt="Student"
            className="w-full max-w-xs mt-2 border rounded mx-auto"
          />
        </div>
      )}

      {/* รางวัล / ผลงาน */}
      {student.awards && student.awards.length > 0 && (
        <div>
          <strong>ผลงาน / รางวัล:</strong>
          <div className="flex flex-wrap gap-4 mt-2">
            {student.awards.map((url, i) => (
              <div key={i} className="border rounded overflow-hidden">
                <img
                  src={url}
                  alt={`Award ${i}`}
                  className="h-24 w-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
