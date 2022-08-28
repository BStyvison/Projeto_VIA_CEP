const cepInput = document.querySelector('#cep')
const addressInput = document.querySelector("#endereco");
const cityInput = document.querySelector("#cidade");
const stateInput = document.querySelector('#estado')
const districtInput = document.querySelector('#bairro')


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
    
        
        addressInput.value = dadosJson.logradouro
        districtInput.value = dadosJson.bairro
        cityInput.value = dadosJson.localidade
        stateInput.value = dadosJson.uf
        

    }
    catch(erro) {
        console.log(Error(erro))

    }

}

// Show or hider loader

