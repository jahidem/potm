import { Student, User } from "@prisma/client";
import prisma from "./db";

export async function addUser(data: User) {
  const user = await prisma.user.create({
    data: {
      ...data,
      ide: undefined,
    },
  });
  // console.log(user);
}

export async function addStudent(data: Student) {
  const student = await prisma.student.create({data:data});
  // console.log(student);
}


export async function findAllStudent() {
  const studentList = await prisma.student.findMany();
  console.log(studentList);
  return studentList;
}

export async function deleteStudent(data:Student) {
  const deleteStudent = await prisma.student.delete({
    where: {id: data.id},
  })
}