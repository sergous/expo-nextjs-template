import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, StyleSheet, Pressable, Button } from "react-native";
import { AnimatePresence, MotiView } from "moti";
import { useState } from "react";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={navigation.openDrawer} title="Open navigation drawer" />
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={navigation.openDrawer} title="Open navigation drawer" />
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="ActionMenu" component={ActionMenu} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function ActionMenu({ navigation }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.container}>
      <Button onPress={navigation.openDrawer} title="Open navigation drawer" />
      <Button onPress={() => navigation.goBack()} title="Go back home" />
      <Text style={{ color: "white", textAlign: "center" }}>
        Click the button in the bottom right!
      </Text>
      <Pressable
        onPress={() => setExpanded(!expanded)}
        style={[
          styles.button,
          {
            backgroundColor: expanded ? "#2F4EB2" : "#10243E",
            borderColor: "#2F4EB2",
          },
        ]}
      >
        <MotiView
          style={{ position: "absolute" }}
          animate={{ scale: expanded ? 1.5 : 1 }}
          transition={{
            duration: 150,
            type: "timing",
          }}
        >
          <Text>🎁</Text>
        </MotiView>
      </Pressable>
      <AnimatePresence>
        {expanded && (
          <View style={{ position: "absolute", bottom: 0, right: 0 }}>
            {actions.map((action, i) => (
              <ActionButton key={i.toString()} action={action} index={i} />
            ))}
          </View>
        )}
      </AnimatePresence>
    </View>
  );
}

function ActionButton({ action, index }) {
  return (
    <MotiView
      transition={{ delay: index * 100, damping: 15, mass: 1 }}
      from={{
        opacity: 0,
        translateX: 0,
      }}
      animate={{
        opacity: 1,
        translateX: -65 * (index + 1),
      }}
      exit={{
        opacity: 0,
        translateX: 0,
      }}
    >
      <Pressable
        onPress={() => console.log(action.type)}
        style={[
          styles.button,
          {
            backgroundColor: action.color,
            shadowColor: action.color,
            borderColor: action.border,
          },
        ]}
      >
        <Text style={{ fontSize: 18 }}>{action.emoji}</Text>
      </Pressable>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#111",
    padding: 8,
  },
  button: {
    borderRadius: 100,
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    right: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 1,
    borderWidth: 2,
  },
});

const actions = [
  {
    type: "Send",
    color: "#341A34",
    emoji: "👨🏻‍🚒",
    border: "#692D6F",
  },
  {
    type: "Scan",
    color: "#16301D",
    emoji: "📸",
    border: "#2F6E3B",
  },

  {
    type: "Activity",
    color: "#3B1813",
    emoji: "🌊",
    border: "#7F2315",
  },
];
