import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {globalStyle} from '../../assets/styles/globalStyle';
import {scaleFontSize} from '../../assets/styles/Scaling';
import {scale, verticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

const faqData = [
  {
    question: 'What is Beeyond?',
    answer:
      'Beeyond is a curated marketplace for journals. Browse, select, and purchase from a range of beautifully crafted journals — all in one easy-to-use app.',
  },
  {
    question: 'What kind of journals are available?',
    answer:
      'From daily planners and gratitude journals to creative writing books and wellness trackers — Beeyond brings you journals for every story you wish to write.',
  },
  {
    question: 'How can I purchase a journal?',
    answer:
      'Simply browse the collection, add your favorite journal to the cart, and complete your secure checkout — it’s that simple.',
  },
  {
    question: 'Is delivery available across India?',
    answer:
      'Yes! We deliver your chosen journals across India right to your doorstep.',
  },
  {
    question: 'Can I return or exchange my journal?',
    answer:
      'We take great care in quality checks. However, if you receive a damaged or incorrect product, you can request a replacement within 7 days. (Please refer to our Return Policy.)',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once you place an order, you’ll receive a tracking link via email to follow your journal\'s journey to you.',
  },
  {
    question: 'Who can I contact for support?',
    answer:
      'Feel free to reach us at [support@beeyond.app] — we\'re here to help!',
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
