import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./core/onboard/onBoardingScreen";
import HomeScreen from "./core/home/homepage";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();

const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  React.useEffect(() => {
    const checkIfFirstLaunch = async () => {
      try {
        const appData = await AsyncStorage.getItem("isAppFirstLaunched");

        if (appData === null) {
          // App is launched for the first time
          await AsyncStorage.setItem("isAppFirstLaunched", "true");
          setIsAppFirstLaunched(true);
        } else {
          // App is not launched for the first time
          setIsAppFirstLaunched(false);
        }
      } catch (error) {
        // Handle error
        console.error("Error checking if app is first launched:", error);
      }
    };

    checkIfFirstLaunch();
  }, []);

  return (
    isAppFirstLaunched != null && (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAppFirstLaunched && (
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          )}
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

export default App;
