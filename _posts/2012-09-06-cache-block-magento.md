---
title: "Le cache des blocks sur Magento"
layout: post
description: "Vous voulez savoir comment est géré le cache des blocks sur Magento ?"
keywords: magento, cache
tags: [Magento, Cache]
type: article
published: 2012-09-06 02:20:00
date: 2012-09-06 02:20:00
comments: true
permalink: /le-cache-des-blocks-sur-magento.html
gist: 3646203
---

Le cache block sur Magento... Quelle galère !

Enfin... à ce qu'on dit.

> Je comprends rien... c'est quoi `cache_tags` ?
> 
> C'est comme `cache_key` ?

Je ne suis pas de cet avis en fait. Le cache c'est _easy_, il suffit _juste_ de savoir où on met les pieds !

Vous me suivez ?

<!-- more start -->

---------------

## Les bases du cache sur Magento

Avant d'attaquer le cache sur les blocks il vous faut savoir quelques petites choses sur le cache en général sur Magento.

### La clé, ou `cache_key`

Une clé le plus souvent c'est __unique__ ! Bah là, c'est pareil.

Un cache est identifié par sa clé. Un changement minime dans le contenu de votre cache doit faire varier sa clé !

Sauf bien sûr si vous ne souhaitez pas avoir les deux versions.

Par exemple on peut mettre en cache la réponse d'une requête SQL, à condition de faire en sorte que la clé soit liée à l'identifiant dans la clause `WHERE` de votre requête !

Sinon c'est la _loose_... Prenons un exemple _bidon_ :

<script src="https://gist.github.com/3646203.js?file=example_01.php"></script>

On peut voir que la clé ne change pas car elle dépend de la variable `$_cacheKey` qui ne change pas entre le premier et le second appel à la méthode `getCountLessThan`.

Maintenant si on change la valeur de `$_cacheKey` à `jbh_counter_sql_result_%d` le résultat n'est plus le même !

<script src="https://gist.github.com/3646203.js?file=example_02.php"></script>
    
**La clé est donc vraiment importante dans la gestion du cache !**

### La durée de vie, ou `cache_lifetime`

Là c'est simple ! On peut décider de donner une durée de vie à notre cache (en secondes).

En gros si notre cache est vieux de plus de `cache_lifetime` secondes, alors on le supprime et il est généré à nouveau.

__Les valeurs de `cache_lifetime`__ :

