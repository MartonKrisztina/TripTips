import { useContext } from 'react';
import { useQuery } from 'react-query';
import ReadById from '../../services/ReadbyId';
import CartContext from '../../contexts/CartProvider';
import AuthContext from '../../contexts/AuthProvider';

export default function useGetCart() {
  const { cart } = useContext(CartContext);
  const { user, currentDbUser } = useContext(AuthContext);
  return useQuery({
    queryKey: ['getCart', cart, user, currentDbUser],
    queryFn: async () => (cart ? ReadById('carts', cart) : null),
  });
}
