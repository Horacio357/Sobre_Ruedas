-- ============================================================
-- SOBRE RUEDAS — Esquema Relacional Inicial
-- Supabase / PostgreSQL
-- Migración: 001_initial_schema.sql
-- ============================================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Para búsqueda full-text

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE user_role AS ENUM ('customer', 'admin', 'staff');
CREATE TYPE skate_level AS ENUM ('iniciacion', 'intermedio', 'avanzado', 'alto_rendimiento');
CREATE TYPE skate_discipline AS ENUM ('libre', 'danza', 'figuras', 'saltos');
CREATE TYPE skate_type AS ENUM ('ruedas', 'inline', 'hielo');
CREATE TYPE component_type AS ENUM ('bota', 'plancha', 'rueda', 'rodamiento', 'freno', 'herramienta', 'accesorio', 'combo');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
CREATE TYPE payment_method AS ENUM ('mercadopago', 'paypal', 'modo', 'nave', 'payway', 'transfer');
CREATE TYPE payment_status AS ENUM ('pending', 'approved', 'rejected', 'refunded', 'in_process');

-- ============================================================
-- TABLA: profiles (extensión de auth.users de Supabase)
-- ============================================================

CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT,
  avatar_url    TEXT,
  phone         TEXT,
  address       JSONB,          -- { street, city, province, zip, country }
  role          user_role NOT NULL DEFAULT 'customer',
  skate_level   skate_level,    -- Perfil del patinador (opcional)
  shoe_size_cm  DECIMAL(4,1),   -- Para la calculadora de talles
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE profiles IS 'Perfil extendido de usuarios. Linked a auth.users de Supabase.';

-- ============================================================
-- TABLA: brands
-- ============================================================

