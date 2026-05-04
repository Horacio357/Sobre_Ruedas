-- ============================================================
-- SOBRE RUEDAS — Datos de ejemplo (Seed)
-- Ejecutar DESPUÉS de 001_initial_schema.sql
-- ============================================================

-- ============================================================
-- MARCAS
-- ============================================================

INSERT INTO brands (name, slug, country, description) VALUES
  ('Risport', 'risport', 'IT', 'Marca italiana líder en botas de patinaje artístico de alto rendimiento'),
  ('Edea', 'edea', 'IT', 'Innovadoras botas de patinaje con tecnología de fibra de carbono'),
  ('SP Teri', 'sp-teri', 'US', 'Fabricante americano clásico de botas artísticas'),
  ('Jackson Ultima', 'jackson-ultima', 'CA', 'Botas canadienses de calidad para todos los niveles'),
  ('Risport Plates', 'risport-plates', 'IT', 'Planchas de precisión para competición'),
  ('MK Blade', 'mk-blade', 'GB', 'Cuchillas británicas de precisión para patinaje artístico'),
  ('Snyder', 'snyder', 'US', 'Planchas americanas de aluminio de alta durabilidad'),
  ('Pilot', 'pilot', 'US', 'Ruedas premium para patines artísticos de ruedas'),
  ('Witch Doctor', 'witch-doctor', 'US', 'Ruedas de alto rendimiento para competición'),
  ('Sure-Grip', 'sure-grip', 'US', 'Planchas y accesorios clásicos para patines artísticos');

-- ============================================================
-- CATEGORÍAS
-- ============================================================

INSERT INTO categories (name, slug, component_type, sort_order) VALUES
  ('Patines Completos', 'patines-completos', 'combo', 1),
  ('Botas', 'botas', 'bota', 2),
  ('Planchas', 'planchas', 'plancha', 3),
  ('Ruedas', 'ruedas', 'rueda', 4),
  ('Rodamientos', 'rodamientos', 'rodamiento', 5),
  ('Frenos', 'frenos', 'freno', 6),
  ('Herramientas', 'herramientas', 'herramienta', 7),
  ('Accesorios', 'accesorios', 'accesorio', 8);

-- ============================================================
-- TABLA DE TALLES (size_chart) para Risport y Edea
-- ============================================================

-- Risport
INSERT INTO size_chart (brand_id, foot_cm, size_eu, size_us, size_uk) VALUES
  ((SELECT id FROM brands WHERE slug = 'risport'), 22.0, '35', '4', '3'),
  ((SELECT id FROM brands WHERE slug = 'risport'), 22.5, '35.5', '4.5', '3.5'),
  ((SELECT id FROM brands WHERE slug = 'risport'), 23.0, '36', '5', '4'),
  ((SELECT id FROM brands WHERE slug = 'risport'), 23.5, '37', '5.5', '4.5'),
  ((SELECT id FROM brands WHERE slug = 'risport'), 24.0, '37.5', '6', '5'),
  ((SELECT id FROM brands WHERE slug = 'risport'), 24.5, '38', '6.5', '5.5'),
  ((SELECT id FROM brands WHERE slug = 'risport'), 25.0, '39', '7', '6'),
  ((SELECT id FROM brands WHERE slug = 'risport'), 25.5, '39.5', '7.5', '6.5'),
  ((SELECT id FROM brands WHERE slug = 'risport'), 26.0, '40', '8', '7'),
  ((SELECT id FROM brands WHERE slug = 'risport'), 26.5, '41', '8.5', '7.5'),
  ((SELECT id FROM brands WHERE slug = 'risport'), 27.0, '42', '9', '8'),
  ((SELECT id FROM brands WHERE slug = 'risport'), 27.5, '42.5', '9.5', '8.5'),
  ((SELECT id FROM brands WHERE slug = 'risport'), 28.0, '43', '10', '9');

-- Edea
INSERT INTO size_chart (brand_id, foot_cm, size_eu, size_us, size_uk) VALUES
  ((SELECT id FROM brands WHERE slug = 'edea'), 21.5, '34', '3.5', '2.5'),
  ((SELECT id FROM brands WHERE slug = 'edea'), 22.0, '34.5', '4', '3'),
  ((SELECT id FROM brands WHERE slug = 'edea'), 22.5, '35', '4.5', '3.5'),
  ((SELECT id FROM brands WHERE slug = 'edea'), 23.0, '35.5', '5', '4'),
  ((SELECT id FROM brands WHERE slug = 'edea'), 23.5, '36', '5.5', '4.5'),
  ((SELECT id FROM brands WHERE slug = 'edea'), 24.0, '37', '6', '5'),
  ((SELECT id FROM brands WHERE slug = 'edea'), 24.5, '37.5', '6.5', '5.5'),
  ((SELECT id FROM brands WHERE slug = 'edea'), 25.0, '38', '7', '6'),
  ((SELECT id FROM brands WHERE slug = 'edea'), 25.5, '38.5', '7.5', '6.5'),
  ((SELECT id FROM brands WHERE slug = 'edea'), 26.0, '39', '8', '7'),
  ((SELECT id FROM brands WHERE slug = 'edea'), 26.5, '40', '8.5', '7.5'),
  ((SELECT id FROM brands WHERE slug = 'edea'), 27.0, '41', '9', '8'),
  ((SELECT id FROM brands WHERE slug = 'edea'), 27.5, '42', '9.5', '8.5');

