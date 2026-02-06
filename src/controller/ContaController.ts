import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/Colors";
import { currencyBr } from "../util/CurrencyBr";

export class ContaController implements ContaRepository {
  private _listaContas = new Array<Conta>();
  private _numero: number = 0;

  public listarTodas(): void {
    this._listaContas.forEach((v) => v.visualizar());
  }

  public cadastrar(conta: Conta): void {

    this._listaContas.push(conta);
    console.log(colors.fg.green,`Conta número: ${conta.numero} foi criada! `,colors.reset);

  }

  public atualizar(conta: Conta): void {
    
    const indice = this._listaContas.findIndex((c) => c.numero === conta.numero);

    if (indice !== -1) {

      this._listaContas[indice] = conta;
      console.log(colors.fg.green,`Conta número: ${conta.numero} atualizada com sucesso! `,colors.reset);


    } else {

      console.log(colors.fg.red,`Conta número: ${conta.numero} não encontrada! `,colors.reset);


    }
  }

  public deletar(numero: number): void {

    const indice = this._listaContas.findIndex((conta) => conta.numero === numero);

      this._listaContas.splice(indice, 1); 
      console.log( colors.fg.green,`\nConta número: ${numero} excluída com sucesso!\n`,colors.reset);

  }

  public sacar(numero: number, valor: number): void {

    const conta = this.buscarPorNumero(numero);
    if (conta ) {

      conta.sacar(valor);
      console.log(colors.fg.green,`Conta número: ${conta.numero}: Saque de ${valor} efetuado com sucesso! `,colors.reset);

    } else {

      console.log(colors.fg.red,`Conta número: ${numero} não encontrada! `,colors.reset);
    }
  }

  public depositar(numero: number, valor: number): void {

    const conta = this.buscarPorNumero(numero);
    if (conta) {

      conta.depositar(valor);
      console.log(colors.fg.green,`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso na conta número: ${numero} `,
        colors.reset
      );

    } else {

      console.log(colors.fg.red,`Conta número: ${numero} não encontrada! `,colors.reset);

    }
  }

  public transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {

    const contaOrigem =this.buscarPorNumero(numeroOrigem);
    const contaDestino = this.buscarPorNumero(numeroDestino);

    if (contaOrigem && contaDestino) {
      if (contaOrigem.sacar(valor)) {
        contaDestino.depositar(valor);
        console.log(colors.fg.green,`Valor de ${currencyBr(valor)} transferido de conta ${numeroOrigem} para conta ${numeroDestino} com sucesso! `,colors.reset);
      }
    } else {
      console.log(colors.fg.red, `Conta origem ou destino não encontrada! `,colors.reset);
    }
  }

  public gerarNumero(): number {
    return ++this._numero;
  }

  public buscarPorTitular(titular: string): Conta[] {
    return this._listaContas.filter((conta) =>
      conta.titular.toLowerCase().includes(titular.toLowerCase()),
    );
  }

  public buscarPorNumero(numero: number): Conta | null {
    return this._listaContas.find((conta) => conta.numero === numero) || null;
  }
  public numeroContaExists(numero: number): boolean {
    return this._listaContas.some((conta) => conta.numero === numero);
  }

}
