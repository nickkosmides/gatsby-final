import { useState, useEffect } from 'react';
import { useLocation } from '@reach/router';

const useSearchQuery = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentQuery = searchParams.get('s') || '';
    setQuery(currentQuery);
  }, [location.search]);

  return query;
};

export default useSearchQuery;
