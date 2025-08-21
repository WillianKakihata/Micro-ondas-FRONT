import type { ProgramasType } from "../../types/ProgramasType";
import ProgramaItem from "./ProgramaItem";

interface Props {
  programas: ProgramasType[];
  onSelecionar: (programa: ProgramasType) => void;
}

const ProgramasList = ({ programas, onSelecionar }: Props) => {
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Programas de Aquecimento</h2>
      <div className="max-h-[400px] overflow-y-auto">
        {programas.map((p) => (
          <ProgramaItem key={p.id} programa={p} onSelecionar={onSelecionar} />
        ))}
      </div>
    </div>
  );
};

export default ProgramasList;