import { useEffect, useRef, useState } from "react";

type TimerProps = {
  tempoInicial: number;
  execucao: boolean; // true = rodando, false = pausado
  onComplete: () => void;
};

const Timer = ({ tempoInicial, execucao, onComplete }: TimerProps) => {
  const [tempoRestante, setTempoRestante] = useState(tempoInicial);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Atualiza tempo inicial sempre que ele mudar
  useEffect(() => {
    setTempoRestante(tempoInicial);
  }, [tempoInicial]);

  useEffect(() => {
    // Limpa intervalo anterior
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (execucao && tempoRestante > 0) {
      intervalRef.current = setInterval(() => {
        setTempoRestante(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [execucao, onComplete, tempoRestante]);

  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return <span>{formatarTempo(tempoRestante)}</span>;
};

export default Timer;
