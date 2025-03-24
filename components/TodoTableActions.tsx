"use client";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Spinner from "./Spinner";
import { deleteTodoAction } from "@/actions/todoActions";
import UpdateTodoForm from "./UpdateTodoForm";
import { ITodo } from "@/interfaces";

const TodoTableActions = ({ todo }: { todo: ITodo }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <UpdateTodoForm todo={todo} />
      <Button
        variant={"destructive"}
        onClick={async () => {
          setLoading(true);
          await deleteTodoAction(todo.id);
          setLoading(false);
        }}
      >
        {loading ? <Spinner /> : <Trash size={16} />}
      </Button>
    </>
  );
};

export default TodoTableActions;
