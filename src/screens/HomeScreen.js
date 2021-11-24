import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';

import {
  Headline,
  TextInput,
  Button,
  DataTable,
  Text,
  Colors,
} from 'react-native-paper';

import { Context as AuthContext } from '../contexts/AuthContext';
import { Context as AccountContext } from '../contexts/AccountContext';
import Screen from '../components/Screen';
import Wrapper from '../components/Wrapper';
import Spacer from '../components/Spacer';
import Icon from '../components/Icon';

export default function HomeScreen({ navigation }) {
  const { signOut } = useContext(AuthContext);
  const { state, getAccount, clearAccount } = useContext(AccountContext);

  const [page, setPage] = useState(0);
  const [note, setNote] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAccount();
    });

    return function () {
      unsubscribe;
    };
  }, [page, navigation]);

  return (
    <Screen full>
      <ScrollView>
        <Wrapper>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Headline>Create motivation now!</Headline>
            <TouchableOpacity
              onPress={() => {
                signOut();
                clearAccount();
              }}
            >
              <View style={styles.iconStyle}>
                <Icon name="logout" color={Colors.white} />
              </View>
            </TouchableOpacity>
          </View>
          <Text>Hi, {state.account.name}</Text>
        </Wrapper>
        <Spacer mb={4} />
        <Wrapper>
          <TextInput
            label="what are you thinking? write here"
            style={styles.input}
            mode="outlined"
            multiline
            value={note}
            onChangeText={setNote}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Spacer mb={16} />
          <Button
            mode="contained"
            icon="share"
            onPress={() => console.log('note shared')}
          >
            Share
          </Button>
        </Wrapper>
        <Wrapper>
          <DataTable>
            <DataTable.Pagination
              numberOfPages={5 + 1}
              page={page}
              onPageChange={(page) => setPage(page)}
            />
          </DataTable>
        </Wrapper>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    lineHeight: 5,
  },
  iconStyle: {
    width: 45,
    height: 45,
    backgroundColor: Colors.deepPurpleA700,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
