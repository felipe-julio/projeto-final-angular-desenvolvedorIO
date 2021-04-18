import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../models/fornecedor';

import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../services/fornecedor.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent implements OnInit{

  fornecedor: Fornecedor = new Fornecedor();
  id: string | null = null;
  public enderecoMap : any;
  errors: any[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });  
  }

  constructor(
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer 
    ) {

      this.fornecedor = this.route.snapshot.data['fornecedor'];

      this.fornecedor = this.route.snapshot.data['fornecedor'];
      this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + 
      this.EnderecoCompleto() +
      "&key=AIzaSyDkR3lYbGIPO7A5JNNOqd2cUAHVrBW6GJU"); 
  }

  excluirEvento() {
    this.fornecedorService.excluirFornecedor(this.fornecedor.id)
      .subscribe(
        evento => { this.sucessoExclusao(evento) },
        error => { this.falha(this.errors) }
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

  falha(error : any) {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

  public  EnderecoCompleto(): string {
    return this.fornecedor.endereco.logradouro + ", " + this.fornecedor.endereco.numero + " - " + this.fornecedor.endereco.bairro + ", " + this.fornecedor.endereco.cidade;
 }
}
