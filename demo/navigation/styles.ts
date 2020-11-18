import { StyleSheet } from 'react-native';

export const CONTENT_PADDING_HZ = 20;

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: CONTENT_PADDING_HZ
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30
    },
    examplesListContainer: {
        height: 85,
        flexGrow: 0
    },
    exampleBtn: {
        height: 50,
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: 'teal',
        alignItems: 'center',
        justifyContent: 'center'
    },
    exampleBtnLabel: {
        fontSize: 13,
        color: 'white'
    }
});
