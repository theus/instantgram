(async()=>{
  let d=document,
    o=open("","_blank"),
    a=alert,
    x=s=>{try{return s?new URL(s,location.href).href:""}catch{return""}},
    y=s=>(s||"").replace(/\\u0026/g,"&").replace(/\\u002F/gi,"/").replace(/\\\//g,"/").replace(/&amp;/g,"&"),
    z=u=>{try{return /(^|\.)cdninstagram\.com$|(^|\.)fbcdn\.net$/i.test(new URL(u,location.href).hostname)}catch{return!1}},
    r=u=>{try{let e=new URL(u).searchParams.get("efg"),s=e&&atob(e);return /audio/i.test(s||"")}catch{return!1}},
    f=(p,v)=>performance.getEntriesByType("resource").map(e=>e.name).reverse().find(u=>z(u)&&p.test(u)&&(!v||!r(u)))||"",
    j=e=>(e.srcset||"").split(",").map(s=>{let p=s.trim().match(/^(\S+)(?:\s+(\d+(?:\.\d+)?)(w|x))?/);return p&&{u:x(p[1]),s:+p[2]||1,t:p[3]||"x"}}).filter(Boolean).sort((a,b)=>(b.t=="w"?b.s:b.s*innerWidth)-(a.t=="w"?a.s:a.s*innerWidth))[0]?.u||"",
    k=e=>/(profile picture|avatar)/i.test(e.alt||"")||(Math.abs(e.width-e.height)<12&&Math.max(e.width,e.height)<260&&!e.closest('a[href*="/p/"],a[href*="/reel/"],a[href*="/reels/"],a[href*="/tv/"],a[href*="/stories/"]')),
    b=u=>/\/t51\.2885-19\/|s150x150|profile_pic/i.test(u||""),
    m=(s,p)=>{let t=(s.match(/<meta\b[^>]*>/gi)||[]).find(t=>new RegExp(`property=["']${p}(?::secure_url|:url)?["']`,"i").test(t)),r=t&&t.match(/content=["']([^"']+)/i);return r&&r[1]||""},
    l=async(p,v,i)=>{try{let s=y(await fetch(p,{credentials:"include"}).then(r=>r.text())),q=m(s,v?"og:video":"og:image"),r=q?0:(v?s.match(/https?:\/\/[^"'\\s<>]+?\.mp4[^"'\\s<>]*/i):s.match(/https?:\/\/[^"'\\s<>]+?\.(?:jpe?g|png|webp)[^"'\\s<>]*/i)),u=q||(r&&r[0])||"";u=v?n(u):x(u);return i&&b(u)?"":u}catch{return""}},
    q=e=>{for(let k in e)if(k.includes("Fiber")||k.includes("Instance"))return e[k]},
    n=u=>{u=x(u);if(!u)return"";try{let t=new URL(u);if(z(t.href)){t.searchParams.delete("bytestart");t.searchParams.delete("byteend");t.searchParams.get("_nc_ht")&&t.searchParams.set("_nc_ht",t.host)}return t.href}catch{return u}},
    g=e=>{
      let u=x(e.currentSrc||e.src);
      if(u&&!/^blob:|^data:/.test(u))return n(u);
      let i=q(e),m="",s="",r;
      for(;i&&!m&&!s;i=i.return){
        r=i.memoizedProps||{};
        m=m||r.fallbackSrc||(r.post&&r.post.videoUrl)||"";
        s=s||r.manifest||r.video_dash_manifest||"";
      }
      if(m)return n(m);
      if(s){
        let b=[...new DOMParser().parseFromString(s,"text/xml").querySelectorAll('Representation[mimeType="video/mp4"]')].map(z=>({u:z.querySelector("BaseURL")&&z.querySelector("BaseURL").textContent.trim(),h:z.getAttribute("FBQualityClass")=="hd",b:+z.getAttribute("bandwidth")||0})).filter(z=>z.u).sort((a,b)=>b.h-a.h||b.b-a.b)[0];
        if(b)return n(b.u);
      }
      return n(f(/\.mp4($|[?#])/i,1));
    },
    h=e=>{
      let u=j(e)||x(e.currentSrc||e.src);
      return u&&!/^blob:|^data:/.test(u)?u:x(f(/\.(jpe?g|png|webp)($|[?#])/i));
    },
    c=t=>[...d.querySelectorAll(t)].map(e=>{
      let r=e.getBoundingClientRect(),w=Math.max(0,Math.min(innerWidth,r.right)-Math.max(0,r.left)),h=Math.max(0,Math.min(innerHeight,r.bottom)-Math.max(0,r.top));
      return{e,a:w*h,c:r.left<innerWidth/2&&r.right>innerWidth/2&&r.top<innerHeight/2&&r.bottom>innerHeight/2};
    }).filter(v=>v.a>2e4&&!(v.e.tagName=="IMG"&&(v.e.src.startsWith("data:")||v.e.width<96||v.e.height<96||v.e.closest("header,nav,aside")||k(v.e)))).sort((a,b)=>(b.c-a.c)*1e8+b.a-a.a)[0];

  if(!/(^|\.)instagram\.com$/i.test(location.hostname))return o&&o.close(),a("[instantgram] only works on instagram.com.");
  if(!o)return a("[instantgram] Please allow popups for instagram.com.");
  try{o.opener=null}catch{}

  let p=/^\/(p|reel|reels|tv|stories)\//.test(location.pathname)?location.href:"",i=c("video,img");
  if(!i&&!p)return o.close(),a("[instantgram] No visible media found.");

  let e=i&&i.e,
    t=e&&e.tagName=="VIDEO",
    s=/^\/stories\//.test(location.pathname),
    w=t||/^\/(reel|reels|tv)\//.test(location.pathname),
    v=w,
    u=t?g(e):(!s&&!w&&e?h(e):"");

  p=p||(e&&(e.closest("article,section,main,[role=presentation]")||d).querySelector('a[href*="/p/"],a[href*="/reel/"],a[href*="/reels/"],a[href*="/tv/"],a[href*="/stories/"]'));
  p=p&&p.href?p.href:p;

  if(p&&(s||w)&&!u){let r=await l(p,1);if(r)u=r,v=1}
  if(!u&&e&&!t)u=h(e),v=0;
  if(p&&!u){let r=await l(p,0,s);if(r)u=r,v=0}

  if(!u)return o.close(),a(v?"[instantgram] No video URL found.":"[instantgram] No source URL found.");
  o.location=u;
})();
