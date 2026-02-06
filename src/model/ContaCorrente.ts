import { currencyBr } from './../util/CurrencyBr';
import { Conta } from "./Conta";



export class ContaCorrente extends Conta{
    private _limite: number;
    private  _valorLimite:number;
    // Foi removido a opção tipo, pois já que a conta é Poupanca
    // automaticamente ela é do tipo 1
    constructor(numero:number,agencia:number,titular:string,saldo:number,limite:number){

        super(numero,agencia,1,titular,saldo);
        this._limite = limite
        this._valorLimite = limite;
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
        
        if(this.saldo < valor){
        valor -= this.saldo;
        this.saldo = 0;
        this.limite -= valor;
        }else{
            this.saldo -= valor;
        }
        return true;

    }

    public visualizar(): void {
        super.visualizar();
        console.log("Limite Disponível: ", currencyBr(this._limite));
        console.log("Limite Total: ", currencyBr(this._valorLimite));
    }

    private depositarLimite(valor:number): number{
        if((this._limite + valor) > this._valorLimite ){
            valor = (this._limite + valor) - this._valorLimite;
            this._limite = this._valorLimite;
            return valor;
        }
        this._limite += valor;
        return 0;

    }

    public depositar(valor: number): void {
        this.saldo += this.depositarLimite(valor);
    }
}