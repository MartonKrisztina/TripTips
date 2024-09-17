import { useMutation, useQueryClient } from 'react-query';
import { useContext } from 'react';
import Update from '../../services/Update';
import CartContext from '../../contexts/CartProvider';
import ReadById from '../../services/ReadbyId';

export default function useUpdateCart() {
  const { cart } = useContext(CartContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateUserCart'],
    mutationFn: async ({ data, idx }) => {
      const tour = await ReadById('tours', data[idx].id);
      await Update('tours', data[idx].id, {
        amount: tour.amount + data[idx].amount,
      });
      const updatedData = data.filter((_, index) => index !== idx);
      const cartData = await await Update('carts', cart, {
        reservations: [...updatedData],
      });
      return cartData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getCart');
      queryClient.invalidateQueries('getTours');
      queryClient.invalidateQueries('createReservation');
    },
  });
}
