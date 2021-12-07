const bill = document.getElementById('bill-amount');
const people = document.getElementById('people-num');
const tip = document.querySelectorAll('.tip-btn');
const tipCustom = document.getElementById('custom-btn');
const reset = document.querySelector('.reset-btn');

bill.addEventListener('input', setBillValue);
people.addEventListener('input', setPeopleNum);
tip.forEach(function (btn) {
    btn.addEventListener('click', handleClick);
});
tipCustom.addEventListener('input', setCustomTip);
reset.addEventListener('click', resetClick);

let billValue = 0.0;
let peopleNum = 1;
let tipValue = 0.15;

//do not let type letters
function validateFloat(s){
    var regex = /^[0-9]*\.?[0-9]*$/;
    return s.match(regex);
}

function validateInt(s){
    var regex = /^[0-9]*$/;
    return s.match(regex);
}


function setBillValue(){
    if(bill.value.includes(',')){
        bill.value = bill.value.replace(',','.');
    }
    if(!validateFloat(bill.value)){
        bill.value = bill.value.substring(0, bill.value.length-1);
    }
    billValue = parseFloat(bill.value);
    
    reset.removeAttribute("disabled");
    calculateTipValue();
}

function handleClick(event){
    tip.forEach(btn => {
        btn.classList.remove('active-btn');
        
        if(event.target.innerHTML == btn.innerHTML){
            btn.classList.add('active-btn');
            tipValue = parseFloat(btn.innerHTML)*0.01;
            
        }
    });

    calculateTipValue();
}

function setCustomTip() {
    if(!validateInt(tipCustom.value)){
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1);
    }
   tipValue = parseFloat(tipCustom.value)*0.01;

   calculateTipValue();
}

function setPeopleNum(){
    if(!validateInt(people.value)){
        people.value = people.value.substring(0, people.value.length - 1);
    }
    peopleNum = parseFloat(people.value);
    calculateTipValue();
}

function calculateTipValue() {
    totalPerson = (billValue / peopleNum)*tipValue;
    document.getElementById('result-person').innerHTML = totalPerson.toFixed(2); 
    tipAmount =  billValue/peopleNum + totalPerson;
    document.getElementById('result-total').innerHTML = tipAmount.toFixed(2);
}

function resetClick(){
    bill.value = null;
    setBillValue();
    people.value = null;
    //15 % as default
    tip[2].click();
    tipCustom.value = null;
    
}   
