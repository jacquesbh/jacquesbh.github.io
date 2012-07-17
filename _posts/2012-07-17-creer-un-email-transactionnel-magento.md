---
title: Les emails customs sur Magento
layout: post
description: Apprenez à créer un email custom sur Magento.
keywords: php, email transactionnel, magento
tags: [Magento, PHP]
type: howto
published: 2012-07-17 23:35:00
comments: true
permalink: /creer-un-email-transactionnel-sur-magento.html
gist: 3132212
---

Qui n'a pas voulu envoyer un email personnalisé rapidement via Magento ?

Les utilisations sont variées :

* Offrir un code promo à l'inscription
* Informer le visiteur que son inscription à votre jeu concours est prise en compte
* Annoncer au client que vous venez de lui offrir un produit pour sa prochaine commande car c'est son anniversaire
* ...

Vous voulez faire ça ? Allez.. je vous aide :)

<!-- more start -->

<hr/>

Le but de ce tutoriel est de vous montrer comment envoyer un email simplement depuis votre application.

Il s'agit d'envoyer un email transactionnel, pas une newsletter !

On va donc envoyer un email comprenant quelques informations sur le client (son nom par exemple) ainsi qu'un petit message.

## Le mail

Sans trop se prendre la tête, voici le mail que nous voulons envoyer :

    Bonjour {name},

    Aujourd'hui est un jour spécial.

    Toute l'équipe de {nom de la boutique} vous souhaite un joyeux anniversaire !

    A bientôt sur notre boutique,

    L'équipe de {nom de la boutique}

En soit rien de compliqué, si ?

Nous utiliserons un email au format _texte_. Vous verrez qu'il ne sera pas bien compliqué de transformer ce mail dans une version colorée en HTML.

### C'est quoi son nom ?

Pour bien comprendre le truc, il faut que nous donnions un nom à notre email.

On va donc prendre le nom de notre module (*Jbh_Demo*) et y ajouter le mot _email_ avec à la fin le nom "réel" de notre email : _happyday_.

        jbh_demo
                 email
                       happyday
    ==> jbh_demo/email/happyday
    ==> jbh_demo_email_happyday

Ok... Mais l'identifiant qu'on vient de créer, il sert à quoi ?

Le premier c'est l'identifiant de la configuration qui permettra d'échanger l'email en dur (dans le fichier html) avec un email créé manuellement (via l'admin).

Le second c'est l'identifiant de notre email, en général.

## La config

Editons notre fichier `/app/code/local/Jbh/Demo/etc/config.xml`.

<script src="https://gist.github.com/3132212.js?file=app-code-local-Jbh-Demo-etc-config.xml"></script>

Une partie `template` dans `global` consiste à indiquer à Magento que nous avons un nouvel email transactionnel dans l'application.

La partie `default` permet d'avoir en config l'identifiant de notre email. Vous remarquerez que la hiérarchie de la configuration par défaut suit parfaitement le schéma expliqué un peu plus haut : `jolie_demo > email > happyday`.

N'oubliez pas le fichier `/app/etc/modules/Jbh_Demo.xml` :)

<script src="https://gist.github.com/3132212.js?file=app-etc-modules-Jbh_Demo.xml"></script>

## Notre fichier email

Editons notre fichier `/app/locale/fr_FR/template/email/jbh_demo/happyday.html` :

Nous avons besoin de respecter la syntaxe des emails sur Magento :

* Un titre avec la balise `<!--@subject Jouyeux anniversaire ! @-->`
* Un style optionnel avec la balise `<!--@styles ... ici mon css ... @-->`
* Un contenu avec ou sans variables

Je vous laisse le soin de regarder les autres emails pour comprendre l'utilisation des variables. Ici nous feront juste en sorte que nos textes soient protégés.

<script src="https://gist.github.com/3132212.js?file=app-locale-fr_FR-template-email-jbh_demo-happyday.html"></script>

## Notre modèle

Editons maintenant notre fichier `/app/code/local/Jbh/Demo/Model/Email.php` :

Il s'agit d'un simple modèle avec une méthode qui envoie un email au client passé en paramètre.

On notera la présence de deux constantes. Comme on le fait dans Magento, on utilise des constantes pour indiquer les chemins vers les variables de configuration. Ici nous avons les chemins vers le template et l'expéditeur du mail.

<script src="https://gist.github.com/3132212.js?file=app-code-local-Jbh-Demo-Model-Email.php"></script>

## Et ensuite ?

Bah ensuite... il faut utiliser notre modèle !

{% highlight php %}
<?php

/* @var $customer Mage_Customer_Model_Customer */

Mage::getSingleton('jbh_demo/email')->happyday($customer);
{% endhighlight %}


Voilà ! Vous savez maintenant créer des emails rapidement.
Rien de bien compliqué en fait !

Vous avez des questions ? Des remarques ? Les commentaires sont là pour ça.

<!-- more end -->
