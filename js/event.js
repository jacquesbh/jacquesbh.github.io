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
            $(this).attr('action', $(this).find('.url').html());
            return true;
        });

        // Sidebar
        if ($('.post').length) {
            var timer = 100;
            var transitionTimer = 250;
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
                        $('#sideWrap').stop();
                        $('#sideWrap').animate({'top': commentsTop - sideWrapTop}, transitionTimer);
                    } else {
                        $('#sideWrap').stop();
                        $('#sideWrap').animate({'top': scroll - sideWrapTop}, transitionTimer);
                    }
                } else if (scroll < sideWrapTop && pos.top != sideWrapTop) {
                    $('#sideWrap').stop();
                    $('#sideWrap').animate({'top': 0}, transitionTimer);
                }
                setTimeout(sidebarScroll, timer);
            }
            setTimeout(sidebarScroll, timer);
        }

    });
})(jQuery);
