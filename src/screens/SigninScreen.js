import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Headline, Colors } from 'react-native-paper';

import Screen from '../components/Screen';
import Wrapper from '../components/Wrapper';
import Spacer from '../components/Spacer';
import CenterHorizontal from '../components/CenterHorizontal';
import CenterVertical from '../components/CenterVertical';

export default function SigninScreen({ navigation }) {
  return (
    <Screen full bottom={32 * 2}>
      <CenterVertical>
        <Wrapper ph={32}>
          <CenterHorizontal>
            <Headline style={{ fontSize: 32 }}>Vigenesia</Headline>
          </CenterHorizontal>

          <CenterHorizontal>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../images/signin.png')}
            />
          </CenterHorizontal>
          <Spacer mb={16} />

          <TextInput
            mode="outlined"
            label="Email"
            left={<TextInput.Icon name="email" color={Colors.deepPurple700} />}
          />
          <Spacer />

          <TextInput
            mode="outlined"
            label="Password"
            left={<TextInput.Icon name="lock" color={Colors.deepPurple700} />}
          />
          <Spacer />

          <Button
            mode="text"
            uppercase={false}
            onPress={() => navigation.navigate('Signup')}
          >
            Not have account? Sign Up
          </Button>
          <Spacer mb={16} />

          <Button icon="login" mode="contained">
            Signin
          </Button>
          <Spacer />
        </Wrapper>
      </CenterVertical>
    </Screen>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 300,
    height: 300,
  },
});
