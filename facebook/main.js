const selectUsuario = document.getElementById("select-user")
const muroDiv = document.getElementById("muro")
const avatarImg = document.getElementById("avatar-img")
const nombreHeader = document.getElementById("nombre-usuario")

// carga de usuarios en el select
fetch("https://jsonplaceholder.typicode.com/users")
.then(response=>response.json())
.then(data=>{
    data.forEach(usuario=>{
        const opcion ='<option value="'+usuario.id+'">'+usuario.name+'</option>'
        selectUsuario.innerHTML+=opcion
    })
})

const cargarMuro=()=>{
    const usuarioid = selectUsuario.value 
    const nombre = selectUsuario.options[selectUsuario.selectedIndex].text
    
    nombreHeader.innerHTML=nombre
    avatarImg.src="https://api.dicebear.com/9.x/dylan/svg?seed="+nombre
    avatarImg.style.display="block"

    //cargarmuro
    fetch("https://jsonplaceholder.typicode.com/users/"+usuarioid+"/posts")
    .then(response=>response.json())
    .then(posts=>{
        muroDiv.innerHTML=''
        //recorrer posts
        posts.forEach(post=>{
            muroDiv.innerHTML+='<div class="post">'+'<div class="post-title">'+post.title+'</div>'+'<p>'+post.body+'</p>'
            +'<small>Publicado por :  ' + nombre + '</small>'
            +'</div>'
        })
    })
}