import { useEffect } from 'react';
import { useLocationStore, Country } from '@/stores/locationStore';
import apiService from '@/services/apiService';

export const useFetchLocations = () => {
  const setCountries = useLocationStore((state) => state.setCountries);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const cached = localStorage.getItem('countries');
        if (cached) {
          const parsed: Country[] = JSON.parse(cached);
          setCountries(parsed);
          return;
        }
        const response = await apiService.get<{
          data: { items: Country[] };
        }>('/locations');

        const items = response?.data?.items;
        if (items && Array.isArray(items)) {
          setCountries(items);
          localStorage.setItem('countries', JSON.stringify(items));
        } else {
          console.warn('No countries found in response:', response);
        }
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    };

    fetchLocations();
  }, [setCountries]);
};
