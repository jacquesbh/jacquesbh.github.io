---
title: Utiliser l'Installer - Créer un grid en admin
layout: post
description: L'Installer est très pratique et permet de gagner un temps fou ! Apprenez à l'utiliser.
keywords: magento, installer
tags: [Magento, "The Installer"]
type: howto
published: 2012-08-14 01:15:00
date: 2012-08-14 01:15:00
comments: true
gist: 3344499
permalink: /apprendre-a-utiliser-magento-installer.html
---

Dans mon article précédent je dévoile mon **Installer**.

Pour vous permettre de prendre en main et vous montrer les possibilités de l'outil je vais vous montrer comment faire un simple grid en admin, en 13mn et 30s.

A vos marques...

<!-- more start -->

<hr />

Tout d'abord on commence par déterminer ce dont nous avons besoin :

1.  Un module `Jbh_Grid`
2.  Un modèle `Foo`, une ressource `Foo` et une collection `Foo_Collection`
3.  Un routeur admin et son menu
4.  Un contrôleur admin
5.  2 blocs pour constituer le grid en admin (le container et le grid)
6.  Un setup MySQL
7.  Un helper Data pour les traductions, ainsi qu'un fichier de traductions `.csv`

Nous ne verrons pas ici comment faire le formulaire pour ajouter/éditer notre objet `Foo`.

## Création des fichiers grâce à l'Installer

Lançons l'outil : ([Voir le README][readme_function])

    $ jbh
    The Installer - by jacquesbh
    >

On commence par créer notre module :

    > mod jbh grid local
    Using: Jbh_Grid in local
    Jbh_Grid>

Notez qu'on peut lancer l'Installer directement sur le module que l'on souhaite :

    $ jbh jbh grid local
    The Installer - by jacquesbh
    Using: Jbh_Grid in local
    >

Ensuite passons à notre "entité" :

    Jbh_Grid> ent foo jbh_grid_foo

Vous pouvez bien sûr ne taper que `ent` ou `entity` et suivre les instructions :

    Jbh_Grid> entity
    Entity?
    > foo
    Table?
    > jbh_grid_foo

A ce stade nous avons tous nos modèles.

Le routeur en admin :

    Jbh_Grid> r admin foo_adminhtml

Pour le menu il nous faudra éditer manuellement le fichier `etc/adminhtml.xml` de notre module.

(N'y oublions pas les ACL ;))

Ensuite il nous faut notre contrôleur admin avec l'action grid :

    Jbh_Grid> c adminhtml_index grid

Nous en sommes à l'étape où il nous faut créer le grid...

2 possibilités :

*  Soit : créer le grid bloc après bloc, initialiser les blocs etc.
*  Soit : utiliser la commande grid qui fait (presque) tout à notre place

Le choix est vite fait...

    Jbh_Grid> grid foo

Il nous faut le setup pour créer notre table en base de données !

    Jbh_Grid> setup

On termine par notre Helper Data : (vide)

    Jbh_Grid> h data -

## Résumé des commandes

Une fois que vous connaissez les commandes (alias + ordre des arguments) vous pouvez aller vraiment vite !

Vraiment vite... On reprend, en 30 secondes :

    $ jbh jbh grid local
    The Installer - by jacquesbh
    Using: Jbh_Grid in local
    Jbh_Grid> ent foo jbh_grid_foo
    Jbh_Grid> r admin foo_adminhtml
    Jbh_Grid> c adminhtml_index grid
    Jbh_Grid> grid foo
    Jbh_Grid> setup
    Jbh_Grid> h data -
    Jbh_Grid>

## Le SQL de notre table

Réfléchissons 3 minutes pour construire notre table en base de données :

{% highlight sql %}
CREATE TABLE `jbh_grid_foo` (
  `foo_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'The Foo ID',
  `text` text COMMENT 'The text of our Foo',
  `created_at` datetime NOT NULL COMMENT 'Creation date',
  `updated_at` datetime NOT NULL COMMENT 'Update date',
  PRIMARY KEY (`foo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
{% endhighlight %}

Complétons notre setup :

<script src="https://gist.github.com/3344499.js?file=app/code/local/Jbh/Grid/sql/jbh_grid_setup/mysql4-install-0.1.0.php"></script>

## Notre menu admin

Il nous faut éditer notre fichier `etc/adminhtml.xml` pour ajouter notre menu et les ACLs :

<script src="https://gist.github.com/3344499.js?file=app/code/local/Jbh/Grid/etc/adminhtml.xml"></script>

## Notre contrôleur admin

On ajoute avant tout la méthode `_isAllowed()` à notre contrôleur :

    Jbh_Grid> c adminhtml_index _isAllowed:bool

On complète assez rapidement !

<script src="https://gist.github.com/3344499.js?file=app/code/local/Jbh/Grid/controllers/Adminhtml/IndexController.php"></script>

## Complétons notre grid

Il nous faut ajouter les colonnes à notre grid ainsi que le configurer un minimum...

### Le container

<script src="https://gist.github.com/3344499.js?file=app/code/local/Jbh/Grid/Block/Adminhtml/Foo.php"></script>

### Le grid

<script src="https://gist.github.com/3344499.js?file=app/code/local/Jbh/Grid/Block/Adminhtml/Foo/Grid.php"></script>

## N'oublions pas les traductions !

    Jbh_Grid> __
    Where? (enter for front)
    > admin
    Translate?
    > Foo #
    Traduction for fr_FR?
    > Foo ID
    Traduction for en_US?
    > 
    Jbh_Grid> __
    Translate?
    > Text
    Traduction for fr_FR?
    > Texte
    Traduction for en_US?
    > 
    Jbh_Grid> __
    Translate?
    > Manage Foos
    Traduction for fr_FR?
    > Gérer les Foos
    Traduction for en_US?
    > 
    Jbh_Grid>

Vous aurez remarqué que lors de l'ajout de la première ligne dans les fichiers de traduction l'Installer nous demande où nous voulons ajouter nos traductions. Tout simplement parce que la manipulation des traductions implique l'ajout d'un bout de config à notre module.

Et ça donne ça, pour le français par exemple :

<script src="https://gist.github.com/3344499.js?file=app/locales/fr_FR/Jbh_Grid.csv"></script>

## Conclusion

Au final...

*   30 secondes pour créer notre architecture
*   3 minutes pour créer le SQL et compléter le setup
*   5 minutes pour le fichier `adminhtml.xml`
*   5 minutes pour terminer le grid

Ce qu'on obtient : Un module propre, développé avec les conventions `Zend Framework`, sans erreur de config.

Surtout... le `config.xm`l... `<3 <3 <3`

<script src="https://gist.github.com/3344499.js?file=app/code/local/Jbh/Grid/etc/config.xml"></script>

Le bonheur quoi...

Vos avis sont les bienvenus !

Vous pouvez [télécharger ce module][download].

<!-- more end -->

[readme_function]: https://github.com/jacquesbh/Installer/tree/v1#bash-function-required
[download]: https://gist.github.com/gists/3344499/download
