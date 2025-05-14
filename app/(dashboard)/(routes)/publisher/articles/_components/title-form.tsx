"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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

  const currentTitle = useWatch({ control: form.control, name: "title" });
  const hasChanged = initialData !== undefined && currentTitle !== initialData;

  function handleSubmit(values: z.infer<typeof titleSchema>) {
    onSubmit(values);
    handleDiscard();
  }

  const handleDiscard = () => {
    if (initialData) form.resetField("title");
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 ">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {initialData ? (
          <Button
            type="submit"
            disabled={!isValid || isSubmitting || !hasChanged}
            className="ml-auto"
          >
            Update
          </Button>
        ) : (
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
        )}
      </form>
    </Form>
  );
}
