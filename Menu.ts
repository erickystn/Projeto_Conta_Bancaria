import { Input } from './src/util/Input';
import { colors } from "./src/util/Colors";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import { ContaController } from "./src/controller/ContaController";
import { Conta } from "./src/model/Conta";
if (process.platform === "win32") {
    require("child_process").execSync("chcp 65001");
}

const contaController = new ContaController();
export function main() {

    criarContas(2).forEach((conta) => contaController.cadastrar(conta));


    let opcao: number;
    const tiposConta = ["corrente", "poupanca"];

    const menu = `
${"*".repeat(60)}
${" ".repeat(60)}
           BANCO DO BRAZIL COM Z                            
${" ".repeat(60)}
${"*".repeat(60)}
${" ".repeat(60)}
            1 - Criar Conta                                 
            2 - Listar todas as Contas                      
            3 - Buscar Conta por Numero                     
            4 - Atualizar dados da Conta                    
            5 - Apagar Conta                                
            6 - Sacar                                       
            7 - Depositar                                   
            8 - Transferir valores entre Contas             
            9 - Buscar Conta por Titular                    
            0 - Sair                                        
${" ".repeat(60)}
${"*".repeat(60)}
`;

    while (true) {
        console.log(colors.bg.black, colors.fg.yellow);
        console.log(menu);
        console.log(colors.reset);

        process.stdout.write("Digite uma opção: ");
        opcao = Input.questionInt("");

        if (opcao === 0) {
            console.log("\nBanco do Brazil com Z - O seu Futuro começa aqui!");
            sobre();
            process.exit(0);
        }

        switch (opcao) {
            case 1: {
                console.log(colors.fg.whitestrong, `\nCriar Conta\n`, colors.reset);

                let titular = Input.question("Digite o nome do titular da conta: ") ;
                let agencia = Math.abs(Input.questionInt("Digite o número da agência: "));
                const numero = Math.abs(contaController.gerarNumero());
                let saldo = Math.abs(Input.questionFloat("Digite o saldo inicial da conta: "));
                const tipo =
                    Input.keyInSelect(tiposConta, "Escolha o tipo de conta: ", { cancel: false }) + 1;


                switch (tipo) {
                    case 1: {
                        const limite = Math.abs(Input.questionFloat("Digite o limite de crédito da conta corrente: "));
                        contaController.cadastrar(new ContaCorrente(numero, agencia, titular, saldo, limite));
                        break;
                    }

                    case 2: {
                        const aniversario = Input.questionIntRange("Digite o dia de aniversário da conta poupança: ", 1, 28);
                        contaController.cadastrar(new ContaPoupanca(numero, agencia, titular, saldo, aniversario));
                        break;
                    }

                    default:
                        console.log(colors.fg.red, "\nTipo de conta inválido!", colors.reset);
                        break;
                }

                keyPress();
                break;
            }
            case 2: {

                console.log(colors.fg.whitestrong, `\nListar todas as Contas\n`, colors.reset);
                contaController.listarTodas();
                keyPress();
                break;

            }
            case 3: {

                console.log(colors.fg.whitestrong, `\nBuscar Conta por Numero\n`, colors.reset);;
                process.stdout.write("Digite o numero da conta que deseja buscar: ");
                const conta = contaController.buscarPorNumero(Input.questionInt(""));

                if (!conta) {
                    console.log(colors.fg.red, "\nConta não encontrada!", colors.reset);
                } else {
                    conta.visualizar();
                }
                keyPress();
                break;
            }
            case 4: {
                console.log(colors.fg.whitestrong, `\nAtualizar dados da Conta\n`, colors.reset);
                const numBuscado = Input.questionInt("Digite o numero da conta que deseja atualizar: ");
                const conta = contaController.buscarPorNumero(numBuscado);

                if (conta) {
                    const titular = Input.question("Digite o nome do titular da conta: ");
                    const agencia = Math.abs(Input.questionInt("Digite o número da agência: "));
                    const saldo = Math.abs(Input.questionFloat("Digite o saldo da conta: "));

                    if (conta.tipo === 1) {

                        const limite = Math.abs(Input.questionFloat("Digite o limite de crédito da conta corrente: "));
                        contaController.atualizar(new ContaCorrente(conta.numero, agencia, titular, saldo, limite));
                    } else {

                        const aniversario = Input.questionIntRange("Digite o dia de aniversário da conta poupança: ", 1, 28);
                        contaController.atualizar(new ContaPoupanca(conta.numero, agencia, titular, saldo, aniversario));
                    }

                } else {

                    console.log(colors.fg.red, "\nConta não encontrada!", colors.reset);
                }

                keyPress();
                break;
            }
            case 5: {

                console.log(colors.fg.whitestrong, `\nApagar Conta\n`, colors.reset);
                process.stdout.write("Digite o numero da conta que deseja apagar: ");
                contaController.deletar(Input.questionInt(""));
                keyPress();
                break;

            }
            case 6: {

                console.log(colors.fg.whitestrong, `\nSacar\n`, colors.reset);
                contaController.sacar(Input.questionInt("Digite o numero da conta: "), Math.abs(Input.questionFloat("Digite o valor a ser sacado: ")));
                keyPress();
                break;

            }
            case 7: {

                console.log(colors.fg.whitestrong, `\nDepositar\n`, colors.reset);
                contaController.depositar(Input.questionInt("Digite o numero da conta: "), Math.abs(Input.questionFloat("Digite o valor a ser depositado: ")));
                keyPress();
                break;

            }
            case 8: {
                console.log(colors.fg.whitestrong, `\nTransferir valores entre Contas\n`, colors.reset);
                contaController.transferir(
                    Input.questionInt("Digite o numero da conta de origem: "),
                    Input.questionInt("Digite o numero da conta de destino: "),
                    Math.abs(Input.questionFloat("Digite o valor a ser transferido: ")),
                );
                keyPress();
                break;
            }
            case 9: {
                console.log(colors.fg.whitestrong, `\nBuscar Conta por Titular\n`, colors.reset);
                const contas = contaController.buscarPorTitular(Input.question("Digite o nome de titular que deseja buscar: "));

                if (contas.length === 0) {
                    console.log(colors.fg.red, "\nNenhuma conta encontrada!", colors.reset);
                } else {
                    contas.forEach((v) => v.visualizar());
                }
                keyPress();
                break;
            }
            default: {
                console.log(colors.fg.whitestrong, `\nOpcao invalida! \n`, colors.reset);
                keyPress();
                break;
            }
        }
    }
}

