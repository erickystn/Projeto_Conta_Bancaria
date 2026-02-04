import { currencyBr } from './../util/CurrencyBr';
import { Conta } from "./Conta";



export class ContaCorrente extends Conta{
    private _limite: number;
    // Foi removido a opção tipo, pois já que a conta é Poupanca
    // automaticamente ela é do tipo 1
    constructor(numero:number,agencia:number,titular:string,saldo:number,limite:number){

        super(numero,agencia,1,titular,saldo);
        this._limite = limite
    }

    public get limite(): number {
        return this._limite;
    }
    public set limite(value: number) {
        this._limite = value;
    }

    public sacar(valor:number): boolean{

        if((this.saldo+this._limite)< valor){
            console.log("Saldo Insuficiente!");
            return false;
        }
        this.saldo -= valor;
        return true;

    }

    public visualizar(): void {
        super.visualizar();
        console.log("Limite: ", currencyBr(this._limite));
    }
}