import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../models/fornecedor';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent implements OnInit {

  fornecedor: Fornecedor = new Fornecedor();
  id: string | null = null;
  public enderecoMap : any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });  
  }

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer 
    ) {

      this.fornecedor = this.route.snapshot.data['fornecedor'];
      this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + 
      this.EnderecoCompleto() +
      "&key=AIzaSyDkR3lYbGIPO7A5JNNOqd2cUAHVrBW6GJU"); 
  }

  public  EnderecoCompleto(): string {
     return this.fornecedor.endereco.logradouro + ", " + this.fornecedor.endereco.numero + " - " + this.fornecedor.endereco.bairro + ", " + this.fornecedor.endereco.cidade;
  }

}
