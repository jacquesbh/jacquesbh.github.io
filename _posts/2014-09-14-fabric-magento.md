---
title: "Fabric et Magento, le combo gagnant !"
layout: post
keywords: fabric magento
tags : [Fabric, Magento]
description: "Déployez vos projets Magento avec Fabric en un rien de temps !"
published: 2014-09-14 00:00:00
date: 2014-09-14 00:00:00
comments: true
gist: jacquesbh/349c538bdbf179fd333b
---

<div class="carrousel" style="height: 145px;">
    <img src="/images/posts/fabric-magento/fabric.png" width="608" height="145" />
</div>

Fabric est une librairie Python et un outil en ligne de commande pour le déploiement facile et/ou l'administration système via le protocole SSH.

Avec un simple petit fichier, le `fabfile.py`, vous allez pouvoir vous connecter sur vos serveurs, en simultané ou l'un après l'autre, et y exécuter des commandes.

Sur de petits projets c'est vraiment magique et très simple d'utilisation. Mais très vite on est confronté à un problème :

> Je veux lancer un déploiement en une seule commande mais mes serveurs ne font pas tous la même chose !

J'ai passé un bon moment à chercher une parade à tout ça tout en restant dans l'esprit de fabric ;

<!-- more start -->

---------------

Prenons un exemple concret.

Nous avons 2 serveurs :

1. Le premier [le serveur Back] est un serveur dédié au Back Office de notre e-commerce. C'est également lui qui s'occupe de la base de données (partagée entre les deux serveurs) et du cache avec un Redis.
2. Le second [le serveur Front] est un serveur dédié au Front Office. On va considérer qu'il n'a qu'un Apache pour simplifier. Evidemment il a un client MySQL et un client Redis.

Quand nous voulons déployer il nous suffit de lancer la commande :

    fab deploy

Et c'est là que nous avons un problème. La commande `deploy` peut ressembler à ceci :

<script type="text/javascript">gist('{{page.gist}}', 'deploy.py');</script>

Si on y regarde de plus près :

* La récupération des sources sur notre projet doit être exécutée à la fois sur le serveur Back et le serveur Front. Car tous les deux ont une version de notre Magento installée.  
  Le premier pour afficher le Back Office et le second pour afficher le Front Office ; Jusque là rien de bien foufou.  
  Vous noterez que le chemin d'accès aux sources doit ici être le même sur les deux serveurs : pas pratique.
* Le vidage du cache ne doit être exécuté que sur le serveur Back, car c'est lui qui gère la base de données Redis. Ça ne sert à rien de lancer cette commande sur le serveur Front car il se connecte sur le Redis du serveur Back.
* La réindexation n'a aucun intérêt à être lancée sur le serveur Front. Pour les mêmes raisons que Redis, c'est le serveur Back qui s'occupe de la base de données.  
  Même remarque pour l'emplacement des sources, on ne peut pas avoir un dossier différent.

Donc si on laisse faire cette commande `deploy` alors Fabric va planter dès le vidage du cache. Car au final sur le serveur Front… il n'y a pas de base de données Redis : donc pas de cache à vider.  
Voire même dès la récupération des sources si notre chemin n'est pas le même sur les deux serveurs !

La réindexation ne fera pas planter notre déploiement mais fera deux réindexations au lieu d'une seule ; Pas idéal…

## Et si on ajoutait des tags à nos serveurs ?

Ma solution a été de tagguer les différents serveurs.

> Celui-ci a un Redis, lui un Apache, lui il gère la base de données…

Ainsi le vidage du cache pourra se dérouler comme suit :

<script type="text/javascript">gist('{{page.gist}}', 'clean_cache.py');</script>

Seuls les serveurs avec le tag `redis` exécuteront le `run()`.

Avec cette idée de tags en tête j'ai pu faire évoluer mon `fabfile.py` de manière assez monstrueuse.  
Je peux maintenant ajouter un serveur de production simplement en ajoutant sa configuration.

## Le `fabfile.py`

Voici donc comment ça se passe concrètement.

### Déclaration des serveurs et settings de base

<script type="text/javascript">gist('{{page.gist}}', 'setting.py');</script>

Ici on déclare nos serveurs et pour chacun les informations suivantes :

* Les `tags` : Nos fameux tags !
* Le `path` : Il s'agit du chemin pour accéder à notre Magento sur le serveur.

Petit plus : On va ici gérer des tags mais aussi de la configuration propre à chaque serveur ; Comme le `path` par exemple !

### La fonction `_has_tag()`

Dans nos différentes tâches nous aurons besoin de savoir si le `host` qui est en cours a, ou n'a pas, un tag précis.

Voici la méthode :

<script type="text/javascript">gist('{{page.gist}}', 'has_tags.py');</script>

Celle-ci utilise `_get_setting()` qui permet de récupérer une configuration propre au `host` en cours (ou toute sa configuration) :

<script type="text/javascript">gist('{{page.gist}}', 'get_setting.py');</script>

À présent nous pouvons appeler la fonction `_has_tag('redis')` par exemple pour savoir si le `host` en cours utilise Redis.

### Exemple de déploiement

Voici donc un exemple de tâche de déploiement avec la configuration que nous venons de créer, dans la simplicité :

<script type="text/javascript">gist('{{page.gist}}', 'deploy_final.py');</script>

Vous noterez que nous n'avons donc plus un seul soucis. Chaque serveur exécute ses tâches et chaque serveur a son propre `path`.

## Aller plus loin

Et si on tagguait nos serveurs par environnement ?

> Celui-ci c'est un serveur de prod avec redis, mysql et apache.  
> Lui c'est un serveur de staging avec apache et mysql. Et il a un cache en fichiers car pas de redis.  
> Celui-là c'est le serveur de backup. Il a juste le droit de backuper !

Et si on a lancé une commande de backup sur un pool de serveurs de prod ?

<script type="text/javascript">gist('{{page.gist}}', 'backup.py');</script>

Je vous laisse cogiter ;)

<!-- more end -->


