    
window.onload = () => {
    let totalAmount = localStorage.getItem('totalAmount');
    let totalAmountElement = document.querySelector('#total-amount');
    
   
    totalAmountElement.innerHTML = `Total Amount: Rs.${totalAmount}`;

};

function goToMainPage() {
    window.location.href = 'index.html'; 
}
