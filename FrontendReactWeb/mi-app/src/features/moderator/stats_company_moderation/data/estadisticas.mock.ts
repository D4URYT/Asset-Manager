"use client";

import { Empresa, EstadisticasGlobales } from '../types/estadisticas.types';

const meses = ['Ago','Sep','Oct','Nov','Dic','Ene','Feb','Mar'];

function prng(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function genMeses(base: number, crecimiento: number) {
  return meses.map((mes, i) => ({
    mes,
    ventas: Math.round(
      base * (1 + (crecimiento / 100) * (i / meses.length)) +
      prng(base * 97 + crecimiento * 131 + i * 17) * base * 0.1
    ),
    ingresos: Math.round(base * 150 * (1 + (crecimiento / 100) * (i / meses.length))),
  }));
}

export const empresasMock: Empresa[] = [
  {
    id: '1', nombre: 'TechZone RD', iniciales: 'TZ', colorAvatar: '#1E3A8A',
    categoria: 'electronica', estado: 'activa',
    totalVentas: 14820, totalIngresos: 8450000, totalProductos: 342,
    calificacion: 4.8, totalResenas: 2341, clientesUnicos: 6720, tasaDevolucion: 1.2, crecimiento: 34.5,
    ventasMensuales: genMeses(1850, 34.5),
    productosTop: [
      { id: 'p1', nombre: 'iPhone 15 Pro Max', unidades: 1240, ingresos: 1860000 },
      { id: 'p2', nombre: 'MacBook Air M3',    unidades:  880, ingresos: 1408000 },
      { id: 'p3', nombre: 'AirPods Pro 2',     unidades: 1650, ingresos:  577500 },
      { id: 'p4', nombre: 'iPad Pro 12.9"',    unidades:  590, ingresos:  826000 },
    ],
    fechaRegistro: '2022-03-15',
  },
  {
    id: '2', nombre: 'Moda Élite', iniciales: 'ME', colorAvatar: '#7C3AED',
    categoria: 'moda', estado: 'activa',
    totalVentas: 11340, totalIngresos: 4920000, totalProductos: 890,
    calificacion: 4.6, totalResenas: 1876, clientesUnicos: 5430, tasaDevolucion: 3.8, crecimiento: 22.1,
    ventasMensuales: genMeses(1400, 22.1),
    productosTop: [
      { id: 'p5', nombre: 'Bolso Louis V. Replica', unidades: 820, ingresos: 738000 },
      { id: 'p6', nombre: 'Vestido Verano 2025',    unidades: 1200, ingresos: 360000 },
      { id: 'p7', nombre: 'Zapatillas Nike Air',    unidades: 940,  ingresos: 376000 },
      { id: 'p8', nombre: 'Gafas Ray-Ban Original', unidades: 610,  ingresos: 305000 },
    ],
    fechaRegistro: '2022-07-20',
  },
  {
    id: '3', nombre: 'HogarPlus', iniciales: 'HP', colorAvatar: '#10B981',
    categoria: 'hogar', estado: 'activa',
    totalVentas: 9870, totalIngresos: 3210000, totalProductos: 654,
    calificacion: 4.5, totalResenas: 1432, clientesUnicos: 4890, tasaDevolucion: 2.1, crecimiento: 18.7,
    ventasMensuales: genMeses(1230, 18.7),
    productosTop: [
      { id: 'p9',  nombre: 'Sofá Modular 3 Plazas', unidades: 340, ingresos: 510000 },
      { id: 'p10', nombre: 'Set Cocina Antiadherente', unidades: 890, ingresos: 178000 },
      { id: 'p11', nombre: 'Lámpara LED Inteligente', unidades: 1100, ingresos: 165000 },
      { id: 'p12', nombre: 'Aspiradora Robot',        unidades: 460,  ingresos: 368000 },
    ],
    fechaRegistro: '2021-11-08',
  },
  {
    id: '4', nombre: 'SportMax', iniciales: 'SM', colorAvatar: '#F59E0B',
    categoria: 'deportes', estado: 'activa',
    totalVentas: 8230, totalIngresos: 2780000, totalProductos: 421,
    calificacion: 4.3, totalResenas: 987, clientesUnicos: 3920, tasaDevolucion: 4.5, crecimiento: 12.4,
    ventasMensuales: genMeses(1028, 12.4),
    productosTop: [
      { id: 'p13', nombre: 'Bicicleta MTB 29"',  unidades: 280, ingresos: 560000 },
      { id: 'p14', nombre: 'Trotadora Eléctrica', unidades: 190, ingresos: 380000 },
      { id: 'p15', nombre: 'Guantes Boxeo Pro',   unidades: 720, ingresos: 108000 },
      { id: 'p16', nombre: 'Raqueta Babolat',     unidades: 410, ingresos: 164000 },
    ],
    fechaRegistro: '2023-01-12',
  },
  {
    id: '5', nombre: 'SaludVital', iniciales: 'SV', colorAvatar: '#EC4899',
    categoria: 'salud', estado: 'activa',
    totalVentas: 6540, totalIngresos: 1960000, totalProductos: 238,
    calificacion: 4.7, totalResenas: 1123, clientesUnicos: 3210, tasaDevolucion: 1.8, crecimiento: 28.9,
    ventasMensuales: genMeses(817, 28.9),
    productosTop: [
      { id: 'p17', nombre: 'Monitor Cardíaco',     unidades: 540, ingresos: 270000 },
      { id: 'p18', nombre: 'Suplemento Proteína',  unidades: 980, ingresos: 196000 },
      { id: 'p19', nombre: 'Tensiómetro Digital',  unidades: 620, ingresos: 186000 },
      { id: 'p20', nombre: 'Masajeador Shiatsu',   unidades: 310, ingresos: 124000 },
    ],
    fechaRegistro: '2023-04-05',
  },
  {
    id: '6', nombre: 'FoodExpress', iniciales: 'FE', colorAvatar: '#EF4444',
    categoria: 'alimentos', estado: 'activa',
    totalVentas: 5890, totalIngresos: 1240000, totalProductos: 185,
    calificacion: 4.2, totalResenas: 743, clientesUnicos: 2870, tasaDevolucion: 5.2, crecimiento: 8.3,
    ventasMensuales: genMeses(736, 8.3),
    productosTop: [
      { id: 'p21', nombre: 'Pack Snacks Saludables', unidades: 1240, ingresos: 186000 },
      { id: 'p22', nombre: 'Café Orgánico 500g',     unidades: 890,  ingresos:  89000 },
      { id: 'p23', nombre: 'Set Especias Gourmet',   unidades: 630,  ingresos:  63000 },
      { id: 'p24', nombre: 'Aceite de Oliva Extra',  unidades: 540,  ingresos:  81000 },
    ],
    fechaRegistro: '2023-08-18',
  },
  {
    id: '7', nombre: 'TechGadgets', iniciales: 'TG', colorAvatar: '#0EA5E9',
    categoria: 'tecnologia', estado: 'inactiva',
    totalVentas: 3210, totalIngresos: 890000, totalProductos: 156,
    calificacion: 3.9, totalResenas: 412, clientesUnicos: 1540, tasaDevolucion: 7.1, crecimiento: -4.2,
    ventasMensuales: genMeses(401, -4.2),
    productosTop: [
      { id: 'p25', nombre: 'Smart Watch Genérico', unidades: 420, ingresos: 126000 },
      { id: 'p26', nombre: 'Power Bank 20000mAh',  unidades: 380, ingresos:  57000 },
    ],
    fechaRegistro: '2022-06-30',
  },
  {
    id: '8', nombre: 'ModaUrbana', iniciales: 'MU', colorAvatar: '#14B8A6',
    categoria: 'moda', estado: 'suspendida',
    totalVentas: 1890, totalIngresos: 430000, totalProductos: 98,
    calificacion: 2.8, totalResenas: 234, clientesUnicos: 890, tasaDevolucion: 14.3, crecimiento: -18.6,
    ventasMensuales: genMeses(236, -18.6),
    productosTop: [
      { id: 'p27', nombre: 'Camiseta Estampada', unidades: 320, ingresos: 32000 },
    ],
    fechaRegistro: '2023-02-14',
  },
];

export const estadisticasGlobalesMock: EstadisticasGlobales = {
  totalEmpresas:         8,
  empresasActivas:       6,
  totalVentas:           61790,
  totalIngresos:         23880000,
  promedioCalificacion:  4.35,
  crecimientoGeneral:    17.8,
};
