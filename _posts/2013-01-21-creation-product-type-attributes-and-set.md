---
title: "Créez votre type de produit, ses attributs et son jeu"
layout: post
description: "Appenez à créer votre type de produit sans vous tromper. Créez également votre jeu d'attributs et vos attributs personnalisés."
keywords: magento, attributes, set
tags: [Magento, Attributes, Product, Product type]
type: howto
published: 2013-01-21 00:30:00
date: 2013-01-21 00:30:00
comments: true
gist: jacquesbh/4582238
---

Quand on démarre un projet on a souvent besoin de créer nos propres types de produits.

Bien souvent on en profite aussi pour créer un ou deux jeux d'attributs et quelques attributs particuliers.

Le problème dans tout ça c'est qu'on ne sait jamais quoi faire et on oublie bien souvent un ou deux fichiers dans l'histoire...

On va commencer par créer notre type (ou nos types) de produit : soyons `Foo`.

<!-- more start -->

--------

## La création du type de produit `Foo`

Notre type est identique au niveau fonctionnel du type `Simple`.

Nous avons donc deux solutions : la sale, et la propre.

### La méthode « sale »

La sale consiste à dupliquer, simplement, le XML de configuration du type `simple` avec notre propre balise `foo` :

<script type="text/javascript">gist({{page.gist}}, 'bad.xml', '11');</script>

Vous remarquerez la ligne surlignée. Et bah oui ! Si notre type se comporte comme un produit `simple`, pourquoi créer un modèle personnalisé ?

### La méthode « un peu plus propre »

L'idée c'est de dupliquer les modèles. Pourquoi ? Et bien parce que de cette manière notre type est totalement indépendant.

Et puis ça permet de prévoir les évolutions ;)

<script type="text/javascript">gist({{page.gist}}, 'good.xml', '11,12,15,16');</script>

Vous remarquez cette fois que nous avons quatre modèles personnalisés.

Pas de panique, ils font tous un `extends` sur le même modèle pour le type `simple`.

#### Le modèle principal

Ce modèle contient la constante qui vaut le code du type : `foo`.

<script type="text/javascript">gist({{page.gist}}, 'type.php');</script>

#### Le modèle de prix

<script type="text/javascript">gist({{page.gist}}, 'price.php');</script>

#### Le modèle d'index des prix

<script type="text/javascript">gist({{page.gist}}, 'indexer.php');</script>

#### Le data retreiver

Ce modèle a une méthode qui permet de récupérer le code du type. On utilise donc la constante disponible.

<script type="text/javascript">gist({{page.gist}}, 'retreiver.php');</script>

### Le layout

Comme tout nouveau type de produit pensez à ajouter le bout de layout qui va avec ! Sinon pas de prix dans la fiche produit par exemple !

<script type="text/javascript">gist({{page.gist}}, 'layout.xml');</script>

### Les attributs de type « Prix »

Notre nouveau type de produit va nous permettre de créer de beaux produits... mais sans prix !

Pour avoir une gestion du prix comme le produit simple, il faut ajouter les attributs nécessaires à notre nouveau type !

Dans un setup de votre module, mettez ceci : (c'est plutôt facile à comprendre)

<script type="text/javascript">gist({{page.gist}}, 'setup_price.php');</script>

## La création du jeu d'attributs `Bar`

Pour créer un jeu d'attribut, rien de plus simple !

On considérera que notre nouveau jeu se base sur les mêmes attributs que le jeu par défaut.

<script type="text/javascript">gist({{page.gist}}, 'set.php', '11');</script>

Il faut savoir que si on fait un `addAttributeSet` d'un jeu d'attributs existant alors celui-ci est mis à jour, tout simplement.

C'est pour cette raison qu'on peut se dispenser de faire un `try/catch` dans notre installeur.

## La création d'un attribut `baz`

Dans notre installeur ou dans un update il nous suffit d'ajouter notre attribut, tout simplement, comme ceci :

<script type="text/javascript">gist({{page.gist}}, 'attribute.php');</script>

## Conclusion

Vous pouvez maintenant ajouter rapidement un type de produit, un jeu d'attributs et des attributs !

Cet article n'est pas complet car il ne présente pas comment ajouter un attribut à deux groupes qui sont utilisés par deux types de produits différents etc.

Néanmoins vous trouverez beaucoup de méthode dans le modèle EAV ;)

<script type="text/javascript">gist({{page.gist}}, 'eav_setup.php');</script>

<!-- more end -->


