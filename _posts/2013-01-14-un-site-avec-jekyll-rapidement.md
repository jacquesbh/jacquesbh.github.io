---
title: "Un blog avec Jekyll et GitHub"
layout: post
description: "Voici comment faire un blog rapide avec Jekyll et Github"
keywords: jekyll, github
tags: [Jekyll, GitHub]
type: howto
published: 2013-01-14 01:00:00
date: 2013-01-14 01:00:00
comments: true
gist: 4526322
---

L'occasion de faire un petit blog ou un site un poil dynamique n'est pas rare dans notre métier.

Voici une manière rapide de faire un blog simple :

*   interface d'administration
    *   gestion des utilisateurs
*   blog statique
    *   versionnement des articles
    *   commentaires (avec [Disqus][disqus])
    *   catégories
    *   tags

Pour le rendu du blog, c'est [Jekyll][jekyll].

Pour l'interface d'administration, c'est [GitHub][gh].

<!-- more start -->

--------

[Jekyll][jekyll] est un générateur de blog statique.

[GitHub][gh] permet à un utilisateur d'avoir des URL telles que _http://utilisateur.github.com/projet_ avec ses fameuses [Pages Github][gh_pages].

Et comme tout projet sur GitHub, on peut y avoir une gestion des collaborateurs. Un collaborateur devient donc un utilisateur dans notre cas.

Les _Pages_ sur GitHub peuvent fonctionner avec Jekyll. C'est d'ailleurs le cas par défaut.

Il nous suffit donc de créer un projet sur GitHub, de créer la branche `gh-pages` et d'y mettre à l'intérieur : notre blog.

Je vous laisse créer votre projet, le cloner, et vous déplacer sur la branche `gh-pages`.

## Configuration

Il nous faut initialiser notre blog :

<script type="text/javascript">gist({{page.gist}}, 'misc/init.sh');</script>

La [configuration de Jekyll][jekyll_config] est contenu dans le fichier `_config.yml`.

Par défaut GitHub force les valeurs suivantes :

    safe: true
    source: <your pages repo>
    destination: <the build dir>
    lsi: false
    pygments: true

A partir de là vous n'avez pas le choix de la source et de la destination de vos pages. Vous ne pouvez pas non plus utiliser de plugins personnalisés ; Et la coloration syntaxique avec le tag `highlight` est possible et elle utilise [Pygments][pygments].

Mais nous pouvons tout de même personnaliser quelques éléments :

<script type="text/javascript">gist({{page.gist}}, '_config.yml');</script>

La configuration n'est pas bien compliquée à comprendre. Il s'agit d'un fichier en `YAML`, c'est donc une liste de clés/valeurs, tout simplement.

## Le format d'une page avec Jekyll

Tout fichier texte peut-être transformé par Jekyll. Il suffit d'y inclure le "header" qui va bien, exemple :

<script type="text/javascript">gist({{page.gist}}, 'misc/header_example.txt', 4);</script>

La date de publication permet de décider de la date de parution de notre article, à condition que la configuration `future` soit à `false`.

Le header d'un fichier "Jekyll" commence et se termine par `---`. A l'intérieur du header vous pouvez y mettre ce que vous voulez : ces valeurs seront récupérables.
On peut par exemple imaginer une variable `comments: true` ou `false` qui nous permette ensuite dans le HTML de la page de déterminer si on doit, ou non, afficher les commentaires.

## Notre page principale

Comme tout site qui se respecte on a un `index.html`. Ici, c'est pareil. On peut également le nommer `index.md` mais dans ce cas il sera, en plus d'être parsé par Jekyll, parsé par le moteur Markdown. Et pour un fichier qui va contenir un HTML bien spécifique c'est un peu lourd de faire passer markdown par là.

On va décider que notre page d'accueil aura un `layout` standard qu'on pourra réutiliser : `default`.

Je vous explique plus bas ce qu'est le layout, mais vous allez voir, c'est très simple à comprendre !

En attendant notre page d'accueil doit boucler sur les posts, qui ont une pagination (on doit donc gérer cette pagination).

<script type="text/javascript">gist({{page.gist}}, 'index.html');</script>

Les conditions sont simples à comprendre. Par contre effectivement c'est pas super bien indenté... Sauf que si j'indente plus le code on va se retrouver avec des pages dont le HTML reçu par le serveur contiendra des tonnes d'espaces. Car les `{{ "{% if ... " }}%}` sont supprimés, mais pas les espaces avant !

On a là notre page d'accueil avec sa pagination.

## Les includes

Un fichier peut être inclu grâce à la méthode `include` : `{{ "{% include file " }}%}`.

On peut donc par exemple facilement créer les fichiers `head.html`, `header.html` et `footer.html` !

<script type="text/javascript">gist({{page.gist}}, '_includes/head.html');</script>

