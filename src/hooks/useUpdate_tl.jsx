import { useQueryClient, useMutation } from 'react-query';

export default function useUpdate() {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries();

  return useMutation({
    mutationKey: ['write key here, e.g. updateTour'],
    mutationFn: async () => {},
  });
}
