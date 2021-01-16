import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Image, } from 'react-native';
import { useTheme } from '@react-navigation/native';
import firebase from '../database/firebase'
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, Avatar } from 'react-native-elements'


const HomeScreen = (props) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    firebase.db.collection("users").onSnapshot(querySnapshot => {
      const users = [];
      querySnapshot.docs.forEach(doc => {

        const { name, email, phone } = doc.data()
        users.push({
          id: doc.id,
          name,
          email,
          phone
        })
      });
      setUsers(users)
    })
  }, [])

  console.log(users)
  return (
    <ScrollView style={styles.container}>
      {users.map(user => {
        return (
          <ListItem key={user.id} bottomDivider onPress={() => {
            props.navigation.navigate("User Details", {
              userId: user.id,
            })
          }}>
            <Avatar
              rounded
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN1oi_sPGdfubSZP9523qBWGY5uT40TM2vLA&usqp=CAU" }}
            />
            <ListItem.Chevron />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )
      })}
      <View style={styles.button}>
        <Button
          title="Create User"
          onPress={() => props.navigation.navigate("Create User")}
        />
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 15,
    marginHorizontal: 60
  }
}
)

export default HomeScreen;