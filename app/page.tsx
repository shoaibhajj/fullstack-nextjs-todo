import { getTodoListAction } from "@/actions/todoActions";
import AddTodoForm from "@/components/AddTodoForm";
import { TodoTable } from "@/components/TodosTable";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  
  const { userId } = await auth();
  const todos = await getTodoListAction(userId);
 
  

  return (
    <main className="container mx-auto max-w-4xl">
      <div className="flex justify-end">
        <AddTodoForm userId={userId} />
      </div>
      <TodoTable todos={todos}  />
    </main>
  );
}
