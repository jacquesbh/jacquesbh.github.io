---
title: "Bien afficher un attribut personnalisé"
layout: post
description: "On a toujours envie que notre attribut s'affiche correctement dans notre page produit ou notre catalogue sans créer de dépendances... Explication !"
keywords: attribute, magento, phtml, product, page, catalog
tags: [Magento, Attributes, Product]
type: article
#published:
#date: 
comments: true
gist: jacquesbh/5033402
---

Je me souviens de la galère, à mes débuts sur Magento, pour afficher un attribut un peu personnalisé...

Si l'attribut est l'identifiant d'un bloc CMS, un chiffre sans unité, une clé qui détermine une image... ou que sais-je encore !  
Pour l'exemple nous prendrons l'identifiant d'un bloc CMS, ça me plait bien !

Là tout de suite le problème c'est de garder un template clair...

> Il faut faire ton traitement dans le `phtml` !

Heu... **Non !**

> Il faut faire un helper pour afficher ton attribut !

Là oui. Mais pas que !

<!-- more start -->

--------

Vous connaissez la partie « Additional Information » dans une fiche produit n'est-ce pas ?  
Et vous ne savez pas comment faire pour que votre attribut, qui, je le rappelle est un identifiant de block CMS, s'affiche correctement ?

Regardons-y d'un peu plus près. Voici le template `frontend/base/default/template/catalog/product/view/attributes.phtml` :

<script type="text/javascript">gist('{{page.gist}}', 'attributes.phtml', '15');</script>

Ce template est donc celui qui affiche nos attributs.

A la ligne surlignée on peut remarquer un appel étrange à notre helper `Mage_Catalog_Helper_Output`... Mais concrêtement il se passe quoi ?  
Allez, on remonte !

Le helper a une méthode `productAttribute` assez particulière comme on peut le voir ci-dessous :

<script type="text/javascript">gist('{{page.gist}}', 'Output_productAttribute.php', '17-38');</script>

Si on lis cette méthode on comprend que si notre attribut a un `frontend_input` qui vaut `price` ou `textarea` alors il y aura un petit traitement de faveur pour la valeur de notre attribut.  
Même chose si notre attribut a l'éditeur WYSIWYG d'activé ou que le HTML est autorisé en front pour celui-ci.

Par contre dans tous les autres cas c'est la méthode `process` qui prend la main...

Bon ok, et cette méthode elle fait quoi ? Voyons-voir ça :

<script type="text/javascript">gist('{{page.gist}}', 'Output_process.php', '17-22');</script>

Notre helper récupère des "handlers" et effectue un traitement particulier : il vérifie que la méthode passée en argument (`productAttribute` dans notre cas) existe pour le "handler" courant dans la boucle...  
Si la méthode existe alors elle est appelée.

Bon, et ces handlers, ils viennent d'où ? La méthode `addHandler` est là pour nous l'expliquer, enfin... plus ou moins :

<script type="text/javascript">gist('{{page.gist}}', 'Output_addHandler.php', '16-26');</script>

En gros on peut ajouter pour une méthode données un helper personnalisé via cette méthode. Et puis bon comme les helpers sont des singletons rien ne nous empêche de le faire quand bon nous semble tant que c'est fait avant l'affichage de notre attribut.

Bon, donc, qu'est-ce qui nous empêche de créer un helper avec la méthode `productAttribute($outputHelper, $result, $params)` afin de personnaliser l'affichage de notre attribut ?

Vous me suivez ?

Ouais ok... mais bon, comment on fait pour ajouter notre "handler" personnalisé ?

Avec un peu de chance il y a bien un évènement qui est lancé dans les environs... Ah tiens, il fait quoi le constructeur ?? Comme quoi... faut pas chercher bien loin !

<script type="text/javascript">gist('{{page.gist}}', 'Output_construct.php', '12');</script>

Bon, on a notre _event_, alors on observe et on fait en sorte que notre observeur ajoute notre helper !

<script type="text/javascript">gist('{{page.gist}}', 'Observer.php', '14');</script>

Et notre helper alors ? Il fait quoi ?

Vu que notre attribut (que nous nommerons ici `out_attribute_code`) est l'identifiant d'un block CMS, il faut que nous affichions le contenu de ce block !  
Pour faire simple et sans rentrer dans des histoires de cache (car oui le block `Mage_Cms_Block_Block` ne gère aucun cache !) et bien nous pouvons faire ça :

<script type="text/javascript">gist('{{page.gist}}', 'Helper.php', '16-29');</script>

## Conclusion

Certains me diront que c'est compliqué pour faire simple...

Bah moi j'ai envie de dire... c'est super pratique. Car au final quand je veux afficher un attribut j'ai juste à faire ça :

<script type="text/javascript">gist('{{page.gist}}', 'call.php');</script>

De cette manière mes modules sont indépendant les uns des autres et je n'ai qu'une seule manière de faire pour afficher mes attributs.

Et en plus ils s'affichent parfaitement dans notre template de départ ! Et tout ça « sans rien faire » !

> Bah moi si j'ai envie de filtrer le contenu de mon attribut et bah je peux ! Et en plus s'trop facile !


<!-- more end -->


