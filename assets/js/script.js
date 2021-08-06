const gera = document.querySelector('.btn-gera');
const display = document.querySelector('.display');
const inputbx = document.querySelector('.inputbx');
const btnValida = document.querySelector('.btn')
gera.addEventListener('click', (e) => {
    const el = e.target;
    e.preventDefault();
    function CriaCPF(numeroParcial){
        Object.defineProperty(this, 'numero',{
            get: function(){
                numeroParcial = [];
                let cont = 9;
    
                for(let i = 0; i < cont; i++){
                let cpfParcial = this.gerador();
                numeroParcial.push(cpfParcial);
                }
                return numeroParcial;
            }        
        })    
    }
    CriaCPF.prototype.gerador = function(min = 0, max = 9){
        return Math.floor(Math.random() * (max - min) + min);
    }
    CriaCPF.prototype.validador = function(){
        const num = this.numero;
        const digito1 = this.geraCpf(num);
        num.push(digito1)
        const digito2 = this.geraCpf(num);
        num.push(digito2)   
        return String(num).replace(/\D+/g,'');
    }
    CriaCPF.prototype.geraCpf = function(digitos){
        const cpfTotal = Array.from(digitos);
        let regressivo = cpfTotal.length + 1;
        let total = cpfTotal.reduce((ac,val) => {
            ac += (regressivo * Number(val));
            regressivo--;
            return ac;
        },0);
        const digito = (11 - (total % 11));
        return digito > 9 ? '0' : String(digito);
    }
    const numero = new CriaCPF('');
    console.log(numero.validador());
    function removeNumero(){
        display.innerHTML = ``
    }
    
    if(numero.validador()){
        removeNumero();
        display.innerHTML += `${numero.validador()}`
    }
});
btnValida.addEventListener('click',(e) =>{
    // const el = e.target;
    // el.preventDefault();
    

    function ValidaCPF(cpfNumero){
        Object.defineProperty(this, 'cpfLimpo',{
            enumerable:true,
            get:function(){
                return cpfNumero.replace(/\D+/g,'');
            }
        })
    }
    ValidaCPF.prototype.valida = function(){
        if(typeof this.cpfLimpo === 'undefined') return false;
        if(this.cpfLimpo.length !== 11) return false;
        const novoCpf = this.cpfLimpo.slice(0,-2);
        const digito1 = this.conta(novoCpf);
        const digito2 = this.conta(novoCpf + digito1);
        const newCPF = novoCpf + digito1 + digito2;
        return this.cpfLimpo === newCPF
    }
    ValidaCPF.prototype.conta = function(cpfParcial){
        const cpfArray = Array.from(cpfParcial);
        let regressivo = cpfParcial.length + 1;
        let total = cpfArray.reduce((ac,val) => {
            ac += (regressivo * Number(val));
            regressivo--;
            return ac;
        }, 0);
        const digito = 11 - (total % 11);
        return digito > 9 ? '0': String(digito);
    }
    const number = inputbx.value;
    const cpfNumber = new ValidaCPF(number);
    console.log(cpfNumber.valida());
    console.log(cpfNumber);
    if(cpfNumber.valida()){
        inputbx.style.backgroundColor = 'green';
    }else{
        inputbx.style.backgroundColor = 'red';
    }
})
