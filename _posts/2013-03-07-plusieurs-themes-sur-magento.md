---
title: "Le multi-thèmes en développement"
layout: post
description: "On a toujours besoin de regarder le thème par défaut en même temps que notre propre thème pendant nos développements !"
keywords: magento, theme, development, package
tags: [Magento, "Thème", "Bonnes pratiques"]
type: article
published: 2013-03-07 17:00:00
date: 2013-03-07 17:00:00
comments: true
---

Quand on développe sur un nouveau projet (ou pas d'ailleurs) on est obligé de modifier le fonctionnement de manière plus ou moins poussée des pages par défaut.  
Par exemple on a souvent besoin de modifier la page catégorie, le compte, etc.

Il y a plusieurs manières ensuite pour bosser sur un nouveau thème.  
Certains modifient directement le thème par défaut (très déconseillé), d'autres le dupliquent et éditent le thème dupliqué, d'autres encore dupliquent le thème par défaut pour le mettre dans leur package et font un troisième thème vide qui va venir surcharger...

Je n'ai jamais vraiment sû quelle méthode utiliser (entre les deux dernières bien sûr).

Mais au final on se retrouve toujours devant un dilemne. On bosse sur notre nouveau thème mais on a besoin de voir ce que le thème par défaut faisait.  
Car oui... on veut garder le fonctionnel et on veut être sûr de ne rien oublier !

Et là ça devient vite emmerdant de switcher de thème toutes les 10 minutes "juste pour vérifier".

Solution !

<!-- more start -->

--------

Sur Magento on a un système de gestion des thèmes qui est plutôt poussé.

Et dans le genre poussé... on a un truc super : le choix du thème suivant le `User-Agent` de votre navigateur.

Voyons voir un peu l'administration... Dans `System > Configuration` puis `GÉNÉRAL > Design` :

![Configuration par défaut][default]

Par défaut le système cherche le thème `base/default` sur toutes les versions de Magento.  
Sur une version _Community_ le thème réglé à l'install est `default/default` et sur une version _Enterprise_ le thème à l'install est `enterprise/default`.

Pour bien faire notre boulot on change le thème de notre applicatif et on met par exemple `jacquesbh/foo`.

> Et si on faisait en sorte que sur _Google Chrome_ le thème soit toujours celui par défaut ?

Parce que oui ! Je bosse sur Firefox ! Alors Chrome c'est parfait pour regarder le site sur le thème par défaut.

![Configuration améliorée][perform]

Dans cette nouvelle configuration on a bien le thème de changé.  
Cependant pour les navigateurs qui contiennent `Chrome` dans leur `User-Agent` on a le thème par défaut (ici d'une version Enterprise).

La regex à utiliser est la suivante : `.*Chrome.*`

![Regex][regex]

A partir de maintenant vous avez votre thème sur votre navigateur préféré (Firefox pour moi) et le thème par défaut (ou un autre) sur votre navigateur secondaire (Chrome pour moi).

Evidemment on n'utilisera pas cette technique en production !



<!-- more end -->

[default]: /images/posts/plusieurs-themes-sur-magento/default.png
[perform]: /images/posts/plusieurs-themes-sur-magento/perform.png
[regex]: /images/posts/plusieurs-themes-sur-magento/regex.png

