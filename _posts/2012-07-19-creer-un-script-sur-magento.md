---
title: Les scripts Magento
layout: post
description: Réalisez vos propres scripts PHP sur Magento.
keywords: php, script, shell, magento
tags: [Magento, PHP]
type: howto
published: 2012-07-19 01:20:00
comments: true
permalink: /realisez-vos-propres-scripts-php-sur-magento.html
gist: 3139595
---

Nous sommes tous confrontés à un moment ou à un autre à devoir palier un problème rapidement sur un site en production.

Le problème le plus souvent doit se régler avec un script shell. Un script shell ok... mais en PHP !
Hors de question de se taper le script bash/python ou autre alors qu'on a besoin de charger Magento, d'accéder à la base etc.

Et surtout... il faut bien l'avouer, pouvoir accéder à la config, aux modèles et autres collections... bah c'est quand même bien pratique !

<!-- more start -->

<hr />

Tout d'abord il faut déterminer un endroit où nous pouvons stocker nos scripts...

J'ai pour habitude de faire un répertoire `/misc`. Alors je vais la garder et c'est dans ce répertoire que nous allons créer nos fichiers.

    $ mkdir misc
    $ vim misc/change_admin_password.php

Tant qu'à faire... autant réaliser un script pratique :)

On commence donc par charger Magento :

{% highlight php %}
<?php

// Mage !
require_once __DIR__ . '/../app/Mage.php';

// Init Magento
Mage::app('admin');

// Init store (needed for save products for example)
Mage::app()->setCurrentStore(Mage_Core_Model_App::ADMIN_STORE_ID);
{% endhighlight %}

Peut-être qu'avant ça il serait préférable de tester la validiter de notre ligne de commande ?

{% highlight php %}
<?php

// Usage function :)
function usage()
{
    echo "Usage: php -f " . basename(__FILE__) . " <username>\n";
    exit(65);
}

// Check command line
if ($argc != 2) {
    usage();
}
{% endhighlight %}

Une fois qu'on a notre utilisateur, on le charge et on vérifie qu'il existe bien :

{% highlight php %}
<?php

// We get the user
$user = Mage::getModel('admin/user')->load($argv[1], 'username');

// User exists?
if (!$user->getId()) {
    echo "Bad username.\n\n";
    usage();
}
{% endhighlight %}

Ensuite on demande le mot de passe et on met à jour l'utilisateur :

{% highlight php %}
<?php

// We ask for the password
do {
    echo "Which password? ";
    $password = trim(fgets(STDIN));
} while (!$password);

// We change the user password :)
$user->setNewPassword($password)->save();

echo "User updated\n";

exit(0);
{% endhighlight %}

On exécute :

    $ php misc/change_admin_password.php jacques
    Which password? monSuperPassword      
    User updated
    $

<hr />

Voilà ce que ça donne :

<script src="https://gist.github.com/3139595.js?file=misc-change_admin_password.php"></script>

<hr />

Sauf qu'on a un problème... Là le script est super simple.

Et pour régler votre urgence vous avez besoin de vous mettre dans un environnement de "setup". En gros vous voulez être comme dans le fameux `mysql4-install-0.1.0.php` ;)

Pour récupérer un setup de l'EAV par exemple (pour pouvoir faire des `getAttributeId`) :

{% highlight php %}
<?php
$setup = Mage::getModel('eav/entity_setup', 'eav');

// Op le SQL !
// $setup->run($sql);
{% endhighlight %}

Pour récupérer une connection et une ressource :

{% highlight php %}
<?php
$res = Mage::getSingleton('core/resource');
$cn = $res->getConnection('core_write');

// Nom d'une table ?
// $res->getTableName('foo');

// Un select ? (Zend_Db_Select)
// $select = $cn->select();
{% endhighlight %}

Voilà, à vous de jouer ! Et n'hésitez pas à partager vos scripts dans les commentaires, c'est toujours bon à prendre :)

<!-- more end -->


