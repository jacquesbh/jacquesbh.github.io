---
title: "Votre certificat SSL Business"
layout: post
keywords: ssl business, sécurité, comodo, gandi, 
tags : [SSL, Sécurité, COMODO, gandi]
description: "Comprenez comment obtenir votre certificat SSL Business avec COMODO !"
published: 2014-08-03 00:00:00
date: 2014-08-03 00:00:00
comments: true
---

Un certificat SSL, pour Secure Socket Layer, est basé sur plusieurs fichiers qui permettent le chiffrement des données entre le client (vous) et un site tiers.

En e-commerce nous avons souvent recourt à un certificat SSL pour sécuriser les données que vous échangez avec le site marchand. Comme par exemple votre adresse postale, vos informations de connexion et bien plus encore.

Là où le certificat est important c'est dans le tunnel de commande.

Chez [Monsieur Biz nous utilisons des certificats SSL Business][mbiz] : un certificat "Business" permet au e-commerçant d'avoir une plus grosse assurance en cas de problème de sécurité lié au certificat.  
Et surtout vous obtenez une « Green Bar ».

Il y a plusieurs types de certificats mais nous n'allons retenir que les suivants :

* Le certificat dit **auto-signé** qui n'est pas signé par une autorité de certification.
* Le certificat **signé simple** qui est signé par une autorité de certification.
* Le certificat **signé « Green Bar »** qui, en plus d'être signé par une autorité de certification, affiche une barre verte dans le navigateur.

Un certificat, s'il est signé, protège aussi bien les informations transmises entre le client et le serveur avec ou que sans barre verte.

<p class="center"><img src="/images/posts/certificat-ssl-business/certificat-business.png" width="350" /></p>

Ici on a par exemple google.fr qui propose un certificat sans Green Bar et Gandi qui a un certificat avec Green Bar.  
Le premier certificat en revanche est auto-signé. Chez Monsieur Biz nous utilisons des certificats auto-signés pendant nos développements afin de vérifier le bon fonctionnement du site e-commerce Magento avec un certificat SSL.  

Le point important est qu'une Green Bar n'est pas délivrée à n'importe qui. La société demandeuse doit passer une vérification de la part de l'autorité de certification.  
Pour Google encore une fois, c'est différent, car ils ont leur propre autorité de certification et peuvent donc créer autant de certificats qu'ils le souhaitent.

C'est le sujet de cet article : **[Comment obtenir un certificat business avec une Green Bar chez COMODO via gandi.net ?]({{page.url}})**

<small><em>Comodo est une autorité de certification</em></small>

<!-- more start -->

---------------

Tout d'abord nous devons acheter notre certificat.

[Chez gandi il existe 3 types de certificats][gandi_ssl] :

* Les **certificats standards**, qui ne nécessitent pas de validation poussée. Par contre comme tous les certificats il faudra prouver que le domaine qu'on veut protéger nous appartient.
* Les **certificats pro**, qui nécessitent, en plus de la vérification standard, une valitation sera ensuite à effectuer : KBis de la société + Copie Carte d'identité + Appel de COMODO pour terminer la validation.
* Les **certificats business**, qui nécessitent, en plus de la vérification standard, une validation étendue. C'est la suite de cet article.

## L'achat

Choisissez le certificat que vous souhaitez acheter ainsi que la durée de validité de celui-ci. Je vous conseille de prendre 2 ans directement pour plusieurs raisons :

* 2 années c'est plus long qu'une seule.
* C'est moins cher à l'année !

Vous avez le choix entre un certificat avec ou sans SGC (Server Gated Cryptography). C'est à vous de voir. Le SGC permet d'avoir un certificat qui fonctionne avec les vieux navigateurs. Si votre site web est truffé de Javascript et de HTML5 + CSS3 à gogo, alors ça n'est peut-être pas la peine de prendre l'option SGC.  
Après c'est vrai que c'est le même prix...

Concernant le choix du Logiciel utilisé, prenez `Apache/ModSSL`. De nos jours ça n'a plus grande importance. Un certificat pour `apache` fonctionnera normalement aussi pour `nginx` etc.

## La génération du CSR

Le CSR est une clé que vous devez générer. Vous obtenez ainsi deux fichiers lors de la génération, un fichier `.csr` (le fichier dont nous avons besoin) et un fichier `.key` (fichier que vous devez garder précieusement !).

Vous pouvez générer la commande permettant d'obtenir ces deux fichiers via le [générateur proposé par gandi][gen]. La commande devra ensuite être lancée sur une console UNIX avec openssl (sur mac ou linux).

**Attention !** Renseignez les bonnes informations pour le CSR ! On vous demande par exemple l'**Organisation : il s'agit de la raison sociale** et non pas du nom commercial ! C'est très important !

