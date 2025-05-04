"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { login } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().email().max(50),
  password: z.string().min(8, {
    message: "password should contain atleat 8 characters",
  }),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      setError(null);
      localStorage.setItem("token", "this is token");
      await login({
        username: values.username,
        password: values.password,
      });
    } catch (error: any) {
      setError(error.toString());
    } finally {
      form.reset();
      setLoading(false);
    }
  }
  return (
    <div className="grid gap-7 w-[300px] sm:w-[350px]   place-items-center">
      <div className="place-items-center grid gap-7">
        <h1 className="text-3xl">Hello Again!</h1>
        <p className="opacity-30 text-center">
          Welcome back! Sign in to join the conversation, explore new ideas, and
          share your voice with the world.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"custom"} type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <div className="flex gap-3 text-[0.8rem]">
        <p className="opacity-48">Don't have an accout?</p>
        <Link href={"/register"} className="text-blue-600 font-bold">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
