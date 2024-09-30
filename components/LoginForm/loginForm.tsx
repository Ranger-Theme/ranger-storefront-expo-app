import React from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";

const MyForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (data) router.push("/");
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Name Field */}
      <Controller
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Name"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
          />
        )}
        name="name"
        defaultValue=""
      />
      {errors.name && <Text>{errors.name.message}</Text>}

      {/* Email Field */}
      <Controller
        control={control}
        rules={{
          required: "Email is required",
          pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid" },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.email}
          />
        )}
        name="email"
        defaultValue=""
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      {/* Submit Button */}
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </View>
  );
};

export default MyForm;
