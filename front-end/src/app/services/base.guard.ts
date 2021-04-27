import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UseExistingWebDriver } from "protractor/built/driverProviders";
import { LocalStorageUtils } from "../utils/localstorage";

export abstract class BaseGuard {
    localStorageUtils = new LocalStorageUtils();    

    constructor(protected router: Router) {}

    protected validarClaims(routeAc: ActivatedRouteSnapshot) : boolean {

        if(!this.localStorageUtils.obterTokenUsuario()) {
            this.router.navigate(['/conta/login/'], { queryParams: {returnUrl: this.router.url }})
        }

        let user = this.localStorageUtils.obterUsuario();

        let claim: any = routeAc.data[0];

        if(claim !== undefined) {
            let claim = routeAc.data[0]['claim'];

            if(claim) {
                if(!user.claims) {
                    this.navegarAcessoNegado();
                }

                let userClaims = user.claims.find((x: { type: any; }) => x.type === claim.nome);

                if(!userClaims) {
                    this.navegarAcessoNegado();
                }

                let valoresClaim = userClaims.value as string;

                if(!valoresClaim.includes(claim.valor)) {
                    this.navegarAcessoNegado();
                }
            }
        }

        return true;
    }

    private navegarAcessoNegado() {
        this.router.navigate(['/acesso-negado']);
    }
} 