Prenez ensuite le contenu du fichier `.csr` (c'est un fichier texte) et collez ce contenu dans le champ dédié lors de l'achat du certificat. Payez, et on passe à la suite.

## Validation par email

La première validation est faite par email par gandi. Vous allez recevoir un email vous demandant de cliquer sur un lien pour valider cette première étape. Faites-le !

## Validation du domaine

Une fois votre certificat acheté vous allez devoir effectuer la validation de votre domaine. Le plus simple c'est de faire une vérification par fichier si vous le pouvez, c'est simple, rapide et ne demande pas de connaissances techniques.

Une fois le domaine validé vous allez recevoir plusieurs emails :

* Un de gandi avec un document indiquant la référence du certificat chez eux.
* Et un de COMODO vous demandant de leur envoyer plusieurs documents.

## Les documents pour COMODO et gandi

N'hésitez pas à aller faire un tour sur [le Wiki de gandi pour avoir de plus amples informations sur les documents à envoyer à COMODO pour un certificat Business][wiki].

Vous devez donc avoir les documents suivants :

* La page de garde GANDI.
* La page de garde COMODO.
* Kbis de votre société de moins de 3 mois.
* Le contrat COMODO signé.
* Le formulaire COMODO complété.

Vous pouvez joindre une lettre (en anglais) si vous le souhaitez pour préciser votre demande.

Tous les documents sont à envoyer à la fois à COMODO et également à GANDI.

Je vous conseille de procéder comme suit :

* Envoyez un email à COMODO et GANDI avec une archive contenant vos documents scannés. Le mail du support France de gandi est *support-fr [at] support.gandi.net*. Attention au poids de votre archive !! Pour le mail de COMODO ils vous le donnent dans leur message.
* Envoyez un FAX à COMODO avec vos documents.

Une fois que c'est fait vous n'avez plus qu'à attendre. À noter que COMODO passera un appel téléphonique aux différentes personnes indiquées sur le formulaire. Justement le formulaire...

## Remplir le formulaire étendu COMODO

Là c'est pas simple quand on ne sait pas à quoi correspondent les différents champs ! Surtout que c'est de l'anglais bien incompréhensible.

Je me suis amusé, avec l'aide de gandi, à donner une signification à tous les champs du formulaire.

Dans le désordre :

* **Organization Name** : Raison sociale de la société. Il s'agit aussi du nom de l'organisation que vous avez indiqué pour le CSR.
* **Assumed Name** : Nom commercial utilisé. Il s'agit du nom par lequel vos clients vous connaissent. Le nom de votre site internet par exemple.
* **Domain Name(s)** : Nom(s) de domaine. Mettez le (ou les, mais pour un certificat business, c'est un seul domaine) que vous voulez protéger avec votre certificat. Il s'agit du même domaine que celui utilisé pour le CSR.
* **Jurisdiction of Incorporation** : Il s'agit des infos de votre RCS. Donc la ville, le département et le Pays (FRANCE !)
* **Incorporating Agency** : Pour nous ça sera gandi. C'est eux qui nous délivrent le certificat au final.
* **Registration Number** : Il s'agit du numéro SIREN de la société.
* **Certificate Requester** : Ici il faut indiquer les coordonnées de la société ou de la personne qui fait la demande. Soit c'est vous-même, soit c'est votre agence web (par exemple). De manière générale chez Monsieur Biz nous ne faisons qu'accompagner notre client dans les démarches. Notre client renseigne donc ici ses propres coordonnées.
* **Applicant Address** : Siège social de la société.
* **Certificate Approver** : Il s'agit de la personne qui approuve la demande du certificat. À priori, la société. **Idéalement il s'agit d'une personne sur le KBis, ainsi c'est beaucoup plus simple**.
* **Contract Signer** : Il s'agit de la personne qui signe le contrat. Faites en sorte que ça soit la même personne que le **Certificat Approver**, ça facilitera la démarche de COMODO.

Vous n'avez plus qu'à envoyer les documents ! Et attendre.

Généralement le certificat met entre 2 jours ouvrés (vécu) et 2 semaines à arriver. Pensez donc à vous y prendre un peu en avance !

Voici deux liens qui peuvent vous aider si vous avez encore des points flous sur le formulaire :

* <https://support.comodo.com/index.php?/Default/Knowledgebase/Article/View/253/0/what-is-required-for-validation>
* <https://support.comodo.com/index.php?/Default/Knowledgebase/Article/View/314/17/what-are-the-extended-validation-guidelines>

## Installation du certificat

Là je vous propose de faire appel à votre administrateur système ou à l'agence avec qui vous travaillez. Ils feront ça à merveille !


<!-- more end -->

[gen]: https://www.gandi.net/ssl/create/openssl
[gandi_ssl]: https://www.gandi.net/ssl
[mbiz]: http://monsieurbiz.com/
[wiki]: http://wiki.gandi.net/fr/ssl/documents/business
