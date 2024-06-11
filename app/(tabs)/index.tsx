import { View, Text } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import listingsData from '@/assets/data/airbnb-listings.json'
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json'
import ListingsMap from '@/components/ListingsMap'
import * as Location from 'expo-location'
import ListingsBottomSheet from '@/components/ListingsBottomSheet'


const Page = () => {

  const [location, setLocation] = useState<null | Location.LocationObject>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [category, setCategory] = useState('Tiny homes')
  const items = useMemo(() => listingsData, [])
  const geoItems = useMemo(() => listingsDataGeo, [])

  const onDataChanged = (category: string) => {
    setCategory(category)
  }


  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen options={{
        header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
      }} />
      {/* <Listings listings={items} category={category} /> */}
      {/* <ListingsMap listings={geoItems} location={location} /> */}
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  )
}

export default Page