export enum StatusSolicitacao {
  ABERTA = 1,
  ORCADA,
  APROVADA,
  REJEITADA,
  REDIRECIONADA,
  ARRUMADA,
  PAGA,
  FINALIZADA
}

export const StatusSolicitacaoLabel = {
  [StatusSolicitacao.ABERTA]: 'Aberta',
  [StatusSolicitacao.ORCADA]: 'Orçada',
  [StatusSolicitacao.APROVADA]: 'Aprovada',
  [StatusSolicitacao.REJEITADA]: 'Rejeitada',
  [StatusSolicitacao.REDIRECIONADA]: 'Redirecionada',
  [StatusSolicitacao.ARRUMADA]: 'Arrumada',
  [StatusSolicitacao.PAGA]: 'Paga',
  [StatusSolicitacao.FINALIZADA]: 'Finalizada',
} as const;

export const StatusSolicitacaoCor =  {
  [StatusSolicitacao.ABERTA]: '#B7B7B7',
  [StatusSolicitacao.ORCADA]: '#AB886D',
  [StatusSolicitacao.APROVADA]: '#DED473',
  [StatusSolicitacao.REJEITADA]: '#BD574E',
  [StatusSolicitacao.REDIRECIONADA]: '#BFA2DB',
  [StatusSolicitacao.ARRUMADA]: '#89A8B2',
  [StatusSolicitacao.PAGA]: '#F5B17B',
  [StatusSolicitacao.FINALIZADA]: '#96A78D',
} as const;

export const StatusSolicitacaoObservacao =  {
  [StatusSolicitacao.ABERTA]: 'Solicitação recebida',
  [StatusSolicitacao.ORCADA]: 'Solicitação orçada',
  [StatusSolicitacao.APROVADA]: 'Orçamento aprovado',
  [StatusSolicitacao.REJEITADA]: 'Solicitação rejeitada',
  [StatusSolicitacao.REDIRECIONADA]: 'Solicitação redirecionada',
  [StatusSolicitacao.ARRUMADA]: 'Manutenção realizada',
  [StatusSolicitacao.PAGA]: 'Manutenção paga',
  [StatusSolicitacao.FINALIZADA]: 'Solicitação finalizada',
} as const;