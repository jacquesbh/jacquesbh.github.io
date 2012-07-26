---
title: Quelques snippets Magento
layout: post
category : Magento
tags : [Magento, Snippets, Vim, Netbeans]
date: 2012-07-15 16:20:00
comments: true
description: De nos jours quand on est développeur, on ne peut plus se passer de ces petits bouts de code !
keywords: magento, snippet, vim, netbeans
permalink: /quelques-snippets-magento.html
---
{% include JB/setup %}

Quand on développe sur Magento on est amené à taper certaines syntaxes un nombre incalculable de fois...

{% highlight php %}
<?php
echo Mage::helper('core/string')->truncate($content);
{% endhighlight %}

Vous voyez ce que je veux dire ?

<!-- more start -->

<hr />

Il existe beaucoup d'outils pour mettre en place des snippets.

La plupart des IDE (Netbeans, PhpStorm, ...) et même les plus gros éditeurs (comme Vim) permettent l'utilisation de snippets. Via des plugins ou non.

Le but de cet article n'est pas de vous expliquer comment fonctionnent les snippets, mais bien de vous en donner un petit nombre.

## Pour Vim (avec [SnipMate][snipmate])

<script src="https://gist.github.com/2987266.js?file=php.snippets"></script>

## Pour Netbeans

<script src="https://gist.github.com/2987266.js?file=netbeans_magento_snippets.xml"></script>

## Pour PhpStorm

Merci à [Laurent](http://jacques.sh/quelques-snippets-magento.html#comment-598945986) pour son gist !

<script src="https://gist.github.com/3184638.js?file=PHP.xml"></script>

<!-- more end -->

[snipmate]: http://www.vim.org/scripts/script.php?script_id=2540 "TextMate-style snippets for Vim "
