import { useMutation, useQueryClient } from 'react-query';
import { useContext } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/init';
import CartContext from '../../contexts/CartProvider';
import AuthContext from '../../contexts/AuthProvider';
import ReadById from '../../services/ReadbyId';
import Update from '../../services/Update';
import Create from '../../services/Create';
import { notifySuccess, notifyError } from '../../utils/toast';

export default function useAddToCart() {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['AddToCart'],
    mutationFn: async (cartItem) => {
      const reservedData = {
        address: cartItem.address,
        amount: 1,
        date: cartItem.date,
        name: cartItem.name,
        price: cartItem.price,
        travelType: cartItem.travelType,
        id: cartItem.id,
      };
      try {
        if (cart) {
          const data = await ReadById('carts', cart);
          await Update('carts', cart, {
            reservations: [...data.reservations, reservedData],
          });
        } else {
          if (user) {
            await setDoc(doc(db, 'carts', user.uid), {
              reservations: [reservedData],
            });
            setCart(user.uid);
            notifySuccess('Sikeresen kosárba helyezve!');
            return { success: true };
          }
          const cartDataId = await Create('carts', {
            reservations: [reservedData],
          });
          setCart(cartDataId);
          localStorage.setItem('user', cartDataId);
          notifySuccess('Sikeresen kosárba helyezve!');
          return { success: true };
        }
        if (cart) {
          await Update('tours', cartItem.id, {
            amount: cartItem.amount - reservedData.amount,
          });
        }
        notifySuccess('Sikeresen kosárba helyezve!');
        return { success: true };
      } catch (error) {
        notifyError('Nem sikerült a foglalás kosárba helyezése!');
        return { success: false, error };
      }
    },
    onError: (error) => {
      notifyError(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getCart');
      queryClient.invalidateQueries('getTours');
      queryClient.invalidateQueries('createReservation');
    },
  });
}
