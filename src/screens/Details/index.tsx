import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Feather } from '@expo/vector-icons';
import {
  Wrapper,
  Container,
  Header,
  HeaderButtonContainer,
  ButtonIcon,
  ButtonText,
  ContentContainer,
  Title,
  Description,
} from '../Details/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import ContactButton from '../../components/ContactButton'; 
import moment from 'moment'; // Import moment.js

import { VagaProps } from '../../utils/Types';

export default function Details({ route, navigation }) {
  const [id, setId] = useState(route.params.id);
  const [vaga, setVaga] = useState<VagaProps>(null);

  const fetchVaga = async () => {
    try {
      const response = await api.get(`/vagas/${id}`);
      const data = response.data;
      setVaga({
        id: data.id,
        title: data.titulo,
        description: data.descricao,
        date: data.date,
        phone: data.telefone,
        status: data.status,
        company: data.empresa,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVaga();
  }, [id]);

  
  return (
    <Wrapper>
      <Header>
        <HeaderButtonContainer onPress={() => navigation.goBack()}>
          <ButtonIcon>
            <Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
          </ButtonIcon>
          <ButtonText>Voltar</ButtonText>
        </HeaderButtonContainer>
        <Logo />
      </Header>

      {vaga ? (
        <Container>
          <ContentContainer>
            <Title>{vaga.title}</Title>
            <Description>{vaga.description}</Description>
          </ContentContainer>

          {vaga.status === "aberta" && (
            <ContactButton isVagaAberta={vaga.status === "aberta"} />
          )}
        </Container>
      ) : (
        <Title>Vaga não foi encontrada!</Title>
      )}
    </Wrapper>
  );
}