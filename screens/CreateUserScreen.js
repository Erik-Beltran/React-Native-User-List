import React, { useState } from 'react'
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import firebase from '../database/firebase'

const CreateUserScreen = (props) => {
    const [state, setState] = useState({
        name: "",
        email: "",
        phone: ""
    })

    const handleChangeText = (input, value) => {
        setState({ ...state, [input]: value })
    }

    const addNewUser = async () => {
        if (state.name === "" || state.email == "") {
            alert("faltan Datos")
        } else {
            try {
                await firebase.db.collection("users").add({
                    name: state.name,
                    email: state.email,
                    phone: state.phone
                })
            } catch (error) {
                console.log(error)
            }
            props.navigation.navigate("Home")
        }
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="User Name"
                    onChangeText={(value) => handleChangeText("name", value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="User Email"
                    onChangeText={(value) => handleChangeText("email", value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="User Phone"
                    onChangeText={(value) => handleChangeText("phone", value)}
                />
            </View>
            <Button
                title="Save User"
                onPress={addNewUser}
            />
        </ScrollView>
    )
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
    }
})
export default CreateUserScreen;