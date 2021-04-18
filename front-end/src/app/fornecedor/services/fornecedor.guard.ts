import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageUtils } from "src/app/utils/localstorage";

@Injectable()
export class FornecedorGuard implements CanActivate {

    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router){}

    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if(!this.localStorageUtils.obterTokenUsuario()) {
            this.router.navigate(['/conta/login']);
        }
        
        let user = this.localStorageUtils.obterUsuario();
        let claim: any = routeAc.data[0];

        if(claim !== undefined) {
            let claim = routeAc.data[0]['claim'];

            if(claim){
                if(!user.claims){
                    this.navegarAcessoNegado();
                }

                let userClaims = user.claims.find((x: { type: any; }) => x.type === claim.nome);

                if(!userClaims){ 
                    this.navegarAcessoNegado();
                }

                let valoresClaim = userClaims.value as string;
                
                if(!valoresClaim.includes(claim.valor)){
                    this.navegarAcessoNegado();
                }
            }
        }

        return true;
    }
  
    navegarAcessoNegado() {
        this.router.navigate(['/acesso-negado']);
    }

}