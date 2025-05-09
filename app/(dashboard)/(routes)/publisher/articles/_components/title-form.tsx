"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { titleSchema } from "@/schema/schema";

interface TitleFormProps {
  initialData?: string;
  onSubmit: (values: z.infer<typeof titleSchema>) => void;
}

export default function TitleForm({ initialData, onSubmit }: TitleFormProps) {
  const form = useForm<z.infer<typeof titleSchema>>({
    resolver: zodResolver(titleSchema),
    defaultValues: {
      title: initialData || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  function handleSubmit(values: z.infer<typeof titleSchema>) {
    onSubmit(values);
    handleDiscard();
  }

  const handleDiscard = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Article title</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormDescription>
                eg: Spring boot makes our life easier
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <Button
            type="button"
            variant={"ghost"}
            onClick={handleDiscard}
            disabled={isSubmitting || !isValid}
          >
            discard
          </Button>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Done
          </Button>
        </div>
      </form>
    </Form>
  );
}
