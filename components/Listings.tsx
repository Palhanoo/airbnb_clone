import { View, Text, ListRenderItem, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Link } from 'expo-router';
import { Listing } from '@/interfaces/listing';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import BottomSheet, { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';

interface Props {
  listings: any[];
  category: string;
  refresh: number;
}

const Listings = ({ listings: items, category, refresh }: Props) => {
  const [loading, setLoading] = useState(false)
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true }) //maybe you dont want it to always come back to the top (but good to know how to do)
    }

  }, [refresh])

  useEffect(() => {
    console.log('Listings for', items.length)
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [category])

  const renderRow: ListRenderItem<Listing> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        {/* MAKE IF GO TO THE LEFT DIRECTION GO TO FADE IN LEFT */}
        <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.listing}>
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <TouchableOpacity style={{ position: 'absolute', top: 30, right: 30, backgroundColor: 'white', padding: 8, borderRadius: 20 }}>
            <Ionicons name='heart-outline' size={24} color={'#000'} />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontFamily: 'mon-sb' }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', gap: 4 }} >
              <Ionicons name='star' size={16} />
              <Text style={{ fontFamily: 'mon-sb' }}>{item.review_scores_rating / 20}</Text>
            </View>
          </View>

          <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>

          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontFamily: 'mon-sb' }}>$ {item.price}</Text>
            <Text style={{ fontFamily: 'mon' }}>night</Text>

          </View>

        </Animated.View>
      </TouchableOpacity>
    </Link>
  )

  return (
    <View style={{flex: 1}}>
      <BottomSheetFlatList
        style={{ flex: 1 }}
        renderItem={renderRow}
        ref={listRef}
        data={loading ? [] : items}
        ListHeaderComponent={<Text style={styles.info}>{items.length} homes</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16
  }
})

export default Listings
