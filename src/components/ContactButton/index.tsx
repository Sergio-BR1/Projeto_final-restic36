import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Linking } from 'react-native';
import theme from '../../theme';

const ContactButton = ({ isVagaAberta }) => {
  const handleContact = () => {
    const url = 'https://wa.me/nseiainda';
    Linking.openURL(url);
  };

  if (!isVagaAberta) {
    return null;
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.COLORS.GREEN,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
      }}
      onPress={handleContact}
    >
      <Text style={{ color: '#fff', textAlign: 'center' }}>Entrar em Contato</Text>
    </TouchableOpacity>
  );
};

export default ContactButton;
