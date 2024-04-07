import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {useDebounce} from 'use-debounce';
import Config from 'react-native-config';
import {useTranslation} from 'react-i18next';

import GifList from '../component/GifList';
import useGiphy from '../hook/useGify';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  input: {
    color: 'black',
    height: 40,
    borderColor: 'gray',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
  },
});

const SearchScreen = () => {
  const {t} = useTranslation();
  const [searchInput, setSearchInput] = useState('');
  const searchQuery = useDebounce(searchInput, 500)[0];

  const fetchSearchGifs = async ({pageParam}: {pageParam: number}) => {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${Config.GIPHY_API_KEY}&q=${searchQuery}&offset=${pageParam}&bundle=clips_grid_picker&limit=15`,
    );
    return response.json();
  };

  const {gifs, isLoading, handleLoadMore, handleRefresh} = useGiphy({
    enabled: searchQuery.length > 0,
    queryKey: ['search', searchQuery],
    queryFn: fetchSearchGifs,
  });

  const handleSearch = (text: string) => {
    setSearchInput(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleSearch}
        value={searchInput}
        placeholder={t('search.placeholder')}
        placeholderTextColor="grey"
        maxLength={50}
      />
      <GifList
        data={gifs}
        onRefresh={handleRefresh}
        onLoadMore={handleLoadMore}
        refreshing={isLoading}
      />
    </View>
  );
};

export default SearchScreen;