<script type="text/javascript">gist({{page.gist}}, '_includes/header.html');</script>

<script type="text/javascript">gist({{page.gist}}, '_includes/footer.html');</script>


## Les layouts

Les layouts sont des fichiers qui contiennent nos pages, notre _contenu_ : `{{ "{{ content " }}}}`.

Voici le layout `default` que nous avons utilisé pour notre page d'accueil :

<script type="text/javascript">gist({{page.gist}}, '_layouts/default.html');</script>

Vous voyez tout de suite l'intérêts des `includes` n'est-ce pas ?

Et le layout pour nos articles : `post`

<script type="text/javascript">gist({{page.gist}}, '_layouts/post.html');</script>

## Notre premier article

Nos articles sont dans le dossier `_posts`.

Le nom du fichier est important car il contient la date utilisée dans l'URL. Par exemple : `2013-01-13-premier-article.md`

Et son contenu, rien de plus simple ! On utilise la layout `post`, une date de publication et un titre :

    ---
    title: "Mon premier article !"
    layout: post
    published: 2013-01-13 22:00:00
    tags: [foo, bar, baz]
    ---

    Super :)

## Les tags

On peut également gérer des tags... avec par exemple une page qui va permettre de les lister.

Je vous laisse adapter ce code dans votre layout favoris, sur votre page d'accueil, dans une sidebar ou autre...

<script type="text/javascript">gist({{page.gist}}, 'tags.html');</script>

Ici on a surchargé le `permalink` car sinon notre lien aurait été `/tags/` et non `/tags.html`. Seul l'`index.html` n'est pas modifié au niveau de son URL (sauf si on force le `permalink`).

## Et GitHub dans tout ça ?

Au final on a vu comment faire tourner un blog avec Jekyll... Mais je n'ai pas parlé de GitHub.

L'intérêt de GitHub dans cette affaire c'est que nous avons quelque chose de propre pour gérer nos fichiers et une interface vraiment simple pour modifier nos articles.

Depuis peu on peut créer des branches directement dans GitHub, ce qui fait qu'on peut rédiger un article directement en ligne, même s'il n'est pas terminé !

Et les contributeurs d'un projet peuvent devenir des auteurs ;)

### Le CNAME ?

Le détail qui tue... ajoutez un fichier `CNAME` qui contient votre nom de domaine, par exemple `jacques.sh` ([il existe vraiment !](https://github.com/jacquesbh/jacquesbh.github.com/blob/master/CNAME)).

Faites pointer vos DNS sur les serveurs de GitHub :

    jacques.sh.		38400	IN	A	204.232.175.78

Et le tour est joué !

_Ce blog fonctionne avec Jekyll et GitHub :)_

Pensez à bien modifier l'URL `production_url` dans la configuration du blog ! Sinon vous risquez quelques surprises avec vos URLs.

## Conclusion

Je ne parle pas des commentaires et des catégories dans cet article. Mais vous avez toutes les clés en main pour faire ça sans moi !

Pour les catégories, ça fonctionne exactement comme les tags. Notez qu'on ne peut pas avoir d'URL particulière pour une catégorie, ou un tag. A moins de faire quelque chose en Javascript ou autre... (comme les tags de ce blog)

Pour les commentaires il vous suffit d'utiliser [Disqus][disqus]. Avec un `include` par exemple ! Et un peu de config ?

    disqus:
        username: mon_username

On récupère le nom d'utilisateur comme ceci : `{{ "{{ site.disqus.username " }}}}`

Si vous souhaitez un formulaire de contact vous pouvez vous tourner vers [Get Simple Form][getsimpleform].
Il s'agit d'un site qui récupère les données `POST` d'un formulaire de contact et vous envoi un email avec les informations. Très pratique quand on sait que nous sommes sur un site statique !

N'oubliez pas de gérer l'envoi de votre formulaire en javascript (ou tout autre méthode) afin d'éviter le spam.

Concernant la recherche... c'est un peu compliqué de faire une recherche sur un site statique non ? Au final vous pouvez tenter quelque chose avec un fichier `json` à la racine de votre site et un bout de javascript pour gérer tout ça !

Vous pouvez récupérer la source de tout ce tuto en [clonant le gist dédié à cet article](https://gist.github.com/4526322), il est totalement fonctionnel et peut servir de base pour votre prochain blog ! (Moi ça sera le cas :)).

N'hésitez pas à regarder la [source de ce blog également](https://github.com/jacquesbh/jacquesbh.github.com).

<!-- more end -->

[disqus]: http://disqus.com/
[pygments]: http://pygments.org/
[gh]: https://github.com/
[gh_pages]: http://pages.github.com/
[jekyll]: http://jekyllrb.com/
[jekyll_config]: https://github.com/mojombo/jekyll/wiki/Configuration
[getsimpleform]: http://getsimpleform.com/
