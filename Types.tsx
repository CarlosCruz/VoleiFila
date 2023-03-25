
export interface JogadorBasedeDados{
  ID:number,
  nome:string,
  sexoFeminino:boolean,
  notaResumo:number,
  notaSaque?:number,
  notaRecepcao?:number,
  notaLevantamento?:number,
  notaAtaque?:number,
  notaBloqueio?:number,
}
export interface JogadoresBancoDeProximos{
  ID:number,
  nome:string,
  sexoFeminino:boolean,
  notaResumo:number,
  notaSaque?:number,
  notaRecepcao?:number,
  notaLevantamento?:number,
  notaAtaque?:number,
  notaBloqueio?:number,
  notaDinamica:number,
  vitoriasConcecutivas:number,
  vezesQueJogou:number,
}
export interface confgListadeProximos{
  timesFixos:boolean,
}
export interface time{
  jogadores:JogadoresBancoDeProximos[],
  somaNota:number,
  somaVezesQueJogou:number,
}