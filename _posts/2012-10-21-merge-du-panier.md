---
title: "Supprimer le merge des paniers"
layout: post
description: "N'avez-vous jamais voulu supprimer le merge entre le panier sauvegardé du client et le panier du visiteur lorsque celui-ci se connecte ?"
keywords: magento, catalog, catalogue, product, produit, block
tags: [Magento, Cart, Customer]
type: howto
published: 2012-10-21 01:00:00
date: 2012-10-21 01:00:00
comments: true
permalink: /supprimer-le-merge-des-paniers.html
github: jacquesbh/jbh_cartmerge
---

Sur presque tous les projets Magento sur lesquels j'ai eu l'occasion de travailler il est apparu nécessaire de désactiver le merge du panier du client avec celui du visiteur lors de la connexion.

Pour cela nous devons commencer par **identifier l'évènement** lancé par Magento qui puisse nous permettre de supprimer ce fameux « merge » car aucune option en admin nous permet de l'empêcher.

<!-- more start -->

------

## Identifier l'évènement

Il suffit d'investiguer un peu :

Objet `Mage_Sales_Model_Quote`, qui est donc notre objet « panier » :

Ligne 1678 : `public function merge(Mage_Sales_Model_Quote $quote)`.

Pour vérifier que notre merge passe bien par là on y place un log : `Mage::log(__METHOD__ . ':' . __LINE__);`.

On se connecte, on ajoute un produit à notre panier, on se déconnecte, on ajoute un produit dans notre panier et on se connecte à nouveau : là on a un log qui apparaît.

Nous avons trouvé sans trop de difficultés l'endroit où est fait le merge.

On remarque dans la méthode le lancement d'un évènement intéressant :

{% highlight php %}
Mage::dispatchEvent(
    $this->_eventPrefix . '_merge_before',
    array(
    $this->_eventObject=>$this,
        'source'=>$quote
    )
);
{% endhighlight %}

A partir de là on déduit que l'évènement est `sales_quote_merge_before` et que ces deux données sont :

1.    Le panier `quote` : panier du client
2.    Le panier `source` : panier du visiteur

## La construction du module

1.    Un modèle `Observer` qui `catch` notre évènement et qui vide le panier du client.
2.    Un helper `Data` qui nous permet de savoir si notre module est activé et si on peut vider le panier du client quand celui du visiteur est vide.
3.    Un fichier `system.xml` qui nous permet d'ajouter un peu de configuation (configuration utilisée dans le helper).

### Le helper

Le helper n'est utilisé que pour savoir deux choses :

1.    Notre module est-il activé ? Ou plutôt, pouvons-nous supprimer le merge des paniers ? Via la méthode `isActive`.
2.    Pouvons-nous vider le panier du client si le panier du visiteur est vide ? Via la méthode `cleanIfEmpty`.


<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_cartmerge/raw/master/app/code/community/Jbh/CartMerge/Helper/Data.php"></script>

### Le modèle

Le modèle `catch` notre évènement est vide le panier du client que si les conditions suivantes sont validées&nbsp;:

1.    Notre module est actif.
2.    Le panier du visiteur a des produits OU on peut vider le panier du client si le panier du visiteur est vide.


<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_cartmerge/raw/master/app/code/community/Jbh/CartMerge/Model/Observer.php"></script>

### Le `system.xml`

Le `system.xml` permet d'ajouter un peu de configuration, tout simplement.

Nous ne nous prenons pas la tête avec les `ACL` car ils sont déjà gérés par Magento pour cette partie de la configuration.


<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_cartmerge/raw/master/app/code/community/Jbh/CartMerge/etc/system.xml"></script>

## Conclusion

Il est en réalité assez simple, à présent, via le module complet, ou en suivant les étapes de cet article, de supprimer le merge des paniers du visiteur et du client lors de la connexion de notre client.

Vous trouverez le [code complet du module sur github](https://github.com/jacquesbh/jbh_cartmerge).

<!-- more end -->
