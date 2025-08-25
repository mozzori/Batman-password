import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Clipboard from "expo-clipboard";

// Função utilitária para medir força da senha
function getPasswordStrength(password: string) {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Fraca", color: "red" };
  if (score <= 4) return { label: "Média", color: "orange" };
  return { label: "Forte", color: "green" };
}

export default function Home() {
  const [password, setPassword] = useState("");

  function generatePassword() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let newPass = "";
    for (let i = 0; i < 12; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPass);
  }

  async function copyToClipboard() {
    if (password) {
      await Clipboard.setStringAsync(password);
    }
  }

  const strength = getPasswordStrength(password);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>

      {password ? (
        <View style={styles.resultContainer}>
          <Text style={styles.password}>{password}</Text>

          <TouchableOpacity onPress={copyToClipboard}>
            <Text style={styles.copyText}>Copiar</Text>
          </TouchableOpacity>

          {/* Indicador de força */}
          <Text style={[styles.strength, { color: strength.color }]}>
            Força: {strength.label}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontSize: 16 },
  resultContainer: { marginTop: 20, alignItems: "center" },
  password: { fontSize: 20, fontWeight: "bold" },
  copyText: { marginTop: 10, color: "blue" },
  strength: { marginTop: 10, fontSize: 16, fontWeight: "bold" },
});
