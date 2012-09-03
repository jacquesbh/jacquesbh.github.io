---
title: "Git en entreprise"
layout: post
description: "Git à plusieurs... Quelles branches ? Quelles commandes ? Comment ?"
keywords: git, workflow
tags: [Git, Workflow]
type: article
published: 2012-09-03 02:00:00
date: 2012-09-03 02:00:00
comments: true
permalink: /git-en-entreprise.html
gist: 3607757
---

Je suis actuellement en poste dans deux entreprises :

1.	Lead développeur chez [JolieBox][joliebox], où je passe mes connaissances car mon départ est prévu pour le 1er octobre 2012.
2.	Lead développeur chez [Internim][internim] où j'arrive petit à petit pour prendre en main tout ou partie du Lead sur certains projets et pour animer un peu les développeurs.

J'ai une problématique qui se présente à la fois chez JolieBox et à la fois chez Internim : __Notre workflow git__.

L'idée de cet article est de permettre aux développeurs de savoir quelles commandes utiliser, et dans quels cas !

Rien de mieux qu'un bon exemple. Vous allez avoir du concret !

[joliebox]: http://joliebox.com
[internim]: http://www.internim.com

<!-- more start -->

---------

## Les branches

Avant mon arrivée chez Internim nous avons décidé, chez JolieBox, de travailler avec une branche par développeur.

Chaque développeur a donc une branche qui lui est propre, nommée le plus souvent par son pseudo ou son nom : `jbh` pour moi !

A ce moment là nous avons établi le fonctionnement :

*	Une branche par développeur.
*	Une branche `master`.
*	Une branche `dev` si besoin.
*	Une branche supplémentaire par gros lot de développements.

A mon arrivée chez Internim j'ai découvert que le fonctionnement était le même sur les projets sous _Git_, avec quelques branches en plus :

* Une branche `integration` qui contient donc l'intégration du projet (agence web oblige).
* Une branche `recette` qui contient la dernière release du projet.
* Une branche `demo` qui permet surtout d'avoir une environnement adapté.

Nous sommes donc sur un schéma assez complexe car nous avons un minimum de 3 branches chez JolieBox et 6 branches chez Internim.

Si à cela on ajoute au moins 3 ou 4 branches pour les développeurs, ça devient rapidement un beau bordel. Et nous ne sommes pas dans des process de releases comme _Debian_ ou autre.

## Les développements

J'ai lu [un très bon article](http://nvie.com/posts/a-successful-git-branching-model/) qui résume bien le fonctionnement que je vais vous expliquer ici.

### git commit

On ne vous la présente pas ! Comment faire nos commits sans cette ligne de commande ?

La meilleure.

### git checkout

La commande `git checkout` permet donc de changer de branche.
Elle est utilisée dans le cas où on doit se placer dans l'état d'une autre branche (la `master` pour un _hotfix_ par exemple).
Elle est aussi utilisée avant de faire un `git merge`.

### git merge

La commande `git merge` permet de _merger_ une branche sur la branche courante.

Imaginez que vous êtes sur la branche `jbh` et que vous devez merger cette branche `jbh` sur la `master` :

	$ git checkout master
	$ git merge jbh
	
Rien de plus.

L'option `--no-ff` permet de ne pas faire de _fast-forward_ et de forcer la création d'un commit.

### git cherry-pick

J'adore cette commande. Elle permet de récupérer un commit...

> (RTFM)
> 
> git-cherry-pick - Apply the changes introduced by some existing commits

Je l'utilise quand je dois appliquer un hotfix sur ma branche par exemple. Plutôt qu'un merge...

## Par l'exemple

Rien ne vaut un exemple pour bien comprendre tout ça.

Prenons les branche suivantes :

*	master
*	dev
*	recette
*	demo
*	dev1 (développeur 1)
*	dev2 (développeur 2)
*	dev3 (développeur 3)

Et établissons l'historique suivant : (Espace de travail du _Développeur 2_)

	* Added f  (origin/dev3)
	* Added e 
	| * Added d  (HEAD, origin/dev2, dev2)
	| * Added c 
	|/  
	| * Added b  (origin/dev1)
	|/  
	* Added a  (origin/recette, origin/master, origin/dev, origin/demo, origin/HEAD, master)

