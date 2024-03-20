import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { ListingGeo } from '@/interfaces/listingGeo';
import { useRouter } from 'expo-router';
import MapView from 'react-native-map-clustering';

interface Props {
    listings: any;
    location: any;
}

const INITIAL_REGION = {
    latitude: -37.840935,
    longitude: 144.946457,
    latitudeDelta: 0.12,
    longitudeDelta: 0.1421,
}

export const ListingsMap = memo(({ listings, location }: Props) => {
    const router = useRouter()
    const onMarkerSelected = (item: ListingGeo) => {
        router.push(`/listing/${item.properties.id}`)
    }

    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster;
        const points = properties.point_count

        return (
            <Marker key={`cluster-${id}`}
                onPress={onPress}
                coordinate={{ longitude: geometry.coordinates[0], latitude: geometry.coordinates[1] }}>
                <View style={styles.marker} >
                    <Text style={{ color: '#000', textAlign: 'center', fontFamily: 'mon-sb' }}>{points}</Text>
                </View>
            </Marker>
        )
    }

    return (
        <View style={styles.container}>
            <MapView
                animationEnabled={false}
                style={StyleSheet.absoluteFill}
                initialRegion={INITIAL_REGION}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
                clusterColor='#fff'
                clusterTextColor='#000'
            >
                {listings.features.map((item: ListingGeo) => (
                    <Marker
                        onPress={() => onMarkerSelected(item)}
                        key={item.properties.id}
                        coordinate={{
                            latitude: item.geometry.coordinates[1],
                            longitude: item.geometry.coordinates[0]
                        }}
                    >
                        <View style={styles.marker} >
                            <Text style={styles.markerText}>$ {item.properties.price}</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    marker: {
        backgroundColor: 'white',
        padding: 6,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1, height: 10,
        },
    },
    markerText: {
        fontSize: 14,
        fontFamily: 'mon-sb'
    }
})

export default ListingsMap