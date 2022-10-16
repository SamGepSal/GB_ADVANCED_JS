"use strict";

      const changeQuotesEl = document.querySelector(".changeQuotes");
      const changeOutsidesQuoteEl = document.querySelector(
        ".changeOutsidesQuote"
      );

      changeQuotesEl.addEventListener("click", () => {
        let text = document.querySelector(".text");
        if (changeQuotesEl.textContent.includes("двойные")) {
          text.innerHTML = text.innerHTML.replace(/'/g, '"');
          changeQuotesEl.textContent = changeQuotesEl.textContent.replace(
            "двойные",
            "одинарные"
          );
        } else {
          text.innerHTML = text.innerHTML.replace(/"/g, "'");
          changeQuotesEl.textContent = changeQuotesEl.textContent.replace(
            "одинарные",
            "двойные"
          );
        }
      });

      changeOutsidesQuoteEl.addEventListener("click", () => {
        let text = document.querySelector(".text");
        if (changeOutsidesQuoteEl.textContent.includes("внешние")) {
          text.innerHTML = text.innerHTML.replace(/\B'/g, '"');
          changeOutsidesQuoteEl.textContent =
            changeOutsidesQuoteEl.textContent.replace(
              "замени только внешние одинарные кавычки",
              "верни назад"
            );
        } else {
          text.innerHTML = text.innerHTML.replace(/\B"/g, "'");
          changeOutsidesQuoteEl.textContent =
            changeOutsidesQuoteEl.textContent.replace(
              "верни назад",
              "замени только внешние одинарные кавычки"
            );
        }
      });