On peut voir que les développeurs on avancé chacun de leur côté au départ de la master.

### La branche `dev`

Le _Développeur 2_ veut merger sa branche sur la `dev` car il a terminé ses développements :

	$ git checkout dev
	$ git merge --no-ff dev2
	$ git push

Et voici ce que ça donne :

	*   Merge branch 'dev2' into dev  (HEAD, origin/dev, dev)
	|\  
	| * Added d  (origin/dev2, dev2)
	| * Added c 
	|/  
	| * Added f  (origin/dev3)
	| * Added e 
	|/  
	| * Added b  (origin/dev1)
	|/  
	* Added a  (origin/recette, origin/master, origin/demo, origin/HEAD, master)

Il se trouve que le _Développeur 2_ se trouve sur la dernière révision de la `dev`, il peut donc reprendre ses développements.

	$ git checkout dev2
	[quelques commits...]
	$ git push

On remarque que le merge de `dev2` sur `dev` n'a impacté que la branche `dev`.
Il faut savoir que __le merge n'impacte QUE la branche courante__.

	* Added h  (HEAD, origin/dev2, dev2)
	* Added g 
	| *   Merge branch 'dev2' into dev  (origin/dev, dev)
	| |\  
	| |/  
	|/|   
	* | Added d 
	* | Added c 
	|/  
	| * Added f  (origin/dev3)
	| * Added e 
	|/  
	| * Added b  (origin/dev1)
	|/  
	* Added a  (origin/recette, origin/master, origin/demo, origin/HEAD, master)

Maintenant c'est au tour du _Développeur 1_ de vouloir merger sur la `dev`.

	$ git checkout dev
	$ git fetch
	$ git merge origin/dev
	$ git merge --no-ff dev1
	$ git push

Le résultat : La branche `dev` est à jour avec les commits des développeurs 1 et 2. Cependant le _Développeur 1_ n'a pas dans sa branche `dev1` les commits de la branche `dev2` et le _Développeur 2_ n'a pas ceux de la branche `dev1` dans sa branche `dev2`.

Le _Développeur 1_ sait que sa branche n'est pas totalement à jour. Il décide donc de faire en sorte qu'elle le soit pour pouvoir continuer ses développements.

Pour ça il décide de replacer sa branche `dev1` à l'identique de la branche `dev`. On reset :

	$ git checkout dev1
	$ git reset --hard dev
	$ git push -f
	
Le _Développeur 1_ est maintenant précisément au même endroit que la branche `dev`, il peut donc continuer ses développements avec deux nouveaux commits :

	* Added j  (HEAD, origin/dev1, dev1)
	* Added i 
	*   Merge branch 'dev1' into dev  (origin/dev, dev)
	|\  
	| * Added b 
	* |   Merge branch 'dev2' into dev 
	|\ \  
	| |/  
	|/|   
	| | * Added h  (origin/dev2)
	| | * Added g 
	| |/  
	| * Added d 
	| * Added c 
	|/  
	| * Added f  (origin/dev3)
	| * Added e 
	|/  
	* Added a  (origin/recette, origin/master, origin/demo, origin/HEAD, master)
	
Vient le tour du _Développeur 3_ de faire son merge sur la branche `dev` (rapidement) :

	$ git checkout dev
	$ git fetch
	$ git merge origin/dev
	$ git merge --no-ff dev3
	$ git push
	$ git checkout dev3

On remarque que la branche `dev` ne contient __QUE__ des merges. C'est super car c'est exactement ce que nous voulons !

	*   Merge branch 'dev3' into dev  (origin/dev, dev)
	|\  
	| * Added f  (HEAD, origin/dev3, dev3)
	| * Added e 
	| | * Added j  (origin/dev1)
	| | * Added i 
	| |/  
	|/|   
	* |   Merge branch 'dev1' into dev 
	|\ \  
	| * | Added b 
	| |/  
	* |   Merge branch 'dev2' into dev 
	|\ \  
	| |/  
	|/|   
	| | * Added h  (origin/dev2)
	| | * Added g 
	| |/  
	| * Added d 
	| * Added c 
	|/  
	* Added a  (origin/recette, origin/master, origin/demo, origin/HEAD, master)

