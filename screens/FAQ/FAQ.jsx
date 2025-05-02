import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {globalStyle} from '../../assets/styles/globalStyle';
import {scaleFontSize} from '../../assets/styles/Scaling';
import {scale, verticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

const faqData = [
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 100% refund within 7 days of purchase.',
  },
  {
    question: 'Do you offer support?',
    answer: 'Yes, we offer 24/7 support through our app.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <View style={[globalStyle.px10, globalStyle.py10]}>
      {faqData.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <View key={index} style={styles.card}>
            <TouchableOpacity
              onPress={() => toggle(index)}
              style={[styles.questionRow, isActive && styles.activeRow]}>
              <View style={styles.rowBetween}>
                <Text
                  style={[styles.questionText, isActive && styles.activeText]}>
                  {item.question}
                </Text>
                <Ionicons
                  name={isActive ? 'chevron-up' : 'chevron-down'}
                  size={scale(20)}
                  color="#333"
                />
              </View>
            </TouchableOpacity>

            <Collapsible collapsed={!isActive}>
              <View style={styles.answerBox}>
                <Text style={styles.answerText}>{item.answer}</Text>
              </View>
            </Collapsible>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  rowBetween:{
     display:'flex',
     justifyContent:'space-between',
     flexDirection:'row',
     alignItems:'center'
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: verticalScale(15),
  },
  questionRow: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: 12,
  },

  questionText: {
    fontSize: scaleFontSize(14),
    fontWeight: '600',
    color: '#333',
  },
  activeText: {
    color: '#010101',
  },
  answerBox: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  answerText: {
    fontSize: scaleFontSize(12),
    color: '#555',
    lineHeight: 18,
  },
});

export default FAQ;
