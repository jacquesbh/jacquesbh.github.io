---
title: "Vos blocs en ajax ?"
layout: post
description: "Vous souhaitez afficher uniquement le header de votre page via une requête ajax ? Easy :)"
keywords: [magento, ajax, header]
tags: [Magento, Ajax]
type: howto
published: 2012-07-31 01:00:00
date: 2012-07-31 01:00:00
comments: true
gist: 3210926
permalink: /vos-blocs-en-ajax-via-webservice.html
---

C'est une demande récurrente...

> Comment afficher le footer de mon site sur mon blog ?

C'est un exemple... Mais le footer est souvent dynamique et nous avons souvent un intérêt à pouvoir ressortir juste le contenu HTML du footer via une simple requête HTTP.

<!-- more start -->

<hr />

Comme j'ai commencé par parler du footer... on va prendre cet exemple !

## L'astuce ?

En fait par défaut quand vous chargez le `layout` sur votre page, c'est le block `root` qui s'affiche automatiquement.

> Savez-vous pourquoi ?

Simplement parce qu'on lui a dit de le faire !

> Comment ?

Comme ça : `output="toHtml"` dans le layout `page.xml`.

## Notre module

Il nous faut bien sûr faire un module... Nous l'appellerons `Jbh_Webservice`. J'ai très peu d'imagination :)

Nous aurons juste besoin d'un contrôleur (et donc d'une route front) :

<script src="https://gist.github.com/3210926.js?file=config.xml"></script>

Dans le contrôleur, rien de bien compliqué :

*   Une action `footerAction` qui va retirer le output du block `root` et afficher directement le block `footer`.
*   Une méthode `postDispatch` qui va modifier le contenu de la réponse si on a besoin d'un callback (pour du JSONP par exemple).

<script src="https://gist.github.com/3210926.js?file=PageController.php"></script>

L'idée c'est que c'est à vous d'ajouter vos propres actions par la suite !

## Bonus : un appel via jQuery

Voici comment appeler notre footer en ajax via jQuery :

<script src="https://gist.github.com/3210926.js?file=demo.js"></script>

Sachez qu'un simple appel en php tel que :

{% highlight php %}
<?php
$footer = file_get_content('http://example.org/webservice/page/footer');
{% endhighlight %}

Suffit largement pour récupérer le footer ! Faire du javascript n'a d'intérêt que si on souhaite récupérer la session utilisateur (pour lui afficher son panier par exemple !).

## Conclusion

Il devient assez simple de faire des appels de blocks via une instance Magento pour un blog ou tout autre plateforme indirectement liée à votre e-commerce.

Faites-vous plaisir !

Ces scripts sont sous la [WTFPL][wtfpl].

P.S. Le fichier `app/etc/modules/Jbh_Webservice.xml` est [sur github ;)][config]

<!-- more end -->

[wtfpl]: http://sam.zoy.org/wtfpl/
[config]: https://gist.github.com/3210926#file_jbh_webservice.xml

