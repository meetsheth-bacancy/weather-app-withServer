console.log('Client side javascript');


const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const output = document.querySelector('#output');
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault(); // stops automatic refreshing of the page  whenever form is submitted

    const location = input.value;
    console.log(location);


    // similiar to 'request' module we used to reuest a web server in node js. But this 'fetch' method is for client side js
    fetch('http://localhost:3000/weather?location='+location+'').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
        output.textContent=data.temperature;
    });
});

});

