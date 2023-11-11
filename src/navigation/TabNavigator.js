import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Sobre from "../pages/Sobre";
import Contato from "../pages/Contato";
import Home from "../pages/Home";
import Guide from "../pages/Guide";
import Events from "../pages/Events";
import GoalPage from "../pages/GoalPage";
import SingleNews from "../pages/SingleNews";
import SingleEvents from "../pages/singleEvents";
import SinglePartners from "../pages/SinglePartners";
import LeafIcon from "../components/Icons/LeafIcon";
import ReceiptIcon from "../components/Icons/ReceiptIcon";
import UserIcon from "../components/Icons/UserIcon";
import GoalIcon from "../components/Icons/Goal";
import { SupabaseProvider } from "../../SupabaseProvider";
import { useNavigation } from "@react-navigation/native";

const TabN = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  return (
    <React.Fragment>
      <ImageBackground
        source={require("../../assets/backgroundbottombar.png")}
        style={styles.backgroundImage}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarLabelPosition: "beside-icon",
            tabBarActiveTintColor: "#2CCEC2",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              backgroundColor: "white",
              borderTopLeftRadius: 100,
              borderTopRightRadius: 100,
              overflow: "hidden",
              position: "absolute",
              paddingLeft: 20,
            },
            headerStyle: {
              height: 80,
            },
            headerTitleAlign: "center",
            tabBarIcon: ({ focused }) => {
              let icon;

              if (route.name === "EletroRec") {
                icon = (
                  <LeafIcon
                    width={25}
                    height={25}
                    color={focused ? "#2CCEC2" : "gray"}
                  />
                );
              } else if (route.name === "Guide") {
                icon = (
                  <ReceiptIcon
                    width={25}
                    height={25}
                    color={focused ? "#2CCEC2" : "gray"}
                  />
                );
              } else if (route.name === "GoalPage") {
                icon = (
                  <GoalIcon
                    width={25}
                    height={25}
                    color={focused ? "#2CCEC2" : "gray"}
                  />
                );
              } else if (route.name === "Events") {
                icon = (
                  <UserIcon
                    width={25}
                    height={25}
                    color={focused ? "#2CCEC2" : "gray"}
                  />
                );
              }

              return icon;
            },
          })}
        >
          <Tab.Screen
            name="EletroRec"
            component={Home}
            options={{
              headerShown: false,
              tabBarLabel: "",
              headerTitleStyle: {
                fontSize: 20,
                color: "#2CCEC2",
              },
            }}
          />
          <Tab.Screen
            name="Guide"
            component={Guide}
            options={{
              tabBarLabel: "",
              headerTitleStyle: {
                fontSize: 20,
                color: "#fff",
              },
              headerTitle: "Centros de Reciclagem",
              headerStyle: {
                backgroundColor: "#2ccec2",
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
              },
            }}
          />
          <Tab.Screen
            name="GoalPage"
            component={() => <GoalPage navigation={navigation} />}
            options={{
              tabBarLabel: "",
              headerTitle: "News",
              headerTitleStyle: {
                fontSize: 20,
                color: "#fff",
              },
              headerStyle: {
                backgroundColor: "#2ccec2",
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
              },
            }}
          />
          <Tab.Screen
            name="Events"
            component={Events}
            options={{
              tabBarLabel: "",
              headerTitle: "Eventos",
              headerTitleStyle: {
                fontSize: 20,
                color: "#fff",
              },
              headerStyle: {
                backgroundColor: "#2ccec2",
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
              },
            }}
          />
        </Tab.Navigator>
      </ImageBackground>
    </React.Fragment>
  );
};

const TabNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <SupabaseProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={TabN}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SingleNews"
          component={SingleNews}
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontSize: 20,
              color: "#fff",
              textAlign: "center",
            },
            headerTitle: "New",
            headerStyle: {
              backgroundColor: "#2ccec2",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            },
          }}
        />

        <Stack.Screen
          name="SinglePartners"
          component={SinglePartners}
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontSize: 20,
              color: "#fff",
              textAlign: "center",
            },
            headerTitle: "Centro de Reciclagem",
            headerStyle: {
              backgroundColor: "#2ccec2",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            },
          }}
        />

        <Stack.Screen
          name="SingleEvents"
          component={SingleEvents}
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontSize: 20,
              color: "#fff",
              textAlign: "center",
            },
            headerTitle: "Evento",
            headerStyle: {
              backgroundColor: "#2ccec2",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            },
          }}
        />
        
        <Stack.Screen
          name="Sobre"
          component={Sobre}
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontSize: 20,
              color: "#fff",
              textAlign: "center",
            },
            headerTitle: "Sobre",
            headerStyle: {
              backgroundColor: "#2ccec2",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            },
          }}
        />

        <Stack.Screen
          name="Contato"
          component={Contato}
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontSize: 20,
              color: "#fff",
              textAlign: "center",
            },
            headerTitle: "Contato",
            headerStyle: {
              backgroundColor: "#2ccec2",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            },
          }}
        />
      </Stack.Navigator>
    </SupabaseProvider>
  );
};

const styles = StyleSheet.create({

  backgroundImage: {
    width: "100%",
    height: 150,
    flex: 1,
    resizeMode: "cover",
  },
});

export default TabNavigator;
