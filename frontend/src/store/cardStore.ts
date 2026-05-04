import { create } from 'zustand';
import { Card } from '../types';

export interface CardStoreState {
  cards: Card[];
  todayCards: Card[];
  isLoading: boolean;
  error: string | null;

  setCards: (cards: Card[]) => void;
  setTodayCards: (cards: Card[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  addCard: (card: Card) => void;
  removeCard: (cardId: string) => void;
  updateCard: (cardId: string, updates: Partial<Card>) => void;

  clear: () => void;
}

export const useCardStore = create<CardStoreState>((set) => ({
  cards: [],
  todayCards: [],
  isLoading: false,
  error: null,

  setCards: (cards) =>
    set({
      cards,
      error: null
    }),

  setTodayCards: (cards) =>
    set({
      todayCards: cards,
      error: null
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading
    }),

  setError: (error) =>
    set({
      error
    }),

  addCard: (card) =>
    set((state) => ({
      cards: [...state.cards, card],
      todayCards: [...state.todayCards, card]
    })),

  removeCard: (cardId) =>
    set((state) => ({
      cards: state.cards.filter((c) => c.id !== cardId),
      todayCards: state.todayCards.filter((c) => c.id !== cardId)
    })),

  updateCard: (cardId, updates) =>
    set((state) => ({
      cards: state.cards.map((c) =>
        c.id === cardId ? { ...c, ...updates } : c
      ),
      todayCards: state.todayCards.map((c) =>
        c.id === cardId ? { ...c, ...updates } : c
      )
    })),

  clear: () =>
    set({
      cards: [],
      todayCards: [],
      isLoading: false,
      error: null
    })
}));
