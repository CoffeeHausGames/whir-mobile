import { View, Text, SafeAreaView, StyleSheet} from 'react-native';

const DiscoverHeader = () => {
        return (
        <SafeAreaView style={styles.headerContainer}>
            <Text style={styles.headerText}>Discovery</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF9000',
    },
    headerContainer: {
        marginTop: 50,
        marginBottom: 5
    }
})


export default DiscoverHeader;