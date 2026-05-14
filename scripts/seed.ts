// scripts/seed.ts
// Ejecutar: npx tsx scripts/seed.ts
// Requiere: NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PLANTS = [
  {
    "common_name": "Jacarandá",
    "scientific_name": "Jacaranda mimosifolia",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 800,
    "height_max_cm": 1500,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": true,
    "uses": [
      "Sombra",
      "Alineación",
      "Parques"
    ],
    "compatible_with_raw": "Tipa blanca, Lapachos, Palo borracho",
    "notes": "Florece antes que las hojas. Icónico de las primaveras porteñas.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "jacaranda"
  },
  {
    "common_name": "Lapacho rosado",
    "scientific_name": "Handroanthus impetiginosus",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1000,
    "height_max_cm": 2000,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NOA",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Sombra",
      "Focal",
      "Parques"
    ],
    "compatible_with_raw": "Lapacho amarillo, Jacarandá, Tipa",
    "notes": "Florece en invierno sin hojas. Gran impacto visual.",
    "flowering_season": "Jul-Sep",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "lapacho-rosado"
  },
  {
    "common_name": "Lapacho amarillo",
    "scientific_name": "Handroanthus ochraceus",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 800,
    "height_max_cm": 1500,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NOA",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Sombra",
      "Focal"
    ],
    "compatible_with_raw": "Lapacho rosado, Jacarandá",
    "notes": "Flores amarillas intensas en invierno.",
    "flowering_season": "Jul-Sep",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "lapacho-amarillo"
  },
  {
    "common_name": "Ceibo",
    "scientific_name": "Erythrina crista-galli",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 800,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Bordes de agua",
      "Parques"
    ],
    "compatible_with_raw": "Sauce llorón, Palmera pindó",
    "notes": "Flor nacional argentina. Resiste inundaciones.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "ceibo"
  },
  {
    "common_name": "Tipa blanca",
    "scientific_name": "Tipuana tipu",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1500,
    "height_max_cm": 2500,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": true,
    "uses": [
      "Gran sombra",
      "Alineación"
    ],
    "compatible_with_raw": "Jacarandá, Lapacho rosado",
    "notes": "Árbol de sombra masivo. Floración amarilla llamativa.",
    "flowering_season": "Oct-Dic",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "tipa-blanca"
  },
  {
    "common_name": "Palo borracho rosado",
    "scientific_name": "Ceiba speciosa",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 800,
    "height_max_cm": 1500,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Focal",
      "Parques"
    ],
    "compatible_with_raw": "Jacarandá, Lapacho, Tipa",
    "notes": "Tronco espinoso y flores rosas espectaculares.",
    "flowering_season": "Feb-May",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "palo-borracho-rosado"
  },
  {
    "common_name": "Arrayán",
    "scientific_name": "Luma apiculata",
    "plant_type": "Árbol",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1000,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Patagonia"
    ],
    "is_native": true,
    "uses": [
      "Focal",
      "Bosque nativo"
    ],
    "compatible_with_raw": "Coihue, Ñire, Radal",
    "notes": "Corteza canela única. Símbolo del bosque patagónico.",
    "flowering_season": "Ene-Mar",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "arrayan"
  },
  {
    "common_name": "Algarrobo blanco",
    "scientific_name": "Prosopis alba",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1000,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NOA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Sombra xerofítica",
      "Parques áridos"
    ],
    "compatible_with_raw": "Chañar, Molle, Espinillo",
    "notes": "Extremadamente resistente a la sequía.",
    "flowering_season": "Oct-Nov",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "algarrobo-blanco"
  },
  {
    "common_name": "Algarrobo negro",
    "scientific_name": "Prosopis nigra",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 800,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NOA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Sombra xerofítica"
    ],
    "compatible_with_raw": "Algarrobo blanco, Chañar",
    "notes": "Similar al blanco, frutos más oscuros y aromáticos.",
    "flowering_season": "Oct-Nov",
    "tags": [
      "árbol",
      "nativa",
      "aromática",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "algarrobo-negro"
  },
  {
    "common_name": "Quebracho colorado",
    "scientific_name": "Schinopsis lorentzii",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1000,
    "height_max_cm": 2000,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NOA",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Sombra",
      "Parques xerofíticos"
    ],
    "compatible_with_raw": "Algarrobo, Mistol",
    "notes": "Madera durísima. Crecimiento lento pero longevo.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "quebracho-colorado"
  },
  {
    "common_name": "Ñire",
    "scientific_name": "Nothofagus antarctica",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1000,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Patagonia"
    ],
    "is_native": true,
    "uses": [
      "Bosque patagónico",
      "Cortinas"
    ],
    "compatible_with_raw": "Coihue, Arrayán, Calafate",
    "notes": "Otoño espectacular en rojos y amarillos.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "nire"
  },
  {
    "common_name": "Coihue",
    "scientific_name": "Nothofagus dombeyi",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "twice_week",
    "care_level": "expert",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 2000,
    "height_max_cm": 4000,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Patagonia"
    ],
    "is_native": true,
    "uses": [
      "Bosque patagónico"
    ],
    "compatible_with_raw": "Arrayán, Ñire",
    "notes": "Árbol de gran porte del bosque andino-patagónico.",
    "flowering_season": "Oct-Nov",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "coihue"
  },
  {
    "common_name": "Roble pellín",
    "scientific_name": "Nothofagus obliqua",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 2000,
    "height_max_cm": 3500,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Patagonia"
    ],
    "is_native": true,
    "uses": [
      "Bosque nativo",
      "Parques"
    ],
    "compatible_with_raw": "Coihue, Arrayán",
    "notes": "Caducifolio con hermoso follaje otoñal.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "roble-pellin"
  },
  {
    "common_name": "Radal",
    "scientific_name": "Lomatia hirsuta",
    "plant_type": "Árbol",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1200,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Patagonia"
    ],
    "is_native": true,
    "uses": [
      "Bordes",
      "Bosque nativo"
    ],
    "compatible_with_raw": "Arrayán, Notro",
    "notes": "Flores blancas fragantes. Muy ornamental.",
    "flowering_season": "Nov-Dic",
    "tags": [
      "árbol",
      "nativa",
      "aromática",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "radal"
  },
  {
    "common_name": "Notro",
    "scientific_name": "Embothrium coccineum",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1000,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Patagonia"
    ],
    "is_native": true,
    "uses": [
      "Focal",
      "Bosque patagónico"
    ],
    "compatible_with_raw": "Radal, Arrayán",
    "notes": "Flores rojas intensas. Floración espectacular.",
    "flowering_season": "Nov-Dic",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "notro"
  },
  {
    "common_name": "Maitén",
    "scientific_name": "Maytenus boaria",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 800,
    "height_max_cm": 1500,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Patagonia",
      "Cuyo"
    ],
    "is_native": true,
    "uses": [
      "Sombra",
      "Alineación"
    ],
    "compatible_with_raw": "Arrayán, Ñire",
    "notes": "Hojas colgantes características. Muy ornamental.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "maiten"
  },
  {
    "common_name": "Molle",
    "scientific_name": "Schinus areira",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1000,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NOA",
      "Cuyo"
    ],
    "is_native": true,
    "uses": [
      "Sombra xerofítica",
      "Alineación"
    ],
    "compatible_with_raw": "Aguaribay, Algarrobo",
    "notes": "Árbol llorón muy adaptable a zonas áridas.",
    "flowering_season": "Oct-Dic",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "molle"
  },
  {
    "common_name": "Aguaribay",
    "scientific_name": "Schinus molle",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1000,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NOA",
      "Cuyo"
    ],
    "is_native": true,
    "uses": [
      "Sombra xerofítica"
    ],
    "compatible_with_raw": "Molle, Algarrobo",
    "notes": "Frutos rojizos ornamentales. Pimienta rosada.",
    "flowering_season": "Oct-Dic",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "aguaribay"
  },
  {
    "common_name": "Tala",
    "scientific_name": "Celtis ehrenbergiana",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1000,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Cortinas",
      "Fauna"
    ],
    "compatible_with_raw": "Espinillo, Sombra de toro",
    "notes": "Fundamental para fauna pampeana nativa.",
    "flowering_season": "Ago-Sep",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "tala"
  },
  {
    "common_name": "Espinillo",
    "scientific_name": "Vachellia caven",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 600,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Cercos vivos",
      "Fauna"
    ],
    "compatible_with_raw": "Tala, Chañar, Molle",
    "notes": "Flores amarillas fragantes. Muy resistente.",
    "flowering_season": "Jul-Sep",
    "tags": [
      "árbol",
      "nativa",
      "aromática",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "espinillo"
  },
  {
    "common_name": "Chañar",
    "scientific_name": "Geoffroea decorticans",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 400,
    "height_max_cm": 800,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NOA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Sombra xerofítica"
    ],
    "compatible_with_raw": "Algarrobo, Espinillo",
    "notes": "Corteza que se desprende en tiras. Frutos comestibles.",
    "flowering_season": "Ago-Sep",
    "tags": [
      "árbol",
      "nativa",
      "comestible",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "chanar"
  },
  {
    "common_name": "Mistol",
    "scientific_name": "Ziziphus mistol",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 400,
    "height_max_cm": 800,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NOA"
    ],
    "is_native": true,
    "uses": [
      "Focal xerofítico"
    ],
    "compatible_with_raw": "Algarrobo, Molle",
    "notes": "Frutos comestibles. Árbol típico del monte chaqueño.",
    "flowering_season": "Oct-Nov",
    "tags": [
      "árbol",
      "nativa",
      "comestible",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "mistol"
  },
  {
    "common_name": "Sombra de toro",
    "scientific_name": "Jodina rhombifolia",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 700,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "NOA"
    ],
    "is_native": true,
    "uses": [
      "Cercos",
      "Cortinas"
    ],
    "compatible_with_raw": "Tala, Espinillo",
    "notes": "Hojas con espinas. Excelente para cercos naturales.",
    "flowering_season": "Ago-Oct",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "sombra-de-toro"
  },
  {
    "common_name": "Palmera pindó",
    "scientific_name": "Syagrus romanzoffiana",
    "plant_type": "Palmera",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1000,
    "height_max_cm": 1500,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Alineación",
      "Focal",
      "Tropical"
    ],
    "compatible_with_raw": "Ceibo, Palo borracho",
    "notes": "Única palmera nativa del litoral. Muy cultivada.",
    "flowering_season": "Oct-Nov",
    "tags": [
      "tropical",
      "palmera",
      "nativa"
    ],
    "garden_styles": [
      "tropical",
      "natural"
    ],
    "slug": "palmera-pindo"
  },
  {
    "common_name": "Cina-cina",
    "scientific_name": "Parkinsonia aculeata",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 800,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NOA",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Cercos",
      "Árido"
    ],
    "compatible_with_raw": "Algarrobo, Chañar",
    "notes": "Flores amarillas abundantes. Tolera suelos pobres.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "cina-cina"
  },
  {
    "common_name": "Timbo colorado",
    "scientific_name": "Enterolobium contortisiliquum",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1500,
    "height_max_cm": 2500,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Gran sombra",
      "Parques"
    ],
    "compatible_with_raw": "Lapacho, Tipa",
    "notes": "Vaina en espiral característica. Árbol monumental.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "timbo-colorado"
  },
  {
    "common_name": "Ibirá-pitá",
    "scientific_name": "Peltophorum dubium",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1000,
    "height_max_cm": 2000,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Sombra",
      "Focal"
    ],
    "compatible_with_raw": "Lapacho, Tipa blanca",
    "notes": "Flores amarillas en racimos. Muy vistoso.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "ibira-pita"
  },
  {
    "common_name": "Curupay",
    "scientific_name": "Anadenanthera colubrina",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1000,
    "height_max_cm": 2000,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NOA",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Sombra",
      "Parques"
    ],
    "compatible_with_raw": "Lapacho, Quebracho",
    "notes": "Vaina retorcida ornamental. Madera muy valiosa.",
    "flowering_season": "Oct-Nov",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "curupay"
  },
  {
    "common_name": "Sauce llorón",
    "scientific_name": "Salix babylonica",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "twice_week",
    "care_level": "expert",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1000,
    "height_max_cm": 2000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes de agua",
      "Sombra"
    ],
    "compatible_with_raw": "Ceibo, Álamo, Plátano",
    "notes": "Ideal junto a espejos de agua o arroyos.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "sauce-lloron"
  },
  {
    "common_name": "Plátano",
    "scientific_name": "Platanus × hispanica",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 2000,
    "height_max_cm": 3000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Alineación urbana",
      "Gran sombra"
    ],
    "compatible_with_raw": "Tipa, Liquidámbar",
    "notes": "El árbol de boulevares por excelencia.",
    "flowering_season": "Mar-May",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "platano"
  },
  {
    "common_name": "Magnolia",
    "scientific_name": "Magnolia grandiflora",
    "plant_type": "Árbol",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1000,
    "height_max_cm": 2000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Focal",
      "Sombra"
    ],
    "compatible_with_raw": "Hortensia, Camellia",
    "notes": "Flores blancas enormes y fragantes. Hoja perenne.",
    "flowering_season": "Oct-Dic",
    "tags": [
      "árbol",
      "aromática",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "magnolia"
  },
  {
    "common_name": "Liquidámbar",
    "scientific_name": "Liquidambar styraciflua",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1500,
    "height_max_cm": 2500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Otoño",
      "Alineación"
    ],
    "compatible_with_raw": "Ginkgo, Arce",
    "notes": "Colores otoñales excepcionales: rojo, naranja, amarillo.",
    "flowering_season": "Mar-May",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "liquidambar"
  },
  {
    "common_name": "Ginkgo",
    "scientific_name": "Ginkgo biloba",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1500,
    "height_max_cm": 3000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Focal",
      "Alineación"
    ],
    "compatible_with_raw": "Liquidámbar, Arce",
    "notes": "Árbol fósil viviente. Amarillo dorado en otoño.",
    "flowering_season": "Abr-May",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "ginkgo"
  },
  {
    "common_name": "Arce rojo",
    "scientific_name": "Acer rubrum",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1500,
    "height_max_cm": 2500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": false,
    "uses": [
      "Otoño",
      "Focal"
    ],
    "compatible_with_raw": "Liquidámbar, Ginkgo",
    "notes": "Hojas rojas brillantes en otoño. Muy ornamental.",
    "flowering_season": "Ago-Sep",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "arce-rojo"
  },
  {
    "common_name": "Olivo",
    "scientific_name": "Olea europaea",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Cuyo",
      "NOA"
    ],
    "is_native": false,
    "uses": [
      "Focal mediterráneo",
      "Productivo"
    ],
    "compatible_with_raw": "Lavanda, Romero, Ciprés",
    "notes": "Porte elegante plateado. Ideal para jardín mediterráneo.",
    "flowering_season": "Abr-Jun",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "mediterranean"
    ],
    "slug": "olivo"
  },
  {
    "common_name": "Ciprés de Lambert",
    "scientific_name": "Cupressus macrocarpa",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": false,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1500,
    "height_max_cm": 2500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Cortinas",
      "Alineación"
    ],
    "compatible_with_raw": "Olivo, Ciprés italiano",
    "notes": "Cortavientos muy eficiente. Rápido crecimiento.",
    "flowering_season": "No florece",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "cipres-de-lambert"
  },
  {
    "common_name": "Ciprés italiano",
    "scientific_name": "Cupressus sempervirens",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": false,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1500,
    "height_max_cm": 3000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Alineación",
      "Puntuación vertical"
    ],
    "compatible_with_raw": "Olivo, Ciprés de Lambert",
    "notes": "Silueta columnar icónica. Ideal para alineaciones formales.",
    "flowering_season": "No florece",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "tropical",
      "formal"
    ],
    "slug": "cipres-italiano"
  },
  {
    "common_name": "Brachychiton",
    "scientific_name": "Brachychiton populneus",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1000,
    "height_max_cm": 1800,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NOA"
    ],
    "is_native": false,
    "uses": [
      "Sombra resistente",
      "Urbano"
    ],
    "compatible_with_raw": "Olivo, Molle",
    "notes": "Muy resistente a calor y sequía. Flores acampanadas.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "brachychiton"
  },
  {
    "common_name": "Washingtonia",
    "scientific_name": "Washingtonia robusta",
    "plant_type": "Palmera",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": false,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1500,
    "height_max_cm": 2500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NOA"
    ],
    "is_native": false,
    "uses": [
      "Alineación tropical",
      "Focal"
    ],
    "compatible_with_raw": "Palmera canaria, Pindó",
    "notes": "Palmera alta y esbelta para grandes avenidas.",
    "flowering_season": "Variable",
    "tags": [
      "tropical",
      "palmera",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "washingtonia"
  },
  {
    "common_name": "Palmera canaria",
    "scientific_name": "Phoenix canariensis",
    "plant_type": "Palmera",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1000,
    "height_max_cm": 1500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Focal",
      "Entradas",
      "Alineación"
    ],
    "compatible_with_raw": "Washingtonia, Pindó",
    "notes": "Porte robusto y majestuoso. Muy utilizada en accesos.",
    "flowering_season": "Abr-Jun",
    "tags": [
      "tropical",
      "palmera",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "palmera-canaria"
  },
  {
    "common_name": "Casuarina",
    "scientific_name": "Casuarina cunninghamiana",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": false,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1500,
    "height_max_cm": 2500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NOA"
    ],
    "is_native": false,
    "uses": [
      "Cortinas",
      "Costas"
    ],
    "compatible_with_raw": "Ciprés, Álamo",
    "notes": "Resistente al viento y suelos pobres. Rápido crecimiento.",
    "flowering_season": "Variable",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "casuarina"
  },
  {
    "common_name": "Álamo plateado",
    "scientific_name": "Populus alba",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 2000,
    "height_max_cm": 3500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Cortinas",
      "Alineación"
    ],
    "compatible_with_raw": "Sauce llorón, Álamo negro",
    "notes": "Reverso de hoja plateado muy llamativo.",
    "flowering_season": "Ago-Sep",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "alamo-plateado"
  },
  {
    "common_name": "Fresno europeo",
    "scientific_name": "Fraxinus excelsior",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 2000,
    "height_max_cm": 3000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": false,
    "uses": [
      "Alineación",
      "Gran sombra"
    ],
    "compatible_with_raw": "Plátano, Tipa",
    "notes": "Caducifolio con buen follaje otoñal. Muy adaptable.",
    "flowering_season": "Mar-May",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "fresno-europeo"
  },
  {
    "common_name": "Calafate",
    "scientific_name": "Berberis microphylla",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Patagonia"
    ],
    "is_native": true,
    "uses": [
      "Cercos",
      "Barreras",
      "Rocallas"
    ],
    "compatible_with_raw": "Notro, Radal, Palo blanco",
    "notes": "Bayas azul-negras comestibles. Espinoso.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "arbusto",
      "nativa",
      "comestible"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "calafate"
  },
  {
    "common_name": "Duranta",
    "scientific_name": "Duranta erecta",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 200,
    "height_max_cm": 400,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Setos",
      "Fondos"
    ],
    "compatible_with_raw": "Lantana, Iochroma",
    "notes": "Flores lila y frutos dorados simultáneos. Muy vistosa.",
    "flowering_season": "Nov-Abr",
    "tags": [
      "arbusto",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "duranta"
  },
  {
    "common_name": "Verbena de Buenos Aires",
    "scientific_name": "Verbena bonariensis",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 80,
    "height_max_cm": 120,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Bordes",
      "Naturalista"
    ],
    "compatible_with_raw": "Esparto, Salvia, Gaura",
    "notes": "Flores lila en tallos etéreos. Se auto-siembra.",
    "flowering_season": "Oct-Abr",
    "tags": [
      "nativa",
      "flores",
      "herbácea"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "verbena-de-buenos-aires"
  },
  {
    "common_name": "Iochroma",
    "scientific_name": "Iochroma australe",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 200,
    "height_max_cm": 400,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NOA"
    ],
    "is_native": true,
    "uses": [
      "Fondos",
      "Sombra parcial"
    ],
    "compatible_with_raw": "Duranta, Brunfelsia",
    "notes": "Flores tubulares azul-violáceas. Atrae colibríes.",
    "flowering_season": "Oct-Mar",
    "tags": [
      "arbusto",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "iochroma"
  },
  {
    "common_name": "Cedrón del monte",
    "scientific_name": "Aloysia gratissima",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 150,
    "height_max_cm": 300,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "NOA"
    ],
    "is_native": true,
    "uses": [
      "Aromático",
      "Medicinal"
    ],
    "compatible_with_raw": "Peperina, Poleo",
    "notes": "Flores blancas fragantes. Aromático medicinal.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "arbusto",
      "nativa",
      "aromática",
      "medicinal"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "cedron-del-monte"
  },
  {
    "common_name": "Chilca",
    "scientific_name": "Baccharis salicifolia",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 300,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": true,
    "uses": [
      "Ripario",
      "Naturalista"
    ],
    "compatible_with_raw": "Cortadera, Carqueja",
    "notes": "Crece junto a cursos de agua. Muy adaptable.",
    "flowering_season": "Ene-Mar",
    "tags": [
      "arbusto",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "chilca"
  },
  {
    "common_name": "Carqueja",
    "scientific_name": "Baccharis trimera",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 100,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Medicinal",
      "Naturalista"
    ],
    "compatible_with_raw": "Chilca, Peperina",
    "notes": "Tallos alados característicos. Muy medicinal.",
    "flowering_season": "Feb-Abr",
    "tags": [
      "arbusto",
      "nativa",
      "medicinal"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "carqueja"
  },
  {
    "common_name": "Moradillo",
    "scientific_name": "Schinus fasciculatus",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Xerofítico",
      "Cercos"
    ],
    "compatible_with_raw": "Piquillín, Sombra de toro",
    "notes": "Resistentísimo a suelos pobres y secos.",
    "flowering_season": "Ago-Oct",
    "tags": [
      "arbusto",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "moradillo"
  },
  {
    "common_name": "Piquillín",
    "scientific_name": "Condalia microphylla",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": true,
    "uses": [
      "Cercos",
      "Fauna"
    ],
    "compatible_with_raw": "Calafate, Espinillo",
    "notes": "Frutos comestibles. Excelente para fauna nativa.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "arbusto",
      "nativa",
      "comestible"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "piquillin"
  },
  {
    "common_name": "Lantana",
    "scientific_name": "Lantana camara",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Masivos",
      "Mariposas"
    ],
    "compatible_with_raw": "Duranta, Plumbago",
    "notes": "Flores multicolor que cambian con la edad. Atrae mariposas.",
    "flowering_season": "Todo el año",
    "tags": [
      "arbusto",
      "atractora-fauna",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "lantana"
  },
  {
    "common_name": "Pitosporo",
    "scientific_name": "Pittosporum tobira",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 200,
    "height_max_cm": 400,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Setos",
      "Fondos"
    ],
    "compatible_with_raw": "Fotinia, Ligustro",
    "notes": "Perfume a naranja en flor. Muy adaptable.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "pitosporo"
  },
  {
    "common_name": "Fotinia",
    "scientific_name": "Photinia × fraseri",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 300,
    "height_max_cm": 500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Setos",
      "Cercos vivos"
    ],
    "compatible_with_raw": "Pitosporo, Boj",
    "notes": "Brotes rojos llamativos. Excelente para setos recortados.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "fotinia"
  },
  {
    "common_name": "Rosal",
    "scientific_name": "Rosa spp.",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Rosedales",
      "Focal"
    ],
    "compatible_with_raw": "Lavanda, Salvia, Nepeta",
    "notes": "Infinita variedad de colores. Requiere cuidado regular.",
    "flowering_season": "Oct-Abr",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "rosal"
  },
  {
    "common_name": "Lavanda",
    "scientific_name": "Lavandula angustifolia",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 100,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes aromáticos",
      "Mediterráneo"
    ],
    "compatible_with_raw": "Romero, Salvia, Olivo",
    "notes": "Fragancia incomparable. Repele mosquitos.",
    "flowering_season": "Oct-Dic",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "mediterranean"
    ],
    "slug": "lavanda"
  },
  {
    "common_name": "Romero",
    "scientific_name": "Salvia rosmarinus",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 150,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Aromático",
      "Mediterráneo",
      "Bordes"
    ],
    "compatible_with_raw": "Lavanda, Tomillo, Olivo",
    "notes": "Aromático culinario y ornamental. Muy resistente.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "arbusto",
      "aromática",
      "exótica"
    ],
    "garden_styles": [
      "mediterranean"
    ],
    "slug": "romero"
  },
  {
    "common_name": "Boj",
    "scientific_name": "Buxus sempervirens",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 400,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Setos formales",
      "Topiaria"
    ],
    "compatible_with_raw": "Tejo, Ligustro",
    "notes": "Ideal para formas recortadas y jardines formales.",
    "flowering_season": "Mar-Abr",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "formal"
    ],
    "slug": "boj"
  },
  {
    "common_name": "Ligustro",
    "scientific_name": "Ligustrum lucidum",
    "plant_type": "Árbol",
    "light": "partial_shade",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Setos",
      "Cortinas",
      "Alineación"
    ],
    "compatible_with_raw": "Fotinia, Pitosporo",
    "notes": "Muy rústico y rápido. Florece abundantemente.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "ligustro"
  },
  {
    "common_name": "Plumbago",
    "scientific_name": "Plumbago auriculata",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Azul focal"
    ],
    "compatible_with_raw": "Lantana, Duranta",
    "notes": "Flores azul celeste únicas. Larga floración estival.",
    "flowering_season": "Nov-Abr",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "plumbago"
  },
  {
    "common_name": "Hortensia",
    "scientific_name": "Hydrangea macrophylla",
    "plant_type": "Arbusto",
    "light": "shade",
    "water": "twice_week",
    "care_level": "expert",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Sombra",
      "Bordes húmedos"
    ],
    "compatible_with_raw": "Camellia, Azalea, Helechos",
    "notes": "Color según pH del suelo: azul ácido, rosa alcalino.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "hortensia"
  },
  {
    "common_name": "Azalea",
    "scientific_name": "Rhododendron spp.",
    "plant_type": "Arbusto",
    "light": "shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Sombra",
      "Bosques de jardín"
    ],
    "compatible_with_raw": "Hortensia, Camellia",
    "notes": "Explosión de color primaveral bajo árboles.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "azalea"
  },
  {
    "common_name": "Camellia",
    "scientific_name": "Camellia japonica",
    "plant_type": "Arbusto",
    "light": "shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 200,
    "height_max_cm": 500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Sombra",
      "Jardín invernal"
    ],
    "compatible_with_raw": "Azalea, Hortensia",
    "notes": "Florece en invierno. Flores perfectas y elegantes.",
    "flowering_season": "May-Sep",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "camellia"
  },
  {
    "common_name": "Abelia",
    "scientific_name": "Abelia × grandiflora",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Setos",
      "Bordes informales"
    ],
    "compatible_with_raw": "Budleja, Fotinia",
    "notes": "Larga floración. Atrae mariposas y abejas.",
    "flowering_season": "Oct-Mar",
    "tags": [
      "arbusto",
      "atractora-fauna",
      "exótica"
    ],
    "garden_styles": [
      "formal"
    ],
    "slug": "abelia"
  },
  {
    "common_name": "Budleja",
    "scientific_name": "Buddleja davidii",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 150,
    "height_max_cm": 300,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Atractor de mariposas"
    ],
    "compatible_with_raw": "Verbena, Salvia",
    "notes": "Llamada arbusto mariposas. Muy aromática.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "arbusto",
      "aromática",
      "atractora-fauna",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "budleja"
  },
  {
    "common_name": "Senecio gris",
    "scientific_name": "Senecio cineraria",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Follaje plateado",
      "Bordes"
    ],
    "compatible_with_raw": "Lavanda, Salvia, Rosal",
    "notes": "Follaje plateado ornamental. Contraste ideal con flores.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "senecio-gris"
  },
  {
    "common_name": "Nandina",
    "scientific_name": "Nandina domestica",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Follaje ornamental",
      "Oriental"
    ],
    "compatible_with_raw": "Camellia, Azalea",
    "notes": "Follaje rojizo en invierno. Frutos rojos persistentes.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "nandina"
  },
  {
    "common_name": "Agapanto",
    "scientific_name": "Agapanthus africanus",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 80,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Masivos",
      "Bordes",
      "Alineación"
    ],
    "compatible_with_raw": "Iris, Canna, Hemerocallis",
    "notes": "Flores azules o blancas. Muy resistente y duradera.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "agapanto"
  },
  {
    "common_name": "Flor de lis",
    "scientific_name": "Hemerocallis spp.",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 80,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Masivos"
    ],
    "compatible_with_raw": "Agapanto, Iris",
    "notes": "Cada flor dura un día pero florecen continuamente.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "flor-de-lis"
  },
  {
    "common_name": "Iris germánico",
    "scientific_name": "Iris germanica",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 40,
    "height_max_cm": 80,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Coleccionismo"
    ],
    "compatible_with_raw": "Agapanto, Hemerocallis",
    "notes": "Innumerables variedades y colores. Muy elegante.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "iris-germanico"
  },
  {
    "common_name": "Canna",
    "scientific_name": "Canna × generalis",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "twice_week",
    "care_level": "expert",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 80,
    "height_max_cm": 150,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Fondos",
      "Tropical"
    ],
    "compatible_with_raw": "Heliconia, Banano ornamental",
    "notes": "Flores llamativas y follaje grande con venas.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "canna"
  },
  {
    "common_name": "Salvia azul",
    "scientific_name": "Salvia azurea",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 60,
    "height_max_cm": 120,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": true,
    "uses": [
      "Bordes",
      "Naturalista"
    ],
    "compatible_with_raw": "Verbena, Esparto, Gaura",
    "notes": "Flores azul celeste en espigas. Muy resistente.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "nativa",
      "flores",
      "herbácea"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "salvia-azul"
  },
  {
    "common_name": "Salvia nemorosa",
    "scientific_name": "Salvia nemorosa",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes formales",
      "Color azul"
    ],
    "compatible_with_raw": "Lavanda, Agapanto",
    "notes": "Espléndido azul-violáceo. Rebrota si se poda.",
    "flowering_season": "Oct-Dic",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "formal"
    ],
    "slug": "salvia-nemorosa"
  },
  {
    "common_name": "Gaura",
    "scientific_name": "Gaura lindheimeri",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 60,
    "height_max_cm": 120,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes ondulantes",
      "Etéreo"
    ],
    "compatible_with_raw": "Verbena, Esparto",
    "notes": "Flores blancas o rosadas que parecen mariposas.",
    "flowering_season": "Oct-Abr",
    "tags": [
      "flores",
      "herbácea",
      "atractora-fauna",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "gaura"
  },
  {
    "common_name": "Rudbeckia",
    "scientific_name": "Rudbeckia fulgida",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 80,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Masivos",
      "Naturalista"
    ],
    "compatible_with_raw": "Echinacea, Salvia",
    "notes": "Flores amarillas con centro negro. Muy rústica.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "rudbeckia"
  },
  {
    "common_name": "Echinacea",
    "scientific_name": "Echinacea purpurea",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 60,
    "height_max_cm": 100,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Masivos",
      "Medicinal"
    ],
    "compatible_with_raw": "Rudbeckia, Salvia",
    "notes": "Coneflower purpúreo. Medicinal e insecticida natural.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "medicinal",
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "echinacea"
  },
  {
    "common_name": "Astilbe",
    "scientific_name": "Astilbe × arendsii",
    "plant_type": "Herbácea",
    "light": "shade",
    "water": "twice_week",
    "care_level": "expert",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 40,
    "height_max_cm": 80,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": false,
    "uses": [
      "Sombra húmeda",
      "Bordes"
    ],
    "compatible_with_raw": "Hostas, Helecho",
    "notes": "Penachos plumosos en rojo, rosa o blanco.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "astilbe"
  },
  {
    "common_name": "Hostas",
    "scientific_name": "Hosta spp.",
    "plant_type": "Herbácea",
    "light": "shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 80,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Cobertura sombra",
      "Follaje"
    ],
    "compatible_with_raw": "Astilbe, Helecho",
    "notes": "Follaje exuberante. Reina de los jardines sombríos.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "hostas"
  },
  {
    "common_name": "Agave",
    "scientific_name": "Agave americana",
    "plant_type": "Suculenta",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": false,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NOA",
      "Cuyo"
    ],
    "is_native": false,
    "uses": [
      "Focal xerofítico",
      "Dramático"
    ],
    "compatible_with_raw": "Yuca, Opuntia",
    "notes": "Roseta imponente. Florece una sola vez.",
    "flowering_season": "Variable",
    "tags": [
      "suculenta",
      "xerofítica",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "agave"
  },
  {
    "common_name": "Yuca",
    "scientific_name": "Yucca gloriosa",
    "plant_type": "Suculenta",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NOA",
      "Cuyo",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Focal",
      "Xerofítico"
    ],
    "compatible_with_raw": "Agave, Dasylirion",
    "notes": "Espigas blancas monumentales. Muy arquitectónica.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "suculenta",
      "xerofítica",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "yuca"
  },
  {
    "common_name": "Dasylirion",
    "scientific_name": "Dasylirion wheeleri",
    "plant_type": "Suculenta",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 80,
    "height_max_cm": 120,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NOA",
      "Cuyo"
    ],
    "is_native": false,
    "uses": [
      "Focal",
      "Xerofítico"
    ],
    "compatible_with_raw": "Agave, Yuca",
    "notes": "Roseta de hojas finas con dientes. Muy ornamental.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "suculenta",
      "xerofítica",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "dasylirion"
  },
  {
    "common_name": "Sedum",
    "scientific_name": "Sedum spectabile",
    "plant_type": "Suculenta",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 50,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Rocallas",
      "Bordes secos"
    ],
    "compatible_with_raw": "Sempervivum, Echeveria",
    "notes": "Flores rosadas en sombrilla. Atrae mariposas en otoño.",
    "flowering_season": "Feb-Abr",
    "tags": [
      "suculenta",
      "xerofítica",
      "atractora-fauna",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "sedum"
  },
  {
    "common_name": "Echeveria",
    "scientific_name": "Echeveria spp.",
    "plant_type": "Suculenta",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": false,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 10,
    "height_max_cm": 20,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Rocallas",
      "Macetas",
      "Tapizantes"
    ],
    "compatible_with_raw": "Sedum, Sempervivum",
    "notes": "Rosetas perfectas. Infinitas formas y colores.",
    "flowering_season": "Variable",
    "tags": [
      "suculenta",
      "xerofítica",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "echeveria"
  },
  {
    "common_name": "Pita",
    "scientific_name": "Furcraea foetida",
    "plant_type": "Suculenta",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": false,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NOA"
    ],
    "is_native": true,
    "uses": [
      "Focal",
      "Xerofítico"
    ],
    "compatible_with_raw": "Agave, Yuca",
    "notes": "Roseta gigante. Planta nativa de gran impacto.",
    "flowering_season": "Variable",
    "tags": [
      "nativa",
      "suculenta",
      "xerofítica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "pita"
  },
  {
    "common_name": "Petunia",
    "scientific_name": "Petunia × hybrida",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 20,
    "height_max_cm": 40,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Macetas",
      "Bordes",
      "Colgantes"
    ],
    "compatible_with_raw": "Zinnia, Impatiens",
    "notes": "Floración abundantísima. Ideal para macetas y balcones.",
    "flowering_season": "Oct-Abr",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "petunia"
  },
  {
    "common_name": "Pensamientos",
    "scientific_name": "Viola × wittrockiana",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": false,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 15,
    "height_max_cm": 25,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Invierno-primavera",
      "Bordes"
    ],
    "compatible_with_raw": "Ranúnculo, Margarita",
    "notes": "Floración invernal única. Colores muy variados.",
    "flowering_season": "May-Ago",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "pensamientos"
  },
  {
    "common_name": "Zinnia",
    "scientific_name": "Zinnia elegans",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 80,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Corte",
      "Verano"
    ],
    "compatible_with_raw": "Girasol, Cosmos",
    "notes": "Colores vibrantes todo el verano. Muy fácil y resistente.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "zinnia"
  },
  {
    "common_name": "Girasol",
    "scientific_name": "Helianthus annuus",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 300,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": true,
    "uses": [
      "Fondos",
      "Pantallas naturales"
    ],
    "compatible_with_raw": "Zinnia, Cosmos",
    "notes": "Sigue el sol. Atrae pájaros y polinizadores.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "nativa",
      "flores",
      "herbácea",
      "atractora-fauna"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "girasol"
  },
  {
    "common_name": "Cosmos",
    "scientific_name": "Cosmos bipinnatus",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 60,
    "height_max_cm": 120,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Naturalista",
      "Bordes etéreos"
    ],
    "compatible_with_raw": "Zinnia, Girasol",
    "notes": "Flores delicadas en rosa, blanco y fucsia. Se auto-siembra.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "cosmos"
  },
  {
    "common_name": "Caléndula",
    "scientific_name": "Calendula officinalis",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Invierno-primavera",
      "Medicinal"
    ],
    "compatible_with_raw": "Pensamiento, Margarita",
    "notes": "Florece en invierno. Medicinal y comestible.",
    "flowering_season": "Abr-Oct",
    "tags": [
      "exótica",
      "medicinal",
      "comestible",
      "flores",
      "herbácea"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "calendula"
  },
  {
    "common_name": "Margarita",
    "scientific_name": "Argyranthemum frutescens",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Macetas"
    ],
    "compatible_with_raw": "Petunia, Agapanto",
    "notes": "Floración larga y abundante. Clásica e irresistible.",
    "flowering_season": "Sep-Abr",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "margarita"
  },
  {
    "common_name": "Impatiens",
    "scientific_name": "Impatiens walleriana",
    "plant_type": "Herbácea",
    "light": "shade",
    "water": "twice_week",
    "care_level": "expert",
    "flowering": true,
    "evergreen": false,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 20,
    "height_max_cm": 50,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Sombra",
      "Color"
    ],
    "compatible_with_raw": "Begonia, Hostas",
    "notes": "La reina del jardín en sombra. Colores brillantes.",
    "flowering_season": "Oct-Abr",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "impatiens"
  },
  {
    "common_name": "Begonia",
    "scientific_name": "Begonia × semperflorens",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": false,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 20,
    "height_max_cm": 30,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Macetas",
      "Sombra"
    ],
    "compatible_with_raw": "Impatiens, Alegría",
    "notes": "Muy duradera. Funciona en sol y semisombra.",
    "flowering_season": "Oct-Abr",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "begonia"
  },
  {
    "common_name": "Alegría del hogar",
    "scientific_name": "Impatiens noli-tangere",
    "plant_type": "Herbácea",
    "light": "shade",
    "water": "twice_week",
    "care_level": "expert",
    "flowering": true,
    "evergreen": false,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Sombra",
      "Naturalista"
    ],
    "compatible_with_raw": "Impatiens, Begonia",
    "notes": "Se auto-siembra generosamente en sombra húmeda.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "alegria-del-hogar"
  },
  {
    "common_name": "Coreopsis",
    "scientific_name": "Coreopsis tinctoria",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Masivos amarillos",
      "Naturalista"
    ],
    "compatible_with_raw": "Rudbeckia, Cosmos",
    "notes": "Flores amarillas con centro burdeos. Muy prolífica.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "coreopsis"
  },
  {
    "common_name": "Esparto",
    "scientific_name": "Nassella tenuissima",
    "plant_type": "Gramínea",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": true,
    "uses": [
      "Naturalista",
      "Movimiento"
    ],
    "compatible_with_raw": "Gaura, Verbena, Salvia",
    "notes": "Gramínea ondulante de aspecto etéreo y sedoso.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "nativa",
      "ornamental",
      "gramínea"
    ],
    "garden_styles": [
      "tropical",
      "natural"
    ],
    "slug": "esparto"
  },
  {
    "common_name": "Paja colorada",
    "scientific_name": "Cortaderia selloana",
    "plant_type": "Gramínea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 150,
    "height_max_cm": 300,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": true,
    "uses": [
      "Focal",
      "Masivos"
    ],
    "compatible_with_raw": "Esparto, Carex",
    "notes": "Penachos blancos monumentales. Gran impacto.",
    "flowering_season": "Ene-Mar",
    "tags": [
      "nativa",
      "ornamental",
      "gramínea"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "paja-colorada"
  },
  {
    "common_name": "Festuca azul",
    "scientific_name": "Festuca glauca",
    "plant_type": "Gramínea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 20,
    "height_max_cm": 30,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Tapizantes",
      "Rocallas"
    ],
    "compatible_with_raw": "Esparto, Sedum",
    "notes": "Follaje azul-plateado muy llamativo. Cojinete compacto.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "ornamental",
      "gramínea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "festuca-azul"
  },
  {
    "common_name": "Carex",
    "scientific_name": "Carex testacea",
    "plant_type": "Gramínea",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 50,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes húmedos",
      "Sombra"
    ],
    "compatible_with_raw": "Hostas, Astilbe",
    "notes": "Follaje bronceado-anaranjado. Muy ornamental.",
    "flowering_season": "Oct-Nov",
    "tags": [
      "ornamental",
      "gramínea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "carex"
  },
  {
    "common_name": "Miscanthus",
    "scientific_name": "Miscanthus sinensis",
    "plant_type": "Gramínea",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 150,
    "height_max_cm": 250,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Pantallas",
      "Fondos"
    ],
    "compatible_with_raw": "Paja colorada, Pennisetum",
    "notes": "Panículas plumosas en verano-otoño. Vistosísima.",
    "flowering_season": "Feb-May",
    "tags": [
      "ornamental",
      "gramínea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "miscanthus"
  },
  {
    "common_name": "Pennisetum",
    "scientific_name": "Pennisetum setaceum",
    "plant_type": "Gramínea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 100,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NOA"
    ],
    "is_native": false,
    "uses": [
      "Masivos",
      "Bordes"
    ],
    "compatible_with_raw": "Esparto, Festuca",
    "notes": "Espigas color burdeos o rosadas. Muy decorativa.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "ornamental",
      "gramínea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "pennisetum"
  },
  {
    "common_name": "Bambú enano",
    "scientific_name": "Pleioblastus pygmaeus",
    "plant_type": "Gramínea",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": false,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 80,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Tapizante",
      "Contenedor"
    ],
    "compatible_with_raw": "Bambú, Hostas",
    "notes": "Tapizante densa y rústica. Controlar expansión.",
    "flowering_season": "Raro",
    "tags": [
      "ornamental",
      "gramínea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "bambu-enano"
  },
  {
    "common_name": "Bambú",
    "scientific_name": "Phyllostachys aurea",
    "plant_type": "Gramínea",
    "light": "partial_shade",
    "water": "twice_week",
    "care_level": "expert",
    "flowering": false,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 400,
    "height_max_cm": 1000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Pantallas",
      "Privacidad"
    ],
    "compatible_with_raw": "Miscanthus, Bambú negro",
    "notes": "Cañas doradas características. Control de rizomas.",
    "flowering_season": "Raro",
    "tags": [
      "ornamental",
      "gramínea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "bambu"
  },
  {
    "common_name": "Glicina",
    "scientific_name": "Wisteria sinensis",
    "plant_type": "Trepadora",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas",
      "Muros",
      "Espectacular"
    ],
    "compatible_with_raw": "Jazmín, Rosa trepadora",
    "notes": "Racimos violáceos perfumados. Una de las más impactantes.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "glicina"
  },
  {
    "common_name": "Jazmín del país",
    "scientific_name": "Jasminum officinale",
    "plant_type": "Trepadora",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas",
      "Rejas",
      "Perfume"
    ],
    "compatible_with_raw": "Glicina, Pasionaria",
    "notes": "Perfume nocturno incomparable. Clásico del jardín.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "jazmin-del-pais"
  },
  {
    "common_name": "Pasionaria",
    "scientific_name": "Passiflora caerulea",
    "plant_type": "Trepadora",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1000,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Pérgolas",
      "Rústico"
    ],
    "compatible_with_raw": "Bignonia, Enredadera Virginia",
    "notes": "Flores exóticas azul-blanco. Crece rápido.",
    "flowering_season": "Oct-Mar",
    "tags": [
      "enredadera",
      "trepadora",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "pasionaria"
  },
  {
    "common_name": "Bignonia",
    "scientific_name": "Bignonia capreolata",
    "plant_type": "Trepadora",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas",
      "Muros"
    ],
    "compatible_with_raw": "Pasionaria, Glicina",
    "notes": "Flores anaranjadas llamativas. Muy vigorosa.",
    "flowering_season": "Oct-Dic",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "bignonia"
  },
  {
    "common_name": "Enredadera de Virginia",
    "scientific_name": "Parthenocissus quinquefolia",
    "plant_type": "Trepadora",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1000,
    "height_max_cm": 2000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Muros",
      "Tapizado"
    ],
    "compatible_with_raw": "Hiedra, Bignonia",
    "notes": "Otoño en rojos y carmesíes intensos. Cubre muros.",
    "flowering_season": "Jun-Jul",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "enredadera-de-virginia"
  },
  {
    "common_name": "Hiedra Inglesa",
    "scientific_name": "Hedera helix",
    "plant_type": "Trepadora",
    "light": "shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Muros",
      "Cobertura sombra"
    ],
    "compatible_with_raw": "Enredadera Virginia, Clematis",
    "notes": "Cobertura total de muros y suelos en sombra.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "hiedra-inglesa"
  },
  {
    "common_name": "Clematis",
    "scientific_name": "Clematis × jackmanii",
    "plant_type": "Trepadora",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 600,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Rejas",
      "Pérgolas delicadas"
    ],
    "compatible_with_raw": "Glicina, Rosa trepadora",
    "notes": "Flores violáceas estrelladas. Elegante y refinada.",
    "flowering_season": "Oct-Dic",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "clematis"
  },
  {
    "common_name": "Rosa trepadora",
    "scientific_name": "Rosa banksiae",
    "plant_type": "Trepadora",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 400,
    "height_max_cm": 800,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas",
      "Arcos"
    ],
    "compatible_with_raw": "Glicina, Clematis",
    "notes": "Flores amarillas o blancas en cascada. Sin espinas.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "rosa-trepadora"
  },
  {
    "common_name": "Solandra",
    "scientific_name": "Solandra maxima",
    "plant_type": "Trepadora",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas",
      "Tropical"
    ],
    "compatible_with_raw": "Bignonia, Allamanda",
    "notes": "Flores acampanadas amarillo-doradas enormes. Tropical.",
    "flowering_season": "Jul-Sep",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "solandra"
  },
  {
    "common_name": "Dichondra",
    "scientific_name": "Dichondra micrantha",
    "plant_type": "Tapizante",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": false,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 5,
    "height_max_cm": 10,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Césped alternativo",
      "Sombra"
    ],
    "compatible_with_raw": "Zoysia, Stenotaphrum",
    "notes": "Alternativa al césped en semisombra. Muy densa.",
    "flowering_season": "Variable",
    "tags": [
      "exótica",
      "tapizante",
      "cobertura"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "dichondra"
  },
  {
    "common_name": "Aptenia",
    "scientific_name": "Aptenia cordifolia",
    "plant_type": "Tapizante",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 10,
    "height_max_cm": 15,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Taludes secos",
      "Costaneras"
    ],
    "compatible_with_raw": "Sedum, Drosanthemum",
    "notes": "Cobertura densa en lugares secos y soleados.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "exótica",
      "tapizante",
      "cobertura"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "aptenia"
  },
  {
    "common_name": "Gazania",
    "scientific_name": "Gazania rigens",
    "plant_type": "Tapizante",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 15,
    "height_max_cm": 25,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NOA"
    ],
    "is_native": false,
    "uses": [
      "Taludes",
      "Masivos secos"
    ],
    "compatible_with_raw": "Aptenia, Drosanthemum",
    "notes": "Flores anaranjadas que se cierran de noche. Resistente.",
    "flowering_season": "Oct-Mar",
    "tags": [
      "exótica",
      "tapizante",
      "cobertura"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "gazania"
  },
  {
    "common_name": "Phlox rastrero",
    "scientific_name": "Phlox subulata",
    "plant_type": "Tapizante",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 10,
    "height_max_cm": 15,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": false,
    "uses": [
      "Rocallas",
      "Taludes"
    ],
    "compatible_with_raw": "Festuca, Sedum",
    "notes": "Alfombra de flores rosas o blancas en primavera.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "exótica",
      "tapizante",
      "cobertura"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "phlox-rastrero"
  },
  {
    "common_name": "Ajuga",
    "scientific_name": "Ajuga reptans",
    "plant_type": "Tapizante",
    "light": "shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 10,
    "height_max_cm": 20,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Sombra",
      "Bajo árboles"
    ],
    "compatible_with_raw": "Hostas, Hiedra",
    "notes": "Follaje bronceado o morado. Florece en primavera.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "exótica",
      "tapizante",
      "cobertura"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "ajuga"
  },
  {
    "common_name": "Vinca",
    "scientific_name": "Vinca minor",
    "plant_type": "Tapizante",
    "light": "shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 10,
    "height_max_cm": 15,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Sombra",
      "Cobertura"
    ],
    "compatible_with_raw": "Ajuga, Hiedra",
    "notes": "Flores azules o blancas. Cobertura densa en sombra.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "exótica",
      "tapizante",
      "cobertura"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "vinca"
  },
  {
    "common_name": "Tomillo",
    "scientific_name": "Thymus vulgaris",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 20,
    "height_max_cm": 40,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Aromático",
      "Mediterráneo",
      "Bordes"
    ],
    "compatible_with_raw": "Lavanda, Romero, Salvia",
    "notes": "Tapizante aromático entre piedras. Culinario.",
    "flowering_season": "Oct-Nov",
    "tags": [
      "arbusto",
      "aromática",
      "exótica"
    ],
    "garden_styles": [
      "mediterranean"
    ],
    "slug": "tomillo"
  },
  {
    "common_name": "Salvia oficinal",
    "scientific_name": "Salvia officinalis",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Aromático",
      "Medicinal"
    ],
    "compatible_with_raw": "Romero, Lavanda, Tomillo",
    "notes": "Hojas plateadas aromáticas. Culinario y ornamental.",
    "flowering_season": "Oct-Nov",
    "tags": [
      "arbusto",
      "aromática",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "salvia-oficinal"
  },
  {
    "common_name": "Orégano",
    "scientific_name": "Origanum vulgare",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Aromático",
      "Bordes"
    ],
    "compatible_with_raw": "Tomillo, Salvia",
    "notes": "Flores rosadas pequeñas. Culinario y ornamental.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "oregano"
  },
  {
    "common_name": "Menta",
    "scientific_name": "Mentha × piperita",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Aromático",
      "Contenedores"
    ],
    "compatible_with_raw": "Peperina, Orégano",
    "notes": "Aroma refrescante. Controlar expansión rizomatosa.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "aromática",
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "menta"
  },
  {
    "common_name": "Peperina",
    "scientific_name": "Minthostachys mollis",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 100,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NOA",
      "Cuyo"
    ],
    "is_native": true,
    "uses": [
      "Aromático nativo",
      "Medicinal"
    ],
    "compatible_with_raw": "Cedrón, Menta",
    "notes": "Hierba medicinal del NOA. Usada en infusiones.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "arbusto",
      "nativa",
      "medicinal"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "peperina"
  },
  {
    "common_name": "Albahaca",
    "scientific_name": "Ocimum basilicum",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Huerto aromático",
      "Verano"
    ],
    "compatible_with_raw": "Tomate, Peperina",
    "notes": "Intensamente aromática. Culinaria e insectífuga.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "aromática",
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "albahaca"
  },
  {
    "common_name": "Junco",
    "scientific_name": "Schoenoplectus californicus",
    "plant_type": "Acuática",
    "light": "full_sun",
    "water": "daily",
    "care_level": "expert",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 100,
    "height_max_cm": 300,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": true,
    "uses": [
      "Bordes de agua",
      "Depuración"
    ],
    "compatible_with_raw": "Totora, Sagitaria",
    "notes": "Depura el agua naturalmente. Hábitat de aves.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "estanque",
      "acuática",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "junco"
  },
  {
    "common_name": "Totora",
    "scientific_name": "Typha latifolia",
    "plant_type": "Acuática",
    "light": "full_sun",
    "water": "daily",
    "care_level": "expert",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 150,
    "height_max_cm": 300,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": true,
    "uses": [
      "Bordes de agua",
      "Pantanos"
    ],
    "compatible_with_raw": "Junco, Iris acuático",
    "notes": "Mazorcas ornamentales características.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "estanque",
      "acuática",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "totora"
  },
  {
    "common_name": "Lirio acuático",
    "scientific_name": "Iris pseudacorus",
    "plant_type": "Acuática",
    "light": "full_sun",
    "water": "daily",
    "care_level": "expert",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 60,
    "height_max_cm": 100,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes de agua",
      "Color"
    ],
    "compatible_with_raw": "Totora, Junco",
    "notes": "Flores amarillas sobre el agua. Muy ornamental.",
    "flowering_season": "Oct-Nov",
    "tags": [
      "estanque",
      "acuática",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "lirio-acuatico"
  },
  {
    "common_name": "Camalote",
    "scientific_name": "Eichhornia crassipes",
    "plant_type": "Acuática",
    "light": "full_sun",
    "water": "daily",
    "care_level": "expert",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 20,
    "height_max_cm": 50,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Estanques",
      "Flores flotantes"
    ],
    "compatible_with_raw": "Lirio acuático",
    "notes": "Flores lila flotantes espectaculares. Controlar.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "estanque",
      "acuática",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "camalote"
  },
  {
    "common_name": "Nenúfar",
    "scientific_name": "Nymphaea spp.",
    "plant_type": "Acuática",
    "light": "full_sun",
    "water": "daily",
    "care_level": "expert",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 10,
    "height_max_cm": 10,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Estanques",
      "Flores flotantes"
    ],
    "compatible_with_raw": "Camalote, Lirio acuático",
    "notes": "Hojas flotantes y flores exquisitas. Clásico.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "estanque",
      "acuática",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "nenufar"
  },
  {
    "common_name": "Jazmín Amarillo",
    "scientific_name": "Jasminum humile revolutum",
    "plant_type": "Trepadora",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 200,
    "height_max_cm": 400,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas",
      "Rejas",
      "Perfume"
    ],
    "compatible_with_raw": "Glicina, Jazmín del país, Pasionaria",
    "notes": "Flores amarillas fragantes. Semi-trepadora arbustiva. Muy vistosa.",
    "flowering_season": "Oct-Dic",
    "tags": [
      "enredadera",
      "trepadora",
      "aromática",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "jazmin-amarillo"
  },
  {
    "common_name": "Jazmín Azórico",
    "scientific_name": "Jasminum azoricum",
    "plant_type": "Trepadora",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 600,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas",
      "Muros",
      "Perfume"
    ],
    "compatible_with_raw": "Jazmín del país, Glicina",
    "notes": "Flores blancas muy fragantes. Follaje perenne lustroso.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "enredadera",
      "trepadora",
      "aromática",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "jazmin-azorico"
  },
  {
    "common_name": "Jazmín de Leche",
    "scientific_name": "Trachelospermum jasminoides",
    "plant_type": "Trepadora",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 400,
    "height_max_cm": 800,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas",
      "Cercos",
      "Aromático"
    ],
    "compatible_with_raw": "Glicina, Jazmín del país",
    "notes": "Flores blancas en estrella con perfume intenso. Muy resistente.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "jazmin-de-leche"
  },
  {
    "common_name": "Jazmín Chino",
    "scientific_name": "Jasminum polyanthum",
    "plant_type": "Trepadora",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas",
      "Rejas",
      "Primaveral"
    ],
    "compatible_with_raw": "Jazmín del país, Bignonia",
    "notes": "Floración masiva a fin de invierno. Perfume inigualable.",
    "flowering_season": "Ago-Oct",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "jazmin-chino"
  },
  {
    "common_name": "Madreselva",
    "scientific_name": "Lonicera periclymenum 'Belgica'",
    "plant_type": "Trepadora",
    "light": "partial_shade",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 600,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas",
      "Cercos vivos",
      "Aves"
    ],
    "compatible_with_raw": "Glicina, Clematis, Pasionaria",
    "notes": "Flores bicolores muy fragantes. Atrae colibríes y mariposas.",
    "flowering_season": "Oct-Mar",
    "tags": [
      "trepadora",
      "atractora-fauna",
      "exótica",
      "aromática",
      "enredadera"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "madreselva"
  },
  {
    "common_name": "Rosa Banksiana",
    "scientific_name": "Rosa banksiae lutea",
    "plant_type": "Trepadora",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 400,
    "height_max_cm": 800,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas",
      "Arcos",
      "Sin espinas"
    ],
    "compatible_with_raw": "Glicina, Clematis",
    "notes": "Racimos de flores amarillas sin espinas. Muy vigorosa.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "rosa-banksiana"
  },
  {
    "common_name": "Abelia Grandiflora",
    "scientific_name": "Abelia × grandiflora",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Setos",
      "Bordes informales",
      "Mariposas"
    ],
    "compatible_with_raw": "Budleja, Fotinia, Nandina",
    "notes": "Larga floración. Flores blanco-rosadas fragantes. Muy rústica.",
    "flowering_season": "Oct-Mar",
    "tags": [
      "arbusto",
      "aromática",
      "exótica"
    ],
    "garden_styles": [
      "formal"
    ],
    "slug": "abelia-grandiflora"
  },
  {
    "common_name": "Erigeron Karvinskianus",
    "scientific_name": "Erigeron karvinskianus",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 20,
    "height_max_cm": 40,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Muros",
      "Rocallas",
      "Bordes etéreos"
    ],
    "compatible_with_raw": "Gaura, Verbena, Festuca azul",
    "notes": "Margarititas blancas que se tornan rosadas. Se auto-siembra. Muy prolífica.",
    "flowering_season": "Sep-Abr",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "erigeron-karvinskianus"
  },
  {
    "common_name": "Euphorbia Characias",
    "scientific_name": "Euphorbia characias",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 80,
    "height_max_cm": 120,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Follaje estructural",
      "Xerofítico"
    ],
    "compatible_with_raw": "Agave, Yuca, Festuca azul",
    "notes": "Brácteas verde-amarillas llamativas. Follaje glauco arquitectónico.",
    "flowering_season": "Ago-Oct",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "euphorbia-characias"
  },
  {
    "common_name": "Gaura",
    "scientific_name": "Gaura lindheimeri",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 60,
    "height_max_cm": 120,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes ondulantes",
      "Etéreo"
    ],
    "compatible_with_raw": "Verbena, Esparto, Salvia azul",
    "notes": "Flores blancas o rosadas que parecen mariposas danzando. Muy larga floración.",
    "flowering_season": "Oct-Abr",
    "tags": [
      "flores",
      "herbácea",
      "atractora-fauna",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "gaura-2"
  },
  {
    "common_name": "Nepeta",
    "scientific_name": "Nepeta cataria",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes aromáticos",
      "Mediterráneo"
    ],
    "compatible_with_raw": "Lavanda, Salvia, Romero",
    "notes": "Flores lila-azuladas. Aromática. Atrae abejas. Combina con rosas.",
    "flowering_season": "Oct-Dic",
    "tags": [
      "aromática",
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "mediterranean"
    ],
    "slug": "nepeta"
  },
  {
    "common_name": "Santa Rita / Bugambilia",
    "scientific_name": "Bougainvillea spectabilis",
    "plant_type": "Trepadora",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 400,
    "height_max_cm": 1000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas",
      "Muros",
      "Color espectacular"
    ],
    "compatible_with_raw": "Lantana, Duranta, Plumbago",
    "notes": "Brácteas en fucsia, naranja, blanco o rojo. De las trepadoras más llamativas.",
    "flowering_season": "Oct-Mar",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "santa-rita-bugambilia"
  },
  {
    "common_name": "Arce Japonés",
    "scientific_name": "Acer palmatum",
    "plant_type": "Árbol",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 800,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": false,
    "uses": [
      "Focal otoñal",
      "Jardín oriental"
    ],
    "compatible_with_raw": "Liquidámbar, Ginkgo, Azalea",
    "notes": "Follaje disectado rojizo o verde. Otoño espectacular. Muy ornamental.",
    "flowering_season": "Ago-Sep",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "arce-japones"
  },
  {
    "common_name": "Pyrus Chanticleer",
    "scientific_name": "Pyrus calleryana 'Chanticleer'",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 800,
    "height_max_cm": 1200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Alineación",
      "Focal primaveral"
    ],
    "compatible_with_raw": "Liquidámbar, Arce rojo, Ginkgo",
    "notes": "Flores blancas en primavera. Follaje rojo intenso en otoño. Porte columnar.",
    "flowering_season": "Ago-Sep",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "pyrus-chanticleer"
  },
  {
    "common_name": "Kiri",
    "scientific_name": "Paulownia tomentosa",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1000,
    "height_max_cm": 2000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NOA"
    ],
    "is_native": false,
    "uses": [
      "Sombra rápida",
      "Focal"
    ],
    "compatible_with_raw": "Tipa blanca, Jacarandá",
    "notes": "Flores violáceas antes que las hojas. Crecimiento muy rápido.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "kiri"
  },
  {
    "common_name": "Lino Rojo",
    "scientific_name": "Linum grandiflorum",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 50,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Masivos coloridos"
    ],
    "compatible_with_raw": "Cosmos, Caléndula, Erigeron",
    "notes": "Flores rojo-escarlata muy delicadas. Cultivo fácil desde semilla.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "lino-rojo"
  },
  {
    "common_name": "Lino Azul",
    "scientific_name": "Linum perenne",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 50,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes naturales",
      "Pradera"
    ],
    "compatible_with_raw": "Gaura, Verbena, Esparto",
    "notes": "Flores azul celeste delicadas. Muy resistente a la sequía.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "lino-azul"
  },
  {
    "common_name": "Celosía Spicata",
    "scientific_name": "Celosia spicata",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 40,
    "height_max_cm": 80,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Masivos estivales",
      "Corte"
    ],
    "compatible_with_raw": "Zinnia, Cosmos, Rudbeckia",
    "notes": "Espigas plumosas en rosa, magenta o blanco. Muy vistosa en verano.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "celosia-spicata"
  },
  {
    "common_name": "Lobelia",
    "scientific_name": "Lobelia erinus",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": false,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 10,
    "height_max_cm": 20,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Macetas colgantes"
    ],
    "compatible_with_raw": "Petunia, Begonia, Impatiens",
    "notes": "Flores azul-violeta intenso. Ideal para bordes de cantero y macetas.",
    "flowering_season": "Sep-Mar",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "lobelia"
  },
  {
    "common_name": "Anémona Japonesa",
    "scientific_name": "Anemone × hybrida",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 60,
    "height_max_cm": 120,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": false,
    "uses": [
      "Bordes otoñales",
      "Sombra parcial"
    ],
    "compatible_with_raw": "Hostas, Astilbe, Helecho",
    "notes": "Flores blancas o rosadas sobre tallos elegantes. Florece en otoño.",
    "flowering_season": "Feb-May",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "anemona-japonesa"
  },
  {
    "common_name": "Liriope",
    "scientific_name": "Liriope muscari",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 50,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Tapizante sombra"
    ],
    "compatible_with_raw": "Hostas, Ajuga, Carex",
    "notes": "Espigas lilas en verano. Follaje verde oscuro perenne. Muy adaptable.",
    "flowering_season": "Feb-Abr",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "liriope"
  },
  {
    "common_name": "Fumo Bravo",
    "scientific_name": "Solanum granulosum-leprosum",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 200,
    "height_max_cm": 400,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Naturalista",
      "Fauna",
      "Rápido"
    ],
    "compatible_with_raw": "Duranta, Chilca, Cedrón",
    "notes": "Flores lila-violáceas abundantes. Colonizador natural. Atrae aves.",
    "flowering_season": "Oct-Abr",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "fumo-bravo"
  },
  {
    "common_name": "Filodendro",
    "scientific_name": "Philodendron selloum",
    "plant_type": "Herbácea",
    "light": "shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": false,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Sombra tropical",
      "Interior-exterior"
    ],
    "compatible_with_raw": "Hostas, Calathea, Helecho",
    "notes": "Hojas gigantes recortadas. Efecto tropical en sombra. Resistente.",
    "flowering_season": "Variable",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "filodendro"
  },
  {
    "common_name": "Helecho Macho",
    "scientific_name": "Nephrolepis exaltata",
    "plant_type": "Herbácea",
    "light": "shade",
    "water": "twice_week",
    "care_level": "expert",
    "flowering": false,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 100,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Sombra",
      "Interior",
      "Húmedo"
    ],
    "compatible_with_raw": "Hostas, Calathea, Astilbe",
    "notes": "Frondas arqueadas exuberantes. Ideal para sombra húmeda o interior.",
    "flowering_season": "No florece",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "helecho-macho"
  },
  {
    "common_name": "Calathea",
    "scientific_name": "Calathea spp.",
    "plant_type": "Herbácea",
    "light": "shade",
    "water": "twice_week",
    "care_level": "expert",
    "flowering": false,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Interior",
      "Sombra tropical"
    ],
    "compatible_with_raw": "Filodendro, Helecho, Hostas",
    "notes": "Follaje ornamental con patrones únicos. Requiere humedad y calor.",
    "flowering_season": "Variable",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "calathea"
  },
  {
    "common_name": "Areca",
    "scientific_name": "Dypsis lutescens",
    "plant_type": "Palmera",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": false,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 200,
    "height_max_cm": 400,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Focal tropical",
      "Interior-exterior"
    ],
    "compatible_with_raw": "Palmera pindó, Canna, Filodendro",
    "notes": "Palmera de cañas múltiples doradas. Muy elegante en exteriores cálidos.",
    "flowering_season": "Variable",
    "tags": [
      "tropical",
      "palmera",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "areca"
  },
  {
    "common_name": "Watsonia",
    "scientific_name": "Watsonia pillansii",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 80,
    "height_max_cm": 120,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Masivos",
      "Bordes floridos"
    ],
    "compatible_with_raw": "Agapanto, Iris, Canna",
    "notes": "Espigas de flores anaranjadas o rosadas. Crece de bulbo. Muy prolífica.",
    "flowering_season": "Oct-Dic",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "watsonia"
  },
  {
    "common_name": "Eugenia",
    "scientific_name": "Eugenia uniflora",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 300,
    "height_max_cm": 600,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Setos",
      "Cercos vivos",
      "Frutos"
    ],
    "compatible_with_raw": "Pittosporum, Fotinia, Duranta",
    "notes": "Pitanga: frutos rojos comestibles ornamentales. Seto denso y perenne.",
    "flowering_season": "Oct-Nov",
    "tags": [
      "arbusto",
      "nativa",
      "comestible"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "eugenia"
  },
  {
    "common_name": "Santolina",
    "scientific_name": "Santolina chamaecyparissus",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes plateados",
      "Mediterráneo"
    ],
    "compatible_with_raw": "Lavanda, Romero, Festuca azul",
    "notes": "Follaje plateado muy aromático. Botonesamarillas en verano. Muy resistente.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "arbusto",
      "aromática",
      "exótica"
    ],
    "garden_styles": [
      "mediterranean"
    ],
    "slug": "santolina"
  },
  {
    "common_name": "Tibouchina",
    "scientific_name": "Tibouchina mutabilis",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 200,
    "height_max_cm": 500,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Focal",
      "Setos floridos"
    ],
    "compatible_with_raw": "Duranta, Plumbago, Abelia",
    "notes": "Flores blancas que viran a rosa y violeta. Espectacular en floración.",
    "flowering_season": "Oct-Mar",
    "tags": [
      "arbusto",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "tibouchina"
  },
  {
    "common_name": "Suculenta Corazón / Collar de Corazones",
    "scientific_name": "Ceropegia woodii",
    "plant_type": "Suculenta",
    "light": "partial_shade",
    "water": "monthly",
    "care_level": "easy",
    "flowering": false,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": null,
    "height_max_cm": null,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Macetas colgantes",
      "Interior"
    ],
    "compatible_with_raw": "Cola de burro, Echeveria",
    "notes": "Hojas corazonadas moteadas en tallos colgantes. Muy ornamental.",
    "flowering_season": "Variable",
    "tags": [
      "suculenta",
      "xerofítica",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "suculenta-corazon-collar-de-corazones"
  },
  {
    "common_name": "Planta del Rosario / Cadena de Bananas",
    "scientific_name": "Senecio rowleyanus",
    "plant_type": "Suculenta",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": false,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": null,
    "height_max_cm": null,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Macetas colgantes",
      "Rocallas"
    ],
    "compatible_with_raw": "Sedum, Echeveria, Cola de burro",
    "notes": "Tallos con esferas verdes como perlas. Muy llamativa.",
    "flowering_season": "Variable",
    "tags": [
      "suculenta",
      "xerofítica",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "planta-del-rosario-cadena-de-bananas"
  },
  {
    "common_name": "Rocío / Cola de Burro",
    "scientific_name": "Sedum morganianum",
    "plant_type": "Suculenta",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": null,
    "height_max_cm": null,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Macetas colgantes",
      "Rocallas"
    ],
    "compatible_with_raw": "Echeveria, Sedum, Sempervivum",
    "notes": "Tallos suculentos colgantes azulados. Muy decorativa.",
    "flowering_season": "Oct-Nov",
    "tags": [
      "suculenta",
      "xerofítica",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "rocio-cola-de-burro"
  },
  {
    "common_name": "Lantana Montevidensis",
    "scientific_name": "Lantana montevidensis",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Tapizante",
      "Bordes colgantes"
    ],
    "compatible_with_raw": "Lantana camara, Verbena, Plumbago",
    "notes": "Flores lila-rosadas. Hábito rastrero o colgante. Nativa del Río de la Plata.",
    "flowering_season": "Oct-Abr",
    "tags": [
      "arbusto",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "lantana-montevidensis"
  },
  {
    "common_name": "Lantana Megapotámica",
    "scientific_name": "Lantana megapotamica",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 100,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Bordes",
      "Naturalista",
      "Fauna"
    ],
    "compatible_with_raw": "Lantana camara, Verbena",
    "notes": "Flores bicolores amarillas y rojas. Nativa pampeana. Atrae mariposas.",
    "flowering_season": "Oct-Abr",
    "tags": [
      "arbusto",
      "nativa",
      "atractora-fauna"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "lantana-megapotamica"
  },
  {
    "common_name": "Lantana Trifolia",
    "scientific_name": "Lantana trifolia",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Fondos",
      "Fauna",
      "Naturalista"
    ],
    "compatible_with_raw": "Lantana camara, Duranta",
    "notes": "Flores lilas en cabezuelas. Frutos morados ornamentales. Nativa del NEA.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "arbusto",
      "nativa"
    ],
    "garden_styles": [
      "tropical",
      "natural"
    ],
    "slug": "lantana-trifolia"
  },
  {
    "common_name": "Salvia Pallida",
    "scientific_name": "Salvia pallida",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 60,
    "height_max_cm": 100,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NOA",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Bordes",
      "Naturalista"
    ],
    "compatible_with_raw": "Salvia azul, Verbena, Esparto",
    "notes": "Flores rosadas pálidas. Nativa del noroeste. Muy resistente.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "nativa",
      "flores",
      "herbácea"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "salvia-pallida"
  },
  {
    "common_name": "Salvia Guaranítica",
    "scientific_name": "Salvia guaranitica",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 80,
    "height_max_cm": 150,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Bordes",
      "Atractor colibríes"
    ],
    "compatible_with_raw": "Salvia azul, Verbena, Agapanto",
    "notes": "Flores azul intenso tubulares. Atrae colibríes. Nativa del litoral.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "nativa",
      "flores",
      "herbácea"
    ],
    "garden_styles": [
      "tropical",
      "natural"
    ],
    "slug": "salvia-guaranitica"
  },
  {
    "common_name": "Salvia Amistad",
    "scientific_name": "Salvia 'Amistad'",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 150,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Fondos",
      "Colibríes"
    ],
    "compatible_with_raw": "Salvia guaranítica, Verbena, Gaura",
    "notes": "Flores violetas grandes sobre tallos negros. Muy vistosa y larga floración.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "salvia-amistad"
  },
  {
    "common_name": "Salvia Greggii",
    "scientific_name": "Salvia greggii",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 40,
    "height_max_cm": 80,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes aromáticos",
      "Mediterráneo"
    ],
    "compatible_with_raw": "Lavanda, Romero, Nepeta",
    "notes": "Flores rojas, rosas o blancas. Muy resistente a la sequía. Aromática.",
    "flowering_season": "Sep-Mar",
    "tags": [
      "aromática",
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "mediterranean"
    ],
    "slug": "salvia-greggii"
  },
  {
    "common_name": "Salvia Rusa",
    "scientific_name": "Perovskia atriplicifolia",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 80,
    "height_max_cm": 120,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes plateados",
      "Mediterráneo"
    ],
    "compatible_with_raw": "Lavanda, Nepeta, Festuca azul",
    "notes": "Espigas azul lavanda sobre follaje plateado. Muy aromática. Resistente.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "aromática",
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "mediterranean"
    ],
    "slug": "salvia-rusa"
  },
  {
    "common_name": "Salvia Uliginosa",
    "scientific_name": "Salvia uliginosa",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Bordes húmedos",
      "Naturalista"
    ],
    "compatible_with_raw": "Verbena, Gaura, Iris acuático",
    "notes": "Flores azul celeste en espigas. Tolera suelos húmedos. Nativa pampeana.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "nativa",
      "flores",
      "herbácea"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "salvia-uliginosa"
  },
  {
    "common_name": "Salvia Wendy's Wish",
    "scientific_name": "Salvia 'Wendy's Wish'",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 60,
    "height_max_cm": 100,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Colibríes",
      "Focal"
    ],
    "compatible_with_raw": "Salvia guaranítica, Verbena, Gaura",
    "notes": "Flores fucsia-bicolores muy llamativas. Gran atractivo para colibríes.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "salvia-wendy-s-wish"
  },
  {
    "common_name": "Salvia Nelson",
    "scientific_name": "Salvia × jamensis",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 40,
    "height_max_cm": 70,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes compactos",
      "Mediterráneo"
    ],
    "compatible_with_raw": "Lavanda, Nepeta, Salvia greggii",
    "notes": "Flores en tonos coral, salmón o amarillo. Muy florífera. Compacta.",
    "flowering_season": "Sep-Mar",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "mediterranean"
    ],
    "slug": "salvia-nelson"
  },
  {
    "common_name": "Salvia Procurrens",
    "scientific_name": "Salvia procurrens",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 10,
    "height_max_cm": 20,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Tapizante",
      "Bajo árboles"
    ],
    "compatible_with_raw": "Ajuga, Vinca, Verbena",
    "notes": "Tapizante rastrera con flores azul-violeta. Nativa. Excelente cubresuelos.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "nativa",
      "flores",
      "herbácea"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "salvia-procurrens"
  },
  {
    "common_name": "Salvia × Silvestris",
    "scientific_name": "Salvia × sylvestris",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes formales",
      "Jardín inglés"
    ],
    "compatible_with_raw": "Salvia nemorosa, Lavanda, Nepeta",
    "notes": "Espigas azul-violáceas muy densas. Clásica del jardín formal inglés.",
    "flowering_season": "Oct-Dic",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "formal",
      "cottage"
    ],
    "slug": "salvia-silvestris"
  },
  {
    "common_name": "Salvia Roja",
    "scientific_name": "Salvia splendens",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 50,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Macizos",
      "Canteros formales"
    ],
    "compatible_with_raw": "Begonia, Impatiens, Lobelia",
    "notes": "Flores rojas brillantes muy llamativas. Clásica de jardines formales.",
    "flowering_season": "Oct-Abr",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "formal"
    ],
    "slug": "salvia-roja"
  },
  {
    "common_name": "Salvia Leucanta",
    "scientific_name": "Salvia leucantha",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 80,
    "height_max_cm": 120,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes aterciopelados",
      "Focal"
    ],
    "compatible_with_raw": "Salvia guaranítica, Gaura, Verbena",
    "notes": "Espigas bicolores blanco-morado aterciopeladas. Muy ornamental en otoño.",
    "flowering_season": "Feb-May",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "salvia-leucanta"
  },
  {
    "common_name": "Salvia African Sky",
    "scientific_name": "Salvia africana-caerulea",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 80,
    "height_max_cm": 120,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes mediterráneos",
      "Seco"
    ],
    "compatible_with_raw": "Romero, Santolina, Lavanda",
    "notes": "Flores azul oscuro sobre cáliz marrón-rojo. Muy resistente. Aromática.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "aromática",
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "mediterranean"
    ],
    "slug": "salvia-african-sky"
  },
  {
    "common_name": "Achillea",
    "scientific_name": "Achillea millefolium",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 40,
    "height_max_cm": 80,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Pradera",
      "Naturalista",
      "Medicinal"
    ],
    "compatible_with_raw": "Rudbeckia, Echinacea, Salvia rusa",
    "notes": "Flores en sombrilla en blanco, amarillo o rosa. Muy resistente. Medicinal.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "medicinal",
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "achillea"
  },
  {
    "common_name": "Verbena Rastrera",
    "scientific_name": "Verbena peruviana",
    "plant_type": "Tapizante",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 5,
    "height_max_cm": 10,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NOA"
    ],
    "is_native": false,
    "uses": [
      "Tapizante",
      "Taludes",
      "Bordes"
    ],
    "compatible_with_raw": "Aptenia, Gazania, Lantana montevidensis",
    "notes": "Tapizante con flores rojas o rosas brillantes. Muy llamativa en pendientes.",
    "flowering_season": "Oct-Abr",
    "tags": [
      "exótica",
      "tapizante",
      "cobertura"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "verbena-rastrera"
  },
  {
    "common_name": "Pasto Inglés / Ray Grass",
    "scientific_name": "Lolium perenne",
    "plant_type": "Gramínea",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": false,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 5,
    "height_max_cm": 15,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Césped",
      "Praderas deportivas"
    ],
    "compatible_with_raw": "Dichondra, Zoysia",
    "notes": "Césped fino y resistente. Base de mezclas para césped de clima templado.",
    "flowering_season": "Variable",
    "tags": [
      "ornamental",
      "gramínea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "pasto-ingles-ray-grass"
  },
  {
    "common_name": "No me Olvides",
    "scientific_name": "Myosotis sylvatica",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": false,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 15,
    "height_max_cm": 30,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes invernales",
      "Naturalista"
    ],
    "compatible_with_raw": "Pensamientos, Caléndula, Erigeron",
    "notes": "Flores azul celeste diminutas muy encantadoras. Se auto-siembra.",
    "flowering_season": "Ago-Oct",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "no-me-olvides"
  },
  {
    "common_name": "Melica",
    "scientific_name": "Melica ciliata",
    "plant_type": "Gramínea",
    "light": "partial_shade",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 40,
    "height_max_cm": 70,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": true,
    "uses": [
      "Naturalista",
      "Bordes suaves"
    ],
    "compatible_with_raw": "Festuca azul, Esparto, Pennisetum",
    "notes": "Gramínea nativa con espigas plateadas sedosas. Muy ornamental.",
    "flowering_season": "Oct-Dic",
    "tags": [
      "nativa",
      "ornamental",
      "gramínea"
    ],
    "garden_styles": [
      "tropical",
      "natural"
    ],
    "slug": "melica"
  },
  {
    "common_name": "Caña de Ámbar",
    "scientific_name": "Phragmites australis",
    "plant_type": "Acuática",
    "light": "full_sun",
    "water": "daily",
    "care_level": "expert",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 200,
    "height_max_cm": 400,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": true,
    "uses": [
      "Bordes de agua",
      "Pantallas"
    ],
    "compatible_with_raw": "Totora, Junco",
    "notes": "Caña alta con penachos plumosos en verano. Controlar expansión.",
    "flowering_season": "Ene-Mar",
    "tags": [
      "estanque",
      "acuática",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "cana-de-ambar"
  },
  {
    "common_name": "Morera",
    "scientific_name": "Morus alba",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 800,
    "height_max_cm": 1500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Sombra",
      "Productivo",
      "Frutos"
    ],
    "compatible_with_raw": "Tipa blanca, Plátano",
    "notes": "Frutos comestibles. Sombra generosa. Hojas para gusano de seda.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "árbol",
      "comestible",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "morera"
  },
  {
    "common_name": "Manzano Silvestre",
    "scientific_name": "Malus floribunda",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 400,
    "height_max_cm": 800,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": false,
    "uses": [
      "Focal primaveral",
      "Frutos ornamentales"
    ],
    "compatible_with_raw": "Pyrus chanticleer, Arce japonés",
    "notes": "Flores blancas y rosas en primavera. Frutos pequeños rojos ornamentales.",
    "flowering_season": "Ago-Sep",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "manzano-silvestre"
  },
  {
    "common_name": "Naranjo de Osage",
    "scientific_name": "Maclura pomifera",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 1000,
    "height_max_cm": 1800,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NOA"
    ],
    "is_native": false,
    "uses": [
      "Cortinas",
      "Cercos vivos",
      "Resistente"
    ],
    "compatible_with_raw": "Tala, Espinillo, Algarrobo",
    "notes": "Muy resistente a sequía y heladas. Cerco espinoso infranqueable.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "naranjo-de-osage"
  },
  {
    "common_name": "Árbol de Sebo",
    "scientific_name": "Triadica sebifera",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 800,
    "height_max_cm": 1500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Otoño",
      "Sombra"
    ],
    "compatible_with_raw": "Liquidámbar, Arce rojo",
    "notes": "Extraordinarios colores otoñales. Semillas blancas ornamentales.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "arbol-de-sebo"
  },
  {
    "common_name": "Peral de Bradford",
    "scientific_name": "Pyrus calleryana 'Bradford'",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 800,
    "height_max_cm": 1200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Alineación",
      "Otoño"
    ],
    "compatible_with_raw": "Liquidámbar, Arce rojo, Ginkgo",
    "notes": "Flores blancas en primavera. Rojo intenso en otoño. Copa oval.",
    "flowering_season": "Ago-Sep",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "peral-de-bradford"
  },
  {
    "common_name": "Jazmín Magno",
    "scientific_name": "Magnolia stellata",
    "plant_type": "Árbol",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 600,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": false,
    "uses": [
      "Focal invernal",
      "Oriental"
    ],
    "compatible_with_raw": "Camellia, Azalea, Arce japonés",
    "notes": "Flores blancas en estrella antes que las hojas. Floración invernal única.",
    "flowering_season": "Jul-Sep",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "jazmin-magno"
  },
  {
    "common_name": "Rotheca",
    "scientific_name": "Rotheca myricoides",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Bordes azules",
      "Tropical"
    ],
    "compatible_with_raw": "Plumbago, Duranta, Lantana",
    "notes": "Flores azul-bicolor muy originales. Atrae colibríes. Poco conocida.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "rotheca"
  },
  {
    "common_name": "Malvavisco",
    "scientific_name": "Malva sylvestris",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 120,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes naturales",
      "Medicinal"
    ],
    "compatible_with_raw": "Cosmos, Verbena, Salvia",
    "notes": "Flores malva con venas oscuras. Medicinal. Se auto-siembra fácilmente.",
    "flowering_season": "Oct-Mar",
    "tags": [
      "medicinal",
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "malvavisco"
  },
  {
    "common_name": "Hierba de San Simón",
    "scientific_name": "Lippia alba",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 150,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Aromático",
      "Medicinal",
      "Bordes"
    ],
    "compatible_with_raw": "Cedrón del monte, Peperina",
    "notes": "Aromática medicinal nativa. Flores liláceas pequeñas. Muy rústica.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "arbusto",
      "nativa",
      "aromática",
      "medicinal"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "hierba-de-san-simon"
  },
  {
    "common_name": "Achira Amarilla",
    "scientific_name": "Canna indica",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "twice_week",
    "care_level": "expert",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Fondos",
      "Bordes de agua",
      "Tropical"
    ],
    "compatible_with_raw": "Canna, Agapanto, Palmera pindó",
    "notes": "Flores amarillas con puntos rojos. Rizoma comestible. Nativa del litoral.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "nativa",
      "flores",
      "herbácea",
      "comestible"
    ],
    "garden_styles": [
      "tropical",
      "natural"
    ],
    "slug": "achira-amarilla"
  },
  {
    "common_name": "Margarita Dorada",
    "scientific_name": "Euryops pectinatus",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 60,
    "height_max_cm": 100,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes invernales",
      "Focal"
    ],
    "compatible_with_raw": "Caléndula, Pensamiento, Gazania",
    "notes": "Flores amarillas sobre follaje grisáceo. Florece en invierno y primavera.",
    "flowering_season": "May-Sep",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "margarita-dorada"
  },
  {
    "common_name": "Caracolillo",
    "scientific_name": "Vigna caracalla",
    "plant_type": "Trepadora",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 600,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Pérgolas",
      "Aromático"
    ],
    "compatible_with_raw": "Glicina, Madreselva",
    "notes": "Flores enrolladas en caracol, violáceas y perfumadas. Nativa sorprendente.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "enredadera",
      "trepadora",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "caracolillo"
  },
  {
    "common_name": "Isipó Colorado",
    "scientific_name": "Aristolochia elegans",
    "plant_type": "Trepadora",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 600,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Pérgolas",
      "Naturalista",
      "Fauna"
    ],
    "compatible_with_raw": "Pasionaria, Bignonia",
    "notes": "Flores tubulares en blanco y rojo. Planta larval de mariposas nativas.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "enredadera",
      "trepadora",
      "nativa",
      "atractora-fauna"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "isipo-colorado"
  },
  {
    "common_name": "Mariposera Morada Grande",
    "scientific_name": "Tibouchina granulosa",
    "plant_type": "Árbol",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1200,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Focal",
      "Sombra",
      "Tropical"
    ],
    "compatible_with_raw": "Tibouchina mutabilis, Duranta",
    "notes": "Flores moradas grandes en racimos. Árbol nativo del litoral y NEA.",
    "flowering_season": "Feb-May",
    "tags": [
      "árbol",
      "nativa",
      "sombra"
    ],
    "garden_styles": [
      "tropical",
      "natural"
    ],
    "slug": "mariposera-morada-grande"
  },
  {
    "common_name": "Mil Hombres",
    "scientific_name": "Aristolochia triangularis",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 200,
    "height_max_cm": 400,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Naturalista",
      "Fauna"
    ],
    "compatible_with_raw": "Isipó colorado, Pasionaria",
    "notes": "Flores triangulares moteadas. Planta larval nativa. Medicinal.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "medicinal",
      "nativa",
      "flores",
      "herbácea"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "mil-hombres"
  },
  {
    "common_name": "Lithops",
    "scientific_name": "Lithops spp.",
    "plant_type": "Suculenta",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 2,
    "height_max_cm": 4,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Macetas",
      "Xerofítico singular"
    ],
    "compatible_with_raw": "Echeveria, Sedum",
    "notes": "Mimetiza piedras. Flores amarillas o blancas. Coleccionismo botánico.",
    "flowering_season": "Mar-May",
    "tags": [
      "suculenta",
      "xerofítica",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "lithops"
  },
  {
    "common_name": "Pulmonaria",
    "scientific_name": "Pulmonaria officinalis",
    "plant_type": "Herbácea",
    "light": "shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 20,
    "height_max_cm": 40,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": false,
    "uses": [
      "Sombra",
      "Bordes invernales"
    ],
    "compatible_with_raw": "Hostas, Ajuga, Vinca",
    "notes": "Flores que cambian de rosa a azul. Follaje moteado. Florece en invierno.",
    "flowering_season": "Ago-Sep",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "pulmonaria"
  },
  {
    "common_name": "Petrea",
    "scientific_name": "Petrea volubilis",
    "plant_type": "Trepadora",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 400,
    "height_max_cm": 800,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas tropicales",
      "Muro"
    ],
    "compatible_with_raw": "Bignonia, Glicina, Bougainvillea",
    "notes": "Espigas de flores violeta-azuladas muy llamativas. Tropical.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "petrea"
  },
  {
    "common_name": "Forsythia",
    "scientific_name": "Forsythia viridissima",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 150,
    "height_max_cm": 300,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": false,
    "uses": [
      "Focal invernal",
      "Bordes"
    ],
    "compatible_with_raw": "Jazmín chino, Camellia, Jazmín magno",
    "notes": "Flores amarillas antes que las hojas en pleno invierno. Muy llamativa.",
    "flowering_season": "Jul-Ago",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "forsythia"
  },
  {
    "common_name": "Prunus Mume / Albaricoque Japonés",
    "scientific_name": "Prunus mume",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 400,
    "height_max_cm": 800,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": false,
    "uses": [
      "Focal invernal",
      "Oriental"
    ],
    "compatible_with_raw": "Camellia, Forsythia, Jazmín magno",
    "notes": "Flores rosadas perfumadas en pleno invierno. Joya del jardín en flor.",
    "flowering_season": "Jun-Ago",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "prunus-mume-albaricoque-japones"
  },
  {
    "common_name": "Osmanthus",
    "scientific_name": "Osmanthus fragrans",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 200,
    "height_max_cm": 500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Aromático",
      "Setos",
      "Sombra"
    ],
    "compatible_with_raw": "Camellia, Azalea, Jazmín del país",
    "notes": "Flores blancas minúsculas con aroma de durazno y jazmín. Muy intenso.",
    "flowering_season": "Mar-May",
    "tags": [
      "arbusto",
      "aromática",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "osmanthus"
  },
  {
    "common_name": "Ruellia",
    "scientific_name": "Ruellia angustifolia",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 40,
    "height_max_cm": 80,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Bordes naturales",
      "Fauna"
    ],
    "compatible_with_raw": "Verbena, Salvia guaranítica, Duranta",
    "notes": "Flores tubulares lilas. Nativa. Atrae mariposas y colibríes.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "nativa",
      "flores",
      "herbácea",
      "atractora-fauna"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "ruellia"
  },
  {
    "common_name": "Salvia Splendens Scarlet",
    "scientific_name": "Salvia splendens",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 50,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Macizos",
      "Canteros formales"
    ],
    "compatible_with_raw": "Begonia, Lobelia, Impatiens",
    "notes": "Variedad de flores rojo escarlata. Muy usada en canteros formales.",
    "flowering_season": "Oct-Abr",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "formal"
    ],
    "slug": "salvia-splendens-scarlet"
  },
  {
    "common_name": "Salvia Coccinea",
    "scientific_name": "Salvia coccinea",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 80,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Naturalista",
      "Colibríes"
    ],
    "compatible_with_raw": "Salvia guaranítica, Verbena, Duranta",
    "notes": "Flores rojas en espigas. Naturalizada. Atrae colibríes todo el verano.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "salvia-coccinea"
  },
  {
    "common_name": "Justicia",
    "scientific_name": "Justicia carnea",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 80,
    "height_max_cm": 150,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Sombra",
      "Bordes tropicales"
    ],
    "compatible_with_raw": "Duranta, Iochroma, Tibouchina",
    "notes": "Espigas de flores rosadas aterciopeladas. Muy decorativa en semisombra.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "justicia"
  },
  {
    "common_name": "Brezo",
    "scientific_name": "Erica carnea",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 20,
    "height_max_cm": 50,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Patagonia",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Rocallas",
      "Bordes invernales",
      "Tapizante"
    ],
    "compatible_with_raw": "Phlox rastrero, Festuca azul, Calafate",
    "notes": "Flores rosa-lila en pleno invierno. Ideal para rocallas y jardines alpinos.",
    "flowering_season": "May-Sep",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "brezo"
  },
  {
    "common_name": "Cenizo",
    "scientific_name": "Leucophyllum frutescens",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NOA",
      "Cuyo"
    ],
    "is_native": false,
    "uses": [
      "Cercos xerofíticos",
      "Plateado"
    ],
    "compatible_with_raw": "Agave, Santolina, Romero",
    "notes": "Follaje plateado y flores lilas post-lluvia. Muy resistente a la sequía.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "cenizo"
  },
  {
    "common_name": "Catalpa",
    "scientific_name": "Catalpa bignonioides",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 800,
    "height_max_cm": 1500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Gran sombra",
      "Focal tropical"
    ],
    "compatible_with_raw": "Tipa blanca, Plátano",
    "notes": "Hojas enormes y flores blancas con manchas moradas. Muy ornamental.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "catalpa"
  },
  {
    "common_name": "Bauhinia",
    "scientific_name": "Bauhinia purpurea",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Focal",
      "Sombra liviana"
    ],
    "compatible_with_raw": "Jacarandá, Lapacho rosado",
    "notes": "Flores violeta-rosadas en invierno. Hojas bilobadas características.",
    "flowering_season": "Mar-Jun",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "bauhinia"
  },
  {
    "common_name": "Árbol de Fuego",
    "scientific_name": "Delonix regia",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 800,
    "height_max_cm": 1500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Focal espectacular",
      "Gran sombra"
    ],
    "compatible_with_raw": "Lapacho rosado, Tipa blanca",
    "notes": "Flores rojas que cubren toda la copa. El árbol más llamativo del mundo.",
    "flowering_season": "Nov-Ene",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "arbol-de-fuego"
  },
  {
    "common_name": "Sen de Campo",
    "scientific_name": "Senna corymbosa",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 200,
    "height_max_cm": 400,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Fondos",
      "Naturalista",
      "Otoño"
    ],
    "compatible_with_raw": "Duranta, Chilca, Cedrón",
    "notes": "Flores amarillas intensas en otoño. Nativa. Muy fácil de cultivar.",
    "flowering_season": "Feb-May",
    "tags": [
      "arbusto",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "sen-de-campo"
  },
  {
    "common_name": "Retama Amarilla Enana",
    "scientific_name": "Cytisus × praecox",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 80,
    "height_max_cm": 150,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Primaveral",
      "Mediterráneo",
      "Seco"
    ],
    "compatible_with_raw": "Lavanda, Romero, Santolina",
    "notes": "Cascada de flores amarillas en primavera. Muy resistente a sequía.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "mediterranean"
    ],
    "slug": "retama-amarilla-enana"
  },
  {
    "common_name": "Polygala",
    "scientific_name": "Polygala myrtifolia",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Larga floración"
    ],
    "compatible_with_raw": "Plumbago, Abelia, Lantana",
    "notes": "Flores bicolores rosa-violeta casi todo el año. Muy florífera.",
    "flowering_season": "Sep-Mar",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "polygala"
  },
  {
    "common_name": "Cedrón",
    "scientific_name": "Aloysia citrodora",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 300,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Aromático",
      "Medicinal",
      "Bordes"
    ],
    "compatible_with_raw": "Romero, Lavanda, Peperina",
    "notes": "Aromática por excelencia. Hojas muy perfumadas. Infusión digestiva.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "arbusto",
      "aromática",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "cedron"
  },
  {
    "common_name": "Árbol del Amor",
    "scientific_name": "Cercis siliquastrum",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Focal primaveral",
      "Alineación"
    ],
    "compatible_with_raw": "Jacarandá, Arce japonés, Ginkgo",
    "notes": "Flores rosas directamente en el tronco antes que las hojas. Único.",
    "flowering_season": "Ago-Sep",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "arbol-del-amor"
  },
  {
    "common_name": "Helecho Culandrillo",
    "scientific_name": "Adiantum capillus-veneris",
    "plant_type": "Herbácea",
    "light": "shade",
    "water": "twice_week",
    "care_level": "expert",
    "flowering": false,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 20,
    "height_max_cm": 40,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": true,
    "uses": [
      "Sombra húmeda",
      "Interior"
    ],
    "compatible_with_raw": "Hostas, Pulmonaria, Calathea",
    "notes": "Frondas delicadas con pecíolos negros. Prefiere lugares húmedos y sombríos.",
    "flowering_season": "No florece",
    "tags": [
      "nativa",
      "flores",
      "herbácea"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "helecho-culandrillo"
  },
  {
    "common_name": "Magnolia Púrpurea",
    "scientific_name": "Magnolia liliiflora",
    "plant_type": "Árbol",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Focal invernal",
      "Oriental"
    ],
    "compatible_with_raw": "Camellia, Jazmín magno, Forsythia",
    "notes": "Flores púrpura-violetas en cáliz antes que las hojas. Muy elegante.",
    "flowering_season": "Ago-Oct",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "magnolia-purpurea"
  },
  {
    "common_name": "Árbol de Té",
    "scientific_name": "Leptospermum scoparium",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 300,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Patagonia",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Rocallas",
      "Bordes",
      "Mediterráneo"
    ],
    "compatible_with_raw": "Brezo, Calafate, Festuca azul",
    "notes": "Flores pequeñas en blanco, rosa o rojo. Follaje aromático. Muy ornamental.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "arbusto",
      "aromática",
      "exótica"
    ],
    "garden_styles": [
      "mediterranean"
    ],
    "slug": "arbol-de-te"
  },
  {
    "common_name": "Westringia",
    "scientific_name": "Westringia fruticosa",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "monthly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 200,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Setos",
      "Mediterráneo",
      "Bajo mantenimiento"
    ],
    "compatible_with_raw": "Lavanda, Romero, Santolina",
    "notes": "Follaje grisáceo aromático. Flores blancas. Muy resistente al viento y sequía.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "arbusto",
      "aromática",
      "exótica"
    ],
    "garden_styles": [
      "minimal",
      "mediterranean"
    ],
    "slug": "westringia"
  },
  {
    "common_name": "Heliotropo",
    "scientific_name": "Heliotropium arborescens",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 50,
    "height_max_cm": 100,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Bordes aromáticos",
      "Focal"
    ],
    "compatible_with_raw": "Lavanda, Verbena, Salvia",
    "notes": "Flores violeta-azuladas con perfume a vainilla. Muy llamativo.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "heliotropo"
  },
  {
    "common_name": "Lavanda Stoechas",
    "scientific_name": "Lavandula stoechas",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 40,
    "height_max_cm": 80,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Mediterráneo",
      "Aromático"
    ],
    "compatible_with_raw": "Lavanda angustifolia, Romero, Tomillo",
    "notes": "Espigas con brácteas moradas características. Muy ornamental y aromática.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "arbusto",
      "aromática",
      "exótica"
    ],
    "garden_styles": [
      "mediterranean"
    ],
    "slug": "lavanda-stoechas"
  },
  {
    "common_name": "Melinis Savannah",
    "scientific_name": "Melinis nerviglumis 'Savannah'",
    "plant_type": "Gramínea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 40,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NOA"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Naturalista",
      "Color"
    ],
    "compatible_with_raw": "Pennisetum, Festuca azul, Esparto",
    "notes": "Espigas de color rojo-rosado brillante. Muy ornamental en verano y otoño.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "ornamental",
      "gramínea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "melinis-savannah"
  },
  {
    "common_name": "Salvia Farinacea",
    "scientific_name": "Salvia farinacea",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 40,
    "height_max_cm": 70,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Macizos",
      "Canteros",
      "Azul focal"
    ],
    "compatible_with_raw": "Salvia roja, Lobelia, Petunia",
    "notes": "Espigas azul-violáceas harinosas muy decorativas. Larga floración.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "salvia-farinacea"
  },
  {
    "common_name": "Bola de Nieve",
    "scientific_name": "Viburnum opulus",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 200,
    "height_max_cm": 400,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": false,
    "uses": [
      "Fondos",
      "Focal primaveral"
    ],
    "compatible_with_raw": "Hortensia, Azalea, Forsythia",
    "notes": "Cabezuelas redondas de flores blancas como bolas de nieve en primavera.",
    "flowering_season": "Oct-Nov",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "bola-de-nieve"
  },
  {
    "common_name": "Philadelphus",
    "scientific_name": "Philadelphus coronarius",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 200,
    "height_max_cm": 400,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": false,
    "uses": [
      "Aromático",
      "Fondos"
    ],
    "compatible_with_raw": "Bola de nieve, Forsythia, Hortensia",
    "notes": "Flores blancas con perfume a naranja intensísimo en primavera.",
    "flowering_season": "Oct-Nov",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "philadelphus"
  },
  {
    "common_name": "Lágrima de Cristo",
    "scientific_name": "Clerodendrum thomsoniae",
    "plant_type": "Trepadora",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 200,
    "height_max_cm": 400,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas tropicales",
      "Rejas"
    ],
    "compatible_with_raw": "Bignonia, Pasionaria, Thunbergia",
    "notes": "Flores bicolores rojo y blanco muy llamativas. Tropical.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "lagrima-de-cristo"
  },
  {
    "common_name": "Mandevilla / Diplademia",
    "scientific_name": "Mandevilla sanderi",
    "plant_type": "Trepadora",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 200,
    "height_max_cm": 400,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas",
      "Rejas",
      "Tropical"
    ],
    "compatible_with_raw": "Bignonia, Pasionaria, Santa Rita",
    "notes": "Flores rosadas o rojas acampanadas. Muy vistosa en verano.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "mandevilla-diplademia"
  },
  {
    "common_name": "Jazmín del Carolina",
    "scientific_name": "Gelsemium sempervirens",
    "plant_type": "Trepadora",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 600,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas",
      "Rejas"
    ],
    "compatible_with_raw": "Madreselva, Clematis, Jazmín de leche",
    "notes": "Flores tubulares amarillas fragantes en invierno-primavera.",
    "flowering_season": "Ago-Oct",
    "tags": [
      "enredadera",
      "trepadora",
      "aromática",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "jazmin-del-carolina"
  },
  {
    "common_name": "Thunbergia Azul",
    "scientific_name": "Thunbergia grandiflora",
    "plant_type": "Trepadora",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 400,
    "height_max_cm": 800,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas tropicales",
      "Muros"
    ],
    "compatible_with_raw": "Bignonia, Mandevilla, Santa Rita",
    "notes": "Flores azul-violeta grandes acampanadas. Muy vigorosa. Tropical.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "tropical"
    ],
    "slug": "thunbergia-azul"
  },
  {
    "common_name": "Salvia Sclarea",
    "scientific_name": "Salvia sclarea",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 60,
    "height_max_cm": 100,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Bordes estructurales",
      "Bianual"
    ],
    "compatible_with_raw": "Salvia nemorosa, Lavanda, Romero",
    "notes": "Brácteas rosadas sobre flores blancas. Aromática. Bianual imponente.",
    "flowering_season": "Oct-Nov",
    "tags": [
      "aromática",
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "salvia-sclarea"
  },
  {
    "common_name": "Lágrima de Reina",
    "scientific_name": "Billbergia nutans",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 50,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Interior",
      "Sombra",
      "Bromeliácea"
    ],
    "compatible_with_raw": "Calathea, Hostas, Filodendro",
    "notes": "Flores colgantes en rosa, azul y verde. Bromeliacea nativa muy ornamental.",
    "flowering_season": "Jun-Sep",
    "tags": [
      "nativa",
      "flores",
      "herbácea"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "lagrima-de-reina"
  },
  {
    "common_name": "Santa Lucía",
    "scientific_name": "Tradescantia pallida",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 20,
    "height_max_cm": 40,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Tapizante",
      "Macetas colgantes"
    ],
    "compatible_with_raw": "Ajuga, Vinca, Verbena rastrera",
    "notes": "Follaje morado intenso. Flores rosas pequeñas. Cobertura de suelo muy llamativa.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "santa-lucia"
  },
  {
    "common_name": "Hardenbergia",
    "scientific_name": "Hardenbergia violacea",
    "plant_type": "Trepadora",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": false,
    "uses": [
      "Rejas",
      "Pérgolas invernales"
    ],
    "compatible_with_raw": "Clematis, Jazmín chino",
    "notes": "Flores violeta-lilas en racimos en invierno-primavera. Muy ornamental.",
    "flowering_season": "Jul-Sep",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "hardenbergia"
  },
  {
    "common_name": "Agapanthus Inapertus",
    "scientific_name": "Agapanthus inapertus",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 80,
    "height_max_cm": 120,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Masivos",
      "Bordes tardíos"
    ],
    "compatible_with_raw": "Agapanto, Iris, Hemerocallis",
    "notes": "Flores azul oscuro tubulares colgantes. Florece en verano tardío. Muy elegante.",
    "flowering_season": "Feb-Abr",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "agapanthus-inapertus"
  },
  {
    "common_name": "Cerezo Japonés / Sakura",
    "scientific_name": "Prunus serrulata",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 500,
    "height_max_cm": 1000,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "Patagonia"
    ],
    "is_native": false,
    "uses": [
      "Focal primaveral",
      "Oriental"
    ],
    "compatible_with_raw": "Prunus mume, Forsythia, Magnolia",
    "notes": "Flores dobles blancas o rosadas en primavera. Icónico de la cultura japonesa.",
    "flowering_season": "Ago-Sep",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "cerezo-japones-sakura"
  },
  {
    "common_name": "Brecina / Calluna",
    "scientific_name": "Calluna vulgaris",
    "plant_type": "Arbusto",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 20,
    "height_max_cm": 50,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Patagonia",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Rocallas",
      "Suelos ácidos",
      "Tapizante"
    ],
    "compatible_with_raw": "Brezo, Festuca azul, Calafate",
    "notes": "Pequeñas flores lilas o blancas en otoño. Requiere suelos ácidos.",
    "flowering_season": "Feb-May",
    "tags": [
      "arbusto",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "brecina-calluna"
  },
  {
    "common_name": "Palto / Aguacate",
    "scientific_name": "Persea americana",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 800,
    "height_max_cm": 1500,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Sombra",
      "Productivo"
    ],
    "compatible_with_raw": "Tipa blanca, Magnolia",
    "notes": "Árbol frutal de gran porte con frutos muy valiosos. Sensible a heladas.",
    "flowering_season": "Sep-Oct",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "palto-aguacate"
  },
  {
    "common_name": "Limonero",
    "scientific_name": "Citrus limon",
    "plant_type": "Árbol",
    "light": "full_sun",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": false,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 600,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NEA",
      "Cuyo"
    ],
    "is_native": false,
    "uses": [
      "Productivo",
      "Ornamental",
      "Fragante"
    ],
    "compatible_with_raw": "Naranjo, Jazmín, Lavanda",
    "notes": "Frutos todo el año. Flores blancas perfumadas. Ornamental y productivo.",
    "flowering_season": "Variable",
    "tags": [
      "árbol",
      "sombra",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "limonero"
  },
  {
    "common_name": "Akebia",
    "scientific_name": "Akebia quinata",
    "plant_type": "Trepadora",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 400,
    "height_max_cm": 800,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Pérgolas",
      "Semisombra"
    ],
    "compatible_with_raw": "Clematis, Madreselva, Wisteria",
    "notes": "Flores perfumadas violáceas y blancas. Follaje palmeado semipersistente.",
    "flowering_season": "Ago-Oct",
    "tags": [
      "enredadera",
      "trepadora",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "akebia"
  },
  {
    "common_name": "Nierembergia / Chusco",
    "scientific_name": "Nierembergia hippomanica",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 10,
    "height_max_cm": 30,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Bordes",
      "Tapizante",
      "Macetas"
    ],
    "compatible_with_raw": "Lobelia, Verbena rastrera, Erigeron",
    "notes": "Flores blancas o lila-celeste diminutas. Nativa pampeana muy delicada.",
    "flowering_season": "Oct-Abr",
    "tags": [
      "nativa",
      "flores",
      "herbácea"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "nierembergia-chusco"
  },
  {
    "common_name": "Margarita Punzó",
    "scientific_name": "Ursinia anthemoides",
    "plant_type": "Herbácea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 20,
    "height_max_cm": 40,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Masivos primaverales",
      "Bordes"
    ],
    "compatible_with_raw": "Caléndula, Cosmos, Erigeron",
    "notes": "Flores anaranjadas con centro oscuro. Muy vistosas en primavera temprana.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "margarita-punzo"
  },
  {
    "common_name": "Lirio Celeste",
    "scientific_name": "Aristea ecklonii",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 50,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Azul focal"
    ],
    "compatible_with_raw": "Agapanto, Iris, Plumbago",
    "notes": "Pequeñas flores azul cielo en espigas. Muy prolífera y elegante.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "lirio-celeste"
  },
  {
    "common_name": "Bibí Estrellita / Ipheion",
    "scientific_name": "Ipheion uniflorum",
    "plant_type": "Herbácea",
    "light": "partial_shade",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 10,
    "height_max_cm": 20,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Todo Argentina"
    ],
    "is_native": false,
    "uses": [
      "Naturalista",
      "Bajo árboles",
      "Bulbosa"
    ],
    "compatible_with_raw": "No me olvides, Erigeron",
    "notes": "Flores estrelladas azul pálido en primavera. Bulbosa delicada que se naturaliza.",
    "flowering_season": "Ago-Oct",
    "tags": [
      "flores",
      "herbácea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "bibi-estrellita-ipheion"
  },
  {
    "common_name": "Aljaba / Chilco",
    "scientific_name": "Fuchsia magellanica",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 300,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Patagonia",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Sombra",
      "Bordes patagónicos"
    ],
    "compatible_with_raw": "Arrayán, Calafate, Brezo",
    "notes": "Flores colgantes bicolores rojo y morado. Nativa patagónica muy ornamental.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "arbusto",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "aljaba-chilco"
  },
  {
    "common_name": "Jazmín de la Selva",
    "scientific_name": "Mandevilla laxa",
    "plant_type": "Trepadora",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 300,
    "height_max_cm": 600,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Pérgolas",
      "Perfume"
    ],
    "compatible_with_raw": "Mandevilla sanderi, Pasionaria",
    "notes": "Flores blancas perfumadas intensamente. Trepadora nativa del litoral.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "enredadera",
      "trepadora",
      "nativa"
    ],
    "garden_styles": [
      "tropical",
      "natural"
    ],
    "slug": "jazmin-de-la-selva"
  },
  {
    "common_name": "Jazmín del Paraguay",
    "scientific_name": "Brunfelsia australis",
    "plant_type": "Arbusto",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 100,
    "height_max_cm": 300,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "NEA",
      "Pampeana"
    ],
    "is_native": true,
    "uses": [
      "Sombra parcial",
      "Aromático"
    ],
    "compatible_with_raw": "Duranta, Iochroma, Tibouchina",
    "notes": "Flores que cambian de violeta a blanco en días. Perfume nocturno intenso.",
    "flowering_season": "Sep-Nov",
    "tags": [
      "arbusto",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "jazmin-del-paraguay"
  },
  {
    "common_name": "Tasi",
    "scientific_name": "Araujia sericifera",
    "plant_type": "Trepadora",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": 400,
    "height_max_cm": 800,
    "origin": [
      "Nativa"
    ],
    "regions": [
      "Pampeana",
      "NEA"
    ],
    "is_native": true,
    "uses": [
      "Naturalista",
      "Fauna"
    ],
    "compatible_with_raw": "Pasionaria, Madreselva",
    "notes": "Flores blancas perfumadas. Frutos que abren liberando semillas con pelos. Nativa.",
    "flowering_season": "Nov-Feb",
    "tags": [
      "enredadera",
      "trepadora",
      "nativa"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "tasi"
  },
  {
    "common_name": "Melinis Nerviglumis",
    "scientific_name": "Melinis nerviglumis",
    "plant_type": "Gramínea",
    "light": "full_sun",
    "water": "biweekly",
    "care_level": "easy",
    "flowering": true,
    "evergreen": true,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 30,
    "height_max_cm": 60,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana",
      "NOA"
    ],
    "is_native": false,
    "uses": [
      "Bordes",
      "Naturalista",
      "Color"
    ],
    "compatible_with_raw": "Esparto, Festuca azul, Pennisetum",
    "notes": "Espigas rojizas brillantes muy ornamentales. Muy resistente al calor.",
    "flowering_season": "Nov-Mar",
    "tags": [
      "ornamental",
      "gramínea",
      "exótica"
    ],
    "garden_styles": [
      "natural"
    ],
    "slug": "melinis-nerviglumis"
  },
  {
    "common_name": "Chasmanthium",
    "scientific_name": "Chasmanthium latifolium",
    "plant_type": "Gramínea",
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": true,
    "evergreen": true,
    "indoor": true,
    "outdoor": true,
    "pot_suitable": true,
    "height_min_cm": 60,
    "height_max_cm": 100,
    "origin": [
      "Exótica"
    ],
    "regions": [
      "Pampeana"
    ],
    "is_native": false,
    "uses": [
      "Sombra",
      "Bordes húmedos",
      "Naturalista"
    ],
    "compatible_with_raw": "Carex, Hostas, Astilbe",
    "notes": "Espigas aplanadas colgantes muy ornamentales. Gramínea para semisombra.",
    "flowering_season": "Feb-Apr",
    "tags": [
      "ornamental",
      "gramínea",
      "exótica"
    ],
    "garden_styles": [
      "tropical",
      "natural"
    ],
    "slug": "chasmanthium"
  },
  {
    "common_name": "San Miguelito",
    "scientific_name": "Antigonon Leptopus",
    "plant_type": null,
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": false,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": null,
    "height_max_cm": null,
    "origin": [],
    "regions": [],
    "is_native": false,
    "uses": [],
    "compatible_with_raw": "",
    "notes": null,
    "flowering_season": null,
    "tags": [],
    "garden_styles": [
      "natural"
    ],
    "slug": "san-miguelito"
  },
  {
    "common_name": "Lila",
    "scientific_name": "Syringa Vulgaris",
    "plant_type": null,
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": false,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": null,
    "height_max_cm": null,
    "origin": [],
    "regions": [],
    "is_native": false,
    "uses": [],
    "compatible_with_raw": "",
    "notes": null,
    "flowering_season": null,
    "tags": [],
    "garden_styles": [
      "natural"
    ],
    "slug": "lila"
  },
  {
    "common_name": "Boldo de la India",
    "scientific_name": "Plectranthus Barbatus",
    "plant_type": null,
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": false,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": null,
    "height_max_cm": null,
    "origin": [],
    "regions": [],
    "is_native": false,
    "uses": [],
    "compatible_with_raw": "",
    "notes": null,
    "flowering_season": null,
    "tags": [],
    "garden_styles": [
      "natural"
    ],
    "slug": "boldo-de-la-india"
  },
  {
    "common_name": "Arbol de Fuego",
    "scientific_name": "Brachychiton Acerifolius",
    "plant_type": null,
    "light": "partial_shade",
    "water": "weekly",
    "care_level": "moderate",
    "flowering": false,
    "evergreen": false,
    "indoor": false,
    "outdoor": true,
    "pot_suitable": false,
    "height_min_cm": null,
    "height_max_cm": null,
    "origin": [],
    "regions": [],
    "is_native": false,
    "uses": [],
    "compatible_with_raw": "",
    "notes": null,
    "flowering_season": null,
    "tags": [],
    "garden_styles": [
      "natural"
    ],
    "slug": "arbol-de-fuego-2"
  }
] as const;

