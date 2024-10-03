import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home', 
            headerStyle: { backgroundColor: '#dcd' }, 
            headerTintColor: '#ffffff', 
          }}
        />
        <Stack.Screen
          name="Details"
          component={GoalDetails} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


