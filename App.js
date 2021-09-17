import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./src/screens/HomeScreen";
import EpisodeDetailScreen from "./src/screens/EpisodeDetailScreen";
import CharacterDetailScreen from "./src/screens/CharacterDetailScreen";

const Stack = createNativeStackNavigator();

class App extends React.Component{
  constructor(props) {
    super(props);

  }

  render() {
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="EpisodeDetailScreen" component={EpisodeDetailScreen} options={{title: ""}}/>
          <Stack.Screen name="CharacterDetailScreen" component={CharacterDetailScreen} options={{title: ""}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

}

export default App
