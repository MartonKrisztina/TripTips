import { CartProvider } from './CartProvider';
import { AuthProvider } from './AuthProvider';
import { DarkModeProvider } from './DarkModeProvider';

export default function ContextProvider({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <DarkModeProvider>{children}</DarkModeProvider>
      </CartProvider>
    </AuthProvider>
  );
}
