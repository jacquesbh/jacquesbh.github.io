---
title: "Ajouter un handle au layout sur Magento"
layout: post
description: "Il est très utile d'avoir des handles personnalisés dans notre layout pour certaines pages."
keywords: layout, magento, handle, events
tags: [Magento, Layout, Handle, Events]
type: article
published: 2012-12-28 23:30:00
date: 2012-12-28 23:30:00
comments: true
permalink: /ajouter-un-handle-personnalise-sur-une-page-sur-magento.html
gist: 4401568
---

> Hey Jacques, c'est possible d'avoir un affichage différent suivant le type de produit ?

Bah évidemment ! Et c'est même natif sur Magento !

> Et on peut faire la même chose sur notre système éditorial ? Pour que suivant le type de news l'affichage soit différent ?

Oui on peut, mais là ça implique un peu de dev !

> Il te faut combien de temps ?

Je ne sais pas, pour mettre en place la personnalisation il faut 30 petites minutes... Ensuite pour faire ton templating bah ça dépendra de l'intégration que tu vas me fournir !

--------

C'est typiquement le genre de discussion qu'on peut avoir avec un chef de projet qui a besoin d'aller vite et qui vient vous voir pour estimer le travail qu'il va devoir donner aux développeurs. Mais quand on donne au développeur, qui, soit dit en passant, n'a jamais touché aux _handles personnalisés_ sur Magento, ce travail... Et bien il a du mal à voir comment faire, et surtout... comment le faire en 30 minutes !

Laissez-moi vous montrer ;)

<!-- more start -->

--------

Avant toute chose vous devez savoir [comment fonctionne le layout sur Magento][layout-sur-magento]. Sans ça vous risquez d'être un peu perdu dans la suite de cet article.

On sait que les handles par défaut qui sont chargés sur notre page `frontname/controller/action` sont les suivants :

*   `default` : handle principal par défaut
*   `STORE_default` : handle du store (par défaut)
*   `THEME_frontend_default_default` : handle du thème (par défaut)
*   `frontname_controller_action` : handle de notre action

On peut aussi avoir les handles `customer_logged_out` ou `customer_logged_in` qui permettent de changer l'affichage suivant si le visiteur est connecté ou non.

Maintenant qu'on a ces handles il faut songer à en ajouter... Mais comment ?

## La méthode `loadLayout()`

Quand on a l'occasion de créer nos propres actions il est vite nécessaire de charger le layout (et donc les handles cités plus haut). Et pour ça c'est la méthode `loadLayout()` dans notre contrôleur qui fait l'affaire.

Mais cette méthode, elle fait quoi exactement ??

La méthode `loadLayout()` décortiquée/complétée/nettoyée et commentée ci-dessous :

<script type="text/javascript">gist({{page.gist}}, 'load_layout.php', '18-19,30-31,33-35,37-39,50-53');</script>

Vous avez compris le fonctionnement ? Les points les plus importants sont surlignés.

Ok, next ;)

## Un évènement

Vous avez sans doute remarqué qu'un évènement `controller_action_layout_load_before` est lancé pile poil avant la génération du XML du Layout qui sera utilisé sur la page... C'est pas par hasard hein ;)

Sauf que le nom de cet évènement, quand on y regarde de plus près, bah il est commun à toutes les pages ! Comment savoir alors si on est bien sur `frontname/controller/action` ?

Je vais vous donner une solution rapide à mettre en place mais qui ne fonctionnera que sur certains projets assez petits car si vous voulez souvent "taper" sur cet évènement il faudra trouver autre chose. Par chance je l'explique plus bas !

Nous devons dans tous les cas agir sur notre évènement, donc un peu de config, et une classe avec une méthode `layoutLoadBefore` (pas très original, mais assez parlant) et le tour est joué !

Dans cette méthode on va simplement vérifier que nous sommes bien en train d'afficher notre action et nous allons pouvoir y faire l'ajout de notre nouvel handle :

<script type="text/javascript">gist({{page.gist}}, 'observer_handle.php', '12-18');</script>

L'idée c'est surtout de ne pas utiliser une triple condition à la `if ($action == 'action' && $controller == 'controller' && $module == 'module')` car c'est bien trop lourd. On a la possibilité d'avoir un nom d'action précis, alors on fait un case !

Ensuite on ajoute notre handle personnalisé, en majuscules (eh oui !).

Rien ne nous empêche de récupérer un objet dans le registre pour y ajouter un peu de dynamisme (c'est l'idée en fait) : _exemple avec une "news"_

<script type="text/javascript">gist({{page.gist}}, 'observer_news.php', '15-18');</script>

A vous de jouer !

## Vérifions

Pour vérifier que notre handle est présent, rien de plus simple : on ouvre le fichier `index.php` et on ajoute à la fin du fichier ces quelques lignes.

<script type="text/javascript">gist({{page.gist}}, 'index.php');</script>

On actualise ! Et pof ! (tout en bas..)

## En mieux ?

Si vous devez faire un event sur plein de modules car vous avez assez souvent de faire de l'affichage personnalisé (c'est super pratique...) et bien je vous propose de faire plutôt ceci : lancer un évènement un peu plus personnalisé !

Vous vous souvenez, on a un évènement "global". Mais cet évènement nous donne le nom de l'action (via `$observer->getAction()->getFullActionName()`).

On peut donc lancer un évènement précis pour notre page :

<script type="text/javascript">gist({{page.gist}}, 'observer_dispatch.php', '13-16');</script>

De cette manière on peut utiliser l'évènement `controller_action_layout_load_before_frontname_controller_action` pour ajouter notre handle sans crainte !

## Et au final ?

Au final... n'abusez pas des évènements ;)

<!-- more end -->


[layout-sur-magento]: http://jacques.sh/le-layout-sur-magento.html
