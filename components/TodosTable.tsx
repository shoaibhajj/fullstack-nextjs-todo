"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITodo } from "@/interfaces";
import { Badge } from "./ui/badge";
import TodoTableActions from "./TodoTableActions";

interface IProps {
  todos: ITodo[];
}

export function TodoTable({ todos }: IProps) {
  return (
    <Table>
      <TableCaption>Todos Tabel.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos &&
          todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell className="font-medium">{todo.id}</TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell>
                {todo.completed ? (
                  <Badge>Completed</Badge>
                ) : (
                  <Badge variant={"secondary"}>Uncompleted</Badge>
                )}
              </TableCell>
              <TableCell className="text-right flex justify-end space-x-2">
                <TodoTableActions todo={todo} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            {todos.length ? todos.length : "YOU DON'T HAVE ANY TODO YET !"}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
