"use strict";

LoadPageData(1);

async function LoadPageData(page)
{
  
  var response=await fetch(`https://reqres.in/api/users?page=${page}&per_page=10`);

  var nietGevondenDiv=document.getElementById("nietGevonden");

  if(response.ok)
  {
  
    nietGevondenDiv.hidden=true;

    var userList=await response.json();
        
    var page=userList.page;
    var per_page=userList.per_page;
    var total=userList.total;
    var total_pages=userList.total_pages;

    var recStart=1 + (page-1)*(per_page);
    var recEnd= per_page +  (page-1)*(1+per_page);
    if(recEnd>total)  recEnd=total;

    var vorige=document.getElementById("vorige");
    var volgende=document.getElementById("volgende");
    
    vorige.disabled=(page==1);   
    volgende.disabled=(page==total_pages);
   



   
    vorige.onclick=function(){
      LoadPageData(page-1);       
    };

    volgende.onclick=function(){
       LoadPageData(page+1);    
    };

    document.getElementById("recStart").innerText=recStart;
    document.getElementById("recEnd").innerText=recEnd;
    document.getElementById("page").innerText=page;
    document.getElementById("totalPages").innerText=total_pages;

   
    var ul=document.getElementById("users");
    ul.innerHTML="";

    for(var user of userList.data)
    {
        var li=document.createElement("li");
        var a=document.createElement("a");
        a.href="#";
        a.innerText=user.first_name + " " + user.last_name;
        a.dataset.id=user.id;
        a.onclick=function(){
           LoadUserData(this.dataset.id);              
        };

        li.appendChild(a);
        ul.appendChild(li);

    }
   
 }
  else
  {
      nietGevondenDiv.hidden=false;
  }

}

async function LoadUserData(id)
{

    var response=await fetch(`https://reqres.in/api/users/${id}`);
    if(response.ok)
    {
       var user=await response.json();   

      var dls= document.querySelectorAll("dl");

      if(dls!==null)
      {
        for(var dl of dls) 
        {
          dl.parentElement.removeChild(dl);
        }
      }

       var dl=document.createElement("dl");
       dl.classList.add("dunneKader");

       dl.dataset.id=id;
       var dtNummer=document.createElement("dt");
       dtNummer.innerText="Nummer";
       dl.appendChild(dtNummer);

       var ddNummer=document.createElement("dd");
       ddNummer.innerText=user.data.id;
       dl.appendChild(ddNummer);
       
       var dtFirstName=document.createElement("dt");
       dtFirstName.innerText="Voornaam";
       dl.appendChild(dtFirstName);

       var ddFirstName=document.createElement("dd");
       ddFirstName.innerText=user.data.first_name;
       dl.appendChild(ddFirstName);
      
       var dtLastName=document.createElement("dt");
       dtLastName.innerText="FamilieNaam";
       dl.appendChild(dtLastName);

       var ddLastName=document.createElement("dd");
       ddLastName.innerText=user.data.last_name;
       dl.appendChild(ddLastName);

       var dtEmail=document.createElement("dt");
       dtEmail.innerText="Email";
       dl.appendChild(dtEmail);

       var ddEmail=document.createElement("dd");
       ddEmail.innerText=user.data.email;
       dl.appendChild(ddEmail);

       var dtAvatar=document.createElement("dt");
       dtAvatar.innerText="Avatar";
       dl.appendChild(dtAvatar);

       var ddAvatar=document.createElement("dd");
       var imgAvatar=document.createElement("img");
       imgAvatar.src=user.data.avatar;
       imgAvatar.alt="avatar";
       ddAvatar.appendChild(imgAvatar);
       dl.appendChild(ddAvatar);
    
       var a=document.querySelector(`#users li a[data-id="${id}"]`);
       console.log(a);
       var li=a.parentElement;
       li.appendChild(dl);
    
    }
    else{
        var li=a.parentElement();
        var div=document.createElement("div");
        div.classList.add("fout");
        div.innerText="Niet gevonden";
        li.appendChild(div);
    }
   
}


