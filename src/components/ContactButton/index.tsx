import React from 'react';
import { TouchableOpacity, Text, Linking } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { styles } from './styles';

const ContactButton = ({ isVagaAberta }) => {
  const handleContact = () => {
    const url = 'https://wa.me/nseianda';
    Linking.openURL(url);
  };

  if (!isVagaAberta) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handleContact}>
      <Text style={styles.buttonText}>Entrar em Contato</Text>
    </TouchableOpacity>
  );
};

export default ContactButton;

