"use client";

import { useForm } from "react-hook-form";

interface AddTodoProps {
  todos: string[];
}

const AddTodo = ({ todos }: AddTodoProps) => {
  const { register, handleSubmit } = useForm();

  return (
    <form>
      <label>Todo</label>
      <input {...register("")} />
    </form>
  );
};

export default AddTodo;
