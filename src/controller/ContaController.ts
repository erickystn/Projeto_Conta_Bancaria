import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/Colors";

export class ContaController implements ContaRepository {
  private _listaContas = new Array<Conta>();
  private _numero: number = 0;

  public procurarPorNumero(numero: number): void {}

  public listarTodas(): void {
    this._listaContas.forEach((v) => console.log(v.visualizar()));
  }

  public cadastrar(conta: Conta): void {
    this._listaContas.push(conta);
    console.log(
      colors.fg.green,
      `Conta número: ${conta.numero} foi criada! `,
      colors.reset,
    );
  }

  public atualizar(conta: Conta): void {
    const indice = this._listaContas.findIndex(
      (c) => c.numero === conta.numero,
    );

    if (indice !== -1) {
      this._listaContas[indice] = conta;
    } else {
      console.log(
        colors.fg.red,
        `Conta número: ${conta.numero} não encontrada! `,
        colors.reset,
      );
    }
  }

  public deletar(numero: number): void {
    const indice = this._listaContas.findIndex(
      (conta) => conta.numero === numero,
    );

    if (indice !== -1) {
      this._listaContas.splice(indice, 1); // Remove 1 elemento a partir do índice encontrado
      console.log(
        colors.fg.green,
        `Conta número: ${numero} excluída com sucesso!`,
        colors.reset,
      );
    } else {
      console.log(
        colors.fg.red,
        `Conta número: ${numero} não encontrada!`,
        colors.reset,
      );
    }
  }

  public sacar(numero: number, valor: number): void {
    const conta = this._listaContas.find((v) => v.numero === numero);
    if (conta) {
      conta.sacar(valor);
    } else {
      console.log(
        colors.fg.red,
        `Conta número: ${numero} não encontrada! `,
        colors.reset,
      );
    }
  }

  public depositar(numero: number, valor: number): void {
    const conta = this._listaContas.find((v) => v.numero === numero);
    if (conta) {
      conta.depositar(valor);
    } else {
      console.log(
        colors.fg.red,
        `Conta número: ${numero} não encontrada! `,
        colors.reset,
      );
    }
  }

  public transferir(
    numeroOrigem: number,
    numeroDestino: number,
    valor: number,
  ): void {
    const contaOrigem = this._listaContas.find(
      (v) => v.numero === numeroOrigem,
    );
    const contaDestino = this._listaContas.find(
      (v) => v.numero === numeroDestino,
    );
    if (contaOrigem && contaDestino) {
      if (contaOrigem.sacar(valor)) {
        contaDestino.depositar(valor);
      }
    } else {
      console.log(
        colors.fg.red,
        `Conta origem ou destino não encontrada! `,
        colors.reset,
      );
    }
  }

  public gerarNumero(): number {
    return ++this._numero;
  }
}
