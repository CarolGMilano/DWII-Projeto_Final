import { Component } from '@angular/core';

@Component({
  selector: 'app-pagar-servico',
  imports: [],
  templateUrl: './pagar-servico.html',
  styleUrl: './pagar-servico.css'
})
export class PagarServico {
  showModal(modal: HTMLDialogElement) {
    modal.showModal();
  }

  closeModal(modal: HTMLDialogElement) {
    modal.close();
  }

}
