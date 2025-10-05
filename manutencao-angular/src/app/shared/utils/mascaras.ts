export function removerNaoNumericos(entrada: string): string {
  return entrada.replace(/\D/g, '');
}

export function mascaraCPF(entrada: string): string {
  entrada = removerNaoNumericos(entrada).substring(0, 11);

  if (!entrada) return '';

  if (entrada.length <= 3) return entrada;
  if (entrada.length <= 6) return `${entrada.substring(0,3)}.${entrada.substring(3)}`;
  if (entrada.length <= 9) return `${entrada.substring(0,3)}.${entrada.substring(3,6)}.${entrada.substring(6)}`;

  return `${entrada.substring(0,3)}.${entrada.substring(3,6)}.${entrada.substring(6,9)}-${entrada.substring(9)}`;
}

export function mascaraTelefone(entrada: string): string {
  entrada = removerNaoNumericos(entrada).substring(0, 11);

  //Se não tiver nada, retorna vazio
  if (!entrada) return '';
  //Separa os 2 do DDD
  if (entrada.length <= 2) return `(${entrada}`;
  //Separa o número
  if (entrada.length <= 7) return `(${entrada.substring(0,2)}) ${entrada.substring(2)}`;
  
  //Junta tudo colocando os () e o traço
  return `(${entrada.substring(0,2)}) ${entrada.substring(2,7)}-${entrada.substring(7)}`;
}

export function mascaraCEP(entrada: string): string {
  entrada = removerNaoNumericos(entrada).substring(0, 8);

  if (!entrada) return '';
  if (entrada.length <= 5) return entrada;

  return `${entrada.substring(0,5)}-${entrada.substring(5)}`;
}