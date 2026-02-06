import { Conta } from "./Conta";

export class ContaPoupanca extends Conta {
  private _aniversario: number;

  constructor(
    numero: number,
    agencia: number,
    titular: string,
    saldo: number,
    aniversario: number,
  ) {
    // Foi removido a opção tipo, pois já que a conta é Poupanca
    // automaticamente ela é do tipo 2
    super(numero, agencia, 2, titular, saldo);
    this._aniversario = aniversario;
  }
  public get aniversario() {
    return this._aniversario;
  }

  public set aniversario(aniversario: number) {
    this._aniversario = aniversario;
  }

  public visualizar(): void {
    super.visualizar();
    console.log("Dia do aniversário: " + this._aniversario);
  } 

  
}
