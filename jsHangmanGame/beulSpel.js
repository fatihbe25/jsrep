"use strict";

var sauzen=[];
var geSelecteerdSaus="";
var gevonden=[];
var poging=0;

LoadData();

//#region " instellingen "

async function LoadData()
{
    var response=await fetch("sauzen.json");

   // console.log(response);
   if(response.ok==true)
   {
    sauzen=await response.json();
    //console.log(sauzen);
    document.getElementById("raden").disabled=false;
    selectSaus();
    toonRaden();
  
    document.getElementById("opnieuw").disabled=false;

   }
   else 
   {
       toonMelding("Fout tijdens data loaden!",true);
   }
}

function opNieuw()
{
    toonMelding("");
    gevonden=[];
    poging=0;
    Pog(poging);
    selectSaus();
    toonRaden();
}

function selectSaus()
{
    var index= Math.floor(Math.random()* sauzen.length );
    geSelecteerdSaus=sauzen[index];
    //console.log(geSelecteerdSaus);
}

function toonRaden()
{
    var s="";
    for(var i=1;i<=geSelecteerdSaus.length;i++)
    {
        if(gevonden.includes(i))
        {
         s+=geSelecteerdSaus[i-1] + " ";
        }
        else 
        {
          s+="_ ";
        }
    }

    document.getElementById("teraden").innerText=s;
}

function toonMelding(msg,isFout=false)
{
    var melding=document.getElementById("melding");

    if(msg=="") 
    {
        melding.hidden=true;
        return;
    }

    melding.classList.add(isFout?"fout":"feedback");
    melding.hidden=false;
    melding.innerText=msg;
}

//#endregion


document.getElementById("raden").onclick=function(){
   
    var letterInp=document.getElementById("letter");
    var letter=letterInp.value;
    letterInp.value="";
    checkRaad(letter) 
};

document.getElementById("opnieuw").onclick=opNieuw;


function Pog(p)
{
    var pogingImg=document.getElementById("poging");
    pogingImg.src=p + ".png";
    pogingImg.alt=p;
}

function checkRaad(ltr)
{

    var staat=false;

    for(var i=0;i<geSelecteerdSaus.length;i++)
    {
        var l=geSelecteerdSaus[i];
        // console.log(l);
        if(l==ltr &&  !gevonden.includes(i+1) )
        {
           staat=true;
            gevonden.push(i+1);
        }
    }

    toonRaden();


    if(staat==false)
    {
        poging++;
        Pog(poging);

        if(poging==10)
        {
        
          toonMelding(`Je hebt verloren, de saus was ${geSelecteerdSaus}.`,true);
        }

    }

    if(poging<10 && gevonden.length==geSelecteerdSaus.length)
    {
       toonMelding(`Je hebt gewonnen, de saus was ${geSelecteerdSaus}.`);
    }

    //console.log(poging);

}

