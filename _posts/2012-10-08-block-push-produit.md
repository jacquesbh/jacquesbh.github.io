---
title: "Un push pour vos produits"
layout: post
description: "Apprennez comment avoir des pushs pour vos produits."
keywords: magento, catalog, catalogue, product, produit, block
tags: [Magento, Block, Module]
type: article
published: 2012-10-08 01:00:00
date: 2012-10-08 01:00:00
comments: true
permalink: /un-push-pour-vos-produits-sur-magento.html
github: jacquesbh/jbh_catalog
---

Ne vous êtes-vous jamais retrouvé à créer un block dédié au fameux « push produit » sur votre projet ?

Vous savez, le block qui affiche le produit et qu'on a envie de mettre partout, sur la homepage, sur une mise en avant ou que sais-je !

Cet article va vous montrer la meilleure manière de gérer ce problème en prenant en compte, je l'espère, une bonne partie des contraintes.

<!-- more start -->

--------

<div style="text-align: center;">
    <img alt="Push produit Magento EE" src="/images/posts/block-push-produit/push_produit_ee.png" height="272" width="161" style="border: 1px dashed gray;" />
</div>

Pour bien faire nous allons créer le module `Jbh_Catalog`.

## De quoi avons-nous besoin ?

Pour commencer, comme je l'explique souvent, nous devons déterminer vers quoi nous allons, et ce que nous allons faire. Il s'agit d'une partie d'analyse importante avant de développer.

On liste.

Nous devons :

*    Créer un block `Jbh_Catalog_Block_Product_Push` pour afficher notre produit. Nous devons prévoir que notre block puisse s'ajuster au type de produit via des templates spécifiques. On poussera un peu la chose et pour cela nous aurons besoin d'un peu de config. Nous ne gérerons pas le cache de notre block (par défaut sur Magento).
*    Créer un helper `Jbh_Catalog_Helper_Product` pour récupérer notre block. Via la méthode `getPush($product)`.
*    Créer un modèle `Jbh_Catalog_Model_Product_Push_Config` pour gérer notre configuration.

Maintenant que nous savons ce que nous devons faire, faisons-le par étape.

## La configuration

Pourquoi avons-nous besoin d'un peu de config ?

Comme tout projet e-commerce j'imagine que votre boutique comprend plusieurs types de produits.

Par défaut Magento en comprend 6 types de produits différents (+ le type `Gift Card` en EE).

L'idée c'est que bien souvent chaque type de produit a un push un peu différent. Bien souvent on affiche des infos pour un type, par pour l'autre.

Une première solution pour gérer ça est de conditionner simplement notre `phtml` avec de simples `if ($_product->getTypeId() == Mage_Catalog_Model_Product_Type_Configurable::TYPE_CODE)` par exemple.

La seconde consiste à gérer un template par type, avec un template par défaut. Si le template pour le type du produit est défini alors on l'utilise, sinon on prend celui par défaut.

Voici un exemple de configuration que nous pouvons mettre en place :

{% highlight xml %}
<jbh>
    <catalog>
        <product>
            <push>
                <modes>
                    <default>
                        <templates>
                            <default>jbh/catalog/product/push/grid/default.phtml</default>
                            <simple>jbh/catalog/product/push/grid/default.phtml</simple>
                            <giftcard>jbh/catalog/product/push/grid/default.phtml</giftcard>
                        </templates>
                    </default>
                    <list>
                        <templates>
                            <default>jbh/catalog/product/push/list/default.phtml</default>
                            <simple>jbh/catalog/product/push/list/default.phtml</simple>
                            <giftcard>jbh/catalog/product/push/list/default.phtml</giftcard>
                        </templates>
                    </list>
                </modes>
            </push>
        </product>
    </catalog>
</jbh>
{% endhighlight %}
    
De cette manière il devient très facile de changer le template pour chaque mode ou chaque type de produit. Et pourquoi pas ajouter un _mode_ ou encore un _type_ fictif ? Après tout rien ne nous empêche d'inventer un mode, par exemple `homepage_mea`, pour changer les templates de tous les produits qui sont sur la mise en avant sur notre page d'accueil...
    
### Notre modèle

Notre modèle `Jbh_Catalog_Model_Product_Push_Config` comprend les méthodes suivantes :

*    `getModes()` qui retourne le tableau de tous les modes possibles.
*    `getTemplates($mode)` qui retourne un tableau des templates par types, suivant le mode.

Bien sûr les `path` de la configuration sont dans des constantes.

<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_catalog/raw/master/app/code/community/Jbh/Catalog/Model/Product/Push/Config.php"></script>

## Le block

Notre block dépend surtout du produit et du mode que nous voulons utiliser pour l'affichage.

Pour cela nous indiquons dans notre fichier PHP que notre classe comprend les méthodes implicites suivantes :

*    `@method Jbh_Catalog_Block_Product_Push setProduct(Mage_Catalog_Model_Product $product)`
*    `@method Mage_Catalog_Model_Product getProduct()`
*    `@method Jbh_Catalog_Block_Product_Push setMode(string $mode)`
*    `@method string getMode()`

Ces méthodes sont utilisées lors de l'affichage dans la méthode `_toHtml`.

Si un template a déjà été défini (si jamais il a été forcé par exemple) alors nous ne le changeons pas.

<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_catalog/raw/master/app/code/community/Jbh/Catalog/Block/Product/Push.php"></script>

## Le helper

Notre helper est la clé de ce module car c'est lui qui va nous retourner notre block pour le produit que nous lui donnons.

Nous développons donc deux méthodes :

*    `getPush($product, $mode = null)` qui retournera le block instancié.
*    `getPushHtml($product, $mode = null)` qui retournera le HTML du block.

La première méthode fera juste une petite vérification : Notre variable `$product` est-elle bien un objet du type `Mage_Catalog_Model_Product` ? Si ça n'est pas le cas alors on considère que c'est un identifiant entier, et on `load` le produit. Ensuite on retourne notre nouveau block avec le produit et le mode dans ses données (via le `Varien_Object` hérité).

<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_catalog/raw/master/app/code/community/Jbh/Catalog/Helper/Product.php"></script>

## Comment ça marche ?

Pour utiliser notre block rien de plus simple !

Appelons simplement la méthode `getPushHtml` de notre helper :

{% highlight php %}
<?php
echo Mage::helper('jbh_catalog/product')->getPushHtml($product, $mode);
{% endhighlight %}

Le `$mode` n'est pas obligatoire.

Le `$product` peut être un produit instancié ou un entier (identifiant du produit).

## Conclusion

Il vous est maintenant très facile, via un peu de configuration, de changer les différents affichages de vos produits sans vous prendre la tête.

Rien ne vous empêche comme vous pouvez le voir de créer un mode didié à une page en particulier.

Vous pouvez [retrouver le module `Jbh_Catalog` sur Github](https://github.com/jacquesbh/jbh_catalog).

<!-- more end -->

