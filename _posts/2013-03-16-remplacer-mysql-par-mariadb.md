---
title: "Merci MySQL pour tes loyaux services"
layout: post
description: "Allez, on remplace notre MySQL par MariaDB !"
keywords: mariadb mysq
tags: [MariaDB, MySQL]
type: howto
published: 2013-03-16 14:00:00
date: 2013-03-16 14:00:00
comments: true
gist: jacquesbh/5176248
---

Il est temps de dire _Au revoir_ à [MySQL][mysql] !

<div class="center"><img src="/images/posts/remplacer-mysql-par-mariadb/sealstar.png" alt="MariaDB Captains Logo" title="MariaDB Captains Logo" /></div>

> Phoque you Oracle!

Allez, _rapidos_, voici les étapes pour installer [MariaDB][maria] sur une [Debian Squeeze][squeeze].

<!-- more start -->

--------

## Pour une Debian Squeeze

_[Plus bas vous trouverez ce qu'il faut](#other-distro) si vous n'êtes pas sur la même distribution._

On commence par ajouter la signature des dépôts :

<script type="text/javascript">gist('{{page.gist}}', 'add_keys.sh');</script>

Ensuite on édite notre fichier `/etc/apt/sources.list` :

<script type="text/javascript">gist('{{page.gist}}', 'add_repos.sh');</script>

On y ajoute les lignes des dépôts :

<script type="text/javascript">gist('{{page.gist}}', 'sources.list');</script>

Et on installe :

<script type="text/javascript">gist('{{page.gist}}', 'install.sh');</script>

Suivez les étapes de l'installation normalement. Si possible mettez le même mot de passe `root` que celui qui était sur _MySQL_ afin de ne pas perdre vos connexions enregistrés (par exemple).

Et voilà ! Rien de plus simple !

A présent si vous tapez la commande `mysql` vous tomberez sur le serveur [MariaDB][maria].

> Hey c'est trop cool ! Même pas besoin de migrer les bases ! C'est totalement transparent !

Eh ouais ! &lt;3

<div id="other-distro"></div>

## Les autres distrib

Voici la page qui vous permettra d'installer MariaDB sur une autre distribution :

[https://downloads.mariadb.org/mariadb/repositories/](https://downloads.mariadb.org/mariadb/repositories/)

<!-- more end -->

[mysql]: http://www.mysql.com/
[maria]: https://mariadb.org/en/
[squeeze]: http://www.debian.org/releases/squeeze/
