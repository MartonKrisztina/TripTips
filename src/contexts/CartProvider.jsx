import { useEffect, createContext, useState } from 'react';

const CartContext = createContext('');

export function CartProvider({ children }) {
  const [cart, setCart] = useState('');
  useEffect(() => {
    const userId = localStorage.getItem('user');
    setCart(userId);
  }, []);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
