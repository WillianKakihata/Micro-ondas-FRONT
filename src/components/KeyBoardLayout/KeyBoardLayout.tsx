import KeyboardBox from "./components/KeyboardBox"

interface Props {
  onNumberClick: (num: number) => void
  onDelete: () => void
  onClear: () => void
  onClose: () => void
}

const PageLayoutKeyBoard = ({ onNumberClick, onDelete, onClear, onClose }: Props) => {
  return (
    <KeyboardBox>
      <div className="flex flex-col gap-4">
        {[ [7,8,9], [4,5,6], [1,2,3] ].map((row, i) => (
          <div key={i} className="flex flex-row gap-6 justify-center">
            {row.map((n) => (
              <button
                key={n}
                type="button" 
                className="text-[40px] lg:text-[50px] text-white"
                onClick={() => onNumberClick(n)}
              >
                {n}
              </button>
            ))}
          </div>
        ))}
        <div className="flex flex-row gap-6 justify-center">
          <button type="button" className="text-[40px] lg:text-[50px] text-white" onClick={() => onNumberClick(0)}>0</button>
          <button type="button" className="text-[40px] lg:text-[50px] text-white" onClick={onDelete}>⌫</button>
          <button type="button" className="text-[40px] lg:text-[50px] text-white" onClick={onClear}>C</button>
        </div>
        <div className="flex justify-center mt-2">
          <button
            type="button"
            className="text-[20px] text-white px-4 py-2 border border-white rounded-lg"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </KeyboardBox>
  )
}

export default PageLayoutKeyBoard
