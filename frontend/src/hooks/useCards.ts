import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cardAPI, reviewAPI } from '../api/client';
import { useCardStore } from '../store/cardStore';
import { Card, ReviewInput } from '../types';

/**
 * Hook to fetch all cards
 */
export function useCards() {
  const { cards, setCards, isLoading, setLoading, setError } = useCardStore();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      setLoading(true);
      try {
        const data = await cardAPI.getAll();
        setCards(data);
        return data;
      } catch (error: any) {
        setError(error.message || 'Failed to fetch cards');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    cards,
    isLoading: query.isLoading || isLoading,
    error: query.error as Error | null,
    refetch: query.refetch
  };
}

/**
 * Hook to fetch today's cards
 */
export function useTodayCards() {
  const { todayCards, setTodayCards, setError } = useCardStore();

  const query = useQuery({
    queryKey: ['todayCards'],
    queryFn: async () => {
      try {
        const data = await cardAPI.getToday();
        setTodayCards(data);
        return data;
      } catch (error: any) {
        setError(error.message || 'Failed to fetch today cards');
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    cards: todayCards,
    isLoading: query.isLoading,
    error: query.error as Error | null,
    refetch: query.refetch
  };
}

/**
 * Hook to submit review and update card
 */
export function useSubmitReview() {
  const { updateCard } = useCardStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ReviewInput) => {
      return reviewAPI.submit(data);
    },
    onSuccess: (data) => {
      // 更新本地卡片狀態
      updateCard(data.card.id, data.card);

      // 更新 React Query 緩存
      queryClient.setQueryData(['cards'], (oldData: Card[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map((c) =>
          c.id === data.card.id ? { ...c, ...data.card } : c
        );
      });

      queryClient.setQueryData(['todayCards'], (oldData: Card[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map((c) =>
          c.id === data.card.id ? { ...c, ...data.card } : c
        );
      });
    }
  });

  return mutation;
}

/**
 * Hook to create a new card
 */
export function useCreateCard() {
  const { addCard } = useCardStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Partial<Card>) => {
      return cardAPI.create(data);
    },
    onSuccess: (newCard) => {
      addCard(newCard);
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      queryClient.invalidateQueries({ queryKey: ['todayCards'] });
    }
  });

  return mutation;
}

/**
 * Hook to update a card
 */
export function useUpdateCard() {
  const { updateCard } = useCardStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Card> }) => {
      return cardAPI.update(id, data);
    },
    onSuccess: (updated) => {
      updateCard(updated.id, updated);
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      queryClient.invalidateQueries({ queryKey: ['todayCards'] });
    }
  });

  return mutation;
}

/**
 * Hook to delete a card
 */
export function useDeleteCard() {
  const { removeCard } = useCardStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      return cardAPI.delete(id);
    },
    onSuccess: (_, cardId) => {
      removeCard(cardId);
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      queryClient.invalidateQueries({ queryKey: ['todayCards'] });
    }
  });

  return mutation;
}
