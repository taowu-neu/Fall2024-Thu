import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
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
            headerStyle: { backgroundColor: 'purple' },
            headerTintColor: '#ffffff',
          }}
        />
        
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route, navigation }) => ({
            title: route.params.goalObj.text,
            headerStyle: { backgroundColor: 'purple' },
            headerTintColor: '#ffffff',
            headerRight: () => (
              <Button
                onPress={() => alert('Right button pressed')}
                title="Warning"
                color="#ffffff"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




