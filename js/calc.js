let CreditCalc = function ($) {
    'use strict';
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    let inputs = $('.number-input');



    inputs.on('change', function () {

    })
    let termPlus = $('.date_plus'),
        termMinus = $('.date_minus'),
        summPlus = $('.sum_plus'),
        summMinus = $('.sum_minus'),
        getSumm = $('.get__sum');

    let handle = function () {
        summPlus.on('click', function (event) {
            let summFormat = + $('#summ').val().replace(/\s/g, '');
            if (summFormat !== 10000) {
                summFormat += 500;
                $('#summ').val(summFormat)
            }
            slideUpdate();
            calc();
        })

        summMinus.on('click', function (event) {
            let summFormat = + $('#summ').val().replace(/\s/g, '');
            if (summFormat !== 0) {
                summFormat -= 500;
                $('#summ').val(summFormat)
                getSumm.html(summFormat)
            }
            slideUpdate();
            calc();
        })

        termPlus.on('click', function (event) {
            let term = + $('#term').val().replace(/\s/g, '');
            if (term !== 30) {
                term += 1;
                $('#term').val(term)
            }
            slideUpdate();
            calc();
        })
        termMinus.on('click', function (event) {
            let term = + $('#term').val().replace(/\s/g, '');
            if (term !== 1) {
                term--;
                $('#term').val(term)
            }
            slideUpdate();
            calc();
        })
    };
    let calc = function () {
        let summFormat = $('#summ').val(),//Сумма отформатированная
            summ = Number.parseInt( //Сумма без форматирования
                summFormat.replace(/\s/g, '')
            ),
            term = Number.parseInt($('#term').val()),//срок
            commission = 0,//Комиссия
            persent = 0.01,//думаю, можно менять в зависмости от срок займа
            cresitSumm = summ + (summ / 100 * persent) * term,//Сумма возврата без форматирования
            cresitSummFormat = numberWithCommas(Math.round(cresitSumm));//Сумма возврата отформатированная
        persent = numberWithCommas(persent);

        $('.get__sum').text(summFormat);
        $('.return__sum').text(cresitSummFormat);
        $('.rate__sum').text(persent + '%');

        let left__pos = term * 0.7 + '%';
        let persent__block = $('.info__percent');
        let day__block = $('.quantity__center');
        let day__inp = term * 0.3;
        let day__inner = (Math.round(day__inp));
        persent__block.css({
            left: left__pos,
        })
        day__block.css({
            left: left__pos,
        })
        if (day__inner == 3 || day__inner == 4) {
            day__block.html(day__inner + ' дня');
        } else {
            day__block.html(day__inner + ' дней');
        }
    }
    let slide = function (obj) {
        let input = obj.find('input'),
            k = parseInt(input.attr('data-k')),
            min = parseFloat(input.attr('data-min')) * k,
            max = parseFloat(input.attr('data-max')) * k,
            step = parseFloat(input.attr('data-step')) * k,
            val = parseFloat(input.val()) * k,
            minEvemt = input.attr('data-min-event');

        input.val(numberWithCommas(input.val()));
        input.keyup(function () {
            var val = $(this).val();
            val = val.replace(/\s+/g, "");
            val = val.replace(/,/g, ".");

            $(this).val(numberWithCommas(val));
            if (val == '')
                val = 0;
            else
                val = parseFloat(val) * k;

            $(this).closest('.range').find('.slider').slider({ value: val });
        });
        obj.find(".slider").slider({
            min: min,
            max: max,
            step: step,
            range: "min",
            value: val,
            slide: function (event, ui) {
                var k = parseInt(input.attr('data-k'));
                var val = parseFloat(ui.value) / k;
                if (minEvemt && ui.value < minEvemt)
                    return false;
                if (val)
                    input.val(numberWithCommas(val));
            },
            change: function (event, ui) {
                calc();
            }
        });

    }
    let slideUpdate = function () {
        $('.range').each(function (obj, i) {
            let $slider = $(this).find(".slider"),
                val = $(this).find("input").val();
            $slider.slider('value', val);
        });
    }
    let initialisation = function () {
        $('.range').each(function (obj, i) {
            slide($(this));
        });
        handle();
        calc();
    };
    return {
        init: function () {
            initialisation();
        },
    }
}(jQuery);
jQuery(document).ready(function ($) {
    CreditCalc.init();
});


function setInputFilter(textbox, inputFilter, val) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (textbox.value > val) {
                this.value = val;
            } else {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    this.value = val;
                }
            }
        });
    });
}

setInputFilter(document.getElementById("summ"), function (value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
}, 10000);
setInputFilter(document.getElementById("term"), function (value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
}, 30);