class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
    this._inputList = formElement.querySelectorAll(config.inputSelector);
    this._saveBtnElement = formElement.querySelector(config.saveBtnElement);
  }


  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage.split('.')[0];
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement);
    } else {
      this._showInputError(inputElement, errorElement);
    }
  }

  _toggleButtonState() {
      if (this._formElement.checkValidity()) {
        this._saveBtnElement.disabled = false;
        this._saveBtnElement.classList.remove(this._config.inactiveButtonClass);
      } else {
        this._saveBtnElement.disabled = 'disabled';
        this._saveBtnElement.classList.add(this._config.inactiveButtonClass);
      }
  }
  

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement);
      });
  
      inputElement.addEventListener('change', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement);
      });
  
      inputElement.addEventListener('paste', () => {
        setTimeout(() => {
          navigator.clipboard.readText()
            .then((text) => {
              inputElement.value = text;
              this._checkInputValidity(inputElement);
              this._toggleButtonState(inputElement); // Добавляем вызов _toggleButtonState после вставки
            })
            .catch((error) => {
              console.error('Failed to read clipboard:', error);
            });
        }, 10);
      });
    });
  }

  resetValidationState() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement, inputElement.nextElementSibling);
    });

    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }
}

export default FormValidator;