Au tour du _Développeur 3_ de replacer sa branche pour continuer ses développements correctement :

	$ git checkout dev3
	$ git reset --hard dev
	$ git push -f

__Bien sûr un `reset --hard` suivi d'un `push -f` implique que votre environnement de travail soit vraiment propre avant toute manipulation.__

### La branche `recette`

On ne merge sur la `recette` que quand les développements sont validés. C'est à ce moment là que le chef de projets fait ses vérifications par rapport aux spécifications techniques générales et détaillées.

N'importe qui peut faire le merge de la `dev` sur la `recette` car on sait que seule la branche courante est impactée.

On merge la branche `origin/dev` pour être certain de prendre la dernière version :

	$ git checkout recette
	$ git fetch
	$ git merge origin/recette
	$ git merge --no-ff origin/dev
	$ git push
	
La branche `recette` contient bien nos derniers développements.

	*   Merge remote-tracking branch 'origin/dev' into recette  (HEAD, recette)
	|\  
	| *   Merge branch 'dev3' into dev  (origin/dev3, origin/dev, dev3, dev)
	| |\  
	| | * Added f 
	| | * Added e 
	| |/  
	|/|   
	| | * Added j  (origin/dev1)
	| | * Added i 
	| |/  
	| *   Merge branch 'dev1' into dev 
	| |\  
	| | * Added b 
	| |/  
	|/|   
	| *   Merge branch 'dev2' into dev 
	| |\  
	|/ /  
	| | * Added h  (origin/dev2)
	| | * Added g 
	| |/  
	| * Added d 
	| * Added c 
	|/  
	* Added a  (origin/recette, origin/master, origin/demo, origin/HEAD, master)

### La branche `demo`

Le principe est identique à la branche `recette` sauf que c'est bien la branche `recette` que l'on merge sur la `demo`.

### La branche `master`

C'est un peu la branche de _prod_...

Même principe, on merge la branche `demo` sur la `master`.

### Les hotfixes ?

C'est le dernier point important !

A un moment il est fort possible que vous ayez à faire un _hotfix_ sur la branche `recette` par exemple.

Faites-le ! Et appliquez la modification sur la branche `dev` pour être certain que les développeurs récupèrerons la modification à un moment.

Pour ça vous pouvez procéder comme suit :

#### Appliquer le hotfix

	$ git checkout recette
	[...fix...]
	$ git fetch
	$ git merge origin/recette
	$ git commit -m "[hotfix] Added k"
	$ git push
	
Il nous faut maintenant appliquer le commit sur toutes les _principales_ branches du projet au dessus dans la hiérarchie des merges.

Dans ce cas au dessus de `recette` : c'est `dev`.

#### Appliquer le hotfix sur la branche `dev`

Les branches `dev1`, `dev2` et `dev3` ne sont pas à impacter. Si votre équipe est bien organisée elle verra passer le _hotfix_ et le récupèrera.

Soit de la manière que je vais vous montrer, soit via un reset comme nous l'avons vu plus haut.

Appliquez donc le hotfix sur la branche `dev` via la commande `git cherry-pick` !

Il vous faut au préalable le SHA1 du hotfix (au moins les premiers caractères) :

	$ git checkout dev
	$ git fetch
	$ git merge origin/dev
	$ git cherry-pick 461c1ca
	$ git pull

## Conclusion

Je ne suis pas certain que ce workflow soit le meilleur mais il a le mérite de fonctionner. Il permet de garder une arborescence propre.

Le fait de `reset --hard` la branche du développeur est assez particulier, mais c'est la seule manière que j'ai trouvé pour ne pas faire de duplicats de commits (comme on peut le voir avec `rebase`)
C'est essentiellement à cause de ces `reset` que je force le commit lors des merges avec l'option `--no-ff`. De cette manière mon historique indique bien qu'il y a eu un merge de tel développeur à tel moment.

Vos avis sont les bienvenus !

<!-- more end -->
