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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Role, useAuth } from "@/context/authContext";
import { login } from "@/services/auth.service";

const formSchema = z.object({
  username: z.string().email().max(50),
  password: z.string().min(8, {
    message: "password should contain atleat 8 characters",
  }),
});

export default function Login() {
  const { setAuth, email, id, isAuthenticated } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoginError(null);
      const response = await login({
        email: values.username,
        password: values.password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", JSON.stringify(response.data.roles));
      localStorage.setItem("id", response.data.id);
      setAuth({
        email: response.data.email,
        id: response.data.id,
        isAuthenticated: true,
        role: response.data.roles,
      });
      router.replace("/");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Login failed. Try again.";
      setLoginError(message);
    } finally {
      form.reset();
    }
  }

  return (
    <div className="grid gap-7 w-[300px] sm:w-[350px]   place-items-center">
      {loginError && (
        <Alert variant="destructive" className="bg-red-500/10">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}
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
          <Button variant={"custom"} type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="animate-spin" />}
            submit
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
