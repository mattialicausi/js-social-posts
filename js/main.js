"use strict";

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];


//prendo elementi da HTML-------------------------------------------------------------------------
const contenitoreHTML = document.getElementById('container');
const userLiked = [];

//FUNZIONI-------------------------------------------------------------------------

//funzione peer creare dinamicamente le card
function drawCard(){
    posts.forEach((value, index) =>{
        const cards = document.createElement('div');

       cards.innerHTML = `
       <div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    <img class="profile-pic" src="${value.author.image}" alt="${value.author.image}">                    
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${value.author.name}</div>
                    <div class="post-meta__time">${value.created}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${value.content}</div>
        <div class="post__image">
            <img src="${value.media}" alt="Foto post ${value.id}">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button js-like-button" href="#" data-postid="${value.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label ">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${value.id}" class="js-likes-counter">${value.likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>
        `;
       contenitoreHTML.append(cards);

    }) 

}
drawCard();

//funzione per aggiungere evento al bottone
const likeButton = Array.from(document.querySelectorAll('.like-button'));
//console.log(likeButton);

likeButton.forEach((el, index)=>{
    el.addEventListener('click', function(e){
        // evito che venga refreshata la pagina
        e.preventDefault();
        // inverto classe per cambiare colore
        el.classList.toggle('like-button--liked');
        // prendo id del post dal dataset
        const postId = parseInt(el.dataset.postid);
        // prendo elemento contenitore del numero dei likes
        const likes = document.getElementById('like-counter-' + postId);
        // recupero dall'array dei post indice del post corrente 
        const postIndex = posts.findIndex((value)=>{
            return value.id === postId;
        })
        if(postIndex === -1) return;
        //recupero dall'array dei post preferiti (liked) indice di quel id se c'è, se no torna -1 (indexOf)
        const likeIndex = userLiked.indexOf(postId);
        //controllo se l'indice trovato è o meno e se è -1
        if(likeIndex !== -1){
            // trovato indice e decremento i like e rimuovo id elemento da array
            posts[postIndex].likes -= 1;
            userLiked.splice(likeIndex, 1);
        } else{
            // il valore di ritorno era -1 quindi id non era presente nell'array dei like
            // incremento i like e pusho id nell'array dei like
            posts[postIndex].likes += 1;
            userLiked.push(postId);
            
        }
        // inserisco il nuovo valore del numero dei like
        likes.innerHTML = posts[postIndex].likes;
        console.log(userLiked);
    })
})








  