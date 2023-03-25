import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import ListaProximos  from './components/ListaProximos';
import MontadorFilaProximos from './components/MontadorFilaProximos';
import Teste from './components/Teste';
import { JogadoresBancoDeProximos,JogadorBasedeDados, confgListadeProximos } from './Types';


export default function App() {
const [jogadorBasedeDadosLista, setJogadorBasedeDadosLista]= useState<JogadorBasedeDados[]>(require('./listaDeJogadoresMock.json'))
const [jogadoresBancoDeProximosLista, setJogadoresBancoDeProximosLista]= useState<JogadoresBancoDeProximos[]>([])



  return (<SafeAreaView style={styles.container}>
    <Text style={styles.titulo}>Volei Da Galera</Text>
    <MontadorFilaProximos Props={{
      BaseDeJogadores: jogadorBasedeDadosLista,
      setBancoDeProximos: setJogadoresBancoDeProximosLista,
      bancoDeProximos: jogadoresBancoDeProximosLista
    }} 
      ></MontadorFilaProximos>
      <ListaProximos Props={{
      setBancoDeProximos: setJogadoresBancoDeProximosLista,
      bancoDeProximos: jogadoresBancoDeProximosLista,
    }} ></ListaProximos>
      <Teste></Teste>
  <StatusBar style='light'></StatusBar>
  <Toast ></Toast>
  </SafeAreaView>)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop:30,
    padding:10,
    paddingBottom:75
  },
  titulo:{
    fontSize:40,
    color:"white"
  },
 
});
