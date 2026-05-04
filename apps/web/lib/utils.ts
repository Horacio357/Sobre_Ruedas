// ============================================================
// SOBRE RUEDAS — Utilidades generales
// ============================================================

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases de Tailwind de forma segura, resolviendo conflictos.
 * Uso: cn('px-4 py-2', condition && 'bg-accent', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea un número como precio en ARS
 * Ejemplo: formatPrice(85000) → "$85.000"
 */
export function formatPrice(
  amount: number,
  currency: 'ARS' | 'USD' = 'ARS',
  locale: string = 'es-AR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calcula el porcentaje de descuento entre un precio original y uno final
 * Ejemplo: calcDiscount(100000, 75000) → 25
 */
export function calcDiscount(original: number, current: number): number {
  if (original <= 0) return 0;
  return Math.round(((original - current) / original) * 100);
}

/**
 * Genera un slug desde un string
 * Ejemplo: slugify("Patín Artístico") → "patin-artistico"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Trunca un texto a un número máximo de caracteres
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Formatea una fecha en español argentino
 * Ejemplo: formatDate("2024-01-15") → "15 de enero de 2024"
 */
export function formatDate(dateStr: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  });
}

/**
 * Genera el label de nivel de patinaje
 */
export const LEVEL_LABELS: Record<string, string> = {
  iniciacion: 'Iniciación',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
  alto_rendimiento: 'Alto Rendimiento',
};

/**
 * Genera el label de disciplina
 */
export const DISCIPLINE_LABELS: Record<string, string> = {
  libre: 'Patinaje Libre',
  danza: 'Danza sobre Ruedas',
  figuras: 'Figuras',
  saltos: 'Saltos / Estilo Libre',
};

/**
 * Genera el label de tipo de patín
 */
export const TYPE_LABELS: Record<string, string> = {
  ruedas: 'Patines Artísticos (Ruedas)',
  inline: 'Patines en Línea',
  hielo: 'Patines de Hielo',
};

/**
 * Genera el label de tipo de componente
 */
export const COMPONENT_LABELS: Record<string, string> = {
  bota: 'Botas',
  plancha: 'Planchas',
  rueda: 'Ruedas',
  rodamiento: 'Rodamientos',
  freno: 'Frenos',
  herramienta: 'Herramientas',
  accesorio: 'Accesorios',
  combo: 'Combos Completos',
};

/**
 * Devuelve un número de cuotas con su label amigable
 */
export function formatInstallment(installments: number, total: number): string {
  const perInstallment = formatPrice(total / installments);
  if (installments === 1) return `Pago único de ${formatPrice(total)}`;
  return `${installments} cuotas de ${perInstallment}`;
}

/**
 * Genera la URL de WhatsApp con mensaje pre-armado
 */
export function getWhatsAppUrl(message: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678';
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Convierte cm de pie a talle EU aproximado (lookup genérico)
 * Para tablas específicas por marca usar la tabla size_chart de la BD
 */
export function cmToEuSize(cm: number): string {
  const mapping: Record<number, string> = {
    21.5: '34', 22.0: '34.5–35', 22.5: '35.5', 23.0: '36',
    23.5: '37', 24.0: '37.5', 24.5: '38', 25.0: '39',
    25.5: '39.5', 26.0: '40', 26.5: '41', 27.0: '42',
    27.5: '42.5', 28.0: '43', 28.5: '44', 29.0: '44.5',
    29.5: '45', 30.0: '46',
  };

  // Redondear al 0.5 más cercano
  const rounded = Math.round(cm * 2) / 2;
  return mapping[rounded] ?? `~${Math.round(rounded * 1.5 + 15)}`;
}

/**
 * Genera un ID de sesión anónimo para el carrito
 */
export function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
