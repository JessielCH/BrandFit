/**
 * NoAnalysis – estado vacío cuando no hay un creador analizado.
 * Equivalente a <NoAnalysis> del prototipo web.
 */
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useApp } from '../context'
import { Button, EmptyState } from '../components'
import { Colors } from '../theme'

type Props = {
  kind?: 'analysis' | 'recs'
}

export default function NoAnalysis({ kind = 'analysis' }: Props) {
  const { go } = useApp()
  return (
    <EmptyState
      icon={
        <Ionicons
          name="bar-chart-outline"
          size={26}
          color={Colors.primary}
          strokeWidth={1.75}
        />
      }
      title={kind === 'recs' ? 'Aún no hay recomendaciones' : 'Aún no hay análisis'}
      body="Analiza un @username de TikTok para empezar."
      action={
        <Button onPress={() => go('home')}>Analizar un creador</Button>
      }
    />
  )
}
