import"../../../../modulepreload-polyfill-loNJNkyP.js";import{i as e,n as t,r as n,t as r}from"../../../../crud_form-D9N0waLy.js";var i=document.title;document.addEventListener(`visibilitychange`,function(){document.visibilityState===`hidden`?document.title=`Oi! You aren't finished here!`:document.visibilityState===`visible`&&(document.title=i)});var a=null,o=document.getElementById(`body`),s=JSON.parse(localStorage.getItem(`users`))||[];function c(){let e=``;s.forEach(t=>{e+=`
            <tr class="row">
                        <td class="id">${t.id}</td>
                        <td>${t.name}</td>
                        <td><a href="">${t.email}</a></td>
                        <td>${t.dateOfBirth}</td>
                        <td>${t.age}</td>
                        <td>${t.gender}</td>
                        <td>
                        <div class="actions">
                            <button class="btn edit" data-id="${t.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-pen">
                            <path
                                d="M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z" />
                            <path d="M14.487 7.858A1 1 0 0 1 14 7V2" />
                            <path d="M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516" />
                            <path d="M8 18h1" />
                        </svg>
                            </button>

                            <button class="btn delete" data-id="${t.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash">
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
                            </button>
                        </div>
                        </td>        
                    </tr> `}),o.innerHTML=`${e}`,p(),s.length===0&&(e=`
            <tr>
                <td class="placeholder" colspan="7">
                    <strong class="placeholder-msg">No Users Yet</strong>
                </td>
            </tr>
            
        `,o.innerHTML=`${e}`)}c();var l=document.querySelectorAll(`.delete`),u=null;l.forEach(e=>{e.onclick=function(){u=this,a=u.dataset.id,d.showModal()}});var d=document.createElement(`dialog`);d.id=`dialog`,d.className=`dialog`,d.innerHTML=`
    <div class="modal">
        <h1>Confirm deletion</h1>
        <div class="message">
            <p class="message-content">Deletion is permanent! Would you like to proceed?</p>
        </div>
        <menu>
            <button class="exit">Cancel</button>
            <button class="close">Confirm</button>
        </menu>
    </div>
        `,document.body.appendChild(d),document.querySelector(`.close`).addEventListener(`click`,function(){u.closest(`tr`).remove(),d.close(),s=s.filter(e=>e.id!==a),localStorage.setItem(`users`,JSON.stringify(s)),y(`Success`,`User deleted successfully!`),setTimeout(()=>{v.classList.add(`close`)},3e3),setTimeout(()=>{document.body.removeChild(v)},4e3)});var f=document.querySelector(`.exit`);f.onclick=function(){d.close()};function p(){document.querySelectorAll(`.edit`).forEach(e=>{e.addEventListener(`click`,()=>{a=e.dataset.id;let t=s.find(e=>e.id===a),n=document.getElementById(`name`),r=document.getElementById(`email`),i=document.getElementById(`date`);console.log(t.gender);let o=document.querySelector(`input[name="gender"][value="${t.gender}"]`);n.value=t.name,r.value=t.email,i.value=t.dateOfBirth,o.checked=!0,m.showModal()})})}var m=document.createElement(`dialog`);m.id=`editModal`,m.className=`editModal`,m.innerHTML=`
<form action="" id="form" autocomplete="off">
<label for="name">
    Name:
    <input type="text" id="name" placeholder="John Doe" name="name">
</label>

<label for="email">
    E-mail:
    <input type="email" id="email" placeholder="your_email@gmail.com" name="email">
</label>

<label for="date">
    Date of Birth:
    <input type="date" id="date" name="dob">
</label>

<label>
    Gender
        <div class="gender">
            <label class="male" for="male">
                <input type="radio" name="gender" id="male" value="Male">
                Male
            </label>

            <label class="female" for="female">
                <input type="radio" name="gender" id="female" value="Female">
                Female
            </label>
        </div>
</label>

<menu class="editMenu">
    <button class="cancelEdit" type="button">Cancel</button>
    <button id="editBtn" class="editBtn">Submit</button>
</menu>

</form>
`,document.body.append(m),document.querySelector(`.cancelEdit`).addEventListener(`click`,()=>{m.close()});var h=document.getElementById(`name`),g=document.getElementById(`email`),_=document.getElementById(`date`);h.addEventListener(`input`,()=>{e(h)}),g.addEventListener(`input`,()=>{n(g)}),_.addEventListener(`input`,()=>{t(_)}),document.getElementById(`form`).addEventListener(`submit`,e=>{e.preventDefault();let t=s.find(e=>e.id===a),n=document.getElementById(`name`),i=document.getElementById(`email`),o=document.getElementById(`date`),l=document.querySelector(`input[name="gender"]:checked`)?.value;t.name=n.value,t.email=i.value,t.dateOfBirth=o.value,t.age=r(o.value),t.gender=l,localStorage.setItem(`users`,JSON.stringify(s)),c(),setTimeout(()=>{m.close(),y(`Success!`,`User updated successfully`)},500),setTimeout(()=>{v.classList.add(`close`)},3e3),setTimeout(()=>{document.body.removeChild(v)},4e3)});var v=document.createElement(`div`);function y(e,t){return v.className=`toast`,v.classList.add(e),v.setAttribute(`role`,`alert`),v.innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
    fill="currentColor" class="icon icon-check">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
</svg>
                    <div class="toast-content">
                        <strong>
                            ${e}
                        </strong>
                        <p>${t}</p>
                    </div>
        `,document.body.prepend(v),v}