*   `null` : pas de cache
*   `false` : 7200 secondes de cache, soit 2 heures
*   `(int)` : nombre de secondes de cache
*   `-(int)` : équivaut à pas de cache (date d'expiration du cache dépassée dès la prochaine demande)

### Les tags, ou `cache_tags`

Tagguer un cache... _Wait... WHAT?_

En toute logique quand on veut vider un cache on indique sa clé et on supprime le cache concerné.

Sauf qu'en pratique... bah c'est franchement la merde. Et c'est là que les tags font leur entrée !

Imaginons plusieurs caches avec chacun une liste de tags :

<script src="https://gist.github.com/3646203.js?file=example_03.txt"></script>
        
Maintenant, si on veut vider les caches `A` et `B` on fait tout simplement :

<script src="https://gist.github.com/3646203.js?file=example_04.php"></script>

Par défaut Magento fait en sorte que si un tag _match_ un cache celui-ci soit supprimé. Si vous avez renseigné plusieurs tags à vider, __tous__ les cache concernés par __un ou plusieurs__ de ces tags seront supprimés.

Si vous souhaitez supprimer un cache (sur le cache `frontend`, pas le cache `backend`) qui _match_ tous les tags renseignés il faut faire :

<script src="https://gist.github.com/3646203.js?file=example_05.php"></script>

Ici on a vidé le cache du `C`.

## Le cache sur les blocks

Par défaut un block n'a pas de cache car la méthode `getCacheLifetime` du block `Mage_Core_Block_Abstract` retourne `null` si aucune _data_ `cache_lifetime` n'est renseignée.

La gestion du cache sur les blocks utilise le fait que chaque block est un `Varien_Object` pour stocker les valeurs de `cache_key`, `cache_lifetime` et `cache_tags`.

Sauf que qui dit `Varien_Object` dit `__call`... non ?

Donc en fait les variables du cache sont récupérées de la manière suivante :

<script src="https://gist.github.com/3646203.js?file=example_06.php"></script>

Donc ? Bah donc on peut surcharger sur nos blocks. Et oui !

### La clé avec `getCacheKey()`

Comme on le sait la clé doit être unique et dépendre du contexte. On a donc plusieurs paramètres à prendre en compte :

*   Le store (donc la locale en passant)
*   Le design (package & thème)
*   Le template `phtml` utilisé
*   Le nom du block dans le Layout
*   Un identifiant (identifiant d'un produit par exemple)

On peut bien sûr ajouter des paramètres dans notre clé.

Bon, mais en gros, quand on a un tableau de paramètres et qu'on veut une chaîne de caractères on fait comment ? `implode` ? Avec un _hash_ ?

Soyons fous !

Mais en fait... Magento le fait pour nous ; avec l'appel à `getCacheKeyInfo()` dans `getCacheKey()` :

<script src="https://gist.github.com/3646203.js?file=example_07.php"></script>

Si on y regarde de plus près on remarque que la méthode `getCacheKeyInfo()` retourne un tableau qui contient une seule valeur : le nom du block dans le Layout :

<script src="https://gist.github.com/3646203.js?file=example_08.php"></script>

Dans notre block, on surcharge cette méthode !

<script src="https://gist.github.com/3646203.js?file=example_09.php"></script>

### Les tags avec `getCacheTags()`

Par défaut on essaiera toujours de donner une constante `CACHE_TAG` à un modèle concocté par nos soins par exemple. A nous de ne pas oublier de l'utiliser !

L'intérêt de définir une constante `CACHE_TAG` à nos modèles qui sont utilisés dans nos blocks c'est de pouvoir vider le cache de tous les blocks concernés par nos objets lorsqu'on les sauvegarde par exemple !

Il suffit de modifier la méthode `_afterSave` de nos modèles pour y ajouter le clean du cache !

Revenons à nos moutons et voyons à quoi ressemble la méthode `getCacheTags` par défaut de Magento :

<script src="https://gist.github.com/3646203.js?file=example_10.php"></script>

Allez, on surcharge dans notre block !

J'ajoute ici un exemple _vite fait_ d'un modèle avec une constante `CACHE_TAG` bien utilisée :

<script src="https://gist.github.com/3646203.js?file=example_11.php"></script>

Vous noterez qu'on peut ajouter n'importe quels tags. Attention cependant à ne pas oublier les tags par défaut récupérés grâce au `parent` !

### La durée de vie avec `getCacheLifetime()`

Rien de plus simple !

<script src="https://gist.github.com/3646203.js?file=example_12.php"></script>

## Pensez à vider le cache !

Utilisez bien les tags enregistrés avec le cache de vos blocks pour vider tout ça !

Vous pouvez aussi enregistrer tous les tags utilisés sur les blocks par défaut d'une page de cette manière :

Dans le fichier `/app/code/core/Mage/Core/Model/App.php`, ajoutez un log dans la méthode `saveCache` :

<script src="https://gist.github.com/3646203.js?file=example_13.php"></script>

Vous aurez ici les tags utilisés ! Mais pas ceux qui ne sont pas utilisés, mais vidés !

Dans le fichier `/app/code/core/Mage/Core/Model/App.php`, ajoutez un log dans la méthode `cleanCache` :

<script src="https://gist.github.com/3646203.js?file=example_14.php"></script>

## Conclusion

Gérer le cache des blocks n'est pas une mince affaire mais on s'y retrouve !

Il faut juste savoir s'y prendre.

Vous pouvez également utiliser la méthode `addData` dans la surcharge du constructeur secondaire `protected function _construct()` de votre block pour y assigner les valeurs de `cache_key`, `cache_tags` et `cache_lifetime` mais je le déconseille.

Bon cache !

<!-- more end -->
