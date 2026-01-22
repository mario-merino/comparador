'use client';

import { useRouter } from 'next/navigation';
import { SearchBar } from './search-bar';

export function HomeSearch() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(query)}`);
    }
  };

  return <SearchBar onSearch={handleSearch} />;
}
