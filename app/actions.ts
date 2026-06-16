"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  return session.user.id;
}

export async function createTask(formData: FormData) {
  const userId = await requireUserId();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string;
  const dueDate = formData.get("dueDate") as string;

  await prisma.task.create({
    data: {
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      userId,
    },
  });

  revalidatePath("/");
}

export async function toggleTask(id: string, completed: boolean) {
  const userId = await requireUserId();

  await prisma.task.updateMany({
    where: { id, userId },
    data: { completed: !completed },
  });

  revalidatePath("/");
}

export async function updateTask(
  id: string,
  title: string,
  description: string
) {
  const userId = await requireUserId();

  await prisma.task.updateMany({
    where: { id, userId },
    data: { title, description },
  });

  revalidatePath("/");
}

export async function deleteTask(id: string) {
  const userId = await requireUserId();

  await prisma.task.deleteMany({
    where: { id, userId },
  });

  revalidatePath("/");
}