function sobre(): void {
    console.log(
        `
         ${"*".repeat(40)}
           Projeto desenvolvido por: 
           Ericky Santana - eriicky@live.com
           github.com/erickystn
         ${"*".repeat(40)}        
        `,
    );
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    Input.prompt();
}

function criarContas(numero: number): Array<Conta> {
    const nomes = ["Ana", "Bruno", "Carlos", "Daniela", "Eduardo", "Fernanda"];
    const sobrenomes = ["Silva", "Souza", "Oliveira", "Pereira", "Lima", "Gomes"];
    const valoresIniciais = [100, 500, 1000, 1500, 2000, 2500];
    const contas: Array<Conta> = [];

    for (let i = 1; i <= numero; i++) {
        const titular = nomes[Math.floor(Math.random() * nomes.length)] + " " + sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
        const agencia = 123;
        const limites = [500, 1000, 1500, 2000, 2500];
        const saldo = valoresIniciais[Math.floor(Math.random() * valoresIniciais.length)];
        if (i % 2 === 0) {
            const limite = limites[Math.floor(Math.random() * limites.length)];
            contas.push(new ContaCorrente(contaController.gerarNumero(), agencia, titular, saldo, limite));

        } else {
            const aniversario = Math.floor(Math.random() * 28) + 1;
            contas.push(new ContaPoupanca(contaController.gerarNumero(), agencia, titular, saldo, aniversario));
        }

    }
    return contas;
}

// const normalize = (str: string) =>
//     str
//         .normalize("NFD") // 1. Separa o acento da letra
//         .replace(/[\u0300-\u036f]/g, "") // 2. Remove os acentos separados
//         .toLowerCase();

 main();

 // ATUALIZAÇÕES/DIFERENÇAS DO CODIGO DO INSTRUTOR
// 1 - Quaisquer input negativos serão convertido em numero positivo
// 2 -Foi implementado dentro da classe estatica Input, um novo metodo que limita 
// valores Inteiros dentro de um range decidido pelo dev.
// 3 - Foi melhorada a logica da conta corrente, por exemplo:
// -- Sacar - Caso o valor ultrapasse o saldo, ele pega do limite
// -- Depositar - A cada deposito em contas com limite já utilizado, 1º o valor vai 
//          para limte e nao saldo, até o limite utilizado seja quitado.
// -- Visualizar - Mostra o valor disponível/utilizado do limite da conta 
//          juntamente com limite de cheque especial definido na criação da conta

