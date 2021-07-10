import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Image, Button,
  StyleSheet,
  Text, Linking,
  useColorScheme,
  View, FlatList,
  ImageBackground
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { Appbar } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

// const Tab = createBottomTabNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      let response = await fetch('http://192.168.0.103:3001/news');
      let json = await response.json();
      setData(json.values);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{
        backgroundColor: '#222',
        flexDirection: 'row',
        marginBottom: 5,
        padding: 7,
        height: 150,
        borderColor: 'gray',
        borderBottomWidth: 1,
        // borderRadius: 15
      }}>
        <Image
          style={{
            width: 120,
            height: 120,
            borderRadius: 15,
            alignSelf: 'center'
          }}
          source={{ uri: item.urlToImage }} />
        <View style={{
          marginLeft: 10,
          flexShrink: 1
        }}>
          <Text
            numberOfLines={3}
            style={
              {
                color: isDarkMode ? Colors.light : Colors.dark,
                fontSize: 17,
                fontWeight: 'bold'
              }
            }>{item.title}</Text>
          <Text
            numberOfLines={1}
            style={
              {
                fontSize: 11,
                color: '#8FD6E1',
                marginTop: 5,
                marginBottom: 5
              }
            }>{item.source}</Text>
          <Button
            title="baca"
            onPress={() => { Linking.openURL(item.url) }}
            color="dark" />
        </View>
      </View>
    )
  }

  return (
    <View
      style={{
        backgroundStyle
      }}>
      <View style={{
        height: 120
      }}>
        <ImageBackground
          source={require('./bg-api.jpg')}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: 'center'
          }}>
          <Text style={{
            color: Colors.light,
            textShadowRadius: 10,
            textShadowColor: 'lightblue',
            textTransform: 'uppercase',
            fontSize: 40,
            alignSelf: 'center'
          }}>berapi</Text>
        </ImageBackground>
      </View>
      <View>
        <ScrollView
          horizontal={true}
          style={{
            marginTop: 10,
          }}>
          <Button title="Highlight" color="none" />
          <Button title="Trending" color="none" />
          <Button title="esports" color="none" />
          <Button title="health" color="none" />
          <Button title="technology" color="none" />
          <Button title="sports" color="none" />
          <Button title="entertainment" color="none" />
          <Button title="ekonomi" color="none" />
          <Button title="photography" color="none" />
          <Button title="politik" color="none" />
          <Button title="more" color="none" />
        </ScrollView>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {/* <Appbar style={[styles.bottom]}>
        <Appbar.Action
          icon="archive"
          onPress={() => console.log('Pressed archive')}
        />
        <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
        <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
        <Appbar.Action
          icon="delete"
          onPress={() => console.log('Pressed delete')} />
      </Appbar> */}
      {/* <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer> */}
    </View >
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;