-- ============================================================
-- PRODUCTOS DE EJEMPLO
-- ============================================================

-- Bota de iniciación
INSERT INTO products (
  name, slug, description, short_desc, component_type, brand_id, category_id,
  skate_level, skate_discipline, skate_type, price_ars, compare_price,
  stock_quantity, is_active, is_featured
) VALUES (
  'Jackson Softec Classic',
  'jackson-softec-classic',
  'La bota perfecta para quienes dan sus primeros pasos en el patinaje artístico. Construcción en cuero sintético suave, cierre con cordones y velcro para un calce seguro. Ideal para clases de iniciación.',
  'Bota de iniciación en cuero sintético, ideal para comenzar',
  'bota',
  (SELECT id FROM brands WHERE slug = 'jackson-ultima'),
  (SELECT id FROM categories WHERE slug = 'botas'),
  ARRAY['iniciacion']::skate_level[],
  ARRAY['libre']::skate_discipline[],
  'ruedas',
  85000.00,
  95000.00,
  15,
  TRUE,
  FALSE
);

-- Bota intermedia
INSERT INTO products (
  name, slug, description, short_desc, component_type, brand_id, category_id,
  skate_level, skate_discipline, skate_type, price_ars, compare_price,
  stock_quantity, is_active, is_featured
) VALUES (
  'Risport RF3 Pro',
  'risport-rf3-pro',
  'La Risport RF3 Pro es la elección preferida de patinadores intermedios exigentes. Fabricada en cuero genuino de primera calidad con refuerzos laterales que brindan soporte superior. Compatible con planchas de nivel intermedio-avanzado.',
  'Bota de cuero genuino para nivel intermedio-avanzado',
  'bota',
  (SELECT id FROM brands WHERE slug = 'risport'),
  (SELECT id FROM categories WHERE slug = 'botas'),
  ARRAY['intermedio', 'avanzado']::skate_level[],
  ARRAY['libre', 'danza']::skate_discipline[],
  'ruedas',
  195000.00,
  NULL,
  8,
  TRUE,
  TRUE
);

-- Bota de alto rendimiento
INSERT INTO products (
  name, slug, description, short_desc, component_type, brand_id, category_id,
  skate_level, skate_discipline, skate_type, price_ars, compare_price,
  stock_quantity, is_active, is_featured
) VALUES (
  'Edea Concerto',
  'edea-concerto',
  'La Edea Concerto es la bota de referencia para competidores de alto nivel. Construcción en fibra de carbono y materiales termoplásticos de última generación. Peso ultra-reducido para maximizar el rendimiento en saltos y figuras. Disponible en personalización de colores.',
  'Bota de competición en fibra de carbono — para alto rendimiento',
  'bota',
  (SELECT id FROM brands WHERE slug = 'edea'),
  (SELECT id FROM categories WHERE slug = 'botas'),
  ARRAY['avanzado', 'alto_rendimiento']::skate_level[],
  ARRAY['libre', 'figuras', 'saltos']::skate_discipline[],
  'ruedas',
  380000.00,
  NULL,
  5,
  TRUE,
  TRUE
);

-- Plancha intermedia
INSERT INTO products (
  name, slug, description, short_desc, component_type, brand_id, category_id,
  skate_level, skate_type, price_ars,
  stock_quantity, is_active
) VALUES (
  'Snyder Deluxe MK',
  'snyder-deluxe-mk',
  'Plancha de aluminio de alta calidad con placa de montaje ajustable. Ideal para patinadores de nivel intermedio en búsqueda de precisión y durabilidad. Compatible con botas Jackson y SP Teri.',
  'Plancha de aluminio para nivel intermedio',
  'plancha',
  (SELECT id FROM brands WHERE slug = 'snyder'),
  (SELECT id FROM categories WHERE slug = 'planchas'),
  ARRAY['intermedio']::skate_level[],
  'ruedas',
  75000.00,
  10,
  TRUE
);

-- Plancha profesional
INSERT INTO products (
  name, slug, description, short_desc, component_type, brand_id, category_id,
  skate_level, skate_type, price_ars,
  stock_quantity, is_active, is_featured
) VALUES (
  'Sure-Grip Rock GT-50',
  'sure-grip-rock-gt50',
  'La plancha de competición por excelencia para patines artísticos. Aluminio aeronáutico de 6061 con anodizado de alta resistencia. Geometría de precisión milimétrica para la máxima responsividad en giros y footwork.',
  'Plancha de aluminio aeronáutico para competición',
  'plancha',
  (SELECT id FROM brands WHERE slug = 'sure-grip'),
  (SELECT id FROM categories WHERE slug = 'planchas'),
  ARRAY['avanzado', 'alto_rendimiento']::skate_level[],
  'ruedas',
  145000.00,
  6,
  TRUE,
  TRUE
);

