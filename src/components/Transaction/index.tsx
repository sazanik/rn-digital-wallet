import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { commonStyles } from '../../constants/commonStyles';
import { colors } from '../../constants/colors';
import { UpSVG } from '../../assets/SVGs/UpSVG';
import { DownSVG } from '../../assets/SVGs/DownSVG';

interface Props {
  type: 'income' | 'expense';
  amount: number;
  comment?: string;
}

const icon = {
  income: <UpSVG />,
  expense: <DownSVG />,
};

const mark = {
  income: '+',
  expense: '-',
};

export const Transaction = ({ amount, comment, type }: Props) => {
  const currentDate = new Date().toDateString();
  console.log(currentDate);

  return (
    <View style={styles.root}>
      <View style={styles.iconWrapper}>{icon[type]}</View>
      <View style={styles.details}>
        <Text style={styles.comment}>{comment}</Text>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
      <Text style={styles.amount}>{`${mark[type]}$${amount}.00`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  iconWrapper: {
    ...commonStyles.iconWrapper,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: colors.transparentGrey,
  },
  details: {
    height: '100%',
    justifyContent: 'center',
    marginRight: 'auto',
  },
  comment: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: colors.black,
  },
  date: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: colors.grey,
  },
  amount: {
    textAlign: 'right',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.black,
  },
});
