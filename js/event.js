(function ($) {
    $(document).ready(function () {

        // Contact form validation (simple way)
        $('#contact_form').submit(function () {
            var messages = [];
            if (!$('#contact_name').val().length) {
                messages.push('Merci de renseigner votre nom.');
            }
            if (!$('#contact_email').val().length) {
                messages.push('Merci de renseigner votre email.');
            }
            if (!$('#contact_message').val().length) {
                messages.push('Merci de renseigner votre message.');
            }
            if (messages.length > 0) {
                alert(messages.join("\n"));
                return false;
            }
            return true;
        });

    });
})(jQuery);
