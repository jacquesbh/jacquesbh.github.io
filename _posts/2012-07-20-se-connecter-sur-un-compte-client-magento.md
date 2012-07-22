---
title: Se connecter sur le compte d'un client
layout: post
description: Obtenez un bouton pour accéder au compte d'un client, pour payer par carte pour lui ou en cas de problème technique avec son compte...
keywords: php, connect as, magento
tags: [Magento]
type: howto
published: 2012-07-20 01:00:00
comments: true
permalink: /connectez-vous-sur-un-compte-client-sur-magento.html
github: jacquesbh/jbh_connectas
---

Par défaut sur la Magento Community, nous n'avons pas de fonctionnalité pour se connecter sur le compte du client.

Autant vous dire que parfois c'est quand même la _loose_. Bah ouais... le client a un problème et impossible de reproduire. De plus, lui demander de nous faire un screen pour voir comment ça se passe pour lui c'est juste... bah non en fait.

Alors la solution c'est de se connecter sur son compte, même si ça n'est pas toujours la solution miracle, souvent ça aide un peu.

Et puis on obtient d'un coup une autre fonctionnalité : on peut payer une commande pour le client par téléphone. Pratique non ?

<!-- more start -->

<hr />

Le module que nous allons développer nous allons l'appeler `Jbh_ConnectAs` et il sera dans community.

Pourquoi dans community ? Parce qu'il est [dispo en ligne][jbh_connectas], pour la communauté.

## Posons les bases

Nous avons besoin de :

- Un event pour ajouter le bouton « Connect As » sur la fiche client
- Un observer qui va attraper l'event
- Un contrôleur pour _se connecter sur le compte du client_
- Une gestion de droits pour ne pas afficher ce bouton à tout le monde

Avec ça nous avons bien sûr besoin d'un _Helper Data_, mais d'aucun block.

## Notre event

Quand on regarde bien on voit qu'on peut mettre des boutons au niveau du block `Mage_Adminhtml_Block_Customer_Edit`.
Après tout, pourquoi ne pourrions-nous pas avoir notre petit bouton orange à côté des autres ?

Ils utilisent dans le constructeur secondaire (`protected function _construct` sur tous les `Varien_Object`) la méthode `_addButton`. Pas de bol, elle est protégée... Pas super pratique pour nous ça. Pas grave, on regarde ce qu'elle fait... et là c'est le petit bonheur...

En fait il existe dans le container `Mage_Adminhtml_Block_Widget_Container` un alias public pour un certain nombre de méthodes protégées, dont notre `_addButton` :

{% highlight php %}
<?php
public function addButton($id, $data, $level = 0, $sortOrder = 0, $area = 'header')
{
    return $this->_addButton($id, $data, $level, $sortOrder, $area);
}
{% endhighlight %}

Donc si on réfléchi bien... il nous suffit de récupérer ce block avant qu'il n'affiche la fiche du client pour pouvoir y ajouter notre bouton dynamiquement.
On ne va pas se prendre la tête très longtemps sur l'évènement à attraper. Chaque action a un `event` qui annonce le début du rendu. Pour nous, c'est ça :

    controller_action_layout_render_before_adminhtml_customer_edit

Op, on a notre event :

{% highlight xml %}
<controller_action_layout_render_before_adminhtml_customer_edit>
    <observers>
        <add_connectas_button>
            <class>jbh_connectas/observer</class>
            <method>addOurCoolButton</method>
        </add_connectas_button>
    </observers>
</controller_action_layout_render_before_adminhtml_customer_edit>
{% endhighlight %}

Comme on le voit dans cet event l'observer sera `Jbh_ConnectAs_Model_Observer` et la méthode `addOurCoolButton`. Ce bout de xml sera à placer dans le tag `adminhtml` de notre `config.xml` car nous sommes sur un event lancé en partie admin.

## Les fichiers

### La config : `/app/code/community/Jbh/ConnectAs/etc/config.xml`

<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_connectas/raw/master/app/code/community/Jbh/ConnectAs/etc/config.xml"></script>

### Bien sûr notre fichier _etc/modules_ : `/app/etc/modules/Jbh_ConnectAs.xml`

<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_connectas/raw/master/app/etc/modules/Jbh_ConnectAs.xml"></script>

### Notre fichier pour les droits en admin : `/app/code/community/Jbh/ConnectAs/etc/adminhtml.xml`

<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_connectas/raw/master/app/code/community/Jbh/ConnectAs/etc/adminhtml.xml"></script>

### Notre contrôleur d'admin : `/app/code/community/Jbh/ConnectAs/controllers/Adminhtml/IndexController.php`

<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_connectas/raw/master/app/code/community/Jbh/ConnectAs/controllers/Adminhtml/IndexController.php"></script>

### Notre observeur : `/app/code/community/Jbh/ConnectAs/Model/Observer.php`

<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_connectas/raw/master/app/code/community/Jbh/ConnectAs/Model/Observer.php"></script>

### Notre helper `Data` : `/app/code/community/Jbh/ConnectAs/Helper/Data.php`

<script src="http://gist-it.appspot.com/github/jacquesbh/jbh_connectas/raw/master/app/code/community/Jbh/ConnectAs/Helper/Data.php"></script>

## Et au final ça fonctionne comment ?

A priori vous devriez voir apparaître au niveau des boutons d'actions de la fiche du client un nouveau bouton "Connect As".

N'oubliez pas que les droits sont gérés et que vous pouvez par conséquent autoriser certains rôles à utiliser cette fonctionnalité.

Il est également possible de rajouter des traductions puisque le PHP a été prévu pour. Il manque juste un peu de config et les fichiers CSV de traductions.

Merci à [Benjion pour l'article original][benjion] que j'ai eu l'occasion d'améliorer/corriger.

Well done :)



<!-- more end -->

[jbh_connectas]: http://github.com/jacquesbh/jbh_connectas "Le module Jbh_ConnectAs sur GitHub"
[benjion]: http://benjion.wordpress.com/2011/04/29/magento-se-connecter-en-tant-que-client-depuis-ladmin/
