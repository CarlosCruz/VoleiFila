import React, { useState } from 'react';
import {  FlatList, Pressable, StyleSheet, Text, View,} from 'react-native';
import { confgListadeProximos, JogadoresBancoDeProximos, time } from '../Types';
import Toast from 'react-native-toast-message';

type ListaProximosProps = {
  setBancoDeProximos:React.Dispatch<React.SetStateAction<JogadoresBancoDeProximos[]>>,
  bancoDeProximos:JogadoresBancoDeProximos[],
}

export default function ListaProximos({Props}:{Props:ListaProximosProps}) {
  const [confgListaDeProximos, setConfgListaDeProximos] = useState<confgListadeProximos>({timesFixos:false});
  const [time1,settime1] = useState<JogadoresBancoDeProximos[]>([]) 
  const [time2,settime2] = useState<JogadoresBancoDeProximos[]>([])
  const [listaTimes,setListaTimes] = useState<time[]>([])

  const DividirtimesFX = () =>{
    
  }

  const dividir2Times=(jogadores:JogadoresBancoDeProximos[])=>{

  } 

 const iniciar = ()=>{

  if(Props.bancoDeProximos.length<12){  
    Toast.show({
    type:"error",
    text1: 'O minimo de jogadores para começar são 12',})
    return}
  if (confgListaDeProximos.timesFixos){
    DividirtimesFX()
    settime1([...listaTimes[0].jogadores])
    settime2([...listaTimes[1].jogadores])
  }else{
    let tempJogadores = Props.bancoDeProximos.slice(0,12)
    tempJogadores = tempJogadores.sort((a, b) => (a.notaResumo > b.notaResumo ? 1 : -1))
    dividir2Times(tempJogadores)
  }
    
  }

  type ItemPropsNomeEscolido = {nome:string,id:number,sexoFeminino:boolean};
  const NomeEscolido = ({nome,id,sexoFeminino}:ItemPropsNomeEscolido)=>(<Pressable 
      onPress={()=>{}}
      style={({pressed}) =>[{backgroundColor: 
      sexoFeminino ? pressed ? '#ffb4ff': '#ff58ff' : pressed ? '#a0ffff': '#00ffff' }
      ,styles.botaoDeNome,]}>
          <Text style={{fontSize:20}}>{nome}</Text>
  </Pressable>);

  return (<View style={styles.mainView}> 
  {(time1.length === 0) || (time2.length === 0) ? <Pressable onPress={iniciar}
  style={({pressed})=>[{backgroundColor: pressed ? '#4dff4d' : '#00cf00',}, styles.botaoIniciar]}>
    <Text style={{fontSize:40}}>Iniciar</Text>
  </Pressable> 
  : <>
  
  </>}
    <FlatList
      data={Props.bancoDeProximos}
      renderItem={(i) => <NomeEscolido nome={i.item.nome} id={i.item.ID} sexoFeminino={i.item.sexoFeminino}></NomeEscolido>}
      extraData={Props.bancoDeProximos}
    ></FlatList>
    
    </View>);
}
const styles = StyleSheet.create({
  Text:{
    fontSize:25,
  },
  botaoDeNome:{
    marginBottom:10,
    borderRadius:10,
    paddingLeft:5,
    width:165
  },
  botaoIniciar:{
    marginBottom:10,
    borderRadius:10,
    paddingLeft:5,
    width:150,
    justifyContent:"center",
    alignItems:"center"
  },
  mainView:{
    marginTop:10,
    alignItems:"center",
  }
});