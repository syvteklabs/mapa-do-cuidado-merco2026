// Dados geográficos dos 13 municípios do Noroeste Fluminense
// Fonte: Limites municipais simplificados baseados em dados do IBGE
// Coordenadas em graus decimais (latitude, longitude)

export interface MunicipalityGeo {
  name: string;
  code: string;
  centroid: [number, number]; // [lng, lat]
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  coordinates: Array<[number, number]>; // Polygon coordinates
}

// Limites simplificados dos 13 municípios do Noroeste Fluminense
export const MUNICIPIOS_GEOJSON: Record<string, MunicipalityGeo> = {
  "Aperibé": {
    name: "Aperibé",
    code: "3300704",
    centroid: [-41.7486, -20.9669],
    bounds: { north: -20.8933, south: -21.0405, east: -41.6471, west: -41.8501 },
    coordinates: [
      [-41.6471, -20.8933], [-41.6890, -20.8800], [-41.7456, -20.8900],
      [-41.8300, -20.9200], [-41.8501, -20.9800], [-41.8200, -21.0405],
      [-41.7100, -21.0300], [-41.6600, -20.9900], [-41.6471, -20.8933]
    ]
  },
  "Bom Jesus do Itabapoana": {
    name: "Bom Jesus do Itabapoana",
    code: "3300902",
    centroid: [-41.7778, -21.1356],
    bounds: { north: -21.0400, south: -21.2312, east: -41.5700, west: -41.9856 },
    coordinates: [
      [-41.5700, -21.0400], [-41.6800, -21.0200], [-41.7600, -21.0500],
      [-41.8800, -21.0800], [-41.9856, -21.1500], [-41.9600, -21.2312],
      [-41.7900, -21.2100], [-41.6500, -21.1700], [-41.5700, -21.0400]
    ]
  },
  "Cambuci": {
    name: "Cambuci",
    code: "3301009",
    centroid: [-41.7014, -21.5261],
    bounds: { north: -21.4100, south: -21.6422, east: -41.5300, west: -41.8728 },
    coordinates: [
      [-41.5300, -21.4100], [-41.6400, -21.4000], [-41.7500, -21.4300],
      [-41.8728, -21.5100], [-41.8600, -21.6422], [-41.7100, -21.6300],
      [-41.6000, -21.5900], [-41.5300, -21.4100]
    ]
  },
  "Italva": {
    name: "Italva",
    code: "3301407",
    centroid: [-41.9483, -21.1958],
    bounds: { north: -21.0900, south: -21.2900, east: -41.7900, west: -42.1067 },
    coordinates: [
      [-41.7900, -21.0900], [-41.8900, -21.1000], [-41.9800, -21.1200],
      [-42.1067, -21.1800], [-42.0900, -21.2900], [-41.9400, -21.2800],
      [-41.8400, -21.2300], [-41.7900, -21.0900]
    ]
  },
  "Itaocara": {
    name: "Itaocara",
    code: "3301506",
    centroid: [-42.0611, -21.7739],
    bounds: { north: -21.6400, south: -21.9078, east: -41.8600, west: -42.2626 },
    coordinates: [
      [-41.8600, -21.6400], [-41.9800, -21.6500], [-42.0800, -21.7000],
      [-42.2626, -21.7800], [-42.2400, -21.9078], [-42.0900, -21.8900],
      [-41.9500, -21.8300], [-41.8600, -21.6400]
    ]
  },
  "Itaperuna": {
    name: "Itaperuna",
    code: "3301605",
    centroid: [-41.8833, -21.2278],
    bounds: { north: -21.0700, south: -21.3850, east: -41.6500, west: -42.0967 },
    coordinates: [
      [-41.6500, -21.0700], [-41.7800, -21.0600], [-41.9200, -21.1200],
      [-42.0967, -21.2000], [-42.0800, -21.3850], [-41.8900, -21.3700],
      [-41.7300, -21.3000], [-41.6500, -21.0700]
    ]
  },
  "Laje do Muriaé": {
    name: "Laje do Muriaé",
    code: "3301704",
    centroid: [-41.6392, -20.8389],
    bounds: { north: -20.7300, south: -20.9478, east: -41.4456, west: -41.8328 },
    coordinates: [
      [-41.4456, -20.7300], [-41.5600, -20.7400], [-41.6800, -20.7800],
      [-41.8328, -20.8500], [-41.8100, -20.9478], [-41.6500, -20.9200],
      [-41.5200, -20.8600], [-41.4456, -20.7300]
    ]
  },
  "Miracema": {
    name: "Miracema",
    code: "3302304",
    centroid: [-41.9831, -21.4494],
    bounds: { north: -21.3200, south: -21.5786, east: -41.7600, west: -42.1967 },
    coordinates: [
      [-41.7600, -21.3200], [-41.8900, -21.3300], [-42.0200, -21.4000],
      [-42.1967, -21.4700], [-42.1700, -21.5786], [-42.0100, -21.5600],
      [-41.8600, -21.5000], [-41.7600, -21.3200]
    ]
  },
  "Natividade": {
    name: "Natividade",
    code: "3302403",
    centroid: [-41.4328, -21.5128],
    bounds: { north: -21.3600, south: -21.6656, east: -41.1900, west: -41.6856 },
    coordinates: [
      [-41.1900, -21.3600], [-41.3200, -21.3700], [-41.4600, -21.4200],
      [-41.6856, -21.5200], [-41.6600, -21.6656], [-41.4800, -21.6400],
      [-41.3100, -21.5700], [-41.1900, -21.3600]
    ]
  },
  "Porciúncula": {
    name: "Porciúncula",
    code: "3303302",
    centroid: [-41.9231, -20.9228],
    bounds: { north: -20.7900, south: -21.0556, east: -41.6700, west: -42.1767 },
    coordinates: [
      [-41.6700, -20.7900], [-41.8100, -20.8000], [-41.9300, -20.8600],
      [-42.1767, -20.9300], [-42.1500, -21.0556], [-41.9600, -21.0400],
      [-41.7800, -20.9700], [-41.6700, -20.7900]
    ]
  },
  "Santo Antônio de Pádua": {
    name: "Santo Antônio de Pádua",
    code: "3304300",
    centroid: [-42.1947, -21.5331],
    bounds: { north: -21.3800, south: -21.6864, east: -41.9100, west: -42.4783 },
    coordinates: [
      [-41.9100, -21.3800], [-42.0400, -21.3900], [-42.1700, -21.4500],
      [-42.4783, -21.5400], [-42.4500, -21.6864], [-42.2200, -21.6600],
      [-42.0600, -21.5900], [-41.9100, -21.3800]
    ]
  },
  "São José de Ubá": {
    name: "São José de Ubá",
    code: "3304904",
    centroid: [-41.9789, -21.3142],
    bounds: { north: -21.1600, south: -21.4688, east: -41.7200, west: -42.1876 },
    coordinates: [
      [-41.7200, -21.1600], [-41.8600, -21.1700], [-41.9900, -21.2300],
      [-42.1876, -21.3200], [-42.1600, -21.4688], [-41.9900, -21.4500],
      [-41.8200, -21.3800], [-41.7200, -21.1600]
    ]
  },
  "Varre-Sai": {
    name: "Varre-Sai",
    code: "3305100",
    centroid: [-41.8492, -20.7531],
    bounds: { north: -20.6300, south: -20.8769, east: -41.6300, west: -42.0681 },
    coordinates: [
      [-41.6300, -20.6300], [-41.7700, -20.6400], [-41.9100, -20.7100],
      [-42.0681, -20.7700], [-42.0400, -20.8769], [-41.8800, -20.8600],
      [-41.7200, -20.8000], [-41.6300, -20.6300]
    ]
  }
};

// Obter todos os nomes dos municípios para normalização
export const MUNICIPIOS_NAMES = Object.keys(MUNICIPIOS_GEOJSON);

// Normalizar nome para busca (remover acentos, maiúsculas, espaços extras)
export function normalizeMunicipalityName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // Remove diacritics
    .toLowerCase()
    .trim();
}

// Encontrar município por nome normalizado
export function findMunicipalityByName(name: string): MunicipalityGeo | null {
  const normalized = normalizeMunicipalityName(name);
  const entry = Object.entries(MUNICIPIOS_GEOJSON).find(
    ([key]) => normalizeMunicipalityName(key) === normalized
  );
  return entry ? entry[1] : null;
}

// Calcular bounds de todos os municípios para zoom inicial
export function getNoroesteBounds() {
  const allMunicipios = Object.values(MUNICIPIOS_GEOJSON);
  const lats = allMunicipios.flatMap(m => [m.bounds.north, m.bounds.south]);
  const lngs = allMunicipios.flatMap(m => [m.bounds.east, m.bounds.west]);

  return {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs),
  };
}
