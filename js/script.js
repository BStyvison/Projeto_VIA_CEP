const cepInput = document.querySelector('#cep')


//validate CEP input
cepInput.addEventListener('keypress', filterNumbers)

function filterNumbers(event) {
    const onlyNumbers = /[0-9]/
    const key = String.fromCharCode(event.keyCode)

    if(!onlyNumbers.test(key)) {
        event.preventDefault()
        return
    }

}
