'use strict';

// Код валидации формы
function validateForm(obj)
{
	let formClass = function(target, add, remove) {
		if (target.classList.contains(remove))
			target.classList.remove(remove);
		target.classList.add(add);
	};
	let check_input = function(input) {
		if ("required" in input.dataset && input.value == "")
			return (0);
		if (input.dataset.validator == "letters")
			for (let i = 0; i < input.value.length; i++)
				if (!(input.value[i] >= "a" && input.value[i] <= "z") &&
				!(input.value[i] >= "A" && input.value[i] <= "Z") &&
				!(input.value[i] >= "а" && input.value[i] <= "я") &&
				!(input.value[i] >= "А" && input.value[i] <= "Я"))
				return (0);
		if (input.dataset.validator == "number")
		{
			if ((input.value.split(/^-?\d{1,}$/))[0] != "")
				return (0);
			let num = Number.parseInt(input.value);
			if ("validatorMin" in input.dataset)
				if (num < input.dataset.validatorMin)
					return (0);
			if ("validatorMax" in input.dataset)
				if (num > input.dataset.validatorMax)
					return (0);
		}
		if (input.dataset.validator == "regexp")
		{
			let reg = new RegExp(input.dataset.validatorPattern);
			if ((input.value.split(reg))[0] != "")
				return (0);
		}
		return (1);
	};
	let form = document.getElementById(obj.formId);
	let inputsList = Array.from(form.querySelectorAll('input'));
	form.addEventListener('submit', function(event) {
		event.preventDefault();
		let valid = true;
		inputsList.forEach(function(item) {
			if (!check_input(item))
			{
				item.classList.add(obj.inputErrorClass);
				valid = false;
			}
		});
		if (valid)
			formClass(event.target, obj.formValidClass, obj.formInvalidClass);
		else
			formClass(event.target, obj.formInvalidClass, obj.formValidClass);
	});
	form.addEventListener("focus", function(event) {
		if (event.target.tagName === "INPUT") {
			event.target.classList.remove(obj.inputErrorClass);
		}
	}, true);
	form.addEventListener("blur", function(event) {
		if (event.target.tagName === "INPUT") {
			if (!check_input(event.target))
				event.target.classList.add(obj.inputErrorClass);
		}
	}, true);
}