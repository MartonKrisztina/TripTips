import { useQuery, useQueryClient } from 'react-query';

export default function useReadSingle() {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries();

  return useQuery({
    queryKey: ['write here the key, e.g. getTour'],
    queryFn: async () => {},
  });
}
