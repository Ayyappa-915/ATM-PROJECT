function transfer(event) {
    event.preventDefault();
    const rec_acc_no = document.getElementById("receiver_account_number").value;
    const sen_acc_no = document.getElementById("sender_account_number").value;
    const amount = document.getElementById("amount").value;
    const pin_number = document.getElementById("pin_number").value;
    if (!rec_acc_no || !sen_acc_no || !amount || !pin_number) {
        alert("All Fields are required...");
        return;
    }
    if (!/^\d{10}$/.test(rec_acc_no)) {
        document.getElementById('msg1').innerHTML = "Account Number must contain 10 digits only.";
        return;
    } else {
        document.getElementById('msg1').innerHTML = '';
    }
    if (!/^\d{10}$/.test(sen_acc_no)) {
        document.getElementById('msg2').innerHTML = "Account Number must contain 10 digits only.";
        return;
    } else {
        document.getElementById('msg2').innerHTML = '';
    }
    if (!/^\d{4}$/.test(pin_number)) {
        document.getElementById('msg3').innerHTML = "PIN must contain 4 digits only.";
        return;
    } else {
        document.getElementById('msg3').innerHTML = '';
    }
    fetch('/money_transfer', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({rec_acc_no,sen_acc_no,amount,pin_number}),
    })
    .then(response => response.json())
    .then((result)=>{
        alert(result.msg)
        if(result.done){window.location.href='/index.html'}
    })
    .catch(error => {
        alert("Error occurred during transfer: " + error.message);
    });
}

function clear_fields() {
    document.getElementById('sender_account_number').value = "";
    document.getElementById('receiver_account_number').value = "";
    document.getElementById('pin_number').value = "";
    document.getElementById('amount').value = '';
    document.getElementById('msg1').innerHTML = "";
    document.getElementById('msg2').innerHTML = "";
    document.getElementById('msg3').innerHTML = "";
}
