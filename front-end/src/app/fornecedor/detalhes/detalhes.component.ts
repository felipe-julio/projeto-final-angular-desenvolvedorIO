import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../models/fornecedor';

import { ActivatedRoute } from '@angular/router';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent implements OnInit {

  fornecedor: Fornecedor = new Fornecedor();
  id: string | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });  
  }

  constructor(
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService) {
      this.fornecedorService.obterPorId(this.id)
      .subscribe(fornecedor => this.fornecedor = fornecedor);
  }

}
