import React, { useState } from "react"
import { Pressable, Text, StyleSheet, Modal, View, FlatList, GestureResponderEvent } from "react-native";
import { JogadorBasedeDados, JogadoresBancoDeProximos } from "../Types";
type MontadorFilaProximosProps = {
    BaseDeJogadores:JogadorBasedeDados[],
    setBancoDeProximos:React.Dispatch<React.SetStateAction<JogadoresBancoDeProximos[]>>,
    bancoDeProximos:JogadoresBancoDeProximos[];
}


export default function MontadorFilaProximos({Props}:
    {Props:MontadorFilaProximosProps}) {
    const [modalListaVisbl, setmodalListaVisbl] = useState(false);
    const [listaDeDisponiveis,setListaDeDisponiveis] = useState<number[]>
    (Props.BaseDeJogadores.map((i)=>{return(i.ID)}));

    const adicionarNome = (ID:number) =>{
        let TmpbancoDeProximos = Props.bancoDeProximos;
        let NovoJogador:JogadoresBancoDeProximos = {
            ID: Props.BaseDeJogadores[ID-1].ID,
            nome: Props.BaseDeJogadores[ID-1].nome,
            sexoFeminino: Props.BaseDeJogadores[ID-1].sexoFeminino,
            notaResumo: Props.BaseDeJogadores[ID-1].notaResumo,
            notaSaque:Props.BaseDeJogadores[ID-1].notaSaque,
            notaRecepcao:Props.BaseDeJogadores[ID-1].notaRecepcao,
            notaLevantamento:Props.BaseDeJogadores[ID-1].notaLevantamento,
            notaAtaque:Props.BaseDeJogadores[ID-1].notaAtaque,
            notaBloqueio:Props.BaseDeJogadores[ID-1].notaBloqueio,
            notaDinamica: 5,
            vitoriasConcecutivas: 0,
            vezesQueJogou: 0}
        TmpbancoDeProximos.push(NovoJogador)
        Props.setBancoDeProximos([...TmpbancoDeProximos])
        let tmplistaDeDisponiveis=listaDeDisponiveis
        let index = tmplistaDeDisponiveis.indexOf(ID)
        tmplistaDeDisponiveis.splice(index,1)
        setListaDeDisponiveis([...tmplistaDeDisponiveis])}
    
        const removerNome = (ID:number,index:number) =>{
            let TmpbancoDeProximos = Props.bancoDeProximos;
            TmpbancoDeProximos.splice(index,1)
            Props.setBancoDeProximos([...TmpbancoDeProximos])
            let tmplistaDeDisponiveis=listaDeDisponiveis
            tmplistaDeDisponiveis.push(ID)
            setListaDeDisponiveis([...tmplistaDeDisponiveis])}

     type ItemPropsNomeDisponivel = {item:number};
    const NomeDisponivel = ({item}: ItemPropsNomeDisponivel)=>(<Pressable 
        onPress={()=>{adicionarNome(item)}}
        style={({pressed}) =>[{backgroundColor: 
        Props.BaseDeJogadores[item-1].sexoFeminino ? pressed ? '#ffb4ff': '#ff58ff' : pressed ? '#a0ffff': '#00ffff' }
        ,styles.botaoDeNome,]}>
            <Text style={{fontSize:20}}>{Props.BaseDeJogadores[item-1].nome}</Text>
    </Pressable>);

    type ItemPropsNomeEscolido = {nome:string,id:number,sexoFeminino:boolean,index:number};
    const NomeEscolido = ({nome,id,sexoFeminino,index}:ItemPropsNomeEscolido)=>(<Pressable 
        onPress={()=>{removerNome(id,index)}}
        style={({pressed}) =>[{backgroundColor: 
        sexoFeminino ? pressed ? '#ffb4ff': '#ff58ff' : pressed ? '#a0ffff': '#00ffff' }
        ,styles.botaoDeNome,]}>
            <Text style={{fontSize:20}}>{nome}</Text>
    </Pressable>);

    return (<>
            <Pressable onPress={() => setmodalListaVisbl(true)}
                style={({ pressed }) => [
                    {backgroundColor: pressed ? '#4dff4d' : '#00cf00'} , 
                    {width: 300},styles.wrapperCustom,
                ]}>
                <Text style={{ fontSize: 20 }}>Adicionar jogadores na lista</Text>
            </Pressable>
            <Modal visible={modalListaVisbl} animationType="fade">
                <View style={styles.container}>
                    <Pressable onPress={() => {setmodalListaVisbl(false) 
                    Props.setBancoDeProximos([...Props.bancoDeProximos])}}
                        style={({ pressed }) => [
                            {backgroundColor: pressed ? '#4dff4d' : '#00cf00',},{width: 100}, styles.wrapperCustom,
                        ]}>
                        <Text style={{ fontSize: 20 }}>Voltar</Text>
                    </Pressable>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}><View>
                        <Text style={{color:'white'}}>Disponível</Text>
                        <FlatList 
                        data={listaDeDisponiveis}
                        renderItem={({item}) => <NomeDisponivel item={item} />}
                        extraData={listaDeDisponiveis}
                        ></FlatList>
                    </View>
                    <View ><Text style={{color:'white'}}>Proximos</Text>
                    <FlatList 
                        data={Props.bancoDeProximos}
                        renderItem={({item,index}) => <NomeEscolido nome={item.nome} id={item.ID} 
                        sexoFeminino={item.sexoFeminino} index={index}  />}
                        extraData={Props.bancoDeProximos}
                    ></FlatList>
                    </View>
                    </View>
                    
                </View>
                
            </Modal>
        </>)
}
const styles = StyleSheet.create({
    wrapperCustom: {
        marginBottom:5,
        height: 35,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop:30,
        padding:10,
        paddingBottom:65
    },
    botaoDeNome:{
        marginBottom:10,
        borderRadius:10,
        paddingLeft:5,
        width:165
    },
});

