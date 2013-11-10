---
title: "Et si on émulait un store ?"
layout: post
description: "Il est parfois nécessaire de faire croire à Magento qu'il est sur un store en particulier pendant l'exécution d'un bout de code."
keywords: magento, store, emulator
tags: [Magento, Émulation]
published: 2013-11-10 19:00:00
date: 2013-11-10 19:00:00
comments: true
gist: jacquesbh/7401505
---

Il n'est pas toujours simple dans [Magento][magento] de faire certaines actions dans un store précis.

Vous avez peut-être déjà essayé d'[envoyer un email personnalisé][email] depuis l'admin avec toute la configuration d'un store en particulier...  
À un client qui s'est inscrit sur le store _numéro 2_ par exemple ?

C'est toujours la galère... Et si on faisait croire à Magento qu'il est sur ce store ?

<!-- more start -->

----------

**Émuler un store**... Si si c'est possible :).

Souvent on le fait de cette _mauvaise_ manière : 

<script type="text/javascript">gist('{{page.gist}}', 'bad.php');</script>

> Pourquoi est-ce une mauvaise manière ?

Simplement parce que vous ne chargez que le store et non pas sa config, ses traductions, [son thème][theme]...

> Mais alors comment faire ?

Figurez-vous que Magento propose une solution à ça, regardez plutôt :

<script type="text/javascript">gist('{{page.gist}}', 'good.php');</script>

Vous pouvez employer cette technique pour énormément de choses.  
Enfin bien sûr toujours avec parcimonie ; Car si vous devez émuler c'est _peut-être_ parce que votre code n'est pas au bon endroit ?

Néanmoins cette astuce s'avère être extrêmement pratique pour de simples scripts !  
Ou dans certaines boucles d'exports... par exemple ;).

<!-- more end -->

[theme]: http://jacques.sh/2013/03/plusieurs-themes-sur-magento.html
[magento]: http://magento.com
[email]: http://jacques.sh/creer-un-email-transactionnel-sur-magento.html
