

window.addEventListener('load',()=>{
    let placeObj = document.querySelector('input')
    let formObj = document.querySelector('form')
    placeObj.focus();
    formObj.addEventListener('submit',(e)=>{
        e.preventDefault();
        const loc = placeObj.value;
        const url = "http://localhost:3000/weather?address="+loc
        location.assign(url);
    })
})




