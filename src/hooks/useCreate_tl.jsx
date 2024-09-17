import { useMutation, useQueryClient } from 'react-query';

export default function useCreate() {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries();

  return useMutation({
    mutationKey: ['write key here, e.g. createTour'],
    mutationFn: async () => {},
  });
}
