import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

const EditUser = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSave = () => {
        if (!email || !senha) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        console.log("Dados atualizados:", { email, senha });

    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
            />
            <TextInput
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Salvar" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
});

export default EditUser;
