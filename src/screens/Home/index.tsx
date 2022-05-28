import React, { useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { Card } from '../../components/Card';
import { CrossSVG } from '../../assets/SVGs/CrossSVG';
import { commonStyles } from '../../constants/commonStyles';

export const Home = (): JSX.Element => {
  const [isModalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.root}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!isModalVisible);
        }}>
        <View style={styles.modalRoot}>
          <View style={styles.modal}>
            <Pressable
              hitSlop={{
                bottom: 20,
                left: 20,
                right: 20,
                top: 20,
              }}
              style={({ pressed }) =>
                pressed && [
                  styles.iconWrapper,
                  { backgroundColor: colors.transparentGrey },
                ]
              }
              onPress={() => setModalVisible(!isModalVisible)}>
              <View style={styles.row} />
              <View style={styles.iconWrapper}>
                <CrossSVG />
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.cards}>
          <Card name="MTBank" />
        </View>
        <Text style={styles.subtitle}>Last transactions</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: commonStyles.centeredBox,
  modalRoot: {
    ...commonStyles.centeredBox,
    backgroundColor: colors.transparentDarkGrey,
  },
  modal: {
    width: '85%',
    height: '50%',
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  row: commonStyles.row,
  iconWrapper: {
    ...commonStyles.iconWrapper,
    alignSelf: 'flex-end',
  },
  title: {
    marginBottom: 28,
    color: colors.black,
    fontWeight: '700',
    fontSize: 30,
  },
  subtitle: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 18,
  },
  cards: {
    alignItems: 'center',
    height: '35%',
  },
});
