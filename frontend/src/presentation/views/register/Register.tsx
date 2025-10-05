import React from 'react';
import styles from './Styles';
import { Text, View, Image, ScrollView } from 'react-native';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
import useViewModel from './ViewModel';
export const RegisterScreen = () => {
  const {name, lastname, phone, email, password, confirmPassword, onChange, register} = useViewModel();
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/chef.jpg')}
        style={styles.imageBackground}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../../assets/logo.png')}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>FOOD APP</Text>
      </View>
      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formText}>REGÍSTRATE</Text>
          <CustomTextInput
            image = {require('../../../../assets/user.png')}
            placeholder = 'Nombres'
            keyboardType = 'default'
            property = 'name'
            onChangeText = { onChange }
            value = { name }
          />
          <CustomTextInput
          image = {require('../../../../assets/my_user.png')}
            placeholder = 'Apellidos'
            keyboardType = 'default'
            property = 'lastname'
            onChangeText = { onChange }
            value = { lastname }
          />
          <CustomTextInput
            image = {require('../../../../assets/email.png')}
            placeholder = 'Correo Electrónico'
            keyboardType = 'email-address'
            property = 'email'
            onChangeText = { onChange }
            value = { email }
          />
          <CustomTextInput
            image = {require('../../../../assets/phone.png')}
            placeholder = 'Teléfono'
            keyboardType = 'numeric'
            property = 'phone'
            onChangeText = { onChange }
            value = { phone }
          />
          <CustomTextInput
            image = {require('../../../../assets/password.png')}
            placeholder = 'Contraseña'
            keyboardType = 'default'
            property = 'password'
            onChangeText = { onChange }
            value = { password }
            secureTextEntry = { true }
          />
          <CustomTextInput
            image = {require('../../../../assets/confirm_password.png')}
            placeholder = 'Confirmar Contraseña'
            keyboardType = 'default'
            property = 'confirmPassword'
            onChangeText = { onChange }
            value = { confirmPassword }
            secureTextEntry = { true }
          />
          <View style={{ marginTop: 10 }}>
            <RoundedButton text='CONFIRMAR' onPress={ () => register() } />
          </View>
        </ScrollView>
      </View>
    </View>
  );
  
}