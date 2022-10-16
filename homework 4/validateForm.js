"use strict";

      window.onload = () => {
        const myForm = document.getElementById("myForm");
        myForm.addEventListener("submit", (e) => {
          let valid = new Validator("myForm");
          if (!valid.valid) {
            e.preventDefault();
          }
        });
      };

      class Validator {
        constructor(form) {
          this.patterns = {
            yourName: /^[a-zа-яё]+$/i,
            mobile: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i,
          };
          this.errors = {
            yourName: "в имени допускаются только буквы",
            mobile:
              "введите корректный номер телефона по шаблону +7(123)123-1234",
            email:
              "введите корректный адрес электронной почты по шаблону mail@mail.ru",
          };
          this.errorClass = "errorMessage";
          this.form = form;
          this.valid = false;
          this._ValidateForm();
        }
        validate(regExp, Value) {
          regExp.test(value);
        }

        _ValidateForm() {
          let errors = [
            ...document
              .getElementById(this.form)
              .querySelectorAll(`.${this.errorClass}`),
          ];
          for (let error of errors) {
            error.remove();
          }
          let formFields = [
            ...document.getElementById(this.form).getElementsByTagName("input"),
          ];
          for (let field of formFields) {
            this._validate(field);
          }
          if (
            ![
              ...document
                .getElementById(this.form)
                .querySelectorAll(".warning"),
            ].length
          ) {
            this.valid = true;
          }
        }
        _validate(field) {
          if (this.patterns[field.name]) {
            if (!this.patterns[field.name].test(field.value)) {
              field.classList.add("warning");
              this._addErrorMsg(field);
              this._watchField(field);
            }
          }
        }

        _addErrorMsg(field) {
          let error = `<span class="${this.errorClass}">${
            this.errors[field.name]
          }</span>`;
          field.parentNode.insertAdjacentHTML("beforeend", error);
        }

        _watchField(field) {
          field.addEventListener("input", () => {
            let error = field.parentNode.querySelector(`.${this.errorClass}`);
            if (this.patterns[field.name].test(field.value)) {
              field.classList.remove("warning");
              field.classList.add("valid");
              if (error) {
                error.remove();
              }
            } else {
              field.classList.remove("valid");
              field.classList.add("warning");
              if (!error) {
                this._addErrorMsg(field);
              }
            }
          });
        }
      }