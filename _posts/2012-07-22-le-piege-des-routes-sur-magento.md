---
title: Le piège des routeurs sur Magento
layout: post
description: Une contrôleur frontal accessible par une route admin... Si si... C'est possible ! #fail
keywords: php, router, url, magento
tags: [Magento, URL, "Bonnes pratiques"]
type: howto
date: 2012-07-23 00:55:00
comments: true
permalink: /le-piege-des-routes-sur-magento.html
---

Magento a un système de routes assez complexe...

Entre les routes `frontend`, les routes `admin`, le catalogue et son `URL rewriting` et les pages CMS... On a vite fait de s'y perdre !

Cet article est là pour vous montrer que Magento reste une application très permissive. Attention !

<!-- more start -->

<hr />

Je me suis longtemps trompé sur la manière de créer mes routes... surtout celles destinées à mes contrôleurs d'admin.

## Le front

Pour ajouter une routes simple pour le front il y a un bout de XML à connaître. Rien de bien compliqué :

{% highlight xml %}
<frontend>
    <routers>
        <name_of_my_route>
            <use>standard</use>
            <args>
                <module>My_Module</module>
                <frontName>foo</frontName>
            </args>
        </name_of_my_route>
    </routers>
</frontend>
{% endhighlight %}

Quelques explications :

* `name_of_my_route` c'est le nom de la route... vraiment. Par exemple si je veux générer une URL via notre nouvelle route je fais :
{% highlight php %}
<?php
Mage::getUrl('name_of_my_route/bar/baz'); // => http://example.com/foo/bar/baz
{% endhighlight %}
* `<use>standard</use>` c'est pour dire que c'est une route en front.
* `<module>My_Module</module>` c'est le nom de votre module. Si vous mettez `Super_Foo` alors le contrôleur `index` aura pour nom : `Super_Foo_IndexController`.
* `<frontName>foo</frontName>` c'est le "final" de la route : http://example.com/**foo**/bar/baz.

## L'admin

En admin c'est exactement pareil... ou presque.

En réalité les routes de l'admin sont « parsées » avant celles du front. Ce qui fait que si votre route admin permet d'accéder à un contrôleur frontal... bah ça fonctionnera.

## Exemple « bad practices »

L'architecture :

    app/code/local/Jbh/Blog
    └── controllers
        ├── Adminhtml
        │   └── ManageController.php
        └── IndexController.php

`controllers/IndexController.php` :

{% highlight php %}
<?php
class Jbh_Blog_IndexController extends Mage_Core_Controller_Front_Action
{
    public function indexAction()
    {
        exit('front');
    }
}
{% endhighlight %}

`controllers/Adminhtml/MagnageController.php` :

{% highlight php %}
<?php
class Jbh_Blog_Adminhtml_ManageController extends Mage_Adminhtml_Controller_Action
{
    public function indexAction()
    {
        exit('admin');
    }
}
{% endhighlight %}

Maintenant regardez bien ce fichier de config :

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<config>
    <modules>
        <Jbh_Blog>
            <version>0.1.0</version>
        </Jbh_Blog>
    </modules>
    <frontend />
    <admin>
        <routers>
            <jbh_blog>
                <use>admin</use>
                <args>
                    <module>Jbh_Blog</module>
                    <frontName>blog</frontName>
                </args>
            </jbh_blog>
        </routers>
    </admin>
</config>
{% endhighlight %}

Vous remarquerez que nous n'avons rien dans la balise `frontend`, que notre routeur est bien dans `<admin/>` et a bien une balise `<use>` qui vaut `admin` également.

On est donc en droit de penser que notre contrôleur front : `Jbh_Blog_IndexController` qui étend `Mage_Core_Controller_`**Front**`_Action` ne peut pas être accessible via cette route dédiée à l'admin.

Que neni !

    http://example.com/blog/index/index => « front »
    http://example.com/blog/adminhtml_manage/index => « admin »

WTF ?!

[ Faites le test ;) ]

## Bonnes pratiques

La manière de créer un routeur en front ne change pas car dans ce sens tout est bon. Impossible d'accéder à un contrôleur admin depuis un routeur frontal.

Par contre voici comment éviter que nos routeurs d'admin ne soient utilisés pour afficher des contrôleurs front :

{% highlight diff %}
--- a/config.xml
+++ b/config.xml
@@ -8,13 +8,13 @@
     <frontend />
     <admin>
         <routers>
-            <jbh_blog>
+            <jbh_blog_adminhtml>
                 <use>admin</use>
                 <args>
-                    <module>Jbh_Blog</module>
-                    <frontName>blog</frontName>
+                    <module>Jbh_Blog_Adminhtml</module>
+                    <frontName>blog_adminhtml</frontName>
                 </args>
-            </jbh_blog>
+            </jbh_blog_adminhtml>
         </routers>
     </admin>
 </config>
{% endhighlight %}

Ce que ça donne :

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<config>
    <modules>
        <Jbh_Blog>
            <version>0.1.0</version>
        </Jbh_Blog>
    </modules>
    <frontend />
    <admin>
        <routers>
            <jbh_blog_adminhtml>
                <use>admin</use>
                <args>
                    <module>Jbh_Blog_Adminhtml</module>
                    <frontName>blog_adminhtml</frontName>
                </args>
            </jbh_blog_adminhtml>
        </routers>
    </admin>
</config>
{% endhighlight %}

> Tu peux nous expliquer ce que ça change ?

Le plus important c'est la balise `<module>` qui vaut maintenant `Jbh_Blog_Adminhtml`.

Ceci a pour effet d'automatiquement préfixer les contrôleurs demandés par cette route de `Jbh_Blog_Adminhtml_`.

La route admin a également un nom différent pour pouvoir la différencer de la route front :)

### Exemple

{% highlight php %}
<?php

Mage::getUrl('jbh_blog_adminhtml/manage/index');
// => http://example.com/blog_adminhtml/manage/index
// => controller: Jbh_Blog_Adminhtml_ManageController
{% endhighlight %}

## Conclusion

Nous avons donc forcément besoin d'une route front pour accéder à notre `Jbh_Blog_IndexControler`. Inévitable.

Problème résolu.

* Suffixez vos routeurs d'admin par quelque chose (`_adminhtml` tout simplement, ou `_admin` à la limite ;)).
* Pensez à la balise `<module/>` pour forcer l'utilisation d'un sous répertoire dans les `controllers`.

En espérant que vous y verrez plus clair dans vos routes et que vous ne ferez pas (plus ?) cette erreur !

<!-- more end -->

