import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcessoNegadoComponent } from './navegacao/acesso-negado/acesso-negado.component';
import { HomeComponent } from './navegacao/home/home.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';

const routes: Routes = [
  { path: '',  component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'conta',
    loadChildren: () => import('./conta/conta.module')
      .then(m => m.ContaModule)
  },
  {
    path: 'fornecedores',
        loadChildren: () => import('./fornecedor/fornecedor.module')
          .then(m => m.FornecedorModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./produto/produto.module')
      .then(m => m.ProdutoModule)
  },
  { path: 'nao-encontrado', component: NotFoundComponent},
  { path: 'acesso-negado', component: AcessoNegadoComponent},
  { path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
