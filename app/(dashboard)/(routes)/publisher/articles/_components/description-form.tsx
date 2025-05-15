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
import { Textarea } from "@/components/ui/textarea";
import { descriptionSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

interface DescriptionFormProps {
  initialData?: string;
  onSubmit: (values: z.infer<typeof descriptionSchema>) => void;
}

export default function DescriptionForm({
  initialData,
  onSubmit,
}: DescriptionFormProps) {
  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: initialData || "",
    },
  });

  function handleSubmit(values: z.infer<typeof descriptionSchema>) {
    onSubmit(values);
    handleDiscard();
  }

  const { isSubmitting, isValid } = form.formState;
  const currentDescription = useWatch({
    control: form.control,
    name: "description",
  });
  const hasChanged =
    initialData !== undefined && currentDescription !== initialData;

  const handleDiscard = () => {
    if (initialData) {
      form.resetField("description");
    }
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder=""
                  {...field}
                  disabled={isSubmitting}
                  className="min-h-40"
                />
              </FormControl>
              {!initialData && (
                <FormDescription>
                  give a short description about your article
                </FormDescription>
              )}
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
