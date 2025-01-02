function transaction(event) {
    event.preventDefault();
    
    const account_number = document.getElementById("account_number").value;
    const pin_number = document.getElementById("pin_number").value;

    // Validate inputs
    if (!account_number || !pin_number) {
        alert("Enter all the details.");
        return;
    }

    if (!/^\d{10}$/.test(account_number)) {
        document.getElementById('msg1').innerHTML = "Account number must contain exactly 10 digits.";
        return;
    } else {
        document.getElementById('msg1').innerHTML = "";
    }

    if (!/^\d{4}$/.test(pin_number)) {
        document.getElementById('msg2').innerHTML = "Pin number must contain exactly 4 digits.";
        return;
    } else {
        document.getElementById('msg2').innerHTML = "";
    }

    // Send transaction request
    fetch('/transaction', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account_number, pin_number }),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`Server responded with status ${res.status}`);
        }
        return res.json();
    })
    .then((result) => {
        if (result.done) {
            if (Array.isArray(result.tra) && result.tra.length > 0) {
                const transactions = result.tra.map((doc) =>
                    `Account Number: ${doc.account_number}\nType: ${doc.type}\nAmount: ${doc.amount}\nDate: ${doc.date}`
                ).join('\n\n');
                alert(`Transaction History:\n\n${transactions}`);
            } else {
                alert("No transaction history found for this account.");
            }
            window.location.href = '/index.html';
        } else {
            alert("Failed to fetch transaction history. Please try again.");
        }
    })
    .catch((error) => {
        alert(`An error occurred while fetching transaction history: ${error.message}`);
    });
}

function clearFields() {
    document.getElementById("account_number").value = ""; 
    document.getElementById("pin_number").value = ""; 
    document.getElementById("msg1").innerHTML = ""; 
    document.getElementById("msg2").innerHTML = "";
}
