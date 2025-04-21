"use client";

import {
  DeepPartial,
  FieldPath,
  FormProvider,
  useForm,
  UseFormReturn,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";
import { useState } from "react";

export type ActionResult<
  TValues extends FieldValues = FieldValues,
  TResult = Record<string, unknown>
> =
  | { success: true; message?: string; resultData?: TResult }
  | { success: false; field?: FieldPath<TValues>; message: string };

type FormProps<TSchema extends ZodSchema<any>> = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  "onSubmit" | "action"
> & {
  validationSchema: TSchema;
  defaultValues?: DeepPartial<z.infer<TSchema>>;
  serverAction?: (
    data: z.infer<TSchema>
  ) => Promise<ActionResult<z.infer<TSchema>>>;
  // This will run if action returns success: true
  onSuccess?: (data: z.infer<TSchema>, res?: any) => void;
  children:
    | React.ReactNode
    | ((methods: UseFormReturn<z.infer<TSchema>>) => React.ReactNode);
};

export const Form = <TSchema extends ZodSchema<any>>({
  validationSchema,
  defaultValues,
  serverAction = undefined,
  onSuccess,
  children,
  className,
  ...rest
}: FormProps<TSchema>) => {
  const methods = useForm<z.infer<TSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });
  const [generalError, setGeneralError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<z.infer<TSchema>> = async (data) => {
    setGeneralError(null); // Reset general error before submission

    // Check if serverAction is provided if not, call onSuccess directly
    if (!serverAction) {
      // console.log("Server action not provided, calling onSuccess directly.");
      onSuccess?.(data);
      return;
    }

    const res = await serverAction(data);

    if (!res.success) {
      if (res.field) {
        methods.setError(res.field, { type: "server", message: res.message });
      } else {
        setGeneralError(res.message); // Set general error if no specific field is provided
      }
      return; // Stop further execution if there's an error
    }

    onSuccess?.(data, res.resultData); // Call onSuccess with data and response if serverAction is successful
    // onSuccess?.(data); // Call onSuccess with data and response if serverAction is successful
  };

  return (
    <FormProvider {...methods}>
      <form
        {...rest}
        noValidate
        className={`flex flex-col gap-2 w-full ${className}`}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {typeof children === "function" ? children(methods) : children}
        {generalError && (
          <p role="alert" className="text-red-500 text-sm">
            {generalError}
          </p>
        )}
      </form>
    </FormProvider>
  );
};
