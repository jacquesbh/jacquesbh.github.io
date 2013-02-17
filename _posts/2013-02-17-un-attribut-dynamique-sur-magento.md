---
title: "Un attribut dynamique"
layout: post
description: "Il est temps de ne pas perdre de temps avec les attributs à valeur multiple !"
keywords: eav, magento, attribute,
tags: [Magento, Attributes, Product, EAV, Module]
type: article
published: 2013-02-17 19:20:00
date: 2013-02-17 19:20:00
comments: true
github: jacquesbh/Jbh_DynamicField
gist:
---

Parfois il est nécessaire de faire des développements un peu _borderline_...

Aujourd'hui je vais vous expliquer comment j'ai réalisé un petit module afin de permettre d'ajouter une valeur à un attribut de type `select` ou `multiselect`... **sans quitter la page d'édition du produit** _(ou de la catégorie)_. Directement depuis le champ de l'attribut.

Sur Magento on peut avoir un _Backend Model_ sur un attribut, dans le but de valider son contenu, ou encore de faire des manipulations avant et/ou après sa sauvegarde/récupération. Je vais profiter de cette fonctionnalité !

Il s'avère qu'on peut aussi avoir un champ HTML personnalisé en admin très facilement.

Au final c'est pas bien compliqué et le module `Jbh_DynamicField` est réutilisable ;)

Je vous explique ?

**Let's go! Borderline!**

<!-- more start -->

--------

Pour commencer je vous explique ce que fait ce champ dynamique :

!["Le champ dynamique"][dynamic_field]

L'idée c'est que si vous remplissez le champ _Nouvelle valeur_ alors la valeur entrée sera ajoutée aux options possibles pour l'attribut concerné.  
Quand le champ est de type `select` alors l'option sera en plus assignée à l'attribut. Si c'est un attribut `multiselect` alors l'option sera ajoutée aux options déjà sélectionnées.

Il faut noter qu'un évènement est lancé lorsqu'une option est ajoutée. C'est très pratique quand on veut effectuer une action lors de l'ajout d'une option.  
Par contre attention ! Aucun évènement n'est lancé quand une option est ajoutée via l'administration des attributs !

## Un champ HTML personnalisé

Magento permet, via la colonne `frontend_input_renderer`, de la table `catalog_eav_attribut`, de changer le `renderer` (le block qui fait le rendu HTML) de l'attribut dans les formulaire où celui-ci est utilisé.

J'ai donc ajouté deux nouveaux blocks :

1.  `Jbh_DynamicField_Block_Adminhtml_Catalog_Product_Renderer_Select` pour gérer les attributs de type `select`.
2.  `Jbh_DynamicField_Block_Adminhtml_Catalog_Product_Renderer_Multiselect` pour gérer les attributs de type `multiselect`.

Ces deux blocks sont simples. Ils ajoutent un champ nommé `jbh_dynamicfield_CODE` dans notre formulaire, avec `CODE` qui est le code de l'attribut.

Voici le block `Jbh_DynamicField_Block_Adminhtml_Catalog_Product_Renderer_Select` :

<script src="http://gist-it.appspot.com/github/jacquesbh/Jbh_DynamicField/raw/master/app/code/community/Jbh/DynamicField/Block/Adminhtml/Catalog/Product/Renderer/Select.php"></script>

Le block `Jbh_DynamicField_Block_Adminhtml_Catalog_Product_Renderer_Multiselect` est identique au niveau de la méthode `getElementHtml` mais les deux blocks n'étendent pas la même classe. Les traits de PHP seraient ici une bonne alternative à ce copier/coller.

## Une sauvegarde améliorée

Cette fois c'est dans la table `eav_attribute` et via la colonne `backend_model` que Magento nous permet de modifier la sauvegarde (et/ou le chargement) de notre attribut.

J'ai donc logiquement créé deux nouveaux modèles :

1.  `Jbh_DynamicField_Model_Catalog_Product_Attribute_Backend_Select` pour gérer les attributs de type `select`.
2.  `Jbh_DynamicField_Model_Catalog_Product_Attribute_Backend_Multiselect` pour gérer les attributs de type `multiselect`.

Des deux modèles permettent d'ajouter une option à notre attribut si le champ supplémentaire ajouté par le `renderer` contient quelque chose.

L'idée c'est donc de récupérer le code de l'attribut, puis le nom du champ supplémentaire.  
Ensuite on effectue une vérification simple pour savoir s'il contient quelque chose.  
Si c'est le cas alors on ajoute la nouvelle option. _Aucune déduplication n'est effectuée ici._  
Un évènement est lancé si une option a été ajoutée.

Et en dernier on sauvegarde la nouvelle option dans notre objet.

Rien de mieux pour bien comprendre qu'un exemple.  
Voici le modèle qui gère les `multiselect` :

<script src="http://gist-it.appspot.com/github/jacquesbh/Jbh_DynamicField/raw/master/app/code/community/Jbh/DynamicField/Model/Catalog/Product/Attribute/Backend/Multiselect.php"></script>

De manière générale les deux modèles font la même chose.

La différence se situe tout d'abord dans le modèle parent. Le _select_ étend le modèle `abstract` alors que le _multiselect_ le `array`.  
Ensuite la manière dont la valeur est changée quand une option a été ajoutée change aussi un peu, surtout au niveau du _multiselect_.

Notez que l'évènement lancé, dans le cas où une option est ajoutée, est le suivant :

*   Nom : `jbh_dynamicfield_attribute_CODE_option_added` où `CODE` est le code de l'attribut principal.
*   Données :
    *   `object` : Votre produit/catégorie.
    *   `code` : Le code de votre attribute. (que vous connaissez puisque vous utilisez un event qui porte son nom !) Il est là afin de permettre des actions dynamiques.
    *   `option` : Un tableau qui contient l'identifiant de la nouvelle option et sa valeur textuelle. Respectivement les clés `id` et `value`.

## Borderline ?

Au final je n'ai pas expliqué pourquoi un tel développement est, selon moi, un peu bordeline.

Tout d'abord il n'y a aucune gestion des stores et donc de la possible traduction de l'option.  
L'ajout d'une nouvelle option implique la sauvegarde du produit ou de la catégorie afin d'être prise en compte... On aurait préféré avoir un peu d'ajax afin d'ajouter plusieurs options en même temps !  
Il n'y a aucune gestion des problèmes de duplication d'options qu'un tel système engendre.

Ce développement est vraiment pratique mais il est important que les personnes qui manipulent l'administration soient formées sur le fonctionnement de ce système.

Si vous souhaitez [améliorer le module `Jbh_DynamicField` : c'est sur github !][module].

<!-- more end -->

[module]: https://github.com/jacquesbh/Jbh_DynamicField
[dynamic_field]: /images/posts/un-attribut-dynamique-sur-magento/dynamic-field.png "Le champ dynamique"
