(async()=>{
  let d=document,
    o=open("","_blank"),
    a=alert,
    x=s=>{try{return new URL(s,location.href).href}catch{return""}},
    y=s=>(s||"").replace(/\\u0026/g,"&").replace(/\\u002F/gi,"/").replace(/\\\//g,"/").replace(/&amp;/g,"&"),
    f=r=>performance.getEntriesByType("resource").map(e=>e.name).reverse().find(u=>/(cdninstagram|fbcdn|scontent)/i.test(u)&&r.test(u))||"",
    q=e=>{for(let k in e)if(k.includes("Fiber")||k.includes("Instance"))return e[k]},
    n=u=>{u=x(u);if(!u)return"";try{let t=new URL(u);if(/cdninstagram|fbcdn|scontent/i.test(t.host)){t.searchParams.delete("bytestart");t.searchParams.delete("byteend");t.searchParams.get("_nc_ht")&&t.searchParams.set("_nc_ht",t.host)}return t.href}catch{return u}},
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
      return n(f(/\.mp4($|[?#])/i));
    },
    h=e=>{
      let u=x(e.currentSrc||e.src);
      return u&&!/^data:/.test(u)?u:x(f(/\.(jpe?g|png|webp)($|[?#])/i));
    },
    c=t=>[...d.querySelectorAll(t)].map(e=>{
      let r=e.getBoundingClientRect(),w=Math.max(0,Math.min(innerWidth,r.right)-Math.max(0,r.left)),h=Math.max(0,Math.min(innerHeight,r.bottom)-Math.max(0,r.top));
      return{e,a:w*h,c:r.left<innerWidth/2&&r.right>innerWidth/2&&r.top<innerHeight/2&&r.bottom>innerHeight/2};
    }).filter(v=>v.a>2e4&&!(v.e.tagName=="IMG"&&(v.e.src.startsWith("data:")||v.e.width<96||v.e.height<96||v.e.closest("header,nav,aside")))).sort((a,b)=>(b.c-a.c)*1e8+b.a-a.a)[0];

  if(!/instagram\.com$/i.test(location.hostname))return o&&o.close(),a("[instantgram] only works on instagram.com.");
  if(!o)return a("[instantgram] Please allow popups for instagram.com.");

  let m=c("video")||c("img");
  if(!m)return o.close(),a("[instantgram] No visible media found.");

  let e=m.e,
    v=e.tagName=="VIDEO",
    p=/^\/(p|reel|reels|tv|stories)\//.test(location.pathname)
      ? location.href
      : (e.closest("article,section,main,[role=presentation]")||d).querySelector('a[href*="/p/"],a[href*="/reel/"],a[href*="/reels/"],a[href*="/tv/"],a[href*="/stories/"]'),
    u=v?g(e):h(e);

  p=p&&p.href?p.href:p;

  if((!u||/^blob:|^data:/.test(u))&&p)try{
    let s=y(await fetch(p,{credentials:"include"}).then(r=>r.text())),
      r=v
        ? (s.match(/property=["']og:video(?::secure_url|:url)?["'][^>]+content=["']([^"']+)/i)||s.match(/https?:\/\/[^"'\\s<>]+?\.mp4[^"'\\s<>]*/i))
        : (s.match(/property=["']og:image(?::secure_url|:url)?["'][^>]+content=["']([^"']+)/i)||s.match(/https?:\/\/[^"'\\s<>]+?\.(?:jpe?g|png|webp)[^"'\\s<>]*/i));
    u=v?n(r&&(r[1]||r[0])):x(r&&(r[1]||r[0]));
  }catch{}

  if(!u)return o.close(),a(v?"[instantgram] No video URL found.":"[instantgram] No source URL found.");
  o.location=u;
})();
