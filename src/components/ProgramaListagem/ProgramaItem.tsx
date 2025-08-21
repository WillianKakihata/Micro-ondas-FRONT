import type { ProgramasType } from "../../types/ProgramasType";

interface Props {
  programa: ProgramasType;
  onSelecionar: (programa: ProgramasType) => void;
}

const ProgramaItem = ({ programa, onSelecionar }: Props) => {
  return (
    <div
      className="p-3 mb-2 rounded-lg shadow cursor-pointer border border-zinc-300 hover:bg-zinc-100 transition"
      onClick={() => onSelecionar(programa)}
    >
      <h3 className="font-bold text-lg">{programa.nome}</h3>
      <p className="text-sm text-gray-600">Alimento: {programa.alimento}</p>
      <p className="text-sm">Tempo: {programa.tempo}s</p>
      <p className="text-sm">Potência: {programa.potencia}</p>
      {programa.instrucao && (
        <p className="text-xs text-gray-500 mt-1">{programa.instrucao}</p>
      )}
    </div>
  );
};

export default ProgramaItem;
