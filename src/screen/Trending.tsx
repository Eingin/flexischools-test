import React from 'react';
import {StyleSheet, View} from 'react-native';
import Config from 'react-native-config';

import GifList from '../component/GifList';
import useGiphy from '../hook/useGify';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const TrendingScreen = () => {
  const fetchTrendingGifs = async ({pageParam}: {pageParam: number}) => {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${Config.GIPHY_API_KEY}&offset=${pageParam}&bundle=clips_grid_picker&limit=15`,
    );
    return response.json();
  };

  const {gifs, isLoading, handleLoadMore, handleRefresh} = useGiphy({
    queryKey: ['trending'],
    queryFn: fetchTrendingGifs,
  });

  return (
    <View style={styles.container}>
      <GifList
        data={gifs}
        onRefresh={handleRefresh}
        onLoadMore={handleLoadMore}
        refreshing={isLoading}
      />
    </View>
  );
};

export default TrendingScreen;
