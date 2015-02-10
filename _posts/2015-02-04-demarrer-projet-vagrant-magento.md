---
title: "Comment utiliser Vagrant et Magento ?"
layout: post
keywords: vagrant magento
tags : [Vagrant, Magento]
description: "Apprenez votre projet Magento avec la box Vagrant de Monsieur Biz !"
published: 2015-02-04 00:00:00
date: 2015-02-04 00:00:00
comments: true
---

Ça fait plusieurs fois qu'on me demande comment on utilise Vagrant chez [Monsieur Biz][mbiz].

J'ai donc décidé de faire un article malgré le peu de temps que j'ai à ma disposition en ce moment.

L'idée c'est de vous montrer comment on fonctionne.
Après libre à vous de nous faire quelques PR sur Github, ou encore de ne pas utiliser notre box, tout simplement !

Je vous expliquerai aussi pourquoi nous ne passons pas sur Docker pour le moment.

Pour les plus impatients, vous trouverez la [Vagrant Box Magento de Monsieur Biz sur Github][box].

<!-- more start -->

---------------

Pour ceux qui ne sont pas habitués à Vagrant, sachez que ça n'est pas très compliqué.  
Par ailleurs je vais essayer de donner un maximum d'explications.

_NB : Je suis exclusivement sur Mac. Donc il est très très fort probable que la box ne fonctionne pas pour vous si vous êtes sur Windows ou Linux._

## Le Vagrantfile

Ce fichier est le point de départ de votre Vagrant. Je vais tenter d'expliquer celui que j'ai réalisé.

<script src="http://gist-it.appspot.com/https://github.com/monsieurbiz/vagrant-magento/blob/master/Vagrantfile"></script>

Au tout début il s'agit de quelques commentaires pour dire à Vim d'utiliser la syntax de ruby.  
Ensuite vient le nom d'hôte de votre projet, ici `vagrant-mage.dev`. On utilise `.dev` car ça permet d'éviter la résolution des DNS.
Juste en dessous on a l'IP utilisée pour Virtualbox. Si vous utilisez Virtualbox, faites en sorte ici d'avoir une IP différente pour chacun de vos projets.

Bon ensuite viennent les deux lignes qui permettent de rentrer dans la configuration de la box à proprement parler :

    VAGRANTFILE_API_VERSION = "2"
    Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

Là on entre simplement dans la configuration, comme l'indique bien le `Vagrant.configure`.

Au tout début on a la configuration pour VMWare :

* On sélectionne précisément la box qu'on veut télécharger (elle ne l'est qu'une seule fois) ;
* On précise la puissance de la VM ;
* On ajoute une seconde interface ethernet. L'idée ici c'est d'avoir une seconde adresse IP dispo sur VM sur le même sous-réseau que la machine hôte. On utilise cette interface pour tester nos sites sur des machines virtuelles Windows.

Ensuite il y a une configuration pour Virtual Box :

* Même chose on précise la box qu'on veut utiliser ;
* On améliore un peu les perfs de Virtual Box ;
* On assigne l'adresse IP qui est en haut du fichier.


**Pourquoi choisir VM Ware et pas Virtual Box ?**

> Je suis parti du constat que Virtual Box est lent. La copie des fichiers, si ça n'est pas en NFS, est basée sur la solution native de Virtual Box : une horreur.  
> Finalement au bout de quelques mois j'ai tout simplement testé VMWare. Il s'avère que ma machine de dev basée sur Vagrant et VMWare est tout aussi rapide, voire plus rapide, que les serveurs de prod. Donc je n'ai pas cherché plus longtemps, le choix était fait.

Ensuite on a un peu de configuration réseau. Et surtout l'assignation du hostname à la ligne `config.vm.hostname`.

Le plus important c'est les dossiers partagés. On utilise NFS afin de gagner en performances (c'est "juste" ce qu'on utilise entre les serveurs pour partager des dossiers…).  
[Ivan Chepurnyi][ivan] et moi-même nous sommes amusés fin 2013 lors d'un Hackathon à Leipzig en Allemagne à améliorer les performances de NFS. C'est pour cette raison qu'on y trouve plein de trucs étranges du genre :

    mount_options: ["nolock", "async"],
    bsd__nfs_options: ["alldirs","async","nolock"]

À noter que les options `bsd__nfs_options` sont dédiées à OSX (et à BSD du coup…) ;

