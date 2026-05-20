import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawer from '../components/CustomDrawer';
import ContactsScreen from './screens/ContactsScreen';
import DetailsScreen from './screens/DetailsScreen';
import MainScreen from './screens/MainScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({ title: route.params.item.title })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="News" component={NewsStack} />
      <Drawer.Screen name="Contacts" component={ContactsScreen} />
    </Drawer.Navigator>
  );
}
