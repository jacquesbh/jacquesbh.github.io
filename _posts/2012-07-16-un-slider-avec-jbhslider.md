---
title: Un slider avec le JbhSlider
layout: post
description: Apprenez à créer un slider simple avec le JbhSlider.
keywords: slider, jbh, jbhslider, css, jquery
tags: [jQuery, Javascript]
type: howto
published: 2012-07-16 23:03:00
comments: true
permalink: /un-slider-avec-le-jbhslider.html
---

Il n'est pas rare de nos jours de voir un slider, le plus souvent en Javascript, sur une homepage, ou encore une fiche produit, etc.

Sauf que le développeur est confronté à un problème : L'intégrateur.
Non sans déconner... L'intégrateur il veut un balisage précis, et jamais le même que son collègue.

Et le développeur lui, il veut un truc pratique et il a pas envie de se prendre la tête, pour un slider.

<!-- more start -->

<hr/>

On veut un slider pratique, mais c'est quasiment introuvable.

Quasiment, parce qu'en fait... j'en ai développé un rien que pour vous. Pour moi en fait.

->__[Le JbhSlider][jbhslider]__<-

## Le HTML

Plusieurs choix s'offrent à nous :

* Les `div` dans des `div` :

{% highlight html %}
<div id="mon_slider">
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
</div>
{% endhighlight %}
->Exemple 1<-

* La liste à puces :

{% highlight html %}
<ul id="mon_slider">
    <li>Slide 1</li>
    <li>Slide 2</li>
    <li>Slide 3</li>
</ul>
{% endhighlight %}
->Exemple 2<-

Par défaut nous sommes dans une liste à puce... entourée d'une `div` :

{% highlight html %}
<div id="mon_slider" style="margin: 0 auto;">
    <ul>
        <li><img src="http://placehold.it/250x125/26c877/ffffff" /></li>
        <li><img src="http://placehold.it/250x125/d53221/ffffff" /></li>
        <li><img src="http://placehold.it/250x125/47c8f3/ffffff" /></li>
    </ul>
</div>
{% endhighlight %}
->Exemple 3<-

## Le Javascript

Tout d'abord il nous faut inclure notre fichier slider javascript dans le `head` de notre page ou entre les balises `body` directement :

{% highlight html %}
<script type="text/javascript" src="jbhslider.js"></script>
{% endhighlight %}

Ensuite il suffit d'appeler ce petit bout de code pour activer notre exemple numéro 3.

{% highlight javascript %}
// La closure et le "document ready" ne sont pas toujours nécessaires
(function ($) {
    $(document).ready(function () {
        $('#mon_slider').jbhSlider({
            // Par défaut la taille est de 500 par 250
            css: {
                width: 250,
                height: 125
            },
            // Par défaut il y a une navigation précédent/suivant qui est générée
            navigation: {
                active: false
            }
        });
    });
})(jQuery);
{% endhighlight %}

<hr/>

<div id="mon_slider" style="margin: 0 auto;">
    <ul>
        <li><img src="http://placehold.it/250x125/26c877/ffffff" /></li>
        <li><img src="http://placehold.it/250x125/d53221/ffffff" /></li>
        <li><img src="http://placehold.it/250x125/47c8f3/ffffff" /></li>
    </ul>
</div>

<script type="text/javascript" src="http://jacques.sh/jbhslider/js/jbh_slider.min.js"></script>
<script type="text/javascript">
// <![CDATA[
(function ($) {
    $(document).ready(function () {
        $('#mon_slider').jbhSlider({
            css: {
                width: 250,
                height: 125
            },
            navigation: {
                active: false
            }
        });
    });
})(jQuery);
// ]]>
</script>

<hr />

Je vous invite vraiment à aller lire la [documentation du slider][doc] !


<!-- more end -->

[jbhslider]: http://jacques.sh/jbhslider/ "Simple way to slide"
[doc]: http://jacques.sh/jbhslider/#documentation "Une documentation complète"
