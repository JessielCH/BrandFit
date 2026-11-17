/**
 * BigFiveScreen – placeholder inicial.
 * Se implementará en el siguiente commit.
 */
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, FontSize } from '../theme'

export default function BigFiveScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🧠 Big Five – próximamente</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.bg },
  text: { fontSize: FontSize.base, color: Colors.muted },
})
