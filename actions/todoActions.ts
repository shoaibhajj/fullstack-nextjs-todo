"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getTodoListAction = async (userId: string | null) => {
  // throw new Error("something went wrong");
  return await prisma.todo.findMany({
    where: {
      user_id: userId as string,
    },
    orderBy: { createdAt: "desc" },
  });

  //** Error Handling */
};
export const getTodoByIdAction = async (id: string) => {
  return await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });

  //** Error Handling */
};
export const createTodoAction = async (
  data: {
    title: string;
    body?: string | undefined;
    completed?: boolean;
  },
  userId: string | null
) => {
  const todo = await prisma.todo.create({
    data: {
      title: data.title,
      body: data.body,
      completed: data.completed,
      user_id: userId as string,
    },
  });
  revalidatePath("/");
  return todo;
};
export const updateTodoAction = async (
  id: string,
  data: {
    title: string;
    body?: string | undefined;
    completed?: boolean;
  }
) => {
  const todo = await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      title: data.title,
      body: data.body,
      completed: data.completed,
    },
  });
  revalidatePath("/");
  return todo;
};

export const deleteTodoAction = async (id: string) => {
  await prisma.todo.delete({
    where: { id: id },
  });
  revalidatePath("/");
};
