//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StatusBar} from 'react-native';

import Routes from './src/routes'; 

export default function App() {
  return (
      <> 
        <StatusBar barStyle="light-content" backgroundColor= "#00FFFF"/>
        <Routes/>
      </>
  );
}

