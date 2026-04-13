"use client";

// src/feature/orders/ui/DetailModal.tsx



import { Ban, CheckCircle, Package, type LucideIcon } from "lucide-react";

import { Order, OrderStatus } from "../types/order.types";

import T from "../theme/ordersTheme";

import StatusBadge from "./StatusBadge";



interface RowProps {

  label: string;

  value: string;

  bold?: boolean;

}



function Row({ label, value, bold }: RowProps) {

  return (

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${T.border}` }}>

      <span style={{ fontSize: 12, color: T.text3 }}>{label}</span>

      <span style={{ fontSize: 13, color: T.text1, fontWeight: bold ? 700 : 500, textAlign: "right", maxWidth: "62%" }}>{value}</span>

    </div>

  );

}



interface Props {

  order:    Order | null;

  onClose:  () => void;

  onStatus: (id: string, status: OrderStatus) => void;

}



type NextAction = [string, OrderStatus, string, LucideIcon];



export default function DetailModal({ order, onClose, onStatus }: Props) {

  if (!order) return null;



  const nextActions: NextAction[] = (

    [

      order.status !== "sent"      && ["Marcar enviado",   "sent"      as OrderStatus, T.brand600, Package],

      order.status !== "delivered" && ["Marcar entregado", "delivered" as OrderStatus, T.success, CheckCircle],

      order.status !== "cancelled" && ["Cancelar envio",   "cancelled" as OrderStatus, T.error, Ban],

    ] as (NextAction | false)[]

  ).filter((a): a is NextAction => Boolean(a));



  return (

    <div onClick={onClose} style={{

      position: "fixed", inset: 0, zIndex: 500,

      background: "rgba(15,23,42,.45)",

      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,

    }}>

      <div onClick={(e) => e.stopPropagation()} style={{

        background: T.bgCard, borderRadius: 16,

        width: "100%", maxWidth: 460,

        boxShadow: "0 24px 64px rgba(0,0,0,.2)", overflow: "hidden",

      }}>

        {/* Header */}

        <div style={{ background: T.brand600, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          <div>

            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{order.id}</div>

            <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)", marginTop: 2 }}>{order.date}</div>

          </div>

          <button onClick={onClose} style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 16, fontFamily: "inherit" }}>

            ✕

          </button>

        </div>



        {/* Body */}

        <div style={{ padding: "20px 24px" }}>

          <Row label="Cliente"   value={order.client} />

          <Row label="Producto"  value={order.product} />

          <Row label="Cantidad"  value={`${order.qty} unidades`} />

          <Row label="Total"     value={`RD$ ${order.total.toLocaleString()}`} bold />

          <Row label="Dirección" value={order.address} />

          <Row label="Teléfono"  value={order.phone} />



          <div style={{ marginTop: 10 }}>

            <span style={{ fontSize: 12, color: T.text3 }}>Estado actual</span>

            <div style={{ marginTop: 5 }}><StatusBadge status={order.status} /></div>

          </div>



          {nextActions.length > 0 && (

            <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>

              {nextActions.map(([label, st, color, Icon]) => (

                <button key={st} onClick={() => { onStatus(order.id, st); onClose(); }} style={{

                  flex: 1, padding: "10px 0", border: "none", borderRadius: 8,

                  background: color, color: "#fff", fontSize: 13, fontWeight: 600,

                  cursor: "pointer", minWidth: 110, fontFamily: "inherit",

                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,

                }}>

                  <Icon size={14} />

                  {label}

                </button>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}