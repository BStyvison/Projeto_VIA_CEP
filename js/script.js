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

//Get address event
cepInput.addEventListener('keyup', verificarCep)

function verificarCep(event) {
    const inputValue = event.target.value

    if(inputValue.length === 8) {
        getAddress(inputValue)
    }
}

const getAddress = async (cep) => {
    cepInput.blur()
    try {
        const apiUrl = `https://viacep.com.br/ws/${cep}/json/` 

        const responseDados = await fetch(apiUrl)
        
        const dadosJson = await responseDados.json()
    
        console.log(dadosJson)
    }
    catch(erro) {
        console.log(Error(erro))

    }

}

// Show or hider loader

