import { useMutation, useQueryClient } from 'react-query';

export default function useDelete() {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries();

  return useMutation({
    mutationKey: ['write key here, e.g. deleteTour'],
    mutationFn: async () => {},
  });
}
