import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails'; // 导入新的 GoalDetails 组件

// 创建一个名为 Stack 的变量
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'My Custom Home Title', 
            headerStyle: { backgroundColor: '#6200ea' }, 
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