CREATE TABLE brands (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL UNIQUE,
  slug        TEXT NOT NULL UNIQUE,
  logo_url    TEXT,
  country     TEXT DEFAULT 'AR',
  description TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE brands IS 'Marcas de productos (Risport, Edea, SP Teri, Jackson, etc.)';

-- ============================================================
-- TABLA: categories
-- ============================================================

CREATE TABLE categories (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  parent_id     UUID REFERENCES categories(id) ON DELETE SET NULL,
  component_type component_type,   -- Si aplica a tipo de componente específico
  description   TEXT,
  image_url     TEXT,
  sort_order    INT NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE categories IS 'Categorías jerárquicas. Permite subcategorías via parent_id.';

-- ============================================================
-- TABLA: products (catálogo principal)
-- ============================================================

CREATE TABLE products (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  description     TEXT,
  short_desc      TEXT,                      -- Para cards y listados
  sku             TEXT UNIQUE,
  brand_id        UUID REFERENCES brands(id) ON DELETE SET NULL,
  category_id     UUID REFERENCES categories(id) ON DELETE SET NULL,
  component_type  component_type NOT NULL,
  
  -- Clasificación para patines
  skate_level     skate_level[],             -- Array: puede servir para múltiples niveles
  skate_discipline skate_discipline[],
  skate_type      skate_type,
  
  -- Precios
  price_ars       DECIMAL(12,2) NOT NULL,    -- Precio base ARS
  price_usd       DECIMAL(10,2),             -- Referencia USD (opcional)
  compare_price   DECIMAL(12,2),             -- Precio tachado (antes de descuento)
  cost_price      DECIMAL(12,2),             -- Costo interno
  
  -- Stock
  stock_quantity  INT NOT NULL DEFAULT 0,
  low_stock_threshold INT NOT NULL DEFAULT 5,
  track_inventory BOOLEAN NOT NULL DEFAULT TRUE,
  
  -- Metadata
  weight_grams    INT,
  dimensions      JSONB,                     -- { length, width, height } en cm
  tags            TEXT[],
  meta_title      TEXT,
  meta_description TEXT,
  
  -- Estado
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured     BOOLEAN NOT NULL DEFAULT FALSE,
  is_outlet       BOOLEAN NOT NULL DEFAULT FALSE,
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_component_type ON products(component_type);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_is_outlet ON products(is_outlet);
CREATE INDEX idx_products_name_trgm ON products USING GIN (name gin_trgm_ops);

COMMENT ON TABLE products IS 'Catálogo principal. Un producto = un SKU base (botas, planchas, ruedas, etc.)';

-- ============================================================
-- TABLA: product_variants (talles, colores)
-- ============================================================

CREATE TABLE product_variants (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku             TEXT UNIQUE,
  size_label      TEXT,          -- "37", "38", "EU 38", etc.
  size_cm         DECIMAL(4,1), -- Medida en cm del pie para este talle
  color           TEXT,
  color_hex       TEXT,          -- "#FF5733"
  price_modifier  DECIMAL(10,2) NOT NULL DEFAULT 0, -- Diferencia sobre precio base
  stock_quantity  INT NOT NULL DEFAULT 0,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_variants_product ON product_variants(product_id);

COMMENT ON TABLE product_variants IS 'Variantes de producto: talles y colores con stock individual.';

-- ============================================================
-- TABLA: product_images
-- ============================================================

CREATE TABLE product_images (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,                 -- URL de Supabase Storage
  alt_text    TEXT,
  sort_order  INT NOT NULL DEFAULT 0,
  is_primary  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_images_product ON product_images(product_id);

COMMENT ON TABLE product_images IS 'Imágenes de producto almacenadas en Supabase Storage.';

-- ============================================================
-- TABLA: component_compatibility
-- (Vital para el configurador "Armá el tuyo")
-- ============================================================

CREATE TABLE component_compatibility (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  boot_id         UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  plate_id        UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  compatibility   TEXT NOT NULL DEFAULT 'full',  -- 'full' | 'partial' | 'incompatible'
  notes           TEXT,                           -- Ej: "Requiere adaptador X"
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(boot_id, plate_id)
);

CREATE INDEX idx_compat_boot ON component_compatibility(boot_id);
CREATE INDEX idx_compat_plate ON component_compatibility(plate_id);

COMMENT ON TABLE component_compatibility IS 'Matriz de compatibilidad bota↔plancha para el configurador step-by-step.';

-- ============================================================
-- TABLA: configurator_builds
-- (Configuraciones guardadas por usuarios)
-- ============================================================

CREATE TABLE configurator_builds (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES profiles(id) ON DELETE SET NULL,
  session_id  TEXT,                          -- Para usuarios anónimos
  name        TEXT DEFAULT 'Mi armado',
  
  -- Selecciones del wizard
  level       skate_level,
  boot_id     UUID REFERENCES products(id) ON DELETE SET NULL,
  plate_id    UUID REFERENCES products(id) ON DELETE SET NULL,
  wheel_id    UUID REFERENCES products(id) ON DELETE SET NULL,
  bearing_id  UUID REFERENCES products(id) ON DELETE SET NULL,
  
  -- Variantes seleccionadas
  boot_variant_id   UUID REFERENCES product_variants(id),
  wheel_variant_id  UUID REFERENCES product_variants(id),
  
  -- Totales
  total_ars   DECIMAL(12,2),
  
  -- Estado
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  converted_to_order_id UUID,  -- Se llenará cuando se convierta en pedido
  
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE configurator_builds IS 'Armados guardados del configurador "Armá el tuyo".';

-- ============================================================
-- TABLA: discount_codes
-- ============================================================

CREATE TABLE discount_codes (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code            TEXT NOT NULL UNIQUE,
  description     TEXT,
  discount_type   TEXT NOT NULL DEFAULT 'percentage',  -- 'percentage' | 'fixed'
  discount_value  DECIMAL(10,2) NOT NULL,
  min_order_ars   DECIMAL(12,2),                       -- Monto mínimo de compra
  max_uses        INT,                                  -- NULL = ilimitado
  uses_count      INT NOT NULL DEFAULT 0,
  valid_from      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  valid_until     TIMESTAMPTZ,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  applicable_to   TEXT[] DEFAULT ARRAY['all'],          -- ['all'] | SKUs específicos
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE discount_codes IS 'Códigos de descuento para el checkout.';

-- ============================================================
-- TABLA: orders
-- ============================================================

CREATE TABLE orders (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number        TEXT NOT NULL UNIQUE,              -- SR-2024-00001
  user_id             UUID REFERENCES profiles(id) ON DELETE SET NULL,
  session_id          TEXT,
  
  -- Datos del comprador (snapshot al momento de la compra)
  buyer_name          TEXT NOT NULL,
  buyer_email         TEXT NOT NULL,
  buyer_phone         TEXT,
  shipping_address    JSONB NOT NULL,
  
  -- Totales
  subtotal_ars        DECIMAL(12,2) NOT NULL,
  discount_amount     DECIMAL(12,2) NOT NULL DEFAULT 0,
  shipping_cost       DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_ars           DECIMAL(12,2) NOT NULL,
  
  -- Descuentos
  discount_code_id    UUID REFERENCES discount_codes(id),
  
  -- Pago
  payment_method      payment_method,
  payment_status      payment_status NOT NULL DEFAULT 'pending',
  payment_id          TEXT,                              -- ID externo del gateway
  payment_data        JSONB,                             -- Respuesta completa del gateway
  
  -- Estado de la orden
  status              order_status NOT NULL DEFAULT 'pending',
  
  -- Configurador (si vino de "Armá el tuyo")
  build_id            UUID REFERENCES configurator_builds(id),
  
  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

COMMENT ON TABLE orders IS 'Pedidos del e-commerce. Incluye snapshot del comprador y datos del pago.';

-- ============================================================
-- TABLA: order_items
-- ============================================================

CREATE TABLE order_items (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id      UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id      UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  
  -- Snapshot al momento de la compra
  product_name    TEXT NOT NULL,
  variant_label   TEXT,
  sku             TEXT,
  unit_price_ars  DECIMAL(12,2) NOT NULL,
  quantity        INT NOT NULL DEFAULT 1,
  subtotal_ars    DECIMAL(12,2) NOT NULL,
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

COMMENT ON TABLE order_items IS 'Ítems de cada pedido. Snapshot de precio al momento de la compra.';

-- ============================================================
-- TABLA: size_chart (Calculadora de talles)
-- ============================================================

CREATE TABLE size_chart (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id    UUID REFERENCES brands(id) ON DELETE CASCADE,
  foot_cm     DECIMAL(4,1) NOT NULL,   -- Longitud del pie en cm
  size_eu     TEXT,                    -- Talle EU
  size_us     TEXT,                    -- Talle US
  size_uk     TEXT,                    -- Talle UK
  notes       TEXT,                    -- Ej: "Recomendamos tallar 0.5 más grande"
  
  UNIQUE(brand_id, foot_cm)
);

COMMENT ON TABLE size_chart IS 'Tabla de conversión pie en cm a talles por marca, para la calculadora interactiva.';

-- ============================================================
-- TRIGGERS: updated_at automático
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_configurator_builds_updated_at BEFORE UPDATE ON configurator_builds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- FUNCIÓN: generar número de orden automático
-- ============================================================

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
DECLARE
  year_str TEXT := TO_CHAR(NOW(), 'YYYY');
  seq_num  INT;
BEGIN
  SELECT COUNT(*) + 1 INTO seq_num
  FROM orders
  WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW());
  
  NEW.order_number := 'SR-' || year_str || '-' || LPAD(seq_num::TEXT, 5, '0');
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_order_number BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Habilitar RLS en tablas sensibles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE configurator_builds ENABLE ROW LEVEL SECURITY;

-- Policies: profiles
CREATE POLICY "Usuarios ven su propio perfil" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Usuarios actualizan su perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin ve todos los perfiles" ON profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Policies: orders
CREATE POLICY "Usuarios ven sus propias órdenes" ON orders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Insertar órdenes autenticados" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id OR session_id IS NOT NULL);
CREATE POLICY "Admin gestiona todas las órdenes" ON orders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Policies: configurator_builds
CREATE POLICY "Usuarios ven sus builds" ON configurator_builds
  FOR SELECT USING (auth.uid() = user_id OR session_id IS NOT NULL);
CREATE POLICY "Usuarios crean builds" ON configurator_builds
  FOR INSERT WITH CHECK (auth.uid() = user_id OR session_id IS NOT NULL);
CREATE POLICY "Usuarios actualizan sus builds" ON configurator_builds
  FOR UPDATE USING (auth.uid() = user_id);

-- Products, categories, brands: lectura pública
CREATE POLICY "Productos visibles para todos" ON products
  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin gestiona productos" ON products
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categorías públicas" ON categories FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Marcas públicas" ON brands FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Imágenes públicas" ON product_images FOR SELECT USING (TRUE);
CREATE POLICY "Variantes públicas" ON product_variants FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin gestiona categorías" ON categories
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin gestiona marcas" ON brands
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin gestiona imágenes" ON product_images
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff')));
CREATE POLICY "Admin gestiona variantes" ON product_variants
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'staff')));

-- ============================================================
-- VISTAS ÚTILES
-- ============================================================

-- Vista de productos con imagen principal y marca
CREATE VIEW products_with_details AS
SELECT
  p.*,
  b.name AS brand_name,
  b.slug AS brand_slug,
  b.logo_url AS brand_logo,
  c.name AS category_name,
  c.slug AS category_slug,
  pi.url AS primary_image_url,
  pi.alt_text AS primary_image_alt,
  COALESCE(SUM(pv.stock_quantity), p.stock_quantity) AS total_stock
FROM products p
LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = TRUE
LEFT JOIN product_variants pv ON pv.product_id = p.id AND pv.is_active = TRUE
WHERE p.is_active = TRUE
GROUP BY p.id, b.name, b.slug, b.logo_url, c.name, c.slug, pi.url, pi.alt_text;

COMMENT ON VIEW products_with_details IS 'Vista desnormalizada para listados de catálogo y cards de producto.';

-- Vista de métricas para el dashboard admin
CREATE VIEW admin_sales_metrics AS
SELECT
  DATE_TRUNC('day', created_at) AS day,
  COUNT(*) AS total_orders,
  SUM(total_ars) AS revenue_ars,
  AVG(total_ars) AS avg_order_value,
  COUNT(CASE WHEN payment_status = 'approved' THEN 1 END) AS paid_orders,
  COUNT(CASE WHEN status = 'cancelled' THEN 1 END) AS cancelled_orders
FROM orders
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY day DESC;

COMMENT ON VIEW admin_sales_metrics IS 'Métricas diarias para el dashboard de administración.';
