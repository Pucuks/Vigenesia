import React, { useState, useContext } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button, Headline, Colors } from 'react-native-paper';

import { Context as AuthContext } from '../contexts/AuthContext';

import Screen from '../components/Screen';
import Wrapper from '../components/Wrapper';
import Spacer from '../components/Spacer';
import CenterHorizontal from '../components/CenterHorizontal';

export default function SignupScreen({ navigation }) {
  const { signup } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [profesi, setProfesi] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Screen full bottom={16}>
      <ScrollView>
        <Wrapper ph={32}>
          <CenterHorizontal>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../images/signin.png')}
            />
          </CenterHorizontal>

          <CenterHorizontal>
            <Headline>Signup Account</Headline>
          </CenterHorizontal>
          <Spacer mb={16} />

          <Spacer mb={16 * 2} />
          <TextInput
            mode="outlined"
            label="Nama"
            left={
              <TextInput.Icon name="account" color={Colors.deepPurple700} />
            }
            value={name}
            onChangeText={setName}
          />
          <Spacer />
          <TextInput
            mode="outlined"
            label="Profesi"
            left={<TextInput.Icon name="desk" color={Colors.deepPurple700} />}
            value={profesi}
            onChangeText={setProfesi}
          />
          <Spacer />
          <TextInput
            mode="outlined"
            label="Email"
            left={<TextInput.Icon name="email" color={Colors.deepPurple700} />}
            value={email}
            onChangeText={setEmail}
          />
          <Spacer />
          <TextInput
            secureTextEntry
            mode="outlined"
            label="Password"
            left={<TextInput.Icon name="lock" color={Colors.deepPurple700} />}
            value={password}
            onChangeText={setPassword}
          />
          <Spacer />
          <Button
            mode="text"
            uppercase={false}
            onPress={() => navigation.navigate('Signin')}
          >
            Already have account? Sign In
          </Button>
          <Spacer mb={16} />
          <Button
            icon="login"
            mode="contained"
            onPress={() => signup({ name, profesi, email, password })}
          >
            Signup
          </Button>
          <Spacer />
        </Wrapper>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
  },
});
