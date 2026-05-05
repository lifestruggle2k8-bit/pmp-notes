import React, { useState } from 'react';
import { useCards } from '../hooks/useCards';
import { CardEditor } from '../components/CardEditor';
import { Card } from '../types';
import client from '../api/client';

export const CardsPage: React.FC = () => {
  const { cards, isLoading: cardsLoading, refetch } = useCards();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());

  // Filter cards
  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.answer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      filterDifficulty === 'all' || card.difficulty === filterDifficulty;

    const matchesDomain =
      filterDomain === 'all' || card.domain === filterDomain;

    return matchesSearch && matchesDifficulty && matchesDomain;
  });

  // Get unique domains
  const domains = Array.from(new Set(cards.map((c) => c.domain)));

  // Handle save card
  const handleSaveCard = async (data: Partial<Card>) => {
    try {
      setIsSaving(true);

      if (editingCard) {
        // Update existing card
        await client.patch(`/cards/${editingCard.id}`, data);
      } else {
        // Create new card
        await client.post('/cards', data);
      }

      setEditingCard(null);
      setIsCreating(false);
      await refetch();
    } catch (error) {
      console.error('Failed to save card:', error);
      alert('Failed to save card');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle delete card
  const handleDeleteCard = async (cardId: string) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await client.delete(`/cards/${cardId}`);
        await refetch();
      } catch (error) {
        console.error('Failed to delete card:', error);
        alert('Failed to delete card');
      }
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedCards.size === 0) {
      alert('Please select cards to delete');
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedCards.size} card(s)?`
      )
    ) {
      try {
        for (const cardId of selectedCards) {
          await client.delete(`/cards/${cardId}`);
        }
        setSelectedCards(new Set());
        await refetch();
      } catch (error) {
        console.error('Failed to delete cards:', error);
        alert('Failed to delete cards');
      }
    }
  };

  // Toggle card selection
  const toggleCardSelection = (cardId: string) => {
    const newSelected = new Set(selectedCards);
    if (newSelected.has(cardId)) {
      newSelected.delete(cardId);
    } else {
      newSelected.add(cardId);
    }
    setSelectedCards(newSelected);
  };

  // Toggle all selection
  const toggleAllSelection = () => {
    if (selectedCards.size === filteredCards.length) {
      setSelectedCards(new Set());
    } else {
      setSelectedCards(new Set(filteredCards.map((c) => c.id)));
    }
  };

  if (isCreating || editingCard) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <CardEditor
            card={editingCard || undefined}
            onSave={handleSaveCard}
            onCancel={() => {
              setEditingCard(null);
              setIsCreating(false);
            }}
            isLoading={isSaving}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Manage Cards
            </h1>
            <p className="text-gray-600">
              Edit, delete, or create flashcards
            </p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            + New Card
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {/* Difficulty Filter */}
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            {/* Domain Filter */}
            <select
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Domains</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedCards.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex justify-between items-center">
            <span className="text-blue-900 font-medium">
              {selectedCards.size} card(s) selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete Selected
            </button>
          </div>
        )}

        {/* Cards Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {cardsLoading ? (
            <div className="p-8 text-center text-gray-500">
              Loading cards...
            </div>
          ) : filteredCards.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No cards found
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedCards.size === filteredCards.length &&
                        filteredCards.length > 0
                      }
                      onChange={toggleAllSelection}
                      className="rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Question
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Domain
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Reviews
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Accuracy
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCards.map((card) => (
                  <tr key={card.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedCards.has(card.id)}
                        onChange={() => toggleCardSelection(card.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-sm">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {card.question}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {card.domain}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          card.difficulty === 'easy'
                            ? 'bg-green-100 text-green-800'
                            : card.difficulty === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {card.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {card.totalReviews}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {card.totalReviews > 0
                        ? Math.round(
                            (card.correctCount / card.totalReviews) * 100
                          )
                        : 0}
                      %
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setEditingCard(card)}
                        className="text-blue-600 hover:text-blue-900 font-medium mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Total Cards</p>
            <p className="text-3xl font-bold text-gray-900">{cards.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Filtered Results</p>
            <p className="text-3xl font-bold text-blue-600">
              {filteredCards.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Selected</p>
            <p className="text-3xl font-bold text-green-600">
              {selectedCards.size}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Avg Accuracy</p>
            <p className="text-3xl font-bold text-purple-600">
              {cards.length > 0
                ? Math.round(
                    (cards.reduce((sum, c) => sum + c.correctCount, 0) /
                      cards.reduce((sum, c) => sum + c.totalReviews, 0)) *
                      100
                  )
                : 0}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
