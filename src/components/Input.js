import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleChange = value => {
    this.props.onChange(this.props.name, value);
  };

  _handleTouch = () => {
    this.props.onTouch(this.props.name);
  };

  render() {
    const { label, error, ...rest } = this.props;
    return (
      <View style={styles.root}>
        <Text style={styles.label}>{label}</Text>

        <TextInput
          placeholder={label}
          {...rest}
          onChangeText={this._handleChange}
          onBlur={this._handleTouch}
          style={styles.textInput}
          placeholderTextColor='#95a5a6'
          selectionColor='#95a5a6'
        />

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    marginTop: 15
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#e67e22',
    marginLeft: 15,
    marginBottom: 5
  },
  textInput: {
    borderRadius: 20,
    height: 40,
    borderWidth: 1,
    borderColor: '#e67e22',
    paddingLeft: 20,
    color: '#e67e22',
    fontSize: 15
  },
  error: {
    color: '#e74c3c',
    marginTop: 5,
    marginLeft: 15
  }
});

export default Input;
