import React, {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/EvilIcons';

const CustomAlert = ({showAlert, setshowAlert}: any) => {
  return (
    <>
      <AwesomeAlert
        customView={
          <View>
            <Icon
              name="exclamation"
              size={30}
              color={'lightgray'}
              style={{
                marginLeft: 30,
                alignContent: 'center',
                borderRadius: 30,
                height: 25,
                width: 40,
              }}
            />
            <Text style={{color: 'white', marginTop: 15}}>Save Changes ?</Text>
          </View>
        }
        show={showAlert}
        // title="Save Changes"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Save"
        confirmButtonTextStyle={{
          textAlign: 'center',
        }}
        confirmButtonStyle={{
          width: 90,
          backgroundColor: '#a0c55f',
          textAlign: 'center',
          marginleft: 20,
        }}
        onCancelPressed={() => {
          console.log('Discard Button Pressed');
          setshowAlert(false);
        }}
        onConfirmPressed={() => {
          console.log('Save Button Pressed');
          setshowAlert(false);
        }}
        showCancelButton={true}
        cancelText="Discard"
        cancelButtonTextStyle={{textAlign: 'center'}}
        cancelButtonStyle={{
          backgroundColor: 'red',
          width: 90,
          marginLeft: 10,
        }}
        contentContainerStyle={{
          backgroundColor: 'black',
          borderRadius: 12,
          width: 230,
          hight: 300,
          marginBottom: 30,
          paddingVertical: 20,
          alignContent: 'center',
        }}
      />
    </>
  );
};

export default CustomAlert;
