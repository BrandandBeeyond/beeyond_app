import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const Notification = () => {
  const { items } = useSelector(state => state.notifications);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.notificationBox}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text>{item.message}</Text>
            <Text style={styles.dateText}>{new Date(item.date).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 16},
  notificationBox: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationTitle: {fontWeight: 'bold'},
  dateText: {fontSize: 12, color: 'gray', marginTop: 4},
});

export default Notification;
