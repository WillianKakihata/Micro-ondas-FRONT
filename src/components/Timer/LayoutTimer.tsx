import { useEffect, useState } from "react";

type TimerProps = {
    tempoInicial: number;
    ativo: boolean;
    onComplete: () => void;
};

const Timer = ({ tempoInicial, ativo, onComplete }: TimerProps) => {
    const [tempoRestante, setTempoRestante] = useState(tempoInicial);

    useEffect(() => {
        setTempoRestante(tempoInicial);
    }, [tempoInicial]);

    useEffect(() => {
        if (!ativo) return;
        if (tempoRestante <= 0) {
            const t = setTimeout(() => onComplete(), 0);
            return () => clearTimeout(t);
        }

        const timer = setInterval(() => {
            setTempoRestante(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [ativo, tempoRestante, onComplete]);


    const formatarTempo = (segundos: number) => {
        const min = Math.floor(segundos / 60);
        const sec = segundos % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    return <span>{formatarTempo(tempoRestante)}</span>;
};

export default Timer;