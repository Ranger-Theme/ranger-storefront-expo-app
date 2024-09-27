import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";

const LoginForm = () => {
  return (
    <View>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" />
      <Button mode="contained" onPress={() => console.log("Pressed")}>
        Press me
      </Button>
    </View>
  );
};

export default LoginForm;
