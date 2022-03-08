import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Picker, Keyboard } from 'react-native';
import FormContainer from './FormContainer'
import axios from 'axios';

const EncryptDecryptForm = () => {
  const [error, setError] = useState('');

  const [algorithm, setAlgorithm] = useState('HS256');
  const [expiresIn, setExpiresIn] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [dataToEncrypt, setDataToEncrypt] = useState('');

  const encryptCall = async (values, formikActions) => {
    try {
      Keyboard.dismiss()
      if(!algorithm || !secretKey || !dataToEncrypt) {
        setError("Plz Fill Valid & Required Data In All The Field's!")
        setTimeout(() => setError(''), 2500)
        return
      }
      const res = await axios.post('http://localhost:3000/encrypt', {
        key: secretKey,
        expiresIn,
        algorithm,
        data: dataToEncrypt
      });
      setError(res)
  } catch (error) {
    setError(error)
    setTimeout(() => setError(''), 2500)
  }
  };

  return (
    <FormContainer>
        <View>
          <Text style={{ color: 'cyan', textAlign: 'center', fontSize: 22, marginBottom: 40 }}>Lexus - ShareSecretly{"\n"}By LexusCreations</Text>
        </View>
        <View>
          <Text style={{ marginBottom: 5, color: '#8B9A46' }}>Secret-Key*</Text>
          <TextInput
              style={{
                padding: 10,
                borderBottomColor: '#7A0BC0',
                marginBottom: 10,
                borderWidth: 1,
                borderRadius: 5,
                height:50
              }}
              underlineColorAndroid="transparent"
              placeholder="Type Secret Key Hear!"
              placeholderTextColor="grey"
              onChangeText={val => setSecretKey(val)}
              value={secretKey}
            />
        </View>

        <View>
          <Text style={{ marginBottom: 5, color: '#8B9A46' }}>expiresIn (Optional)</Text>
          <TextInput
              style={{
                padding: 10,
                marginTop: 2,
                borderBottomColor: '#7A0BC0',
                marginBottom: 10,
                borderWidth: 1,
                borderRadius: 5,
                height:50,
              }}
              multiline={true}
              underlineColorAndroid="transparent"
              placeholder="Type expiresIn Time Hear"
              placeholderTextColor="grey"
              numberOfLines={50}
              onChangeText={val => setExpiresIn(val)}
              value={expiresIn}
            />
        </View>

        <View>
          <Text style={{ marginBottom: 5, color: '#8B9A46' }}>Data/Message*</Text>
          <TextInput
            style={{
              padding: 10,
              marginTop: 2,
              borderBottomColor: '#7A0BC0',
              marginBottom: 10,
              borderWidth: 1,
              borderRadius: 5,
              height:50,
            }}
            multiline={true}
            underlineColorAndroid="transparent"
            placeholder="Type some data/message to encrypt..."
            placeholderTextColor="grey"
            numberOfLines={50}
            onChangeText={(text) => setDataToEncrypt(text)}
            value={dataToEncrypt}
          />
        </View>
        
        <View>
          <Text style={{ marginBottom: 5, color: '#8B9A46' }}>Select Algorithm*</Text>
          <Picker
            selectedValue={(e) => setAlgorithm(e)}
            onValueChange={(itemValue, itemIndex) => setAlgorithm(itemValue)}
            style={{ color: 'green' }}
          >
            <Picker.Item label="HS256" value="HS256" />
            <Picker.Item label="HS384" value="HS384" />
            <Picker.Item label="HS512" value="HS512" />
          </Picker>
        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={() => encryptCall()}>
            <Text>Encrypt</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={{ backgroundColor: '#1A1A40a9', color: '#FFFFFF', padding: 10, margin: 10, marginTop: 40 }}>
          Preview{"\n"}
            {"{\n"}
              {"\t\t"}key: "{secretKey}",{"\n"}
              {"\t\t"}expiresIn: "{expiresIn}",{"\n"}
              {"\t\t"}data: "{dataToEncrypt}",{"\n"}
              {"\t\t"}algorithm: "{algorithm}"{"\n"}
            {"}"}
          </Text>
        </View>

        <View>
            <Text style={{ color: 'red', textAlign: 'center', marginTop: 30 }}>{error ? ` ${error} ` : error}</Text>
        </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#2758",
    padding: 10
  }
});

export default EncryptDecryptForm;
