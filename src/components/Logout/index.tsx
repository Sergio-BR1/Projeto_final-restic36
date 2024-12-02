import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import { styles } from './styles';

const LogoutButton = () => {
  const { setUserToken } = useAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    const navigation = useNavigation();
  
    try {
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
  
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }] as never[],  
      });
    } catch (error) {
      console.error('Erro ao fazer logout', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.buttonText}>Sair</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
