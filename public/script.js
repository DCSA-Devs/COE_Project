document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    name = document.getElementById('name')
    email = document.getElementById('email')
    dept = document.getElementById('dept')
    pass = document.getElementById('pass')
    console.log(name.value);
    name.textContent = ''
    pass.textContent = ''
    dept.textContent = ''
    email.textContent = ''

})