function transaction(event) {
    event.preventDefault();
    const account_number = document.getElementById("account_number").value;
    const pin_number = document.getElementById("pin_number").value;
    if (!account_number || !pin_number) {
        alert("Enter All The Details...");
        return;
    }
    if (!/^\d{10}$/.test(account_number)) {
        document.getElementById('msg1').innerHTML = "Account number must contain exactly 10 DIGITS only";
        return;
    } 
    else 
    {
        document.getElementById('msg1').innerHTML = "";
    }
    if (!/^\d{4}$/.test(pin_number)) {
        document.getElementById('msg2').innerHTML = "Pin number must contain exactly 4 DIGITS";
        return;
    } 
    else 
    {
        document.getElementById('msg2').innerHTML = "";
    }
    fetch('/transaction', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account_number, pin_number })
    })
    .then((res) => res.json())
    .then((result) => {
        if (result.done) { 
            const transactions = result.tra.map((doc) => 
                ` ----->  Account Number: ${doc.account_number}, Type: ${doc.type}, Amount: ${doc.amount}, Date: ${doc.date}`).join('\n')
            alert(`Transaction History:\n \n ${transactions}`);
            window.location.href = '/index.html';
        } 
        else 
        {
            alert("Failed to fetch transaction history.");
        }
    })
    .catch((error) => {
        alert("An error occurred while fetching transaction history.",error);
    });
}

function clearFields() {
    document.getElementById("account_number").value = ""; 
    document.getElementById("pin_number").value = ""; 
    document.getElementById("msg2").innerHTML = ""; 
    document.getElementById("msg1").innerHTML = "";
}
