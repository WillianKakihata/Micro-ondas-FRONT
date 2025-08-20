import axios from "axios";
import type { ProgramasType } from "../types/ProgramasType";

export const useApi = () => ({
    criarProduto: async (nome:string, potencia: number, tempo: number) => {
        try {
            const response = await axios.post('http://localhost:5168/api/Programas/aquecimento', {
                nome: nome,
                potencia: potencia,
                tempo: tempo,
                execucao: true,
                status: 0
            });

            return response.data;
        } catch (error) {
            console.error("Erro ao criar programa:", error);
            throw error;
        }
    },

    iniciarAquecimento: async (potencia: number, tempo: number) => {
        try {
            const response = await axios.post('http://localhost:5168/api/Microondas/aquecimento', {
                potencia: potencia,
                tempo: tempo,
                execucao: true,
                status: 0
            });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Erro ao iniciar aquecimento:", error);
            throw error;
        }
    },

    

    acrescentarTempo: async (potencia: number, tempo: number,execucao: boolean, status: number) => {
        try {
            const response = await axios.post('http://localhost:5168/api/Microondas/acrescimoTempo', {
                potencia: potencia,
                tempo: tempo,
                execucao: true,
                status: 0
            });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Erro ao iniciar aquecimento:", error);
            throw error;
        }
    },

    pausar_desligar: async (potencia: number, tempo: number, execucao: boolean, status: number) => {
        try {
            const response = await axios.post('http://localhost:5168/api/Microondas/pausar-desligar', {
                potencia: potencia,
                tempo: tempo,
                execucao: execucao,
                status: status
            });

            return response.data;
        } catch (error) {
            console.error("Erro ao iniciar aquecimento:", error);
            throw error;
        }
    },

    iniciorapido: async () => {
        try {
            const response = await axios.post('http://localhost:5168/api/Microondas/iniciorapido');
            return response.data;
        } catch (error) {
            console.error("Erro ao iniciar aquecimento:", error);
            throw error;
        }
    },

    getProgramas: async (): Promise<ProgramasType[]> => {
        const response: ProgramasType[] = [
            { id: 1, nome: "Pipoca", alimento: "Milho", potencia: 0, tempo: 0, instrucao: "Observar estouros", stringAquecimento: ".", execucao: false, status: 0 },
            { id: 2, nome: "Leite", alimento: "Leite", potencia: 0, tempo: 0, instrucao: "Cuidado com fervura", stringAquecimento: "^", execucao: false, status: 0 },
            { id: 3, nome: "Carne", alimento: "Carne bovina", potencia: 0, tempo: 0, instrucao: "Virar na metade", stringAquecimento: "@", execucao: false, status: 0 },
            { id: 4, nome: "Frango", alimento: "Frango", potencia: 0, tempo: 0, instrucao: "Virar na metade", stringAquecimento: "*", execucao: false, status: 0 },
            { id: 5, nome: "Feijão", alimento: "Feijão congelado", potencia: 0, tempo: 0, instrucao: "Destampado, cuidado com plástico", stringAquecimento: "eita", execucao: false, status: 0 }
        ];

        await new Promise(resolve => setTimeout(resolve, 500));
        return response;
    },

    startAquecimento: async (tempo: number, potencia: number) => {
        let response;
        const random = Math.floor(Math.random() * 10);
        if (random > 2) {
            response = { status: 200, message: "Aquecimento iniciado", tempo, potencia };
        } else {
            response = { status: 500, message: "Erro ao iniciar aquecimento" };
        }
        await new Promise(resolve => setTimeout(resolve, 300));
        return response;
    },

    salvarProgramaCustomizado: async (programa: ProgramasType) => {
        let response;
        const random = Math.floor(Math.random() * 10);
        if (random > 2) {
            response = { status: 201, programaId: `mock-${Math.random() * 50000}` };
        } else {
            response = { status: 500, message: "Erro ao salvar programa" };
        }
        await new Promise(resolve => setTimeout(resolve, 300));
        return response;
    }
});
