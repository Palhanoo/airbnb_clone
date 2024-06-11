import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import useWarmupBrowser from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import api, { registerUser } from "@/constants/Api";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

const Login = () => {
  useWarmupBrowser();
  const passwordRef = React.useRef(null);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [isEmail, setIsEmail] = React.useState(false);
  const router = useRouter();

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();
      console.log("login success:", createdSessionId);

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.push("/profile");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const Register = async () => {
    try {
      const res = await registerUser({ name, email, password });
      console.log(res);
      if (res.id !== undefined) {
        router.push("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Login = async () => {
    try {
      const res = await api.post("auth/signin", {
        email: email,
        password: password,
      });
      console.log(res.data);
      if (res.data.id !== undefined) {
        router.push("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Animated.View
      style={
        !isEmail
          ? styles.container
          : {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }
      }
    >
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[
          defaultStyles.inputField,
          isEmail ? { marginBottom: 30, width: "80%" } : { marginBottom: 30 },
        ]}
        value={email}
        onChangeText={setEmail}
      />
      {!isEmail ? (
        <>
          <TouchableOpacity
            onPress={() => setIsEmail(() => true)}
            style={defaultStyles.btn}
          >
            <Text style={defaultStyles.btnText}>Continue</Text>
          </TouchableOpacity>

          <View style={styles.separatorView}>
            <View
              style={{
                flex: 1,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text style={styles.separator}>Or</Text>
            <View
              style={{
                flex: 1,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
        </>
      ) : (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          style={{ alignItems: "center", width: "100%" }}
        >
          <TextInput
            autoCapitalize="none"
            placeholder="Password"
            style={[
              defaultStyles.inputField,
              { marginBottom: 30, width: "80%" },
            ]}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="Your Name"
            style={[
              defaultStyles.inputField,
              { marginBottom: 30, width: "80%" },
            ]}
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity
            onPress={Register}
            style={[{ marginBottom: 30, width: "80%" }, defaultStyles.btn]}
          >
            <Text style={defaultStyles.btnText}>SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={Login}
            style={[defaultStyles.btn, { width: "80%" }]}
          >
            <Text style={defaultStyles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsEmail(() => false)}
            style={[defaultStyles.btn, { marginTop: 20, width: "80%" }]}
          >
            <Text style={defaultStyles.btnText}>Already Have an account?</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {!isEmail && (
        <View style={{ gap: 20 }}>
          <TouchableOpacity style={styles.btnOutline}>
            <Ionicons
              name="call-outline"
              style={defaultStyles.btnIcon}
              size={24}
              color="black"
            />
            <Text style={styles.btnOutlineText}>Continue with Phone</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => onSelectAuth(Strategy.Apple)}
          >
            <Ionicons
              name="logo-apple"
              style={defaultStyles.btnIcon}
              size={24}
              color="black"
            />
            <Text style={styles.btnOutlineText}>Continue with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => onSelectAuth(Strategy.Google)}
          >
            <Ionicons
              name="logo-google"
              style={defaultStyles.btnIcon}
              size={24}
              color="black"
            />
            <Text style={styles.btnOutlineText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => onSelectAuth(Strategy.Facebook)}
          >
            <Ionicons
              name="logo-facebook"
              style={defaultStyles.btnIcon}
              size={24}
              color="black"
            />
            <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  separatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  separator: {
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});

export default Login;
