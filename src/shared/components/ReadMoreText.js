import React from 'react';
import ReadMore from 'react-native-read-more-text';
import {Text} from 'react-native';

export function ReadMoreText({text}) {
  const renderTruncatedFooter = handlePress => {
    return (
      <Text style={{color: 'dodgerblue', marginTop: 1}} onPress={handlePress}>
        Leer más...
      </Text>
    );
  };

  const renderRevealedFooter = handlePress => {
    return (
      <Text style={{color: 'dodgerblue', marginTop: 1}} onPress={handlePress}>
        Leer menos
      </Text>
    );
  };

  return (
    <ReadMore
      numberOfLines={3}
      renderTruncatedFooter={renderTruncatedFooter}
      renderRevealedFooter={renderRevealedFooter}>
      <Text>{text}</Text>
    </ReadMore>
  );
}
