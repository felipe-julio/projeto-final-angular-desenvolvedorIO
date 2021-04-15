import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../models/fornecedor';

import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../services/fornecedor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent implements OnInit{

  fornecedor: Fornecedor = new Fornecedor();
  id: string | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });  
  }

  constructor(
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.fornecedorService.obterPorId(this.id)
      .subscribe(fornecedor => this.fornecedor = fornecedor);
  }

  excluirEvento() {
    this.fornecedorService.excluirFornecedor(this.fornecedor.id)
      .subscribe(
        evento => { this.sucessoExclusao(evento) },
        error => { this.falha() }
      );
  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Fornecedor excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/listar-todos']);
      });
    }
  }

  falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}