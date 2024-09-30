import { FormProvider, useForm } from "react-hook-form";
import type {
  FormEventHandler,
  FormHTMLAttributes,
  PropsWithChildren,
} from "react";
import type {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import type { FieldValues } from "react-hook-form/dist/types/fields";

export type FormElementProps<T extends FieldValues = FieldValues> =
  PropsWithChildren<
    UseFormProps<T> & {
      onSuccess?: SubmitHandler<T>;
      onError?: SubmitErrorHandler<T>;
      FormProps?: FormHTMLAttributes<HTMLFormElement>;
      handleSubmit?: FormEventHandler<HTMLFormElement>;
      formContext?: UseFormReturn<T>;
    }
  >;

const FormProviderWithoutContext = <
  TFieldValues extends FieldValues = FieldValues
>({
  onSuccess,
  onError,
  FormProps,
  children,
  ...useFormProps
}: PropsWithChildren<FormElementProps<TFieldValues>>) => {
  const methods = useForm<TFieldValues>({
    ...useFormProps,
  });
  const { handleSubmit } = methods;
  const defaultFunc = () =>
    console.info("submit handler `onSuccess` is missing");
  const handleSuccess = onSuccess || defaultFunc;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleSuccess, onError)}
        noValidate
        {...FormProps}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default function FormElement<
  TFieldValues extends FieldValues = FieldValues
>({
  handleSubmit,
  children,
  FormProps,
  formContext,
  onSuccess,
  onError,
  ...useFormProps
}: PropsWithChildren<FormElementProps<TFieldValues>>) {
  if (!formContext) {
    return (
      <FormProviderWithoutContext
        {...{ onSuccess, onError, FormProps, children, ...useFormProps }}
      />
    );
  }

  if (typeof onSuccess === "function" && typeof handleSubmit === "function") {
    console.warn(
      "Property `onSuccess` will be ignored because handleSubmit is provided"
    );
  }

  const defaultFunc = () =>
    console.info("submit handler `onSuccess` is missing");
  const handleSuccess = onSuccess
    ? formContext.handleSubmit(onSuccess, onError)
    : defaultFunc;

  return (
    <FormProvider {...formContext}>
      <form noValidate {...FormProps} onSubmit={handleSubmit || handleSuccess}>
        {children}
      </form>
    </FormProvider>
  );
}
