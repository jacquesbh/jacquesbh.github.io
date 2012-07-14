---
layout: empty
title: Jacques Bodin-Hullin - Magento developer
---

{% capture sidebar %}
<h2>A propos</h2>
<p>
    <img src="/img/visage_edito.png" alt="le visage de Jacques Bodin-Hullin" />
    Texte d’intro : drerit in vulputate velit esse molestie consequat, vel illum dolore eu
    feugiat nulla facilisis at vero eros et accumsan.<br />
    Qui suis-je ? vel illum dolore eu feugiat <a href="#">nulla facilisis</a> at vero eros
    et accumsan et iusto zzril Services delenit augue duis dolore te feugait nulla facilisi.
</p>

<hr />

{% include sidebars/categories %}

{% include sidebars/tags %}

{% endcapture %}
{% include sidebar %}

<div id="contentWrap">

    <h2>Sélection de références</h2>
    <div class="carrousel">
        <div class="goLeft">
            <!-- <a href="#" class="goLeft"><span>&lt;&lt;</span></a> -->
        </div>
        <div class="goRight">
            <!-- <a href="#" class="goRight"><span>&gt;&gt;</span></a> -->
        </div>
        <div class="content">
            {% for item in site.pages %}
            {% if item.slider.homepage %}
            <div class="item">
                <h3>{{ item.title }}</h3>
                <p class="subitem">
                <a href="{{ item.url }}">
                <img src="/img/{{ item.slider.image }}" alt="{{ item.title }}" />
                </a>
                <a href="{{ item.url }}" class="detail">Voir le détail &gt;&gt;</a>
                </p>
            </div>
            {% endif %}
            {% endfor %}
        </div>
    </div>
    <p class="voirPlus">
        <a href="{{ site.JB.references_path }}">Voir toutes mes références &gt;&gt;</a>
    </p>

{% for post in site.posts limit:3 %}
    <hr />
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <div class="content post">
        {{ post.content | split:'<!-- **END** -->' | first }}
    </div>
    <p class="voirPlus">
        {% if post.comments %}
        <a href="{{ post.url }}#disqus_thread">Commentaires</a> -
        {% endif %}
{% if post.type == 'howto' %}
        <a href="{{ post.url }}">Lire la suite du tutoriel</a>
{% else %}
        <a href="{{ post.url }}">Lire l'article</a>
{% endif %}
    </p>
{% endfor %}

{% comment %}
    <hr />

    <h2>Mes services</h2>
    <div id="services">
        <div class="service quoi">
            <h3>Quoi ?</h3>
            <ul>
                <li>
                    <span>PHP</span>
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                </li>
                <li>
                    <span>HTML</span>
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                </li>
                <li>
                    <span>CSS</span>
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                </li>
                <li>
                    <span>JavaScript</span>
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_vide.png" alt="" />
                </li>
                <li>
                    <span>Java</span>
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_pleine.png" alt="*" />
                    <img src="/img/etoile_vide.png" alt="" />
                    <img src="/img/etoile_vide.png" alt="" />
                    <img src="/img/etoile_vide.png" alt="" />
                </li>
            </ul>
        </div>
        <div class="service pourquoi">
            <h3>Pourquoi ?</h3>
            <ul>
                <li>Développement Web</li>
                <li>Développement Mobile</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
            </ul>
        </div>
        <div class="service qui">
            <h3>Pour qui ?</h3>
            <ul>
                <li>Les SSII/SSLL</li>
                <li>Les agences de communication</li>
                <li>Les Web Agencys</li>
                <li>Les annonceurs</li>
            </ul>
        </div>
    </div>
    <p class="voirPlus">
        <a href="#">En savoir plus sur mes services &gt;&gt;</a>
    </p>
    {% endcomment %}

</div>

{% include comments_count_js %}
