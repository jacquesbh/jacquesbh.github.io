---
title: "Utiliser Fluid avec Zimbra sur OSX"
layout: post
description: "Oubliez votre client mail habituel et utilisez Zimbra avec Fluid sur Mac OS X."
keywords: osx, mac
tags: ["OS X", Astuces]
type: article
published: 2013-05-05 21:00:00
date: 2013-05-05 21:00:00
comments: true
gist: "jacquesbh/1353873b8c13970af60d"
---

Avez-vous déjà eu l'occasion d'utiliser [Zimbra][zimbra] ?

Il s'agit d'un outil de collaboration. En gros on peut y gérer des mails, des documents, des rendez-vous, un carnet d'adresse plutôt poussé etc.  
Le logiciel est surtout intéressant côté serveur. Cependant il a un client web, moche mais plutôt bien fichu.

Et quand on utilise souvent son client mail et bien on a envie d'utiliser un client desktop (comme Outlook par exemple).  
Sauf que Outlook j'aime pas (_Microsoft_ est l'argument premier).  
Je suis sous OS X et le client Zimbra Desktop pour Mac... disons qu'il va faire exploser l'ordi. Il doit y avoir une fuite mémoire... enfin j'imagine.

Bref, j'utilise Zimbra. Le client web est moche mais fonctionnel. Le client desktop est inutilisable et il n'y a pas d'alternative à part Outlook.  
On fait quoi dans ce cas ?

Perso j'utilise [Fluid.app][fluid] et un peu de JavaScript.

<!-- more start -->

--------

[Fluid][fluid] permet de créer des "Web App" comme on le dit si bien.  
En gros on clique sur l'application et ça lance un navigateur web sans fioritures, juste le site.

Donc si vous avez suivi il suffit de créer une « App » avec l'adresse de notre client web Zimbra.  
Jusque là rien de bien compliqué.

Mais voià qu'on a un faux client desktop. C'est un client desktop au sens où c'est une application. Mais c'est un faux client car un vrai client va venir se greffer à votre système d'exploitation.

Et là j'apprends que Fluid propose une version payante. Pour quelques euros on peut avoir quelques fonctionnalités intéressantes en sus :

*   Les __scripts utilisateur__.
*   Les __styles utilisateur__.
*   Le __Drag and Drop__.
*   Une __API JavaScript__ permettant d'effectuer quelques actions sur le système.

Pensez à regarder le [changelog][fluid_changelog] de temps en temps. Il y a des éléments intéressants.

Quand j'ai vu ça je me suis dit...

> Qu'est-ce qui m'empêche de faire en sorte que Fluid m'indique quand j'ai un nouveau mail ?

J'achète et je bosse un peu mon JS.

## Un peu de Javascript

Avant tout j'ai tenté de vérifier la présence d'un nouveau mail et d'afficher le nombre de non lus dans mon dock.  
En bonus j'ai fait en sorte que l'icône du dock saute de temps en temps et qu'elle saute de manière continue au bout d'un certain temps.

<script type="text/javascript">gist('{{page.gist}}', 'zimbra.js');</script>

Le script s'installe via le menu "Window > Userscripts". Il suffit d'ajouter un nouveau script avec la bonne recherche d'URL.

Au final ça fonctionne super bien. Vu que Zimbra actualise la vue assez souvent (toutes les 5 à 10mn je dirais) et bien on peut garder toutes les fonctionnalités du client web, le tout dans application desktop.

Pratique.

<!-- more end -->

[zimbra]: http://www.zimbra.com/
[fluid]: http://fluidapp.com/
[fluid_changelog]: http://fluidapp.com/changelog.html

