---
title: "Changeons notre homepage !"
layout: post
description: "Il y a plusieurs façons de faire pour changer de Homepage, en voici une !"
keywords: [magento, homepage, layout, cms]
tags: [Magento, Homepage, Layout, CMS]
type: howto
published: 2012-08-04 21:35:00
date: 2012-08-04 21:35:00
comments: true
gist:
permalink: /une-nouvelle-homepage.html
---

J'en ai parlé récemment avec un collègue chez [Internim][internim] :

> « Quelle est la meilleure manière de **personnaliser la homepage d'un site sous Magento** ? »

Je n'ai sans doute pas la meilleure... mais en tout cas elle est simple et pratique :)

<!-- more start -->

<hr />

Pour commencer il faut savoir que la _Homepage_ est une **page CMS** et qu'à ce titre elle est administrable dans l'admin de Magento.

![La Homepage dans les pages CMS][homepage_cms]

L'idée c'est que nous allons simplement changer le layout de notre page. Par défaut la _home_ est sur `2 columns with right bar`. Faisons en sorte que son layout soit `homepage`.

Notre module `Jbh_Homepage` va juste ajouter un _layout_ pour toutes les pages CMS. Il nous suffira de changer celui de la home !

Pour ajouter un layout au niveau des pages CMS il suffit d'ajouter un peu de XML à notre configuration.

On commence par déclarer notre module qui dépendra de `Mage_Cms` et `Mage_Page` :

<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_homepage/raw/master/app/etc/modules/Jbh_Homepage.xml"></script>

Ensuite on passe au `config.xml` dans lequel on indique notre nouveau layout dans le path `global/page/layout`.
A noter qu'on peut aussi utiliser le path `global/cms/layouts`.

J'en profite pour créer un layout update, histoire d'avoir un `handle` bien à nous : `page_homepage`.

> Quel intérêt ? On a déjà le handle `cms_index_index` pour la homepage non ?

Exact ! Sauf que le handle `cms_index_index` s'appliquera dans tous les cas à votre homepage, quelque soit son layout.
Notre handle à nous ne sera appliqué que si c'est notre layout qui est utilisé, vous voyez la nuance ? ;)

<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_homepage/raw/master/app/code/community/Jbh/Homepage/etc/config.xml"></script>

Ensuite il ne nous reste plus quand chose... Créons notre page `phtml` : (J'ai copié le `1column.phtml`)

<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_homepage/raw/master/app/design/frontend/base/default/template/page/homepage.phtml"></script>

Et on termine par le fichier de mise à jour des layouts :

<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_homepage/raw/master/app/design/frontend/base/default/layout/jbh_homepage.xml"></script>

En soi rien de bien compliqué :

1. On ajoute un layout possible pour nos pages CMS
2. On ajoute un `handle` pour pouvoir faire appel rapidement à notre homepage dans nos layouts
3. On met tout notre HTML dans notre template `page/homepage.phtml`

Have fun !


<!-- more end -->

[internim]: http://www.internim.com "Créateur de solutions OpenSource"

[homepage_cms]: images/posts/une-nouvelle-home/homepage_cms.png "La homepage dans la liste des pages CMS en admin"
