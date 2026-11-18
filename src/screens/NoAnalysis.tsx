/**
 * @file NoAnalysis.tsx
 * @description Componente de vista para estados vacíos cuando el usuario accede
 * a pantallas de métricas, análisis o recomendaciones sin haber seleccionado previamente un creador.
 *
 * @author BrandFit Team
 */

import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useApp } from '../context'
import { Button, EmptyState } from '../components'
import { Colors } from '../theme'

/**
 * Propiedades del componente NoAnalysis.
 */
type Props = {
  /** Tipo de pantalla donde se muestra el estado vacío: análisis general o recomendaciones */
  kind?: 'analysis' | 'recs'
}

/**
 * Vista de estado vacío que orienta al usuario hacia la pantalla de inicio para ingresar un creador.
 */
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
