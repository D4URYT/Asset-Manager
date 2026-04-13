"use client";

// src/feature/orders/ui/ActionMenu.tsx



import { useState } from "react";

import { Ban, CheckCircle, Eye, Package, RotateCcw, Trash2, type LucideIcon } from "lucide-react";

import { Order, OrderStatus } from "../types/order.types";

import T from "../theme/ordersTheme";



interface Props {

  order:     Order;

  onStatus:  (id: string, status: OrderStatus) => void;

  onDelete:  (id: string) => void;

  onView:    (order: Order) => void;

}



interface StatusAction {

  label: string;

  next:  OrderStatus;

  color: string;

  Icon:  LucideIcon;

}



export default function ActionMenu({ order, onStatus, onDelete, onView }: Props) {

  const [open, setOpen] = useState(false);



  const statusActions: StatusAction[] = (

    [

      order.status !== "sent"      && { label: "Marcar como enviado",   next: "sent"      as OrderStatus, color: T.brand600, Icon: Package },

      order.status !== "delivered" && { label: "Marcar como entregado", next: "delivered" as OrderStatus, color: T.success,  Icon: CheckCircle },

      order.status !== "pending"   && { label: "Volver a pendiente",    next: "pending"   as OrderStatus, color: T.warn,     Icon: RotateCcw },

      order.status !== "cancelled" && { label: "Cancelar envio",        next: "cancelled" as OrderStatus, color: T.error,    Icon: Ban },

    ] as (StatusAction | false)[]

  ).filter((a): a is StatusAction => Boolean(a));



  const itemStyle = (color: string) => ({

    width: "100%",

    textAlign: "left" as const,

    border: "none",

    background: "transparent",

    padding: "8px 12px",

    fontSize: 13,

    borderRadius: 7,

    cursor: "pointer",

    color,

    fontWeight: 500,

    fontFamily: "inherit",

    display: "flex",

    alignItems: "center",

    gap: 8,

  });



  return (

    <div style={{ position: "relative" }}>

      <button

        onClick={(e) => { e.stopPropagation(); setOpen((p) => !p); }}

        style={{

          background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: 7,

          padding: "5px 11px", fontSize: 12, fontWeight: 600,

          color: T.text2, cursor: "pointer", fontFamily: "inherit",

          display: "flex", alignItems: "center", gap: 4,

        }}

      >

        Acciones <span style={{ fontSize: 10 }}>▾</span>

      </button>



      {open && (

        <>

          <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setOpen(false)} />

          <div style={{

            position: "absolute", right: 0, top: "calc(100% + 5px)", zIndex: 20,

            background: T.bgCard, border: `1px solid ${T.border}`,

            borderRadius: 10, padding: 5, minWidth: 200,

            boxShadow: "0 8px 24px rgba(0,0,0,.10)",

          }}>

            <button style={itemStyle(T.text1)} onClick={() => { onView(order); setOpen(false); }}>

              <Eye size={14} /> Ver detalle

            </button>

            <div style={{ height: 1, background: T.border, margin: "4px 0" }} />

            {statusActions.map((a) => (

              <button

                key={a.next}

                style={itemStyle(a.color)}

                onClick={() => { onStatus(order.id, a.next); setOpen(false); }}

              >

                <a.Icon size={14} /> {a.label}

              </button>

            ))}

            <div style={{ height: 1, background: T.border, margin: "4px 0" }} />

            <button

              style={itemStyle(T.error)}

              onClick={() => { onDelete(order.id); setOpen(false); }}

            >

              <Trash2 size={14} /> Eliminar pedido

            </button>

          </div>

        </>

      )}

    </div>

  );

}

