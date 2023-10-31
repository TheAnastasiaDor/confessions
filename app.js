$(document).ready(function() {

    $('#entry-button').on('click', function() {
        $(this).fadeOut();
        showWelcomeText();
    });

    function showWelcomeText() {
        $("#welcome-text").fadeIn().css('opacity', '1');
        setTimeout(function() {
            $('#rock-image').fadeIn();
            setTimeout(showInfoText1, 1000);
        }, 1000);
    }

    function showInfoText1() {
        $("#info-text-1").css('opacity', '1');
        setTimeout(showInfoText2, 1000);
    }

    function showInfoText2() {
        $("#info-text-2").css('opacity', '1');
        setTimeout(showButtons, 1000);
    }

    function showButtons() {
        $("#share-button, #no-thanks-button").css('opacity', '1');
    }

    $('#share-button').on('click', function() {
        $("#welcome-text, #info-text-1, #info-text-2, #no-thanks-button, #rock-image, #share-button").fadeOut(function(){
            $(this).remove(); // Remove the elements after fading out
        });
        $('#share-box, #submit-button').fadeIn();
    });

    $('#no-thanks-button').on('click', function() {
        // Hide previous elements
        $("#welcome-text, #info-text-1, #info-text-2, #share-button, #rock-image, #no-thanks-button").fadeOut(function(){
            $(this).remove(); // Remove the elements after fading out
        });
    
        // Update the decline text and fade it in
        $("#decline-text").html("It’s ok if you don’t feel like sharing. But know help is always there!");
        $("#decline-text").fadeIn();

        $.ajax({
            type: "GET",
            url: "http://api.forismatic.com/api/1.0/",
            data: {
                method: 'getQuote',
                format: 'json',
                lang: 'en'
            },
            dataType: 'jsonp',
            jsonp: "jsonp",  // 
            success: function(response) {
                let quote = response.quoteText;
                let author = response.quoteAuthor;

                let quoteText = '"' + quote + '"';
                if (author) {
                    quoteText += ' - ' + author;
                }

                $("#inspirational-quote").html(quoteText).fadeIn();
            },
            error: function() {
                $("#inspirational-quote").html("Sorry, we couldn't fetch an inspirational quote at the moment.").fadeIn();
            }
        });
    });

    $('#submit-button').on('click', function() {
        $('#share-box, #submit-button').fadeOut(function(){
            $(this).remove(); // Remove the elements after fading out
        });
        
        $('#rope-video').css({ 'top': '0', 'max-height': '50vh' }).fadeIn().get(0).play();

        document.getElementById('rope-video').addEventListener('timeupdate', function() {
            if (this.currentTime > 17) {
                if (!$("#congrats-text").length) {
                    let congratsText = $('<div id="congrats-text">Congratulations on letting go! Hope you feel better</div>');
                    congratsText.insertAfter('#rope-video');
                }
            }
        });
 $('#disclosure-link').on('click', function(e) {
            e.preventDefault(); // Prevents the default action of the link
            $('#disclosure-popup').fadeIn();
        });
        
        $('#hide-disclosure').on('click', function() {
            $('#disclosure-popup').fadeOut();
        });
        
        document.getElementById('rope-video').addEventListener('ended', function() {
            $(this).fadeOut();
            this.pause();
        });
    });
});
