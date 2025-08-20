export class MicroOndasValidator {

  private readonly TEMPO_MIN = 1;
  private readonly TEMPO_MAX = 120;
  private readonly POTENCIA_MIN = 1;
  private readonly POTENCIA_MAX = 10;
  private readonly POTENCIA_PADRAO = 10;

  public validarTempo(tempo: number): boolean {
    return typeof tempo === 'number' && tempo >= this.TEMPO_MIN && tempo <= this.TEMPO_MAX;
  }

  public validarPotencia(potencia?: number): boolean {
    if (!potencia || potencia === 0) return true;
    return typeof potencia === 'number' && potencia >= this.POTENCIA_MIN && potencia <= this.POTENCIA_MAX;
  }

  public tempoParaString(tempo: number): string {
    if (tempo < 60) return `${tempo}s`;
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
  }

  public potenciaPadrao(): number {
    return this.POTENCIA_PADRAO;
  }

  public validarAquecimento(tempo?: number, potencia?: number): { valido: boolean; mensagem?: string } {
    if (tempo !== undefined && !this.validarTempo(tempo)) {
      return { valido: false, mensagem: `Tempo inválido. Deve estar entre ${this.TEMPO_MIN} e ${this.TEMPO_MAX} segundos.` };
    }
    if (!this.validarPotencia(potencia)) {
      return { valido: false, mensagem: `Potência inválida. Deve estar entre ${this.POTENCIA_MIN} e ${this.POTENCIA_MAX}.` };
    }
    return { valido: true };
  }

}
