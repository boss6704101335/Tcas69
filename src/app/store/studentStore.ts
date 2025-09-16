// store/studentStore.ts
export type Student = {
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

// store ตัวกลาง
const studentStore: Student[] = [];

// เพิ่มนักเรียน
export const addStudent = (student: Omit<Student, "id">) => {
  const newStudent: Student = { ...student, id: studentStore.length + 1 };
  studentStore.push(newStudent);
};

// ดึงนักเรียนทั้งหมด
export const getStudents = () => studentStore;

// ดึงนักเรียนตาม id
export const getStudentById = (id: number) =>
  studentStore.find((s) => s.id === id);
