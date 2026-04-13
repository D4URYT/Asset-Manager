"use client";

import { Producto, EstadisticasGlobales } from '../types/productos.types';

const meses = ['Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar'];

function prng(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function gm(baseV: number, crec: number, precio: number) {
  return meses.map((mes, i) => {
    const factor = 1 + (crec / 100) * (i / meses.length);
    const jitter = (prng(baseV * 73 + crec * 29 + precio * 11 + i * 19) - 0.5) * baseV * 0.12;
    const ventas = Math.max(1, Math.round(baseV * factor + jitter));
    return {
      mes,
      ventas,
      ingresos: ventas * precio,
      vistas: Math.round(ventas * (8 + prng(precio * 31 + baseV * 13 + i * 23) * 10)),
    };
  });
}

function rd(cal: number): { estrellas: number; cantidad: number }[] {
  const total = Math.round(50 + prng(cal * 101) * 500);
  const pesos = [0.03, 0.05, 0.1, 0.28, 0.54].map((p, i) =>
    p + (cal - 3.5) * 0.05 * (prng(cal * 59 + i * 7) - 0.5)
  );
  const norm = pesos.map(p => Math.max(0.01, p));
  const sum = norm.reduce((a, b) => a + b, 0);
  return [1, 2, 3, 4, 5].map((e, i) => ({ estrellas: e, cantidad: Math.round(total * norm[i] / sum) }));
}

export const productosMock: Producto[] = [
  {
    id: '1', nombre: 'iPhone 15 Pro Max 256GB', empresa: 'TechZone RD', empresaColor: '#1E3A8A',
    categoria: 'electronica', estado: 'activo', precio: 85000,
    totalVentas: 3240, totalIngresos: 275400000, totalVistas: 48600, calificacion: 4.9,
    totalResenas: 1820, stock: 142, tasaConversion: 6.7, tasaDevolucion: 0.8, crecimiento: 42.3,
    ventasMensuales: gm(405, 42.3, 85000), resenasDist: rd(4.9), fechaLanzamiento: '2024-01-15',
  },
  {
    id: '2', nombre: 'MacBook Air M3 15"', empresa: 'TechZone RD', empresaColor: '#1E3A8A',
    categoria: 'electronica', estado: 'activo', precio: 160000,
    totalVentas: 1580, totalIngresos: 252800000, totalVistas: 29400, calificacion: 4.8,
    totalResenas: 934, stock: 67, tasaConversion: 5.4, tasaDevolucion: 1.2, crecimiento: 28.7,
    ventasMensuales: gm(197, 28.7, 160000), resenasDist: rd(4.8), fechaLanzamiento: '2024-03-08',
  },
  {
    id: '3', nombre: 'AirPods Pro 2da Gen', empresa: 'TechZone RD', empresaColor: '#1E3A8A',
    categoria: 'electronica', estado: 'activo', precio: 12500,
    totalVentas: 4810, totalIngresos: 60125000, totalVistas: 72300, calificacion: 4.7,
    totalResenas: 2341, stock: 320, tasaConversion: 6.7, tasaDevolucion: 1.5, crecimiento: 35.1,
    ventasMensuales: gm(601, 35.1, 12500), resenasDist: rd(4.7), fechaLanzamiento: '2023-11-20',
  },
  {
    id: '4', nombre: 'Bolso Premium Cuero Italiano', empresa: 'Moda Élite', empresaColor: '#7C3AED',
    categoria: 'moda', estado: 'activo', precio: 18500,
    totalVentas: 2890, totalIngresos: 53465000, totalVistas: 61200, calificacion: 4.6,
    totalResenas: 1123, stock: 89, tasaConversion: 4.7, tasaDevolucion: 2.3, crecimiento: 19.8,
    ventasMensuales: gm(361, 19.8, 18500), resenasDist: rd(4.6), fechaLanzamiento: '2023-09-12',
  },
  {
    id: '5', nombre: 'Sofá Modular 3 Plazas', empresa: 'HogarPlus', empresaColor: '#10B981',
    categoria: 'hogar', estado: 'activo', precio: 45000,
    totalVentas: 1240, totalIngresos: 55800000, totalVistas: 38900, calificacion: 4.5,
    totalResenas: 678, stock: 34, tasaConversion: 3.2, tasaDevolucion: 3.1, crecimiento: 14.6,
    ventasMensuales: gm(155, 14.6, 45000), resenasDist: rd(4.5), fechaLanzamiento: '2023-06-01',
  },
  {
    id: '6', nombre: 'Samsung Galaxy S24 Ultra', empresa: 'TechZone RD', empresaColor: '#1E3A8A',
    categoria: 'electronica', estado: 'activo', precio: 78000,
    totalVentas: 2100, totalIngresos: 163800000, totalVistas: 41500, calificacion: 4.7,
    totalResenas: 1045, stock: 98, tasaConversion: 5.1, tasaDevolucion: 1.8, crecimiento: 22.4,
    ventasMensuales: gm(262, 22.4, 78000), resenasDist: rd(4.7), fechaLanzamiento: '2024-02-01',
  },
  {
    id: '7', nombre: 'Bicicleta MTB 29" Aluminio', empresa: 'SportMax', empresaColor: '#F59E0B',
    categoria: 'deportes', estado: 'activo', precio: 28000,
    totalVentas: 890, totalIngresos: 24920000, totalVistas: 19800, calificacion: 4.4,
    totalResenas: 412, stock: 55, tasaConversion: 4.5, tasaDevolucion: 2.8, crecimiento: 11.2,
    ventasMensuales: gm(111, 11.2, 28000), resenasDist: rd(4.4), fechaLanzamiento: '2023-07-15',
  },
  {
    id: '8', nombre: 'Monitor Cardíaco Smart', empresa: 'SaludVital', empresaColor: '#EC4899',
    categoria: 'salud', estado: 'activo', precio: 8500,
    totalVentas: 1650, totalIngresos: 14025000, totalVistas: 28700, calificacion: 4.6,
    totalResenas: 789, stock: 210, tasaConversion: 5.7, tasaDevolucion: 1.1, crecimiento: 31.4,
    ventasMensuales: gm(206, 31.4, 8500), resenasDist: rd(4.6), fechaLanzamiento: '2023-10-05',
  },
  {
    id: '9', nombre: 'Zapatillas Nike Air Max 2025', empresa: 'Moda Élite', empresaColor: '#7C3AED',
    categoria: 'moda', estado: 'agotado', precio: 9800,
    totalVentas: 3120, totalIngresos: 30576000, totalVistas: 55400, calificacion: 4.8,
    totalResenas: 1567, stock: 0, tasaConversion: 5.6, tasaDevolucion: 2.1, crecimiento: 26.9,
    ventasMensuales: gm(390, 26.9, 9800), resenasDist: rd(4.8), fechaLanzamiento: '2024-01-20',
  },
  {
    id: '10', nombre: 'Aspiradora Robot Pro', empresa: 'HogarPlus', empresaColor: '#10B981',
    categoria: 'hogar', estado: 'activo', precio: 18900,
    totalVentas: 970, totalIngresos: 18333000, totalVistas: 22100, calificacion: 4.3,
    totalResenas: 345, stock: 78, tasaConversion: 4.4, tasaDevolucion: 4.2, crecimiento: 8.9,
    ventasMensuales: gm(121, 8.9, 18900), resenasDist: rd(4.3), fechaLanzamiento: '2023-08-22',
  },
  {
    id: '11', nombre: 'Pack Snacks Saludables x12', empresa: 'FoodExpress', empresaColor: '#EF4444',
    categoria: 'alimentos', estado: 'activo', precio: 850,
    totalVentas: 5640, totalIngresos: 4794000, totalVistas: 43200, calificacion: 4.2,
    totalResenas: 1234, stock: 890, tasaConversion: 13.1, tasaDevolucion: 5.8, crecimiento: 6.3,
    ventasMensuales: gm(705, 6.3, 850), resenasDist: rd(4.2), fechaLanzamiento: '2023-05-10',
  },
  {
    id: '12', nombre: 'Smart Watch Serie 9', empresa: 'TechGadgets', empresaColor: '#0EA5E9',
    categoria: 'tecnologia', estado: 'suspendido', precio: 6500,
    totalVentas: 780, totalIngresos: 5070000, totalVistas: 18400, calificacion: 2.9,
    totalResenas: 234, stock: 145, tasaConversion: 4.2, tasaDevolucion: 12.4, crecimiento: -15.3,
    ventasMensuales: gm(97, -15.3, 6500), resenasDist: rd(2.9), fechaLanzamiento: '2023-04-15',
  },
];

export const estadisticasGlobalesMock: EstadisticasGlobales = {
  totalProductos:      12,
  productosActivos:    10,
  totalVentas:         28930,
  totalIngresos:       963107000,
  promedioCalificacion:4.44,
  totalVistas:         479500,
  crecimientoGeneral:  21.4,
};
