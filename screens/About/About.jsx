import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {globalStyle} from '../../assets/styles/globalStyle';

const About = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[globalStyle.bgTheme, globalStyle.mx10]}>
          <View style={globalStyle.mt15}>
            <Text style={[globalStyle.h4,globalStyle.fw700]}>About Beeyond</Text>
            <Text style={[globalStyle.normalText, globalStyle.mt10]}>
              At Beeyond, we believe that a journal is more than just paper — it’s a canvas for dreams,
              memories, and growth.
            </Text>
            <Text style={[globalStyle.normalText, globalStyle.mt10]}>
              Our app curates thoughtfully designed journals that inspire you to write your story, plan your
              days, or simply slow down and reflect.
            </Text>
            <Text style={[globalStyle.normalText, globalStyle.mt10]}>
              Whether you're a seasoned writer or someone beginning their journaling journey, Beeyond
              brings you a world of journals crafted with love and care.
            </Text>
            <Text style={[globalStyle.normalText, globalStyle.mt10]}>
              Every journal you find here is a step towards self-expression, mindfulness, and creativity.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
