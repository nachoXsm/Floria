import 'server-only'
import { cookies } from 'next/headers'
import { type Lang, type TranslationKey, t as translate } from './i18n'

// Idioma leído desde la cookie (para componentes server-side)
export function getServerLang(): Lang {
  const c = cookies().get('floria-lang')?.value as Lang | undefined
  return c && ['es', 'en', 'pt'].includes(c) ? c : 'es'
}

// Traducción server-side
export function st(key: TranslationKey): string {
  return translate(getServerLang(), key)
}
