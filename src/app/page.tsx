"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Student = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  school: string;
  gpa: string;
  talent: string;
  reason: string;
  major: string;
  university: string;
  photo?: string;
  awards?: string[];
};

let studentStore: Student[] = [];

export default function PortfolioForm() {
  const router = useRouter();
  const [form, setForm] = useState<Student>({
    id: 0,
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    school: "",
    gpa: "",
    talent: "",
    reason: "",
    major: "",
    university: "",
    photo: "",
    awards: [],
  });

  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [previewAwards, setPreviewAwards] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, photo: reader.result as string });
      setPreviewPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAwardsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const urls: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        urls.push(reader.result as string);
        setPreviewAwards([...urls]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.gpa) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    form.id = studentStore.length + 1;
    studentStore.push(form);
    router.push("/students");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">เพิ่ม Portfolio</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="firstName" placeholder="ชื่อ" onChange={handleChange} className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400" />
          <input name="lastName" placeholder="นามสกุล" onChange={handleChange} className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400" />
        </div>
        <input name="address" placeholder="ที่อยู่" onChange={handleChange} className="w-full border p-2 rounded-lg" />
        <input name="phone" placeholder="เบอร์โทร" onChange={handleChange} className="w-full border p-2 rounded-lg" />
        <input name="school" placeholder="โรงเรียน" onChange={handleChange} className="w-full border p-2 rounded-lg" />
        <input name="gpa" placeholder="GPA" onChange={handleChange} className="w-full border p-2 rounded-lg" />
        <input name="talent" placeholder="ความสามารถพิเศษ" onChange={handleChange} className="w-full border p-2 rounded-lg" />
        <textarea name="reason" placeholder="เหตุผลในการสมัคร" onChange={handleChange} className="w-full border p-2 rounded-lg" rows={3} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="major" placeholder="สาขาที่เลือก" onChange={handleChange} className="w-full border p-2 rounded-lg" />
          <input name="university" placeholder="มหาวิทยาลัย" onChange={handleChange} className="w-full border p-2 rounded-lg" />
        </div>

        {/* Upload Photo */}
        <label className="block">
          รูปนักเรียน:
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="mt-1" />
        </label>
        {previewPhoto && <img src={previewPhoto} alt="Preview" className="h-32 mt-2 object-cover border rounded-lg" />}

        {/* Upload Awards/Works */}
        <label className="block">
          รูปผลงาน / รางวัล (หลายไฟล์):
          <input type="file" accept="image/*" multiple onChange={handleAwardsUpload} className="mt-1" />
        </label>
        {previewAwards.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {previewAwards.map((url, i) => (
              <img key={i} src={url} alt={`Award ${i}`} className="h-20 object-cover border rounded-lg" />
            ))}
          </div>
        )}

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
          บันทึก
        </button>
      </form>
    </div>
  );
}

export { studentStore };
