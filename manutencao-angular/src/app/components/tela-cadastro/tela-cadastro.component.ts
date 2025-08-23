import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../models/Cliente.model';
import { Endereco } from '../../models/Endereco.model';
import { EnderecoService } from '../../services/endereco/endereco.service';

@Component({
  selector: 'app-tela-cadastro',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './tela-cadastro.html',
  styleUrl: './tela-cadastro.css'
})

export class TelaCadastro {
  readonly _jsonEnderecoService = inject(EnderecoService);

  cadastroForm = new FormGroup({
    nome: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    cpf: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    telefone: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators:[Validators.required, Validators.email] }),
    cep: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    logradouro: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    bairro: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    cidade: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    estado: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  })

  removeNaoNumericos(entrada: string): string {
    return entrada.replace(/\D/g, '');  
  }

  mascaraCPF() {
    //Pega o conteúdo do campo cpf
    const campoCPF = this.cadastroForm.get('cpf');

      //Se o campo estiver vazio ou indefinido, retorna.
      if (!campoCPF) return;

    //Remove tudo que não é número
    let cpf = this.removeNaoNumericos(campoCPF.value!);

      //Limita a entrada do campo para 11 caractéres
      cpf = cpf.substring(0, 11);

      //Aplica a máscara: Serão 4 grupos, os três primeiros divididos por . e os dois últimos por -.
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

      //Atualiza o valor do campo sem avisar pro formulário.
      campoCPF.setValue(cpf, { emitEvent: false });
  } 

  mascaraTelefone() {
    const campoTelefone = this.cadastroForm.get( 'telefone');
      if (!campoTelefone) return;

    let telefone = this.removeNaoNumericos(campoTelefone.value!);

      telefone = telefone.substring(0, 11);

      telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2');
      telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2');

      campoTelefone.setValue(telefone, { emitEvent: false });
  }

  mascaraCEP() {
    const campoCEP = this.cadastroForm.get('cep');

      if (!campoCEP) return;

    let cep = this.removeNaoNumericos(campoCEP.value!);

      cep = cep.substring(0, 8);

      cep = cep.replace(/(\d{2})(\d)/, '$1.$2');
      cep = cep.replace(/(\d{3})(\d)/, '$1-$2');

      campoCEP.setValue(cep, { emitEvent: false });
  }

  limpaEndereco() {
    this.cadastroForm.patchValue({
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: ''
    });
  }

  validaCEP(cep: string) {
    //Se o CEP for nullo ou indefinido, limpa os campos e retorna.
    if(!cep) {
      this.limpaEndereco();

      return;
    }

    //Retira tudo que não é número
    const cepFormatado = this.removeNaoNumericos(cep);

    //Se esse CEP formatado tiver 8 digitos
    if(cepFormatado.length === 8) {
      //Faz a requisição para a API ViaCEP e retorna o resultado
      this._jsonEnderecoService.getEndereco(cepFormatado).subscribe(
        //Sucesso
        (response) => { 
          console.log(response) 

          this.cadastroForm.patchValue({
            logradouro: response.logradouro,
            bairro: response.bairro,
            cidade: response.localidade,
            estado: response.estado
          });   
        }
      )
    } else {
      this.limpaEndereco();
    }
  }

  //Assim que a tela de cadastro carregar, o que está aqui dentro será executado.
  ngOnInit(){
    //Quando o valor do input CEP mudar
    this.cadastroForm.get('cep')?.valueChanges.subscribe((cep) => {
      this.validaCEP(cep);
    })
  }

  cadastrar(){
    //Pra não precisar ficar fazendo this.cadastroForm.value pra cada um, pode-se fazer assim e pegar todos de uma só vez.
    const { nome, cpf, telefone, email, cep, logradouro, bairro, cidade, estado } = this.cadastroForm.getRawValue()

    const cpfFormatado = this.removeNaoNumericos(cpf);
    const telefoneFormatado = this.removeNaoNumericos(telefone);
    const cepFormatado = this.removeNaoNumericos(cep);
    
    //Senha aleatória para teste sem backend
    const senhaAleatoria = Math.random().toString(36).slice(-4);

    const cliente: Cliente = {
      nome: nome,
      email: email,
      senha: senhaAleatoria,
      cpf: cpfFormatado,
      telefone: telefoneFormatado
    }

    const endereco: Endereco = {
      cep: cepFormatado,
      logradouro: logradouro,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
    }

    console.log(cliente, endereco);
  }
}
