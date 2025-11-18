import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../shared/models/Categoria';
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
    descricao: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.listarTodos();
  }

  abrirAdicionar() {
    this.categoriaSelecionada = null;
    this.categoriaForm.reset();
    this.modoFormulario = 'adicionar';
    this.mostrarFormulario = true;
  }

  abrirEditar(categoria: Categoria) {
    this.categoriaSelecionada = categoria;
    this.categoriaForm.patchValue({ descricao: categoria.descricao });
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

    const nome = this.categoriaForm.get('descricao')?.value ?? '';
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

  listarTodos() {
    this.categoriaService.listar().subscribe({
      next: (categorias: Categoria[] | null) => {
        if(categorias == null){
          this.categorias = [];
        } else {
          this.categorias = categorias;
        }
      },
      error: (erro) => {
        if (erro.status === 500) {
          alert(`Erro interno: ${erro.error}`);
        } else {
          alert('Erro inesperado ao listar categorias.');
        }
      }
    });
  }
}
