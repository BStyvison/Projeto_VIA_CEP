const cepInput = document.querySelector('#cep')
const addressInput = document.querySelector("#endereco");
const cityInput = document.querySelector("#cidade");
const stateInput = document.querySelector('#estado')
const districtInput = document.querySelector('#bairro')
const hidderDisplay = document.querySelectorAll('[data-display]')
const buttonSave = document.querySelector('#cep__btn')


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
    const target = event.target

    if(!target.checkValidity()) {
        target.classList.add('invalido')
        target.nextElementSibling.innerText = target.validationMessage;

    }else {
        target.classList.remove('invalido');
      }

    if(inputValue.length === 8) {
        getAddress(inputValue)
    }
}

const getAddress = async (cep) => {
    toggleLoader()
    cepInput.blur()
    try {
        const apiUrl = `https://viacep.com.br/ws/${cep}/json/`
        const responseDados = await fetch(apiUrl)
        const dadosJson = await responseDados.json()

        console.log(dadosJson.logradouro)

        setTimeout(() => {
            if(dadosJson.logradouro === undefined) {
                addressInput.value = ''
                districtInput.value = ''
                cityInput.value = ''
                stateInput.value = ''
            } else {
                hidderDisplay.forEach(item => {
                    item.removeAttribute('data-display')
                }) 
                addressInput.value = dadosJson.logradouro
                districtInput.value = dadosJson.bairro
                cityInput.value = dadosJson.localidade
                stateInput.value = dadosJson.uf
                buttonSave.removeAttribute('disabled')
            }
            toggleLoader()
        }, 500)

        

    }
    catch(erro) {
        console.log(Error(erro))
        setTimeout(() => {
            toggleLoader()
        }, 500)

    }

}

// loader

const toggleLoader = () => {
    const loaderElement = document.querySelector('.form__cep__loader')
    loaderElement.classList.toggle('hide')
}




