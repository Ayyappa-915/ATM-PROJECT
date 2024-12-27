function change_pin(event) 
{
    event.preventDefault();
    const account_name = document.getElementById("account_name").value;
    const account_number = document.getElementById("account_number").value;
    const old_pin = document.getElementById("old_pin_number").value;
    const new_pin = document.getElementById("new_pin_number").value;
    const confirm_pin = document.getElementById("new_pin_number_1").value;
    
    if (!account_number || !old_pin || !new_pin || !confirm_pin || !account_name) 
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
    if (!/^\d{4}$/.test(old_pin)) {
        document.getElementById("msg2").innerHTML="Old Pin number must contain exactly 4 DIGITS";
        return; 
    }
    if (/^\d{10}$/.test(old_pin)) { document.getElementById("msg1").innerHTML =""; }
    if (!/^\d{4}$/.test(new_pin)) {
        document.getElementById("msg3").innerHTML="New Pin number must contain exactly 4 DIGITS";
        return;
    }
    if (/^\d{10}$/.test(new_pin)) { document.getElementById("msg3").innerHTML =""; }
    if (!/^\d{4}$/.test(confirm_pin)) 
    {
        document.getElementById("msg4").innerHTML="Confirm Pin number must contain exactly 4 DIGITS";
        return;
    }
    if (/^\d{10}$/.test(confirm_pin)) { document.getElementById("msg4").innerHTML =""; }
    if (new_pin !== confirm_pin) {
        document.getElementById("msg4").innerHTML="New PIN and Confirm PIN should match";
        return; 
    }
    fetch('/change_pin', 
    {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account_number, old_pin, new_pin })
    })
    .then((res) =>res.json())
    .then((result) =>{
        alert(result.msg);
        if(result.done) {window.location.href='/index.html';}
    })
}

function clear_fields()
{
    document.getElementById("msg1").innerHTML="";
    document.getElementById("msg2").innerHTML="";
    document.getElementById("msg3").innerHTML="";
    document.getElementById("msg4").innerHTML="";
    account_name.value="";
    account_number.value="";
    new_pin.value='';
    old_pin.value="";
    confirm_pin="";
}