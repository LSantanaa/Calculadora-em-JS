let display = document.querySelector('.display')
let calc = document.querySelectorAll('.calc')
let raiz = document.querySelector('#raiz')
let numbers = document.querySelectorAll('.number')
let porcentagem = document.querySelector('#porcentagem')
let zero = document.querySelector('.zero')

let liberaVirgula = false
let igual = false;

function liberaZero(){
  zero.removeAttribute('disabled')
}

function blokZero(){
  zero.setAttribute('disabled', 'disabled')
}
blokZero()

function disablePercent(){
  
  if(display.value.length > 0 && igual == false)
  porcentagem.setAttribute('disabled', 'disabled')
}

porcentagem.addEventListener('click', disablePercent)

function liberaPercent(){
  porcentagem.removeAttribute('disabled')
}

function disableRaiz(){
  raiz.setAttribute('disabled', 'disabled')
}
numbers.forEach(buttonNumber=>{
  buttonNumber.addEventListener('click', disableRaiz)
})

function updateVirgula(){
  liberaVirgula = true;
}

calc.forEach((operation)=>{
  operation.addEventListener('click', updateVirgula)
  
})

function disableButtons(){
  calc.forEach(operation =>{
    operation.setAttribute('disabled', 'disabled')
  })
}

raiz.addEventListener('click', disableButtons)

function liberaButtons(){
  calc.forEach(operation =>{
    operation.removeAttribute('disabled')
  })
}


function action(type, value){
  let last = display.value.slice(-1);

  if (type === 'clear'){
    display.value = ''
    liberaButtons();
    blokZero();
    igual =false
  }
  if(type === 'backspace'){
   let result = display.value
   let result2 = result.substring(0, result.length -1)
   display.value = result2
   if(!display.value.includes('%')){
    liberaPercent()
   }
   if(display.value.length === 0){
    liberaButtons()
    blokZero()
    igual= false
   }
 }
  if(type === 'calc'){
    disablePercent()
    blokZero()
    if(igual === true && value === '√'){
      display.value = '';
      igual = false
    }
    igual = false
    if(display.value.length>0){
      if(!(last === '-' || last === '+' || last === ',' || last === '^' ||last === '×' || last === '÷' || last === '%'))
        display.value += value;
      if(last === '-' || last === '+' || last === ',' || last === '^' ||last === '×' || last === '÷' || last === '%'){
       let trocaOperacao = display.value;
       let trocaOperacao2 = trocaOperacao.substring(0, trocaOperacao.length -1)
       display.value = trocaOperacao2+value
        
      }
    }else if(value === '-'){
      display.value += value;
    }else if(value=== '√'){
      display.value += value;
    }
  }
  if(type === 'number'){
    if(igual === true){
      display.value ='';
      igual = false
    } 
    display.value += value
    liberaZero()
  }
  if(type === 'decimal'){
    if(igual === true){
      display.value ='';
      igual = false
    }
    if(liberaVirgula == false){
      if(last != ',' && !display.value.includes(',') && last != '-'){
        if(display.value.length > 0){
          display.value += value
          liberaZero()
        }else{
          display.value += '0,'
          liberaZero()
        }
      }
    }
    if(liberaVirgula === true){
      if(last === '-' || last === '+' || last === '^' ||last === '×' || last === '÷'){
        display.value += '0,'
        liberaZero()
        liberaVirgula = false;
      }else{ 
        display.value += value
        liberaZero()
        liberaVirgula = false;
      }
    }
  }
  if(type === '='){
    if(display.value.length>0 && last != '÷' && last != '×' && last != '-' && last != ',' && last != '√' && last != '+'){
      let result = display.value.split('.').join('').replace(/,/g,'.').replace(/\^/g, '**').replace(/÷/g, '/').replace(/×/g, '*').replace('√', '').replace('%', '/ 100 *')
      if(display.value.includes('√')){
        result = eval(Math.sqrt(result));
      }
      if(display.value.slice(-1)==='%'){
        result = result.replace('*', '')
      }
      display.value = eval(result).toLocaleString('pt-BR')
      liberaButtons()
      blokZero()
      igual =true
    } 
  }
}

const mapaTeclado={
  '0'         : 'tecla0',
  '1'         : 'tecla1',
  '2'         : 'tecla2',
  '3'         : 'tecla3',
  '4'         : 'tecla4',
  '5'         : 'tecla5',
  '6'         : 'tecla6',
  '7'         : 'tecla7',
  '8'         : 'tecla8',
  '9'         : 'tecla9',
  '/'         : 'operadorDividir',
  '*'         : 'operadorMultiplicar',
  '-'         : 'operadorSubtrair',
  '+'         : 'operadorSomar',
  '='         : 'igual',
  'Enter'     : 'igual',
  'Backspace' : 'backspace',
  'c'         : 'limparDisplay',
  ','         : 'decimal'
}

const mapearTeclado = (evento)=>{
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if(teclaPermitida()) {
    document.getElementById(mapaTeclado[tecla]).click();
    document.getElementById(mapaTeclado[tecla]).classList.add('ativo')
    }
    
}

document.addEventListener('keydown', mapearTeclado);
document.addEventListener('keyup', (event)=>{
  const tecla = event.key
  const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if(teclaPermitida()) {
    document.getElementById(mapaTeclado[tecla]).classList.remove('ativo')
    }
})