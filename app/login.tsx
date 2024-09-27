import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LoginForm from "@/components/LoginForm";

const LoginScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <LoginForm />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
