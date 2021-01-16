import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Button, Alert, Text, ActivityIndicator } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import firebase from '../database/firebase'

const UserDetailsScreen = (props) => {
    const initialState = {
        id: "",
        name: "",
        email: "",
        phone: ""
    }
    const [user, setUser] = useState(initialState)

    const [loading, setLoading] = useState(true)

    const getUserId = async (id) => {
        const doRef = firebase.db.collection("users").doc(id)
        const doc = await doRef.get()
        const user = doc.data()
        setUser({
            ...user,
            id: doc.id
        });
        setLoading(false)
    }

    const handleChangeText = (input, value) => {
        setUser({ ...user, [input]: value })
    }
    const updateUser = async () => {
        const dbRef = firebase.db.collection("users").doc(props.route.params.userId)
        await dbRef.set(
            {
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        )
        setUser(initialState)
        props.navigation.navigate("Home")
    }
    const deleteUser = async () => {
        const dbRef = firebase.db.collection("users").doc(props.route.params.userId)
        await dbRef.delete();
        props.navigation.navigate("Home")
    }

    const confirmDelete = () => {
        Alert.alert("Remove User", "Are you sure?", [
            {
                text: "Yes",
                onPress: () => deleteUser()
            },
            {
                text: "No",
                onPress: () => console.log("gola")
            }
        ]
        )
    }
    useEffect(() => {
        getUserId(props.route.params.userId)
    }, [])

    return loading ?
        < View >
            <ActivityIndicator size="large" color="#00ff00" />
        </View >
        :
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="User Name"
                    value={user.name}
                    onChangeText={(value) => handleChangeText("name", value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="User Email"
                    value={user.email}
                    onChangeText={(value) => handleChangeText("email", value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="User Phone"
                    value={user.email}
                    onChangeText={(value) => handleChangeText("phone", value)}
                />
            </View>
            <View style={styles.buttons}>
                <Icon
                    raised
                    name='check'
                    type='font-awesome'
                    color='lime'
                    onPress={() => updateUser()} />

                <Icon
                    raised
                    name='trash'
                    type='font-awesome'
                    color='hsla(0, 100%,50%, 0.8)'
                    onPress={() =>confirmDelete()} />
            </View>


        </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1
    },
    buttons: {
        flexDirection: "row",
        justifyContent: 'space-around'
    }
})
export default UserDetailsScreen;