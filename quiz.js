const Q=[
{id:"work",t:"What kind of work do you mostly do?",m:true,o:[["writing","Writing / content / newsletters"],["video","Video, podcasts, or design"],["sales","Selling, marketing, or client outreach"],["research","Research and learning"],["coding","Building software or websites"],["ops","Repetitive admin and busywork"]]},
{id:"pain",t:"What eats the most of your time?",o:[["writing","Writing first drafts"],["video","Editing media"],["research","Finding reliable info"],["automation","Copying data between apps"],["sales","Following up with leads"]]},
{id:"skill",t:"How comfortable are you with tech?",o:[["beginner","Beginner: keep it simple"],["mid","Comfortable: I can follow tutorials"],["adv","Advanced: I can code or self-host"]]},
{id:"budget",t:"What's your monthly tool budget?",o:[["free","Free only"],["low","A little, for something that saves real time"],["high","Whatever works, if it pays off"]]},
{id:"agents",t:"Interested in AI agents that do tasks for you?",o:[["yes","Yes, I want things to run on their own"],["maybe","Curious, not ready yet"],["no","Not right now"]]},
{id:"output",t:"Where does your work mostly end up?",o:[["social","Social media"],["email","Email / newsletter"],["clients","Client deliverables"],["product","My own product or app"]]}];
const TOOLS={writing:["Writing",["Claude","ChatGPT"]],research:["Research",["Perplexity","ChatGPT"]],video:["Video / Design",["Canva","CapCut","Descript"]],sales:["Sales / Marketing",["ChatGPT","Canva"]],automation:["Automation / Agents",["Zapier","Make","n8n"]],coding:["Coding",["Cursor","GitHub Copilot"]]};
const f=document.getElementById("quiz");
f.innerHTML=Q.map((q,i)=>`<div class="q card"><h3>${i+1}. ${q.t}${q.m?' <span class="mute" style="font-size:.85rem">(pick any)</span>':''}</h3><div class="opts">${q.o.map(([v,l])=>`<label><input type="${q.m?'checkbox':'radio'}" name="${q.id}" value="${v}" ${q.m?'':'required'}>${l}</label>`).join("")}</div></div>`).join("")+'<button class="btn" type="submit">See my tools</button>';
f.onsubmit=e=>{e.preventDefault();const d=new FormData(f),s={writing:0,research:0,video:0,sales:0,automation:0,coding:0};
d.getAll("work").forEach(w=>s[w==="ops"?"automation":w]+=3);const p=d.get("pain");s[p]+=2;
if(d.get("agents")==="yes")s.automation+=3;else if(d.get("agents")==="maybe")s.automation+=1;
({social:["video","writing"],email:["writing","sales"],clients:["research","writing"],product:["coding","automation"]}[d.get("output")]||[]).forEach(c=>s[c]+=1);
const top=Object.entries(s).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0]),skill=d.get("skill"),budget=d.get("budget");
const tip=c=>c==="automation"?(skill==="adv"?"Start with n8n (open-source, self-hostable).":skill==="mid"?"Try Make for flexible visual workflows.":"Start with Zapier, the simplest option."):"";
const r=document.getElementById("result");
r.innerHTML=`<div class="card" style="margin-top:20px"><h2>Your starter stack</h2>${top.map(c=>`<div class="rank"><div><span class="tag">${TOOLS[c][0]}</span><br><b>${TOOLS[c][1].join(", ")}</b> <span class="mute">${tip(c)}</span></div></div>`).join("")}
<p class="mute">${budget==="free"?"Most of these offer free plans or trials. Start there before paying.":"Check current pricing on each tool's site, since plans change often."}</p><a class="btn" href="#signup">Get new tools ranked weekly</a></div>`;r.scrollIntoView({behavior:"smooth"})};
