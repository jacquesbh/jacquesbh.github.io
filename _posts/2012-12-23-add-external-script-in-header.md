---
title: "Ajouter un script externe au header sur Magento"
layout: post
description: "Vous souhaitez charger un script Google ? Facebook ? ou Twitter dans le header de votre site ? Apprennez ici comment faire !"
keywords: magento, script, head, css, js, externe
tags: [Magento, Layout]
type: howto
published: 2012-12-23 23:30:00
date: 2012-12-23 23:30:00
comments: true
permalink: /ajouter-un-script-externe-au-header-sur-magento.html
gist: 4365871
---

On a toujours besoin d'ajouter un bout de script ou un script externe complet dans le header de nos pages mais on ne sait jamais comment s'y prendre ! Doit-on préférer la solution simple qui consiste à modifier le template `head.phtml` ? Devons-nous ajouter ce bout de code en dur ? Le rendre dynamique ?

Quoiqu'il en soit il y a plusieurs façons de faire et cet article a pour but de vous expliquer celle qui est la plus élégante.

L'idée de cet article est dûe au [commentaire de Frédéric Martinez](http://jacques.sh/le-layout-sur-magento.html#comment-743437791) sur mon [article sur le Layout](http://jacques.sh/le-layout-sur-magento.html).

Ouvrez-donc votre éditeur de texte préféré et allons faire un tour dans le Layout...

<!-- more start -->

--------

## Le block `core/text`

Vous connaissez tous le block `core/text` n'est-ce pas ? Ce petit block bien sympathique sur Magento auquel il suffit de donner un texte pour qu'il puisse s'afficher !

Par exemple si on devait initialiser un tel block voici ce qu'on ferait :

<script src="https://gist.github.com/4365871.js?file=create_block.php"></script>

Vous voyez peut-être déjà où je veux en venir ?

Et si maintenant notre texte était `<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>` ?

<script src="https://gist.github.com/4365871.js?file=jquery.php"></script>

Ok mais dans le layout ça donne quoi ?

<script src="https://gist.github.com/4365871.js?file=core_text.xml"></script>

_Note : N'oubliez pas le `<![CDATA[ ]]>` !_

## Direction le `<head/>` !

Quand on regarde un peu les templates de base sur Magento on remarque que le `page/html/head.phtml` contient une ligne fort pratique :

{% highlight php %}
<?php echo $this->getChildHtml() ?>
{% endhighlight %}

Cette ligne affiche tous les enfants du block `head`.

Donc si on ajoute un block comme celui que nous avons créé à priori son contenu sera affiché à la place de cette ligne.

Pour ajouter notre block voici les options possibles :

*   dans le fichier `local.xml` : ce fichier est chargé après tous les fichiers XML du Layout.
*   dans le fichier `module.xml` d'un module existant ou créé pour l'occasion.

Afin de nous éviter la création d'un module rien que pour un fichier de layout nous passerons par le `local.xml`.

Afin d'ajouter un block à notre `head` nous devons en faire une référence au préalable.

Voici à quoi ressemble notre `local.xml` :

<script src="https://gist.github.com/4365871.js?file=local.xml"></script>

A partir de maintenant notre jQuery en provenance de Google est directement chargé dans notre `head`.

Bien sûr vous pouvez mettre le script d'initialisation d'une librairie par exemple à la place de jQuery.

## Astuce pour vos javascripts

Lorsqu'on développe sur Magento on est souvent amené à créer des scripts bien à nous.

Et dans ces scripts on a besoin de l'URL du projet dans certains cas.

Voici comment ajouter la "constante" `BASE_URL` dans le `head` de vos projets, dans votre local.xml :

<script src="https://gist.github.com/4365871.js?file=local_base_url.xml"></script>

<!-- more end -->


