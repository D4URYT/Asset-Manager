import { Reporte, EstadisticasReportes } from '../types/reportes.types';

export const reportesMock: Reporte[] = [
  {
    id: '1',
    codigo: 'RPT-2025-001',
    titulo: 'Producto nunca llegó a mi dirección',
    descripcion:
      'Realicé el pedido hace 15 días y nunca recibí el paquete. El tracking muestra que fue entregado pero yo no lo recibí ni nadie en mi edificio.',
    categoria: 'producto_no_llegó',
    estado: 'en_proceso',
    prioridad: 'alta',
    usuario: {
      id: 'u1',
      nombre: 'Carlos Méndez',
      email: 'carlos.mendez@email.com',
      telefono: '+1 809-555-0101',
    },
    pedido: {
      id: 'p1',
      numero: 'PED-2025-8821',
      fecha: '2025-02-28',
      productos: [
        { id: 'prod1', nombre: 'Laptop Dell Inspiron 15', sku: 'DELL-INS-15', precio: 45000 },
      ],
      total: 45000,
    },
    fechaCreacion: '2025-03-01T10:30:00Z',
    fechaActualizacion: '2025-03-05T14:20:00Z',
    notasModerador: 'Se contactó al courier. En investigación.',
    historial: [
      {
        id: 'h1',
        fecha: '2025-03-01T10:30:00Z',
        estadoAnterior: 'pendiente',
        estadoNuevo: 'en_proceso',
        moderador: 'Admin Rodriguez',
        nota: 'Reporte recibido. Iniciando investigación con courier.',
      },
    ],
  },
  {
    id: '2',
    codigo: 'RPT-2025-002',
    titulo: 'Recibí el producto equivocado',
    descripcion:
      'Pedí unos audífonos Sony WH-1000XM5 color negro y me llegaron unos Samsung de color blanco completamente diferentes.',
    categoria: 'producto_incorrecto',
    estado: 'pendiente',
    prioridad: 'media',
    usuario: {
      id: 'u2',
      nombre: 'María González',
      email: 'maria.gonzalez@email.com',
      telefono: '+1 809-555-0202',
    },
    pedido: {
      id: 'p2',
      numero: 'PED-2025-8950',
      fecha: '2025-03-05',
      productos: [
        { id: 'prod2', nombre: 'Audífonos Sony WH-1000XM5', sku: 'SONY-WH5-BK', precio: 12500 },
      ],
      total: 12500,
    },
    fechaCreacion: '2025-03-08T09:15:00Z',
    fechaActualizacion: '2025-03-08T09:15:00Z',
    historial: [],
  },
  {
    id: '3',
    codigo: 'RPT-2025-003',
    titulo: 'Tablet llegó con la pantalla rota',
    descripcion:
      'La tablet llegó con la pantalla completamente rota. El empaque exterior estaba en buen estado pero la pantalla tiene múltiples grietas internas.',
    categoria: 'producto_dañado',
    estado: 'solucionado',
    prioridad: 'alta',
    usuario: {
      id: 'u3',
      nombre: 'Roberto Jiménez',
      email: 'roberto.j@email.com',
      telefono: '+1 809-555-0303',
    },
    pedido: {
      id: 'p3',
      numero: 'PED-2025-8754',
      fecha: '2025-02-20',
      productos: [
        { id: 'prod3', nombre: 'iPad Pro 11" 256GB', sku: 'APPLE-IPADPRO-256', precio: 55000 },
      ],
      total: 55000,
    },
    fechaCreacion: '2025-02-25T16:45:00Z',
    fechaActualizacion: '2025-03-10T11:00:00Z',
    notasModerador: 'Se realizó cambio del producto. Cliente confirmó recepción correcta.',
    historial: [
      {
        id: 'h2',
        fecha: '2025-02-25T16:45:00Z',
        estadoAnterior: 'pendiente',
        estadoNuevo: 'en_proceso',
        moderador: 'Admin López',
        nota: 'Confirmado daño. Procesando reemplazo.',
      },
      {
        id: 'h3',
        fecha: '2025-03-10T11:00:00Z',
        estadoAnterior: 'en_proceso',
        estadoNuevo: 'solucionado',
        moderador: 'Admin López',
        nota: 'Cliente confirmó recepción del producto de reemplazo en perfectas condiciones.',
      },
    ],
  },
  {
    id: '4',
    codigo: 'RPT-2025-004',
    titulo: 'Me cobraron dos veces el mismo pedido',
    descripcion:
      'Al revisar mi estado de cuenta veo que se realizaron dos cargos por el mismo pedido el mismo día. Necesito que se me reembolse el cargo duplicado.',
    categoria: 'cobro_incorrecto',
    estado: 'pendiente',
    prioridad: 'urgente',
    usuario: {
      id: 'u4',
      nombre: 'Ana Vargas',
      email: 'ana.vargas@email.com',
      telefono: '+1 809-555-0404',
    },
    pedido: {
      id: 'p4',
      numero: 'PED-2025-9102',
      fecha: '2025-03-10',
      productos: [
        { id: 'prod4', nombre: 'Monitor LG 27" 4K', sku: 'LG-27UK850', precio: 28000 },
      ],
      total: 28000,
    },
    fechaCreacion: '2025-03-11T08:00:00Z',
    fechaActualizacion: '2025-03-11T08:00:00Z',
    historial: [],
  },
  {
    id: '5',
    codigo: 'RPT-2025-005',
    titulo: 'Retraso de más de 3 semanas en entrega',
    descripcion:
      'Mi pedido fue confirmado el 15 de febrero con entrega estimada de 5-7 días. Ya pasaron 3 semanas y no hay actualizaciones en el tracking.',
    categoria: 'retraso_entrega',
    estado: 'rechazado',
    prioridad: 'media',
    usuario: {
      id: 'u5',
      nombre: 'Luis Herrera',
      email: 'luis.h@email.com',
      telefono: '+1 809-555-0505',
    },
    pedido: {
      id: 'p5',
      numero: 'PED-2025-8612',
      fecha: '2025-02-15',
      productos: [
        { id: 'prod5', nombre: 'Silla Ergonómica HM', sku: 'SILLA-ERG-HM', precio: 18500 },
      ],
      total: 18500,
    },
    fechaCreacion: '2025-03-08T12:30:00Z',
    fechaActualizacion: '2025-03-12T10:00:00Z',
    notasModerador:
      'El cliente confundió la fecha de pedido. El producto fue entregado a tiempo según registros.',
    historial: [
      {
        id: 'h4',
        fecha: '2025-03-12T10:00:00Z',
        estadoAnterior: 'pendiente',
        estadoNuevo: 'rechazado',
        moderador: 'Admin Rodriguez',
        nota: 'Reporte rechazado. Verificado en sistema: entrega realizada el 22/02. Cliente confirmó recepción.',
      },
    ],
  },
];

export const estadisticasMock: EstadisticasReportes = {
  total: 5,
  pendientes: 2,
  enProceso: 1,
  solucionados: 1,
  rechazados: 1,
};