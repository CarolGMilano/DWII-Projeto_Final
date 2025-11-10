import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../models/Categoria';
import { CategoriaService } from '../../services/categoria/categoria';

@Component({
  selector: 'app-tela-categorias',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tela-categorias.html',
  styleUrls: ['./tela-categorias.css']
})
export class TelaCategorias implements OnInit {
  @Output() onSubmit = new EventEmitter<Categoria>();

  categorias: Categoria[] = [];
  modoFormulario: 'nenhum' | 'adicionar' | 'editar' = 'nenhum';
  mostrarFormulario = false;
  mostrarPopupExclusao = false;
  categoriaSelecionada: Categoria | null = null;

  private categoriaService = inject(CategoriaService);

  categoriaForm = new FormGroup({
    nome: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.categoriaService.categorias.subscribe({
      next: (dados) => this.categorias = dados,
      error: (err) => console.error('Erro ao carregar categorias:', err)
    });
  }

  abrirAdicionar() {
    this.categoriaSelecionada = null;
    this.categoriaForm.reset();
    this.modoFormulario = 'adicionar';
    this.mostrarFormulario = true;
  }

  abrirEditar(categoria: Categoria) {
    this.categoriaSelecionada = categoria;
    this.categoriaForm.patchValue({ nome: categoria.descricao });
    this.modoFormulario = 'editar';
    this.mostrarFormulario = true;
  }

  abrirExcluir(categoria: Categoria) {
    this.categoriaSelecionada = categoria;
    this.mostrarPopupExclusao = true;
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.mostrarPopupExclusao = false;
    this.modoFormulario = 'nenhum';
    this.categoriaForm.reset();
  }

  salvar() {
    if (this.categoriaForm.invalid) return;

    const nome = this.categoriaForm.get('nome')?.value ?? '';
    const novaCategoria: Categoria = {
      id: this.categoriaSelecionada?.id,
      descricao: ''
    };

    if (this.modoFormulario === 'adicionar') {
      this.categoriaService.postCategoria(novaCategoria).subscribe(() => {
        this.onSubmit.emit(novaCategoria);
        this.cancelar();
      });
    } else if (this.modoFormulario === 'editar' && novaCategoria.id) {
      this.categoriaService.putCategoria(novaCategoria.id, novaCategoria.descricao).subscribe(() => {
        this.onSubmit.emit(novaCategoria);
        this.cancelar();
      });
    }
  }

  excluir() {
    if (!this.categoriaSelecionada?.id) return;

    this.categoriaService.deleteCategoria(this.categoriaSelecionada.id).subscribe(() => {
      this.cancelar();
    });
  }
}
