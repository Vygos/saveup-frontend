import { Despesa } from 'src/app/models/despesa.model';
import { Financa } from 'src/app/models/financa.model';
import { Ganho } from 'src/app/models/ganho.model';

export const dados = [
  {
    periodo: 'Janeiro',
    ganhos: [
      { valor: 3000.0, tipo: { id: 6, nome: 'Jogo do bicho' } } as Ganho,
      { valor: 2560.0, tipo: { id: 1, nome: 'salario' } } as Ganho,
      { valor: 253.0, tipo: { id: 16, nome: 'Lotofácil' } } as Ganho,
      { valor: 325.0, tipo: { id: 17, nome: 'Cassino' } } as Ganho,
    ],
    despesas: [
      { valor: 153.0, tipo: {id: 20, nome: 'Jogo do bicho' } } as Despesa,
      { valor: 50.0, tipo: { id: 20, nome: 'Conta de água' } } as Despesa,
      { valor: 550.0, tipo: { id: 20, nome: 'Aluguel' } } as Despesa,
    ],
  },
  {
    periodo: 'Fevereiro',
    ganhos: [
        { valor: 3000.0, tipo: { nome: 'Jogo do bicho' } } as Ganho,
        { valor: 2560.0, tipo: { nome: 'Salário' } } as Ganho,
        { valor: 253.0, tipo: { nome: 'Apostas' } } as Ganho,
        { valor: 325.0, tipo: { nome: 'Criptomoedas' } } as Ganho,
    
    ],
    despesas: [],
  },
  {
    periodo: 'Março',
    ganhos: [],
    despesas: [],
  },

  {
    periodo: 'Abril',
    ganhos: [],
    despesas: [],
  },
] as Financa[];
