// Sistema de diseño Floria — tokens para estilos inline (premium / editorial).
// Paleta OFICIAL del brand kit. Sombras verdes, tipografía editorial con aire.

export const font = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Montserrat', system-ui, -apple-system, sans-serif",
}

// Paleta oficial del brand kit
export const color = {
  ink: '#1E3D2B',       // verde oscuro — texto principal + marca
  green: '#4C7F5B',     // verde medio
  sage: '#A7C4A1',      // verde claro
  mist: '#E7EFE6',      // verde muy claro (superficies)
  cream: '#F2E9DD',     // crema (fondo de marca)
  blush: '#E8C4B9',     // acento blush/rosa palo
  blushDeep: '#C08A7B', // blush saturado para texto/acento legible
  bg: '#F6F1E9',        // fondo app (crema aireado, casi blanco cálido)
  paper: '#FFFFFF',     // cards
  inkSoft: 'rgba(30,61,43,0.60)',  // texto secundario
  inkFaint: 'rgba(30,61,43,0.40)', // texto terciario
  line: 'rgba(30,61,43,0.08)',
}

// Sombras VERDES, difusas — profundidad premium
export const shadow = {
  soft: '0 8px 24px rgba(30,61,43,0.06)',
  card: '0 20px 60px rgba(30,61,43,0.08)',
  lifted: '0 30px 80px rgba(30,61,43,0.16)',
}

export const radius = { sm: 18, md: 24, lg: 30, xl: 38, pill: 999 }

// Micro-label editorial (mayúsculas con tracking)
export const eyebrow = (c: string = color.green): React.CSSProperties => ({
  fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px',
  textTransform: 'uppercase', color: c, margin: 0,
})

// Título editorial serif — Cormorant necesita AIRE
export const display = (size = 52): React.CSSProperties => ({
  fontFamily: font.serif, fontSize: `${size}px`, fontWeight: 500,
  color: color.ink, margin: 0, letterSpacing: '-0.5px', lineHeight: 0.95,
})

export const sectionTitle = (size = 30): React.CSSProperties => ({
  fontFamily: font.serif, fontSize: `${size}px`, fontWeight: 500,
  color: color.ink, margin: 0, letterSpacing: '-0.4px', lineHeight: 1.02,
})
