function generate_pin(event)
{ 
    event.preventDefault();
    const account_number = document.getElementById("account_number").value;
    const pin_number = document.getElementById("pin_number").value;
    const confirm_pin = document.getElementById("pin_number_1").value;
    const account_name = document.getElementById("account_name").value;

    if (!account_number || !pin_number || !confirm_pin || !account_name) 
    {
        alert("...All Fields are Required...");
        return;
    }
    if (!/^\d{10}$/.test(account_number)) 
    {
        document.getElementById("msg1").innerHTML = "Account number must contain exactly 10 DIGITS only";
        return;
    }
    if (/^\d{10}$/.test(account_number)) { document.getElementById("msg1").innerHTML =""; }
    if (!/^\d{4}$/.test(pin_number)) 
    {
        document.getElementById('msg2').innerHTML="Pin number must contain exactly 4 DIGITS";
        return;
    }
    if (/^\d{4}$/.test(pin_number))  { document.getElementById('msg2').innerHTML=""; }
    if (!/^\d{4}$/.test(confirm_pin)) 
    {
        document.getElementById("msg3").innerHTML="Confirm Pin number must contain exactly 4 DIGITS";
        return;
    }
    if (/^\d{4}$/.test(confirm_pin)) { document.getElementById("msg3").innerHTML =""; }
    if (pin_number !== confirm_pin) {
        document.getElementById("msg3").innerHTML="New PIN and Confirm PIN should match";
        return; 
    }
    fetch('/generate_pin',
    {
        method:"POST",
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify({account_name , account_number,pin_number})
    }
    )
    .then(response => response.json())
    .then(result => 
        {
            alert(result.msg); 
            if (result.done) { window.location.href='/index.html'}
        })
    .catch(error => { alert("Error:", error); });
    clear_fields();
}


function clear_fields()
{
    document.getElementById("msg1").innerHTML="";
    document.getElementById("msg2").innerHTML="";
    document.getElementById("msg3").innerHTML="";
    account_name.value="";
    account_number.value="";
    pin_number.value="";
    document.getElementById('pin_number_1').value="";
}