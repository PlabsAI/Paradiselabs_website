import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const PageContainer = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.5rem;
  font-weight: 600;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ControlRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 4px;
`;

const FilterLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-right: 0.5rem;
`;

const LetterButton = styled.button<{ isActive?: boolean }>`
  background: ${props => props.isActive ? 'rgba(208, 0, 255, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.isActive ? '#d000ff' : 'rgba(208, 0, 255, 0.3)'};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 30px;
  text-align: center;

  &:hover {
    background: rgba(208, 0, 255, 0.1);
    border-color: #d000ff;
  }
`;

const DateFilter = styled.select`
  background: transparent;
  border: 1px solid rgba(208, 0, 255, 0.3);
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #d000ff;
  }

  option {
    background: #050C14;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const DeleteButton = styled.button`
  background: transparent;
  border: 1px solid rgba(244, 67, 54, 0.3);
  color: #f44336;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;

  &:hover {
    background: rgba(244, 67, 54, 0.1);
    border-color: #f44336;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SortButton = styled.button<{ isActive?: boolean }>`
  background: ${props => props.isActive ? 'rgba(208, 0, 255, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.isActive ? '#d000ff' : 'rgba(208, 0, 255, 0.3)'};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(208, 0, 255, 0.1);
    border-color: #d000ff;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const WaitlistTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  overflow: hidden;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  th {
    background: rgba(255, 255, 255, 0.05);
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
  }

  tbody tr:hover {
    background: rgba(208, 0, 255, 0.05);
  }

  td {
    font-size: 0.9rem;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

type SortType = 'date' | 'alpha';
type SortDirection = 'asc' | 'desc';
type DateFilter = 'all' | 'week' | 'month' | 'threeMonths' | 'sixMonths' | 'year';

export const WaitlistPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const [sortType, setSortType] = useState<SortType>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');

  const alphabet = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    loadWaitlistEntries();
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedEntries(entries.map((entry: any) => entry.id));
    } else {
      setSelectedEntries([]);
    }
  };

  const handleSelectEntry = (id: string) => {
    setSelectedEntries(prev => {
      if (prev.includes(id)) {
        return prev.filter(entryId => entryId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDelete = async () => {
    if (!selectedEntries.length || isDeleting) return;
    
    const confirmMessage = selectedEntries.length === 1
      ? 'Are you sure you want to delete this entry?'
      : `Are you sure you want to delete ${selectedEntries.length} entries?`;
    
    if (!window.confirm(confirmMessage)) return;
    
    setIsDeleting(true);
    try {
      await Promise.all(
        selectedEntries.map(id =>
          fetch(`http://localhost:3001/api/waitlist/${id}`, {
            method: 'DELETE',
          })
        )
      );
      
      // Refresh the list
      await loadWaitlistEntries();
      setSelectedEntries([]);
    } catch (error) {
      console.error('Error deleting entries:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const loadWaitlistEntries = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/waitlist');
      const data = await response.json();
      
      if (data.success) {
        setEntries(data.data);
      }
    } catch (error) {
      console.error('Error loading waitlist entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortEntries = (entries: any[]) => {
    let filtered = [...entries];

    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const cutoff = new Date();
      switch (dateFilter) {
        case 'week':
          cutoff.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoff.setMonth(now.getMonth() - 1);
          break;
        case 'threeMonths':
          cutoff.setMonth(now.getMonth() - 3);
          break;
        case 'sixMonths':
          cutoff.setMonth(now.getMonth() - 6);
          break;
        case 'year':
          cutoff.setFullYear(now.getFullYear() - 1);
          break;
      }
      filtered = filtered.filter(entry => new Date(entry.createdAt) >= cutoff);
    }

    // Apply letter filter
    if (selectedLetter) {
      filtered = filtered.filter(entry => {
        const firstChar = entry.email.charAt(0).toUpperCase();
        if (selectedLetter === '#') {
          return !isNaN(parseInt(firstChar));
        }
        return firstChar === selectedLetter;
      });
    }

    // Sort filtered entries
    if (sortType === 'date') {
      filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
      });
    } else {
      filtered.sort((a, b) => {
        const emailA = a.email.toLowerCase();
        const emailB = b.email.toLowerCase();
        return sortDirection === 'desc' 
          ? emailB.localeCompare(emailA)
          : emailA.localeCompare(emailB);
      });
    }

    return filtered;
  };

  const toggleSort = (type: SortType) => {
    if (sortType === type) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortType(type);
      setSortDirection('desc');
    }
  };

  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingSpinner />
        <p>Loading waitlist entries...</p>
      </LoadingWrapper>
    );
  }

  const filteredAndSortedEntries = filterAndSortEntries(entries);

  return (
    <PageContainer>
      <Header>
        <Title>Waitlist Entries</Title>
        <Controls>
          <ControlRow>
            <SortButton 
              isActive={sortType === 'date'}
              onClick={() => toggleSort('date')}
            >
              Date {sortType === 'date' && (sortDirection === 'desc' ? '↓' : '↑')}
            </SortButton>
            <SortButton 
              isActive={sortType === 'alpha'}
              onClick={() => toggleSort('alpha')}
            >
              Alphabetical {sortType === 'alpha' && (sortDirection === 'desc' ? '↓' : '↑')}
            </SortButton>
            <DeleteButton 
              onClick={handleDelete}
              disabled={selectedEntries.length === 0 || isDeleting}
            >
              {isDeleting ? 'Deleting...' : `Delete Selected (${selectedEntries.length})`}
            </DeleteButton>
          </ControlRow>

          {sortType === 'alpha' && (
            <FilterSection>
              <FilterLabel>Filter by letter:</FilterLabel>
              {alphabet.map(letter => (
                <LetterButton
                  key={letter}
                  isActive={selectedLetter === letter}
                  onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
                >
                  {letter}
                </LetterButton>
              ))}
            </FilterSection>
          )}

          {sortType === 'date' && (
            <FilterSection>
              <FilterLabel>Filter by date:</FilterLabel>
              <DateFilter
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as DateFilter)}
              >
                <option value="all">All Time</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="threeMonths">Last 3 Months</option>
                <option value="sixMonths">Last 6 Months</option>
                <option value="year">Last Year</option>
              </DateFilter>
            </FilterSection>
          )}
        </Controls>
      </Header>

      <WaitlistTable>
        <thead>
          <tr>
            <th style={{ width: '40px' }}>
              <Checkbox
                checked={selectedEntries.length === filteredAndSortedEntries.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedEntries.map((entry: any) => (
            <tr key={entry.id}>
              <td>
                <Checkbox
                  checked={selectedEntries.includes(entry.id)}
                  onChange={() => handleSelectEntry(entry.id)}
                />
              </td>
              <td>{entry.email}</td>
              <td>{entry.role}</td>
              <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
          {filteredAndSortedEntries.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>No entries found</td>
            </tr>
          )}
        </tbody>
      </WaitlistTable>
    </PageContainer>
  );
};