Les lignes suivantes permettent de modifier le fichier `/etc/hosts` de votre machine afin de ne pas s'embêter avec l'IP auto-assignée par VMWare à la machine virtuelle :

    # "Provision" with hostmanager
    config.vm.provision :hostmanager

Ensuite on initialise la Vagrant avec Puppet !

On y retrouve quelques paramètres de personnalisation. Les voici expliqués avec des commentaires :

<script>gist('jacquesbh/cab7770ec953e653379d', 'factors.rb');</script>

Le dernier truc sympa c'est ça :

<script>gist('jacquesbh/cab7770ec953e653379d', 'localfile.rb');</script>

Ici c'est très simple. Si vous avez un fichier `LocalVagrantfile.rb` à la racine de votre projet (au même endroit que le `Vagrantfile` et bien celui-ci sera chargé.  
Ça permet d'avoir un fichier dédié à votre projet, ou un fichier juste pour vous.  
Personnellement ce fichier est dans mon `~/.gitignore`. Ainsi je peux ajouter des interfaces réseau, faire un peu de custom, etc. et ça uniquement pour moi !

## Et sinon, elle contient quoi ta Vagrant ?

La box contient plein de choses !

Entre autres :

* [L'Installer pour Magento (_a PHP command line tool for Magento extension development and scaffolding_)][installer] accessible par défaut ;
* [Magerun][magerun] ;
* [Modman][modman] ;
* Deux certificats SSL : `*.vagrant-mage.dev` et `[www.]vagrant-mage.dev` (car ici le hostname est sur `vagrant-mage.dev` mais si vous le changez alors les certificats seront adaptés par Puppet) ;
* Du coup 3 `VirtualHost` sur Apache qui gèrent les domaines suivants en `http` et `https` : `*.vagrant-mage.dev` et `vagrant-mage.dev`. C'est super pratique si vous voulez tester votre projet avec un SSL. Surtout que maintenant c'est une bonne pratique d'être full SSL.
* Mailcatcher : Afin qu'aucun email ne se disperse dans l'Internet Mondial hein. Pour le lancer c'est simple : `mailcatcher --ip=0.0.0.0`.
* Quelques outils : `git`, `tmux` (avec [config perso][tmux-perso]), `screen` (avec [config perso][screen-perso], `htop` et `vim`.
* [CasperJS][casper], et donc du coup [PhantomJS][phantom].
* [Composer][composer]
* [PHPUnit][phpunit]
* MySQL évidemment. Du coup si vous avez un fichier `database.sql.gz` à la racine de votre projet (avec votre `Vagrantfile`) alors il sera importé au premier lancement.

## Installer hostmanager

`hostmanager` est un petit plugin vagrant qui permet de modifier votre fichier `/etc/hosts` comme je l'indique un peu plus haut dans l'article. Pour l'installer :

    vagrant plugin install vagrant-hostmanager

## Comment démarrer un projet avec la Vagrant Box Magento ?

Commencez par cloner le projet où vous voulez : `git clone https://github.com/monsieurbiz/vagrant-magento.git`

Ensuite créez le dossier de votre projet et copiez-y les fichiers et dossiers `Vagrantfile` et `puppet/`.  
Le dossier `htdocs/` doit exister également, c'est dans celui-ci que vous mettrez votre projet Magento.

C'est parti pour un `vagrant up` !

Là ça va tout installer et tout et tout…

Ensuite rendez-vous dans votre navigateur sur `http://vagrant-mage.dev` ou `https://vagrant-mage.dev`.

Pensez à aller en SSH dans votre dossier Magento : `vagrant ssh` puis `cd /vagrant/htdocs`.  
Là vous pouvez lancer `magerun` par exemple ! Ou encore `installer` !

## C'est fini !

J'ai rédigé cet article très très rapidement, alors si vous avez des remarques ou questions, n'hésitez pas !

:)

<!-- more end -->

[phantom]: http://phantomjs.org/
[casper]: http://casperjs.org/
[composer]: https://getcomposer.org/
[phpunit]: https://phpunit.de/
[screen-perso]: https://github.com/jacquesbh/dotfiles/blob/master/.screenrc
[tmux-perso]: https://gist.github.com/jacquesbh/9187257
[magerun]: https://github.com/netz98/n98-magerun
[modman]: https://github.com/colinmollenhour/modman
[installer]: https://github.com/jacquesbh/installer
[ivan]: https://github.com/IvanChepurnyi
[mbiz]: http://monsieurbiz.com
[box]: https://github.com/monsieurbiz/vagrant-magento


