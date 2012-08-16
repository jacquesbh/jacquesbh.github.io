---
title: "Android + Proxy = HTTP en clair"
layout: post
description: "C'est fou le nombre de développeurs qui pensent que les requêtes HTTP sont invisibles !"
keywords: android, proxy, http
tags: [Android, Proxy, HTTP]
type: article
published: 2012-08-16 23:55:00
date: 2012-08-16 23:55:00
comments: true
permalink: /utiliser-un-proxy-sur-android.html
---

Ce soir j'ai joué à un jeu (dont je ne donnerai pas le nom) sur mon téléphone, sous Android 4.1.1 (Jelly Bean).

Et il m'est venue l'idée de voir les requêtes envoyées par l'application pour enregistrer mon score...

Procédure très facile à réaliser !

<!-- more start -->

<hr />

Ok tout d'abord je me suis dit que je pouvais peut-être sniffer les requêtes TCP depuis mon Mac à condition que le téléphone soit sur le même réseau... Pas possible.

Ensuite je me suis dit que j'allais simplement utiliser [Charles][charles], un proxy HTTP très sympa. J'ai donc pensé à mettre en place le proxy directement sur mon téléphone. Sauf que oui, mais non... Le proxy en place sur la connexion WiFi du téléphone n'est utilisé que par le navigateur. Enfin c'est ce qu'Android m'annonce quand je change le proxy.

Soit.

Je décide donc de récupérer le APK de mon application (via [AirDroid][airdroid]) et d'utiliser une machine virtuelle android.

Pour la machine virtuelle c'est simple... je prends le [SDK Android][sdk_android].

## Installer un `Android Virtual Device`

Avant tout il nous faut donc une machine tournant sur Android. Pour ça on va simplement utiliser l'émulateur fourni avec le SDK.

Le SDK est fraîchement téléchargé et pas complet, on remédie au problème en lançant la jolie interface `;)` :

    ~ $ cd Developper/android-sdk-macosx/tools/
    ~/Developper/android-sdk-macosx/tools $ ./android

![Android SDK Manager][img_android_sdk_manager]

On sélectionne l'API 16 (Android 4.1) et on installe tout ça !

Maintenant nous avons donc tout ce qu'il faut pour créer notre `AVD`.

On commence donc par lister les systèmes Android disponibles :

    ~/Developper/android-sdk-macosx/tools $ ./android list targets
    Available Android targets:
    ----------
    id: 1 or "android-16"
         Name: Android 4.1
         Type: Platform
         API level: 16
         Revision: 2
         Skins: HVGA, QVGA, WQVGA400, WQVGA432, WSVGA, WVGA800 (default), WVGA854, WXGA720, WXGA800, WXGA800-7in
         ABIs : armeabi-v7a

Ensuite il nous faut créer notre `AVD` :

    ~/Developper/android-sdk-macosx/tools $ ./android create avd -n android_4.1 -a -c 100M -t android-16
    Auto-selecting single ABI armeabi-v7a
    Android 4.1 is a basic Android platform.
    Do you wish to create a custom hardware profile [no]
    Created AVD 'android_4.1' based on Android 4.1, ARM (armeabi-v7a) processor,
    with the following hardware config:
    hw.lcd.density=240
    vm.heapSize=48
    hw.ramSize=512

Tapez `[enter]` ou `no` à la question sur le `hardware profile`.

## Lancer Charles et notre `AVD`

Avant de lancer notre nouvelle machine sous Android, nous devons lancer Charles.

    clic clic

Voilà qui est fait.

Et maintenant ? On lance notre émulateur !

Attention : nous devons dire à notre émulateur que toutes les requêtes TCP passent par notre proxy, pour se faire rien de bien compliqué, nous devons ajouter l'argument `-http-proxy localhost:8888` à la ligne de commande permettant de lancer l'émulateur :

    ~/Developper/android-sdk-macosx/tools $ ./emulator @android_4.1 -http-proxy localhost:8888

Pourquoi `localhost:8888` ? Simplement parce que par défaut Charles est actif sur le port 8888 et que nous sommes donc en local (car notre machine virtuelle est... virtuelle).

Maintenant que nous avons une machine sous Android qui tourne et un proxy qui nous donne les informations sur toutes les requêtes TCP non chiffrées qui passent...

## Installer notre `APK` téléchargé sur notre `AVD`

Nous avons téléchargez notre `.apk` via [AirDroid][airdroid] et nous devons maintenant l'installer sur notre machine Android :

On se déplace dans le dossier `platform-tools` où se situe le fameux `adb` :

    ~/Developper/android-sdk-macosx/tools $ cd ../platform-tools/

On installe notre `apk` téléchargé :

    ~/Developper/android-sdk-macosx/platform-tools $ ./adb install ~/Downloads/SuperApplication.apk
    780 KB/s (1392781 bytes in 1.743s)
	    pkg: /data/local/tmp/SuperApplication.apk
    Success

Et maintenant on lance l'application sur la machine virtuelle (via le menu graphique... normal quoi) et on regarde ce que nous affiche Charles (qui enregistre ce qu'il se passe par défaut au lancement du logiciel).

## Conclusion

On se rend compte que certaines applications (des jeux ? avec des scores ?) font transiter les informations en clair (connexion non sécurisée) et qu'il est donc très facile de reproduire un fonctionnement standard, avec de fausses valeurs (comment ça il a fait un score plus grand que le score maxi ???).

> Ca s'appelle tricher ça ! Oui MONSIEUR !

En même temps... il existe un [standard qui s'appelle TLS][wiki_tls].
    
<!-- more end -->

[airdroid]: http://airdroid.com
[charles]: http://www.charlesproxy.com/
[sdk_android]: http://developer.android.com/sdk/index.html
[wiki_tls]: http://en.wikipedia.org/wiki/Transport_Layer_Security "Transport Layer Security"

[img_android_sdk_manager]: /images/posts/android-http-proxy/charles.png
