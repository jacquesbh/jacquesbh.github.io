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

        // Sidebar
        if ($('.post').length) {
            var timer = 1000;
            var sideWrapTop = $('#sideWrap')
                .css('position', 'relative')
                .offset()
                .top;
            var commentsTop = $('#comments')
                .position()
                .top;
            var sidebarScroll = function () {
                var pos = $('#sideWrap').offset();
                var scroll = $('html').scrollTop();
                if (scroll > sideWrapTop) {
                    if (scroll > commentsTop) {
                        $('#sideWrap').animate({'top': commentsTop - sideWrapTop}, 200);
                    } else {
                        $('#sideWrap').animate({'top': scroll - sideWrapTop}, 200);
                    }
                } else if (scroll < sideWrapTop && pos.top != sideWrapTop) {
                    $('#sideWrap').animate({'top': 0}, 200);
                }
                setTimeout(sidebarScroll, timer);
            }
            setTimeout(sidebarScroll, timer);
        }

    });
})(jQuery);
