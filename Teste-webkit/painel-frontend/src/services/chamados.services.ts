import { promises } from "dns";
import { env } from "process";

export interface ICadastro {
    titulo: string,
    descricao: string,
    prioridade: string,
    status: number,
}

const url = env.API_URL;

function cadastrarChamado(cadastro: ICadastro) {
    const chamado = fetch(`http://smulatic037:3000/chamados/cadastrar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...cadastro })
    });
    return chamado;
}

function BuscarChamados(){
    const chamado = fetch(`http://smulatic037:3000/chamados/busca`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        return data;
    });
    return chamado;
}

export {
    cadastrarChamado,
    BuscarChamados
}