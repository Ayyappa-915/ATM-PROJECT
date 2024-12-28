
function registration(event)
{
    event.preventDefault();
    const account_name=document.getElementById("account_name").value;
    const account_number=document.getElementById("account_number").value;
    const phone_number=document.getElementById("phone_number").value;

    if(!account_name || !account_number || !phone_number)
    {
        alert("...All Fields are Required...");
        return ;
    }
    if (!/^\d{10}$/.test(account_number))
    {
        document.getElementById("msg1").innerHTML="Account Number must contain exactly 10 digits";
        return ;
    }
    if (/^\d{10}$/.test(account_number)) { document.getElementById("msg1").innerHTML =""; }
    if (!/^\d{10}$/.test(phone_number))
    {
        document.getElementById("msg2").innerHTML="Phone Number must contain exactly 10 digits";
        return ;
    }
    if (/^\d{10}$/.test(phone_number)) { document.getElementById("msg2").innerHTML =""; }

    fetch('/registration',
        {
            method:"POST",
            headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify({account_name,account_number,phone_number})
        }
    )
    .then(response => response.json())
    .then(result => 
        { 
            alert(result.msg); 
            if(result.done) { window.location.href='/index.html'}
        })
    .catch(error => { alert("Error",error);});
    clear_fields()
}

function clear_fields()
{
    account_name.value="";
    account_number.value="";
    phone_number.value="";
    document.getElementById("msg2").innerHTML ="";
    document.getElementById("msg1").innerHTML =""; 
}