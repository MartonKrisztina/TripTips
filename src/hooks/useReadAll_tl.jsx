import { useQuery, useQueryClient } from 'react-query';

export default function useReadAll() {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries();

  return useQuery({
    queryKey: ['write here the key, e.g. getTours'],
    queryFn: async () => {},
  });
}
