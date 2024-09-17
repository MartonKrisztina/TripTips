import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import CartContext from '../../contexts/CartProvider';
import Create from '../../services/Create';
import Delete from '../../services/Delete';
import handlePayment from './barionPayment';

export default function useCreateReservation() {
  const { cart } = useContext(CartContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createReservation'],
    mutationFn: async (formData) => {
      const reservation = await Create('reservations', formData);
      if (reservation) {
        await handlePayment({
          total: formData.total,
          reservations: formData.reservations,
          id: reservation.id,
        });

        await Delete('carts', cart);
        localStorage.removeItem('user');
      }

      return reservation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getReservation');
      queryClient.invalidateQueries('getReservations');
    },
  });
}
