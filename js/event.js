(function ($) {
    $(document).ready(function () {

        // Affix menu
        if ($('#menu').length) {
            $('#menu').affix({
                offset: {
                    top: function () {
                        return $('#quoteWrap').position().top + $('#quoteWrap').outerHeight(true);
                    }
                }
            });
        }

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
        if ($('#comments').length) {
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

        // Search form
        var search_form = $('#search_form');
        search_form.submit(function () {
            // No value?
            var val = $('#search_form input').val();
            if (!val) {
                return false;
            }

            // Get the URL
            var url = search_form.attr('action') + '#!q=' + val;

            // Redirect without send the form
            window.location.href = url;

            return false;
        });

        if ($('body.search-results').length) {
            $(window).on('hashchange', start_search);
        }

        // Fancybox
        $(".fancy").fancybox();
    });
})(jQuery);
