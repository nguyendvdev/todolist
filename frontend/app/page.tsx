"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

enum TASK_STATUS {
  TODO = "TODO",
  DONE = "DONE",
}

type Task = {
  id: number;
  title: string;
  status: TASK_STATUS;
  created_at: Date;
  updated_at: Date;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");

  async function fetchData() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/tasks");

    if (!res.ok) return;

    setTasks((await res.json()) as Task[]);
  }

  async function createTask() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/task", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ title: title }),
    });

    if (!res.ok) return;

    fetchData();
  }

  async function updateTask(task: Task) {
    const newStatus =
      task.status === TASK_STATUS.DONE ? TASK_STATUS.TODO : TASK_STATUS.DONE;

    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/task/" + task.id,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (!res.ok) return;

    fetchData();
  }

  async function deleteTask(task: Task) {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/task/" + task.id,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) return;

    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <div className="h-40 w-full bg-red-300">
        <div className="pt-10">
          <div className="text-center">
            <p className="text-2xl text-white font-bold">My To Do List</p>
          </div>

          <div className="w-4/5 flex h-8 mx-auto mt-2 sm:w-2/5">
            <input
              type="text"
              className="w-4/5 p-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="bg-[#d9d9d9] w-1/5"
              disabled={title.length === 0}
              onClick={() => createTask()}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="sm:w-2/5 mx-auto">
        {tasks?.map((task, index) => (
          <div
            key={task.id}
            className={clsx(
              "w-full",
              index % 2 === 0 && "bg-[#eee]",
              task.status === TASK_STATUS.DONE && "!bg-slate-400 "
            )}
          >
            <div
              className="h-10 flex justify-between items-center"
              onClick={() => updateTask(task)}
            >
              <div className="flex">
                <div className="w-10 text-center">
                  {task.status === TASK_STATUS.DONE && "\u2713"}
                </div>

                <span
                  className={clsx(
                    "pr-6",
                    task.status === TASK_STATUS.DONE && "!line-through"
                  )}
                >
                  {task.title}
                </span>
              </div>

              <button
                className="w-10 h-10 text-center hover:bg-red-400"
                onClick={() => deleteTask(task)}
              >
                {"\u00D7"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
