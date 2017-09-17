package caelumexeconta;

public class ContaCorrente extends Conta implements Tributavel{
    
    @Override
    public double calculaTributo(){
        return this.saldo * 0.1 + 42;
    }
    
   @Override
   public void atualiza(double taxa){
       this.saldo += this.saldo * taxa * 2 - this.calculaTributo();
   }
    

}
