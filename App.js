/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from './src/components/Input';
import { __await } from 'tslib';

const register = user =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user.email === 'hello@gmail.com') {
        reject({ email: 'Email already use' });
      } else {
        resolve();
      }
    }, 1000);
  });

export default class App extends Component {
  _handleSubmit = async (values, bag) => {
    try {
      await register(values);
      alert(' Register succesfully');
      bag.setSubmitting(false);
    } catch (error) {
      bag.setSubmitting(false);
      bag.setErrors(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>React Native With Formik Demo</Text>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: ''
          }}
          onSubmit={this._handleSubmit}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required(),
            password: Yup.string()
              .min(8)
              .required(),
            confirmPassword: Yup.string()
              .oneOf(
                [Yup.ref('password', null)],
                'Confirm Password must be match Password'
              )
              .min(8)
              .required()
          })}
          render={({
            values,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
            setFieldTouched,
            isValid,
            isSubmitting
          }) => (
            <React.Fragment>
              <Input
                label="Email"
                autoCapitalize="none"
                value={values.email}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="email"
                error={touched.email && errors.email}
              />

              <Input
                label="Password"
                autoCapitalize="none"
                secureTextEntry
                value={values.password}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="password"
                error={touched.password && errors.password}
              />

              <Input
                label="Confirm Password"
                autoCapitalize="none"
                secureTextEntry
                value={values.confirmPassword}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="confirmPassword"
                error={touched.confirmPassword && errors.confirmPassword}
              />

              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: isValid ? '#c0392b' : '#34495e' }
                ]}
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Submit</Text>
                )}

              </TouchableOpacity>
            </React.Fragment>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50'
  },
  title: {
    marginBottom: 50,
    color: '#ecf0f1',
    fontSize: 23,
    fontWeight: '500',
    alignSelf: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 3, height: 5 },
    textShadowRadius: 8
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#c0392b',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 30,
    height: 40,
    borderRadius: 20
  },
  buttonText: {
    color: '#ecf0f1',
    fontSize: 18,
    fontWeight: '500'
  }
});