-- Ruedas
INSERT INTO products (
  name, slug, description, short_desc, component_type, brand_id, category_id,
  skate_level, skate_type, price_ars,
  stock_quantity, is_active, is_featured
) VALUES (
  'Pilot Falcon 57mm',
  'pilot-falcon-57mm',
  'Ruedas de poliuretano de alta densidad, 57mm de diámetro y 97A de dureza. Diseñadas para piso de madera en competición. Alta elasticidad y rebote consistente para figuras complejas.',
  'Ruedas 57mm 97A — piso de madera, competición',
  'rueda',
  (SELECT id FROM brands WHERE slug = 'pilot'),
  (SELECT id FROM categories WHERE slug = 'ruedas'),
  ARRAY['avanzado', 'alto_rendimiento']::skate_level[],
  'ruedas',
  55000.00,
  20,
  TRUE,
  FALSE
);

-- Combo de iniciación (producto compuesto)
INSERT INTO products (
  name, slug, description, short_desc, component_type, brand_id, category_id,
  skate_level, skate_discipline, skate_type, price_ars, compare_price,
  stock_quantity, is_active, is_featured, is_outlet
) VALUES (
  'Combo Iniciación Total',
  'combo-iniciacion-total',
  'El combo perfecto para empezar. Incluye bota Jackson Softec Classic + plancha Snyder + ruedas de entrenamiento + rodamientos ABEC-5. Todo lo que necesitás para tu primera clase, armado y listo para patinar.',
  'Bota + plancha + ruedas + rodamientos — todo incluido para iniciarse',
  'combo',
  (SELECT id FROM brands WHERE slug = 'jackson-ultima'),
  (SELECT id FROM categories WHERE slug = 'patines-completos'),
  ARRAY['iniciacion']::skate_level[],
  ARRAY['libre']::skate_discipline[],
  'ruedas',
  135000.00,
  180000.00,
  7,
  TRUE,
  TRUE,
  FALSE
);

-- Producto para outlet
INSERT INTO products (
  name, slug, description, short_desc, component_type, brand_id, category_id,
  skate_level, skate_type, price_ars, compare_price,
  stock_quantity, is_active, is_outlet
) VALUES (
  'SP Teri Competitor (Outlet)',
  'sp-teri-competitor-outlet',
  'Bota SP Teri Competitor de temporada pasada, en excelente estado. Leve marca de exhibición en la suela. Ideal para aprovechar una bota profesional a precio de liquidación.',
  'Bota profesional SP Teri — liquidación de temporada',
  'bota',
  (SELECT id FROM brands WHERE slug = 'sp-teri'),
  (SELECT id FROM categories WHERE slug = 'botas'),
  ARRAY['avanzado']::skate_level[],
  'ruedas',
  98000.00,
  220000.00,
  3,
  TRUE,
  TRUE
);

-- ============================================================
-- COMPATIBILIDAD BOTA-PLANCHA
-- ============================================================

INSERT INTO component_compatibility (boot_id, plate_id, compatibility, notes) VALUES
  (
    (SELECT id FROM products WHERE slug = 'jackson-softec-classic'),
    (SELECT id FROM products WHERE slug = 'snyder-deluxe-mk'),
    'full',
    'Compatibilidad nativa. Sin adaptadores.'
  ),
  (
    (SELECT id FROM products WHERE slug = 'risport-rf3-pro'),
    (SELECT id FROM products WHERE slug = 'snyder-deluxe-mk'),
    'partial',
    'Compatible con adaptador de montaje. Consultar talle.'
  ),
  (
    (SELECT id FROM products WHERE slug = 'risport-rf3-pro'),
    (SELECT id FROM products WHERE slug = 'sure-grip-rock-gt50'),
    'full',
    'Combinación recomendada para nivel avanzado.'
  ),
  (
    (SELECT id FROM products WHERE slug = 'edea-concerto'),
    (SELECT id FROM products WHERE slug = 'sure-grip-rock-gt50'),
    'full',
    'Setup de competición premium.'
  );

-- ============================================================
-- CÓDIGO DE DESCUENTO DE EJEMPLO
-- ============================================================

INSERT INTO discount_codes (
  code, description, discount_type, discount_value, min_order_ars, max_uses, valid_until
) VALUES
  (
    'BIENVENIDA10',
    '10% de descuento en tu primer compra',
    'percentage',
    10.00,
    50000.00,
    1000,
    NOW() + INTERVAL '1 year'
  ),
  (
    'VERANO2024',
    'Descuento de temporada - $15.000 ARS off en compras mayores a $100.000',
    'fixed',
    15000.00,
    100000.00,
    500,
    NOW() + INTERVAL '6 months'
  );
