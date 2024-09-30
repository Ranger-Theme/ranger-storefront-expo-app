import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import { useController, UseControllerProps } from "react-hook-form";
import type { ReactNode, Ref, RefAttributes } from "react";
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import { useFormError } from "../../providers/FormErrorProvider";
import useTransform, { UseTransformOptions } from "../../plugins/useTransform";

export type TextFieldElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<TextInputProps, "name"> & {
  validation?: UseControllerProps<TFieldValues, TName>["rules"];
  name: TName;
  required?: boolean;
  helperText?: string;
  parseError?: (error: FieldError) => ReactNode;
  control?: Control<TFieldValues>;
  component?: typeof TextInput;
  transform?: UseTransformOptions<TFieldValues, TName>["transform"];
};

type TextFieldElementComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: TextFieldElementProps<TFieldValues, TName>
) => JSX.Element;

const TextFieldElement = forwardRef(function TextFieldElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: TextFieldElementProps<TFieldValues, TName>, ref: any): JSX.Element {
  const {
    validation = {},
    parseError,
    required,
    name,
    control,
    component: TextFieldComponent = TextInput,
    transform,
    ...rest
  } = props;

  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;

  const rules = {
    ...validation,
    ...(required &&
      !validation.required && { required: "This field is required" }),
  };

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    disabled: rest.disabled,
    rules,
  });
  const { value, onChange } = useTransform({
    value: field.value,
    onChange: field.onChange,
    transform,
  });

  const defaultText =
    typeof customErrorFn === "function"
      ? customErrorFn(error as any)
      : error?.message ?? "";
  const renderHelperText = error ? defaultText : rest.helperText;

  return (
    <TextFieldComponent
      {...rest}
      // name={field.name}
      value={value ?? ""}
      onChange={(ev: any) => {
        onChange(ev.target.value);
        if (typeof rest.onChange === "function") {
          rest.onChange(ev);
        }
      }}
      onBlur={field.onBlur}
      error={!!error}
      ref={ref}
    />
  );
});

TextFieldElement.displayName = "TextFieldElement";

export default TextFieldElement as TextFieldElementComponent;
