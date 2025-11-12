// src/hooks/useApi.ts
import { useQuery, useMutation } from '@tanstack/react-query';

export function useApi<T>(service: any) {
  //  Get all data
  const getAll = useQuery({
    queryKey: ['data'],
    queryFn: service.getAll,
  });

  // Add new record
  const create = useMutation({
    mutationFn: service.create,
  });

  // Update a record
  const update = useMutation({
    mutationFn: service.update,
  });

  // Remove a record
  const remove = useMutation({
    mutationFn: service.delete,
  });

  return { getAll, create, update, remove };
}
