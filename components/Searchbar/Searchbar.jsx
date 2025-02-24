import React, {useState, useEffect} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import SearchIcon from 'react-native-vector-icons/Feather';
import {SearchStyle} from './Style';

const searchPhrases = ['diaries', 'journals', 'gifts'];

const Searchbar = () => {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = searchPhrases[phraseIndex];

    let typingSpeed = isDeleting ? 30 : 5;
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        setDisplayText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 800); // Pause before deleting
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex(prev => (prev + 1) % searchPhrases.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <View style={SearchStyle.searchInput}>
      <Pressable style={SearchStyle.searchInputContainer}>
        <SearchIcon
          name="search"
          size={22}
          style={{color: '#000', opacity: 0.8}}
        />
        <TextInput
          placeholder={`Search ${displayText}`}
          placeholderTextColor="#888"
          style={{flex: 1}}
        />
      </Pressable>
    </View>
  );
};

export default Searchbar;
