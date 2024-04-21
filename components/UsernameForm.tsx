import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { isUsernameTaken } from "@/lib/fetchers";

const FormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
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
  const [message, setMessage] = useState("");

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setMessage("");
    const inpUsername = values?.username;
    const response = await fetch("/api/checkUsername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: inpUsername }),
    });

    if (!response.ok) {
      throw new Error("Failed to check username availability");
    }

    const availabilityResponse = await response.json();
    if (!availabilityResponse.available) {
      setMessage(availabilityResponse.message);
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
      setUsername(inpUsername);
      setOpen(false);
    } catch (error) {
      console.error("Error inserting username:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage>{message}</FormMessage>
            </FormItem>
          )}
        />
        <button className="px-3 py-2 bg-indigo-500 text-white" type="submit">
          Submit
        </button>
      </form>
    </Form>
  );
}
