import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AddTaskForm from "@/app/components/AddTaskForm";
import TaskList from "@/app/components/TaskList";
import { prisma } from "@/lib/prisma";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    filter?: string;
  }>;
}) {
  const session = await auth();

  // Middleware handles the redirect, but this is a safety net
  if (!session?.user?.id) {
    redirect("/login");
  }

  const params = await searchParams;
  const search = params.search || "";
  const filter = params.filter || "all";

  // Only fetch tasks belonging to the logged-in user
  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,
      ...(search && {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }),
      ...(filter === "completed" && { completed: true }),
      ...(filter === "pending" && { completed: false }),
    },
    orderBy: { createdAt: "desc" },
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Tasks
      </h1>

      <form>
        <input
          name="search"
          defaultValue={search}
          placeholder="Search tasks..."
          className="border p-2 w-full mb-4 rounded bg-transparent"
        />
      </form>

      <div className="flex gap-4 mb-4">
        <a href="/" className="filter-link">All</a>
        <a href="/?filter=pending" className="filter-link">Pending</a>
        <a href="/?filter=completed" className="filter-link">Completed</a>
      </div>

      <div className="flex gap-6 mb-6 text-sm text-gray-500">
        <p>Total: {tasks.length}</p>
        <p>Completed: {completedCount}</p>
        <p>Pending: {pendingCount}</p>
      </div>

      <AddTaskForm />
      <TaskList tasks={tasks} />
    </main>
  );
}