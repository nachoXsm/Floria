// Consejos mensuales de jardín y huerta para Argentina (hemisferio sur).
// No repite el calendario de siembra de la sección Huerta: acá van tareas,
// almácigos de herbáceas, mantenimiento y consejos estacionales.

export type MonthTips = {
  estacion: 'Verano' | 'Otoño' | 'Invierno' | 'Primavera'
  jardin: string[]
  huerta: string[]
  destacado: string
}

export const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

export const BITACORA: Record<number, MonthTips> = {
  1: { // Enero
    estacion: 'Verano',
    jardin: [
      'Regá temprano a la mañana o al atardecer para evitar la evaporación.',
      'Sacá flores marchitas (deadheading) para prolongar la floración de anuales.',
      'Aplicá mulch en canteros para conservar humedad y frenar malezas.',
      'Vigilá plagas de verano: pulgones, cochinillas y arañuela roja.',
    ],
    huerta: [
      'Cosechá tomate, zapallito, pimiento y berenjena en su punto.',
      'Sostené con tutores las plantas cargadas de fruto.',
      'Mantené el riego constante para evitar el partido de tomates.',
    ],
    destacado: 'Es el mes de mayor estrés hídrico: priorizá el riego profundo y el mulch.',
  },
  2: { // Febrero
    estacion: 'Verano',
    jardin: [
      'Empezá almácigos de herbáceas de otoño/invierno: pensamiento, viola, caléndula.',
      'Podá ligeramente arbustos de floración estival ya pasados.',
      'Dividí matas de perennes que crecieron mucho (agapanto, lirios).',
    ],
    huerta: [
      'Sembrá en almácigo brócoli, coliflor, repollo y apio para el otoño.',
      'Renová el compost girándolo y manteniéndolo húmedo.',
    ],
    destacado: 'Arrancan los almácigos de flores de estación fría: pensamientos y violas.',
  },
  3: { // Marzo
    estacion: 'Otoño',
    jardin: [
      'Plantá bulbos de primavera: tulipán, narciso, jacinto, muscari.',
      'Es buen momento para trasplantar arbustos y árboles jóvenes.',
      'Sembrá césped o repará zonas peladas: el otoño es ideal.',
    ],
    huerta: [
      'Trasplantá los plantines de crucíferas al cantero definitivo.',
      'Sembrá directo acelga, espinaca, rúcula y rabanito.',
    ],
    destacado: 'Ventana clave para plantar bulbos de primavera y sembrar césped.',
  },
  4: { // Abril
    estacion: 'Otoño',
    jardin: [
      'Recogé y compostá las hojas caídas.',
      'Plantá árboles y arbustos de raíz desnuda a fin de mes.',
      'Reducí el riego a medida que bajan las temperaturas.',
    ],
    huerta: [
      'Sembrá habas, arvejas y ajo directo en la tierra.',
      'Protegé del frío los cultivos sensibles con mantas o túnel.',
    ],
    destacado: 'Época ideal para plantar árboles: la raíz se establece antes del frío.',
  },
  5: { // Mayo
    estacion: 'Otoño',
    jardin: [
      'Aplicá una capa de abono o compost sobre los canteros.',
      'Plantá rosales a raíz desnuda.',
      'Protegé plantas sensibles de las primeras heladas.',
    ],
    huerta: [
      'Cosechá las últimas hortalizas de verano y limpiá el cantero.',
      'Plantá ajo y cebolla de bulbo.',
    ],
    destacado: 'Preparación del suelo: abono y compost antes del descanso invernal.',
  },
  6: { // Junio
    estacion: 'Invierno',
    jardin: [
      'Momento de podas de formación en árboles caducos en reposo.',
      'Revisá tutores y ataduras; reforzá antes de los vientos.',
      'Limpiá y afilá herramientas: es temporada de mantenimiento.',
    ],
    huerta: [
      'Sembrá en almácigo protegido lechuga y cebolla de verdeo.',
      'Aireá el compost para que no se compacte con la humedad.',
    ],
    destacado: 'Temporada de poda de caducos y mantenimiento de herramientas.',
  },
  7: { // Julio
    estacion: 'Invierno',
    jardin: [
      'Seguí con las podas de invierno de frutales y rosales.',
      'Aplicá aceite mineral en frutales para controlar plagas invernantes.',
      'Planificá los canteros de primavera y encargá semillas.',
    ],
    huerta: [
      'Preparás los almácigos de solanáceas (tomate, pimiento) en lugar cálido.',
      'Abonás la tierra que quedó en descanso.',
    ],
    destacado: 'Poda de rosales y frutales + arranque de almácigos de tomate bajo abrigo.',
  },
  8: { // Agosto
    estacion: 'Invierno',
    jardin: [
      'Últimas podas antes de la brotación.',
      'Dividí y trasplantá perennes antes de que arranquen.',
      'Empezá almácigos de anuales de primavera-verano.',
    ],
    huerta: [
      'Sembrá en almácigo tomate, pimiento, berenjena y albahaca.',
      'Preparás los canteros con compost para la temporada fuerte.',
    ],
    destacado: 'Mes bisagra: se largan los almácigos de la temporada cálida.',
  },
  9: { // Septiembre
    estacion: 'Primavera',
    jardin: [
      'Fertilizá canteros y macetas al reactivarse el crecimiento.',
      'Plantá anuales de primavera: alegría, copete, petunia.',
      'Renová el mulch y controlá las primeras malezas.',
    ],
    huerta: [
      'Trasplantá al cantero los plantines endurecidos.',
      'Sembrá directo zanahoria, remolacha y acelga.',
    ],
    destacado: 'Arranca la temporada fuerte: fertilización y plantación de anuales.',
  },
  10: { // Octubre
    estacion: 'Primavera',
    jardin: [
      'Trasplantá al exterior los almácigos ya endurecidos.',
      'Tutorá trepadoras y plantas de porte alto.',
      'Vigilá pulgones en los brotes tiernos.',
    ],
    huerta: [
      'Plantá tomate, pimiento y berenjena al cantero definitivo.',
      'Sembrá directo choclo, zapallo y chaucha.',
    ],
    destacado: 'Plena plantación de verano: tomate y compañía van a tierra.',
  },
  11: { // Noviembre
    estacion: 'Primavera',
    jardin: [
      'Aumentá la frecuencia de riego con el calor.',
      'Sacá flores marchitas para estimular nueva floración.',
      'Aplicá mulch antes de que apriete el verano.',
    ],
    huerta: [
      'Colocá tutores y empezá el despunte de tomates.',
      'Cosechá las primeras hojas verdes y arvejas.',
    ],
    destacado: 'Preparación para el verano: riego, mulch y tutorado.',
  },
  12: { // Diciembre
    estacion: 'Verano',
    jardin: [
      'Riego profundo y temprano; agrupá macetas para conservar humedad.',
      'Deadheading semanal en anuales y rosales.',
      'Controlá plagas de verano y hongos por humedad.',
    ],
    huerta: [
      'Cosechá zapallito, chaucha y las primeras berenjenas.',
      'Mantené el riego parejo para evitar el partido de frutos.',
    ],
    destacado: 'Manejo del calor: riego eficiente, mulch y control de plagas.',
  },
}

export const TASK_CATEGORIES = [
  { id: 'jardin', label: 'Jardín', color: '#4C7F5B' },
  { id: 'huerta', label: 'Huerta', color: '#C4773B' },
  { id: 'almacigo', label: 'Almácigo', color: '#6B5B95' },
  { id: 'mantenimiento', label: 'Mantenimiento', color: '#2563EB' },
] as const
