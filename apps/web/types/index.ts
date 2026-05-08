// ============================================================
// SOBRE RUEDAS — Tipos TypeScript globales
// ============================================================

// ── ENUMS ────────────────────────────────────────────────────

export type SkateLevel = 'iniciacion' | 'intermedio' | 'avanzado' | 'alto_rendimiento';
export type SkateDiscipline = 'libre' | 'danza' | 'figuras' | 'saltos';
export type SkateType = 'ruedas' | 'inline' | 'hielo';
export type ComponentType = 'bota' | 'plancha' | 'rueda' | 'rodamiento' | 'freno' | 'herramienta' | 'accesorio' | 'combo';
export type UserRole = 'customer' | 'admin' | 'staff';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentMethod = 'mercadopago' | 'paypal' | 'modo' | 'nave' | 'payway' | 'transfer';
export type PaymentStatus = 'pending' | 'approved' | 'rejected' | 'refunded' | 'in_process';
export type CompatibilityLevel = 'full' | 'partial' | 'incompatible';

// ── MODELOS DE DATOS ─────────────────────────────────────────

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  country?: string;
  description?: string;
  is_active: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string;
  component_type?: ComponentType;
  description?: string;
  image_url?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku?: string;
  size_label?: string;
  size_cm?: number;
  color?: string;
  color_hex?: string;
  price_modifier: number;
  stock_quantity: number;
  is_active: boolean;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  short_desc?: string;
  sku?: string;
  brand_id?: string;
  category_id?: string;
  component_type: ComponentType;
  skate_level?: SkateLevel[];
  skate_discipline?: SkateDiscipline[];
  skate_type?: SkateType;
  price_ars: number;
  price_usd?: number;
  compare_price?: number;
  cost_price?: number;
  stock_quantity: number;
  low_stock_threshold: number;
  track_inventory: boolean;
  weight_grams?: number;
  dimensions?: { length: number; width: number; height: number };
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
  is_featured: boolean;
  is_outlet: boolean;
  created_at: string;
  updated_at: string;
  specs?: {
    label: string;
    value: number;
  }[];

  // Relaciones (JOIN)
  brand?: Brand;
  category?: Category;
  images?: ProductImage[];
  variants?: ProductVariant[];

  // Campos de la vista products_with_details
  brand_name?: string;
  brand_slug?: string;
  brand_logo?: string;
  category_name?: string;
  category_slug?: string;
  primary_image_url?: string;
  primary_image_alt?: string;
  total_stock?: number;
}

export interface ComponentCompatibility {
  id: string;
  boot_id: string;
  plate_id: string;
  compatibility: CompatibilityLevel;
  notes?: string;
}

export interface ConfiguratorBuild {
  id: string;
  user_id?: string;
  session_id?: string;
  name: string;
  level?: SkateLevel;
  boot_id?: string;
  plate_id?: string;
  wheel_id?: string;
  bearing_id?: string;
  boot_variant_id?: string;
  wheel_variant_id?: string;
  total_ars?: number;
  is_completed: boolean;
  converted_to_order_id?: string;
  created_at: string;
  updated_at: string;

  // Relaciones
  boot?: Product;
  plate?: Product;
  wheel?: Product;
  bearing?: Product;
}

export interface DiscountCode {
  id: string;
  code: string;
  description?: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_ars?: number;
  max_uses?: number;
  uses_count: number;
  valid_from: string;
  valid_until?: string;
  is_active: boolean;
  applicable_to: string[];
}

export interface ShippingAddress {
  street: string;
  city: string;
  province: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  session_id?: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone?: string;
  shipping_address: ShippingAddress;
  subtotal_ars: number;
  discount_amount: number;
  shipping_cost: number;
  total_ars: number;
  discount_code_id?: string;
  payment_method?: PaymentMethod;
  payment_status: PaymentStatus;
  payment_id?: string;
  payment_data?: Record<string, unknown>;
  status: OrderStatus;
  build_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;

  // Relaciones
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  variant_id?: string;
  product_name: string;
  variant_label?: string;
  sku?: string;
  unit_price_ars: number;
  quantity: number;
  subtotal_ars: number;
  created_at: string;
}

export interface SizeChart {
  id: string;
  brand_id: string;
  foot_cm: number;
  size_eu?: string;
  size_us?: string;
  size_uk?: string;
  notes?: string;
}

export interface UserProfile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  address?: ShippingAddress;
  role: UserRole;
  skate_level?: SkateLevel;
  shoe_size_cm?: number;
  created_at: string;
  updated_at: string;
}

// ── CARRITO ──────────────────────────────────────────────────

export interface CartItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  discountCode?: DiscountCode;
}

// ── FILTROS DE CATÁLOGO ──────────────────────────────────────

export interface CatalogFilters {
  search?: string;
  level?: SkateLevel[];
  discipline?: SkateDiscipline[];
  type?: SkateType;
  component?: ComponentType[];
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isFeatured?: boolean;
  isOutlet?: boolean;
  sortBy?: 'name' | 'price_asc' | 'price_desc' | 'newest' | 'featured';
  page?: number;
  limit?: number;
}

// ── PAGINACIÓN ────────────────────────────────────────────────

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

// ── RESPUESTAS DE PAGOS ──────────────────────────────────────

export interface MercadoPagoPreference {
  preference_id: string;
  init_point: string;
  sandbox_init_point: string;
}

export interface PayPalOrderResponse {
  paypal_order_id: string;
  status: string;
  links: Array<{ href: string; rel: string; method: string }>;
}

// ── ADMIN DASHBOARD ──────────────────────────────────────────

export interface SalesMetric {
  day: string;
  total_orders: number;
  revenue_ars: number;
  avg_order_value: number;
  paid_orders: number;
  cancelled_orders: number;
}
