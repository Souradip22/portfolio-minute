import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
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
import { errorToast, successToast } from "@/lib/customToasts";
import { title } from "process";

const FormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(10, {
      message: "Username must not be more than 10 characters.",
    })
    .regex(/^[a-z]+$/, {
      message: "Username must contain only lowercase letters (a-z).",
    }),
});

export function UsernameForm({
  setOpen,
  setUsername,
}: {
  setOpen?: any;
  setUsername?: any;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  const { watch } = form;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inpUsername = watch("username");

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setMessage("");
    setLoading(true);
    const inpUsername = values?.username;
    const response = await fetch("/api/checkUsername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: inpUsername }),
    });

    const availabilityResponse = await response.json();
    if (!availabilityResponse.available) {
      setMessage(availabilityResponse.message);
      setLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 1000);
      return;
    }

    try {
      const insertResponse = await fetch("/api/setUsername", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: inpUsername }),
      });

      if (!insertResponse.ok) {
        throw new Error("Failed to insert username into the database");
      }

      const result = await insertResponse.json();

      if (result.error) {
        //ToDo: Need to find a better approach
        // This means user session has expired.
        if (
          result.error.includes(
            "\nInvalid `prisma.user.update()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to update not found."
          )
        ) {
          errorToast({
            title: "Your session has expired.",
            description:
              "Please sign in again. You will be automatically signed out in next 2 sec.",
          });

          setTimeout(() => {
            signOut();
          }, 3000);
        }
      }
      setLoading(false);
      setUsername(inpUsername);
      setOpen(false);
    } catch (error) {
      setLoading(false);
      console.error("Error inserting username:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-neutral-900"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} autoComplete="off" />
              </FormControl>
              <FormDescription className="text-neutral-900">
                Tips:
                <ul className="ml-3 list-disc text-xs ">
                  <li>Use only lowercase letters (a-z).</li>
                  <li>Username must be 3 to 10 characters long.</li>
                  <li>
                    Your profile will be visible at{" "}
                    <code className="border-b border-amber-300">
                      {inpUsername ? inpUsername : "<username>"}
                      .portfoliominute.in
                    </code>
                    , so keep it short.
                  </li>
                  <li className="text-red-400">You cannot change this later</li>
                </ul>
              </FormDescription>
              <FormMessage className="text-red-400">{message}</FormMessage>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <button
            className="flex gap-2 px-3 py-2 bg-gray-800 text-xs text-white rounded-md"
            type="submit"
          >
            {loading && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Submit
          </button>
        </div>
      </form>
    </Form>
  );
}