async function seed() {
  console.log(`🌿 Insertando ${PLANTS.length} plantas...`);
  const BATCH = 50;
  let inserted = 0;

  for (let i = 0; i < PLANTS.length; i += BATCH) {
    const batch = (PLANTS as any[]).slice(i, i + BATCH).map((p: any) => ({
      common_name: p.common_name,
      scientific_name: p.scientific_name,
      light: p.light,
      water: p.water,
      care_level: p.care_level,
      flowering: p.flowering,
      evergreen: p.evergreen,
      indoor: p.indoor,
      outdoor: p.outdoor,
      pot_suitable: p.pot_suitable,
      height_min_cm: p.height_min_cm,
      height_max_cm: p.height_max_cm,
      origin: p.origin,
      tags: p.tags,
      garden_styles: p.garden_styles,
      uses: p.uses,
      description: [
        p.notes,
        p.flowering_season ? `Floración: ${p.flowering_season}.` : null,
        p.regions?.length ? `Región: ${p.regions.join(", ")}.` : null,
      ].filter(Boolean).join(" ") || null,
      slug: p.slug,
      published: true,
    }));

    const { error } = await supabase.from("plants").upsert(batch, { onConflict: "scientific_name" });
    if (error) {
      console.error(`Error en batch ${Math.floor(i/BATCH)+1}:`, error.message);
    } else {
      inserted += batch.length;
      console.log(`  ✓ Batch ${Math.floor(i/BATCH)+1}: ${inserted}/${PLANTS.length}`);
    }
  }

  console.log("\n🔗 Insertando combinaciones...");
  const { data: allPlants } = await supabase.from("plants").select("id, common_name");
  const plantMap = new Map((allPlants ?? []).map((p: any) => [p.common_name, p.id]));

  const combos: any[] = [];
  for (const p of PLANTS as any[]) {
    if (!p.compatible_with_raw) continue;
    const namesB = (p.compatible_with_raw as string).split(",").map((s: string) => s.trim());
    for (const nameB of namesB) {
      const idA = plantMap.get(p.common_name);
      const idB = plantMap.get(nameB);
      if (idA && idB && idA !== idB) {
        combos.push({ plant_a_id: idA, plant_b_id: idB, compatibility_score: 0.85, aesthetic_score: 0.80, style_tags: [] });
      }
    }
  }

  const seen = new Set<string>();
  const uniqueCombos = combos.filter(c => {
    const key = [c.plant_a_id, c.plant_b_id].sort().join(":");
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });

  for (let i = 0; i < uniqueCombos.length; i += BATCH) {
    await supabase.from("plant_combinations").upsert(
      uniqueCombos.slice(i, i + BATCH),
      { onConflict: "plant_a_id,plant_b_id", ignoreDuplicates: true }
    );
  }
  console.log(`  ✓ ${uniqueCombos.length} combinaciones`);
  console.log("\n✅ Seed completado.");
}

seed().catch(console.error);
