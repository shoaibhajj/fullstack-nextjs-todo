"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {  updateTodoAction } from "@/actions/todoActions";
import { todoFormSchema } from "./validationSchema";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import Spinner from "./Spinner";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Pen } from "lucide-react";
import { ITodo } from "@/interfaces";

function UpdateTodoForm({ todo }: { todo: ITodo }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  type TodoFormValues = z.infer<typeof todoFormSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<TodoFormValues> = {
    title: todo.title,
    body: todo.body as string,
    completed: todo.completed,
  };
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: TodoFormValues) => {
    setLoading(true);
    await updateTodoAction(todo.id, data);
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          <Pen size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit This Todo</DialogTitle>
          <DialogDescription>
            Make changes to your Todo here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className=" py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Go to gym" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a about your next todo"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can write short description about your next todo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          
                        />
                      </FormControl>
                      <FormLabel>Completed </FormLabel>
                    </div>
                    <FormDescription>
                      Your todo item will be Uncompleted by defualt unless you
                      checked it
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button size={"lg"} type="submit" disabled={loading}>
                {loading ? (
                  <>
                    {" "}
                    <Spinner /> Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </form>
          </Form>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateTodoForm;
