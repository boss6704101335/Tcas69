"use client";
import { useState } from "react";

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
let studentStore: Student[] = [];

// ฟังก์ชันสำหรับจัดการ store
export const addStudent = (student: Student) => {
  student.id = studentStore.length + 1;
  studentStore.push(student);
};

export const getStudents = () => studentStore;

export const getStudentById = (id: number) =>
  studentStore.find((s) => s.id === id);
