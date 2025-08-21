import { useEffect, useState, useRef } from "react";

interface Props {
    tempo: number;
    potencia?: number;
    onComplete?: () => void;
}

const AquecimentoDisplay = ({ tempo, potencia = 10, onComplete }: Props) => {
    const [display, setDisplay] = useState<string>("");
    const [fontSize, setFontSize] = useState<number>(30);
    const containerRef = useRef<HTMLDivElement>(null);
    const segundosRef = useRef(tempo);

    const maxCharsPorLinha = 100;

    useEffect(() => {
        segundosRef.current = tempo;
        setDisplay("");

        const interval = setInterval(() => {
            if (segundosRef.current <= 0) {
                setDisplay((prev) => prev + "\n\n Aquecimento concluído!");
                clearInterval(interval);

                setTimeout(() => {
                    setDisplay("");
                    onComplete && onComplete();
                }, 5000);
                return;
            }

            setDisplay((prev) => {
                const linhas = prev.split("\n");
                const ultimaLinha = linhas[linhas.length - 1] || "";

                const novoSegmento = ".".repeat(potencia) + "\u00A0";
                const novaLinha = ultimaLinha.trimEnd() + novoSegmento;

                if (novaLinha.length > maxCharsPorLinha) {
                    return prev.trimEnd() + "\n" + novoSegmento + " ";
                } else {
                    return prev + novoSegmento + " ";
                }
            });

            segundosRef.current -= 1;
        }, 1000);

        return () => clearInterval(interval);
    }, [tempo, potencia, onComplete]);

    useEffect(() => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        const approxChars = display.length || 1;
        const newFontSize = Math.max(12, Math.floor(containerWidth / approxChars));
        setFontSize(newFontSize);
    }, [display]);

    return (
        <div
            ref={containerRef}
            className="bg-base300 p-4 rounded-md min-h-[150px] w-full flex items-center justify-center text-center"
            style={{ fontSize: `${fontSize}px`, whiteSpace: "pre" }}
        >
            {display}
        </div>
    );
};

export default AquecimentoDisplay;
