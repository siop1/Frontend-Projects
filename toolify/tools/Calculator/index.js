let buttons = document.querySelectorAll('input[type="button"]');
value = ""
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.value != "AC" && button.value != "C" && button.value != "=" && document.getElementById('displayBox').value!="Ma Error") {
            value = value + button.value
            document.getElementById('displayBox').value = value;
        }
        if (button.value == "AC") {
            value="";
            document.getElementById('displayBox').value = value;
        }
        if (button.value == "C") {
            delete_last = document.getElementById('displayBox').value;
            if (delete_last != "Ma Error")
                value = delete_last.slice(0, -1);



            document.getElementById('displayBox').value = value;
        }
        if (button.value == "=") {
            try {
                let result = eval(value);
                if(result!=undefined){
                    document.getElementById('displayBox').value = result;
                value=result;
                }
            }
            catch {
                document.getElementById('displayBox').value = "Ma Error";
            }
        }

    })
});