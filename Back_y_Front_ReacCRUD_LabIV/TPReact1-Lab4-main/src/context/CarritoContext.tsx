import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Instrumento } from '../models/Instrumento';

export interface ItemCarrito {
  instrumento: Instrumento;
  cantidad: number;
}

export interface CartContextType {
  carrito: ItemCarrito[];
  addCarrito: (instrumento: Instrumento) => void;
  removeCarrito: (id: number) => void;
  removeItemCarrito: (id: number) => void;
  limpiarCarrito: () => void;
}

export const CarritoContext = createContext<CartContextType | undefined>(undefined);

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  const addCarrito = (instrumento: Instrumento) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.instrumento.id === instrumento.id);
      if (existe) {
        return prev.map(item =>
          item.instrumento.id === instrumento.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { instrumento, cantidad: 1 }];
      }
    });
  };

  const removeCarrito = (id: number) => {
    setCarrito(prev => prev.filter(item => item.instrumento.id !== id));
  };

  const removeItemCarrito = (id: number) => {
    setCarrito(prev =>
      prev
        .map(item =>
          item.instrumento.id === id && item.cantidad > 1
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0)
    );
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{ carrito, addCarrito, removeCarrito, removeItemCarrito, limpiarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}; 