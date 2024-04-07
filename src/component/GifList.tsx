import React from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import {GiphyData} from '../types/Giphy';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  gif: {
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#AAAAAA',
  },
  title: {
    color: 'black',
    fontSize: 24,
    marginTop: 8,
  },
});

interface GifListProps {
  data: GiphyData[];
  refreshing: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
}

const GifList = ({data, refreshing, onRefresh, onLoadMore}: GifListProps) => {
  const renderItem = ({item}: {item: GiphyData}) => (
    <View style={styles.container}>
      <Video
        source={{uri: convertToProxyURL(item.images.fixed_width.mp4)}}
        repeat={true}
        resizeMode="cover"
        style={styles.gif}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      numColumns={1}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default GifList;
