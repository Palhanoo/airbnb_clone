import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { Listing } from '@/interfaces/listing'
import BottomSheet from '@gorhom/bottom-sheet';
import Listings from './Listings';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    listings: Listing[];
    category: string;
}
const ListingsBottomSheet = ({ listings, category }: Props) => {
    const BottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['10%', '100%'], [])
    const [refresh, setRefresh] = useState(0)

    const showMap = () => {
        BottomSheetRef.current?.collapse()
        setRefresh(refresh + 1)
    }

    return (
        <BottomSheet
            style={styles.sheetContainer}
            ref={BottomSheetRef}
            index={1}
            enablePanDownToClose={false}
            snapPoints={snapPoints}
            handleIndicatorStyle={{ backgroundColor: Colors.grey }}
        >
            <View style={{ flex: 1 }}>
                <Listings listings={listings} category={category} refresh={refresh} />
                <View style={styles.absoluteBtn}>
                    <TouchableOpacity onPress={showMap} style={styles.btn}>
                        <Text style={{ fontFamily: 'mon-sb', color: 'white' }}>Map</Text>
                        <Ionicons name="map" size={20} color={"#FFF"} />
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    )
}
const styles = StyleSheet.create({
    sheetContainer: {
        backgroundColor: "#fff",
        elevation: 4,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    absoluteBtn: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: Colors.dark,
        padding: 16,
        height: 50,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

})

export default ListingsBottomSheet