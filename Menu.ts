import rls  from "readline-sync";
import {colors} from "./src/util/Colors";
rls.setDefaultOptions({encoding:"utf8"})


export function main(){
    let opcao: number;
    

    const menu =`
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

  

    while(true){
        console.log( colors.bg.black,colors.fg.yellow);
        console.log( menu);
        console.log( colors.reset);

        process.stdout.write("Digite uma opção: ");
        opcao = rls.questionInt("");

        if(opcao === 0){
            console.log("\nBanco do Brazil com Z - O seu Futuro começa aqui!");
            sobre();
            process.exit(0);
        }

        switch (opcao) {
            case 1: console.log(colors.fg.whitestrong, `\nCriar Conta\n`,colors.reset);
                keyPress();
                break;
            case 2: console.log(colors.fg.whitestrong, `\nListar todas as Contas\n`,colors.reset);
                keyPress();
                break;
            case 3: console.log(colors.fg.whitestrong, `\nBuscar Conta por Numero\n`,colors.reset);
                keyPress();
                break;
            case 4: console.log(colors.fg.whitestrong, `\nAtualizar dados da Conta\n`,colors.reset);
                keyPress();
                break;
            case 5: console.log(colors.fg.whitestrong, `\nApagar Conta\n`,colors.reset);
                keyPress();
                break;
            case 6: console.log(colors.fg.whitestrong, `\nSacar\n`,colors.reset);
                keyPress();
                break;
            case 7: console.log(colors.fg.whitestrong, `\nDepositar\n`,colors.reset);
                keyPress();
                break;
            case 8: console.log(colors.fg.whitestrong, `\nTransferir valores entre Contas\n`,colors.reset);
                keyPress();
                break;
            case 9: console.log(colors.fg.whitestrong, `\nBuscar Conta por Titular\n`,colors.reset);
                keyPress();
                break;
        
            default:
                console.log(colors.fg.whitestrong, `\nOpcao invalida! \n`,colors.reset);
                keyPress();
                break;
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
        `)
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    rls.prompt();
}


main();

// const conta: Conta = new Conta(1, 123, 1, "Adriana", 10000);
    // conta.visualizar();
    // conta.sacar(10500);
    // conta.visualizar();
    // conta.depositar(5000);
    // conta.visualizar();