$(document).ready(function() {
    let operation = '';
    let resultDisplayed = false;

    $('.button').on('click', function() {
        const buttonValue = $(this).text();

        if (buttonValue === 'C') {
            operation = '';
            resultDisplayed = false;
            $('.calc-operation').text('');
            $('.calc-typed').text('');
        } else if (buttonValue === '=') {
            if (resultDisplayed) {
                return;
            }
            try {
                const result = eval(operation);
                $('.calc-operation').text(operation);
                $('.calc-typed').text(result);
                operation = result;
                resultDisplayed = true;
            } catch (error) {
                $('.calc-typed').text('Error');
            }
        } else {
            if (resultDisplayed) {
                operation = '';
                resultDisplayed = false;
            }
            operation += buttonValue;
            $('.calc-operation').text(operation);
        }
    });
});

function blinker() {
    $('.blink-me').fadeOut(200);
    $('.blink-me').fadeIn(200);
}
setInterval(blinker, 500);
