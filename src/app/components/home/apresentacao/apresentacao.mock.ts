import { Despesa } from 'src/app/models/despesa.model';
import { Ganho } from 'src/app/models/ganho.model';

export const dados = [
  {
    mes: 'Janeiro',
    ganhos: [
      { valor: 3000.0, tipo: { nome: 'Jogo do bicho' } } as Ganho,
      { valor: 2560.0, tipo: { nome: 'Salário' } } as Ganho,
      { valor: 253.0, tipo: { nome: 'Apostas' } } as Ganho,
      { valor: 325.0, tipo: { nome: 'Criptomoedas' } } as Ganho,
    ],
    despesas: [
      { valor: 153.0, tipo: { nome: 'Jogo do bicho' } } as Despesa,
      { valor: 50.0, tipo: { nome: 'Conta de água' } } as Despesa,
      { valor: 550.0, tipo: { nome: 'Aluguel' } } as Despesa,
    ],
  },
  {
    mes: 'Fevereiro',
    ganhos: [],
    despesas: [],
  },
  {
    mes: 'Março',
    ganhos: [],
    despesas: [],
  },

  {
    mes: 'Abril',
    ganhos: [],
    despesas: [],
  },
];
