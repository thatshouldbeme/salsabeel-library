(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const icon = window.libraryIcon;
  const bookIcons={about:'user-round',suth:'heart-pulse',goal:'flame',dorm:'house',kiosk:'map-pin',other:'palette',certificates:'award',activities:'users-round'};
  const bookIcon = book => icon(bookIcons[book.id]);
  document.querySelectorAll('[data-icon]').forEach(el=>{el.outerHTML=icon(el.dataset.icon);});
  const reader = $('#reader'), imageViewer = $('#image-viewer'), bookEl = $('#open-book');
  const mobileQuery = matchMedia('(max-width:650px)');
  // This prototype explicitly demonstrates motion; the visitor can opt out locally.
  let motionEnabled=true;
  try { motionEnabled=localStorage.getItem('library-motion')!=='reduced'; } catch {}
  const motionButton=document.createElement('button');
  motionButton.className='motion-toggle';
  motionButton.setAttribute('aria-label','เปิดหรือปิดการเคลื่อนไหวสามมิติ');
  document.querySelector('.collection-tools').append(motionButton);
  function updateMotion() {
    motionButton.innerHTML=icon(motionEnabled?'box':'pause');
    motionButton.title=motionEnabled?'3D Motion เปิดอยู่ — คลิกเพื่อปิด':'3D Motion ปิดอยู่ — คลิกเพื่อเปิด';
    motionButton.setAttribute('aria-pressed',String(motionEnabled));
    document.body.classList.toggle('motion-reduced',!motionEnabled);
  }
  motionButton.addEventListener('click',()=>{
    motionEnabled=!motionEnabled;
    updateMotion();
    try {localStorage.setItem('library-motion',motionEnabled?'full':'reduced');}catch{}
  });
  updateMotion();
  let active = null, offset = 0, busy = false, returnFocus = null, flipTimer;
  let opening = null;
  const transition = document.createElement('dialog');
  transition.id = 'book-transition';
  transition.setAttribute('aria-label','กำลังหยิบหนังสือออกจากชั้น');
  transition.innerHTML = `<button class="cancel-opening" aria-label="ยกเลิกการเปิดหนังสือ">กลับไปที่ชั้น ${icon('x')}</button><div class="flight-matte" aria-hidden="true"></div><div class="flight-world" aria-hidden="true"><div class="flight-path"><div class="volume"><div class="volume-back"></div><div class="volume-pages"></div><div class="volume-top"></div><div class="volume-bottom"></div><div class="volume-spine"></div><div class="volume-pageface"></div><div class="volume-front"><div class="cover-art"></div><div class="cover-lining"></div></div></div></div><div class="flight-shadow"></div></div><p class="flight-caption" aria-live="polite"></p>`;
  document.body.append(transition);
  const flightPath = transition.querySelector('.flight-path');
  const volume = transition.querySelector('.volume');
  const frontCover = transition.querySelector('.volume-front');
  const caption = transition.querySelector('.flight-caption');
  transition.querySelector('button').addEventListener('click',cancelOpening);
  transition.addEventListener('cancel',event=>{event.preventDefault();cancelOpening();});
  function cancelOpening() {
    if (!opening) return;
    const state=opening;opening=null;
    state.animations.forEach(animation=>animation.cancel());
    state.spread?.remove();
    state.source?.classList.remove('book-picked');
    transition.close();
    reader.classList.remove('reader-waiting','reader-arriving');
    reader.close();
  }
  function animateOpening(el, frames, duration, state, easing='cubic-bezier(.22,.75,.2,1)') {
    const animation=el.animate(frames,{duration,easing,fill:'forwards'});
    state.animations.push(animation);
    return animation.finished;
  }
  const escapeHTML = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const url = s => encodeURI(s).replace(/#/g,'%23');
  const step = () => mobileQuery.matches ? 1 : 2;
  const locations = {about:'#about-books',suth:'#project-books',goal:'#project-books',dorm:'#project-books',kiosk:'#project-books',other:'#other-books',certificates:'#cert-books',activities:'#activity-books'};
  window.LIBRARY.forEach((book, i) => {
    const button = document.createElement('button');
    button.className = 'book';
    button.style.cssText = `--color:${book.color};--height:${book.height}px;--width:${book.width}px;--lean:${book.id==='goal'?'-3':book.id==='activities'?'3':'0'}deg;${book.id==='goal'||book.id==='certificates'?'--type:#55482c':''}`;
    button.setAttribute('aria-label',`เปิดหนังสือ ${book.title}`);
    button.dataset.book = book.id;
    button.innerHTML = `<span class="spine-num">VOL. ${String(i+1).padStart(2,'0')}</span><span class="spine-line"></span><span class="spine-title">${escapeHTML(book.title)}</span><span class="spine-symbol" aria-hidden="true">${bookIcon(book)}</span>`;
    button.addEventListener('click',() => openBook(book.id, button));
    $(locations[book.id]).append(button);
  });
  function pageHTML(index) {
    const page = active.pages[index];
    if (!page) return `<div class="end-star" aria-hidden="true">${icon('book-open')}</div><h3 class="page-title">The end.</h3><p class="page-body">กลับไปเลือกเล่มต่อไปบนชั้นหนังสือ</p><button class="page-link" data-return>กลับไปที่ชั้นหนังสือ ${icon('arrow-up-right')}</button>`;
    let html = `<p class="page-kicker">${escapeHTML(page.kicker || active.category)} / ${String(index+1).padStart(2,'0')}</p>`;
    if (page.kind==='end') html += `<div class="end-star" aria-hidden="true">${icon('book-open')}</div>`;
    html += `<h3 class="page-title">${escapeHTML(page.title)}</h3>`;
    if (page.image) html += `<img class="page-image ${escapeHTML(page.kind||'')}" src="${url(page.image)}" alt="${escapeHTML(page.title)}" data-zoom tabindex="0" role="button" aria-label="ขยายภาพ ${escapeHTML(page.title)}" loading="eager">`;
    if (page.paragraphs) html += `<div class="page-body">${page.paragraphs.map(p=>`<p>${escapeHTML(p)}</p>`).join('')}</div>`;
    if (page.tags) html += `<div class="page-tags">${page.tags.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div>`;
    if (page.caption) html += `<p class="page-caption">${escapeHTML(page.caption)}</p>`;
    if (page.links) html += page.links.map(l=>`<a class="page-link" href="${url(l.url)}" target="_blank" rel="noopener">${escapeHTML(l.label)}</a> `).join('');
    if (page.return) html += `<button class="page-link" data-return>กลับไปที่ชั้นหนังสือ ${icon('arrow-up-right')}</button>`;
    return html+`<span class="page-num">${String(index+1).padStart(2,'0')} <span aria-hidden="true">—</span> ${escapeHTML(active.title)}</span>`;
  }
  function setPage(el, index) {
    el.innerHTML = pageHTML(index);
    const p=active.pages[index];
    el.classList.toggle('image-page',Boolean(p?.image && !p.paragraphs));
    el.classList.toggle('end-page',!p || p.kind==='end');
  }
  function render() {
    setPage($('#left-page'), offset);
    setPage($('#right-page'), mobileQuery.matches ? offset : offset+1);
    $('#left-page').scrollTop = $('#right-page').scrollTop = 0;
    const last = Math.min(offset+step(),active.pages.length);
    $('#page-status').textContent = mobileQuery.matches ? `หน้า ${offset+1} / ${active.pages.length}` : `หน้า ${offset+1}–${last} / ${active.pages.length}`;
    $('#left-page').setAttribute('aria-label','หน้าซ้าย — คลิกเพื่อย้อนกลับ');
    $('#right-page').setAttribute('aria-label', mobileQuery.matches?'หน้าหนังสือ — แตะด้านขวาเพื่อไปต่อ ด้านซ้ายเพื่อย้อนกลับ':'หน้าขวา — คลิกเพื่อไปหน้าถัดไป');
  }
  async function openBook(id, trigger) {
    if (opening || reader.open) return;
    active = window.LIBRARY.find(b=>b.id===id);
    if (!active) return;
    offset=0; busy=false; returnFocus=trigger || document.activeElement;
    $('#reader-title').textContent=active.title;
    bookEl.style.setProperty('--cover',active.color);
    bookEl.classList.remove('flipping','backwards');
    render();
    const source=trigger?.classList.contains('book') ? trigger : document.querySelector(`[data-book="${id}"]`);
    const origin=source.getBoundingClientRect();
    const visibleOrigin=origin.bottom>0 && origin.top<innerHeight && origin.right>0 && origin.left<innerWidth;
    document.body.style.overflow='hidden';
    if (!motionEnabled || !visibleOrigin) {
      reader.showModal();$('#close-reader').focus();return;
    }
    const state={source,animations:[]};opening=state;
    reader.classList.add('reader-waiting');
    reader.showModal();
    const target=$('#right-page').getBoundingClientRect();
    const width=target.width,height=target.height;
    const startScale=origin.height/height;
    const depth=Math.max(25,Math.min(130,origin.width/startScale));
    const centerX=innerWidth/2, centerY=innerHeight/2-15;
    const x=origin.left+origin.width/2,y=origin.top+origin.height/2;
    const tx=target.left+width/2,ty=target.top+height/2;
    const showcaseScale=Math.min(1,innerWidth*.6/width,innerHeight*.59/height);
    transition.style.setProperty('--volume-width',`${width}px`);
    transition.style.setProperty('--volume-height',`${height}px`);
    transition.style.setProperty('--volume-depth',`${depth}px`);
    transition.style.setProperty('--volume-color',active.color);
    transition.querySelector('.cover-art').innerHTML=`<span class="cover-series">SALSABEEL’S LITTLE LIBRARY</span><span class="cover-volume">VOLUME ${String(window.LIBRARY.indexOf(active)+1).padStart(2,'0')}</span><h3>${escapeHTML(active.title)}</h3><span class="cover-emblem">${bookIcon(active)}</span><span class="cover-category">${escapeHTML(active.category)}</span><span class="cover-author">SALSABEEL DEREMAH</span>`;
    transition.querySelector('.volume-spine').innerHTML=`<span>${escapeHTML(active.title)}</span><b>${bookIcon(active)}</b>`;
    state.source.classList.add('book-picked');
    transition.classList.remove('flight-dimmed','flight-opening');
    transition.showModal();
    caption.textContent='หยิบเรื่องราวออกจากชั้น…';
    const position=(px,py,scale,z=0)=>`translate3d(${px}px,${py}px,${z}px) scale(${scale})`;
    try {
      // Pull the spine towards the visitor before rotating to reveal the cover.
      flightPath.style.transform=position(x,y,startScale);
      volume.style.transform='rotateX(0deg) rotateY(88deg) rotateZ(0deg)';
      await Promise.all([
        animateOpening(flightPath,[{transform:position(x,y,startScale)},{transform:position(x,y-25,startScale*1.2,75)}],420,state),
        animateOpening(volume,[{transform:'rotateX(0deg) rotateY(88deg) rotateZ(0deg)'},{transform:'rotateX(-5deg) rotateY(72deg) rotateZ(-5deg)'}],420,state)
      ]);
      transition.classList.add('flight-dimmed');
      caption.textContent=active.title;
      await Promise.all([
        animateOpening(flightPath,[{transform:position(x,y-25,startScale*1.2,75)},{transform:position(centerX,centerY,showcaseScale)}],850,state),
        animateOpening(volume,[{transform:'rotateX(-5deg) rotateY(72deg) rotateZ(-5deg)'},{transform:'rotateX(-6deg) rotateY(-18deg) rotateZ(-3deg)'}],850,state)
      ]);
      // A short, visible pause lets the reader see the full cover and page edges.
      await animateOpening(volume,[{transform:'rotateX(-6deg) rotateY(-18deg) rotateZ(-3deg)'},{transform:'rotateX(-3deg) rotateY(-10deg) rotateZ(0deg)'}],650,state,'ease-in-out');
      caption.textContent='เปิดเรื่องราวบทนี้';
      await Promise.all([
        animateOpening(flightPath,[{transform:position(centerX,centerY,showcaseScale)},{transform:position(tx,ty,1)}],500,state),
        animateOpening(volume,[{transform:'rotateX(-3deg) rotateY(-10deg) rotateZ(0deg)'},{transform:'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'}],500,state)
      ]);
      // Render the unfolding pages in the SAME sharp 3D scene as the cover.
      // The actual reader stays hidden behind the dialog's blurred backdrop.
      const bounds=bookEl.getBoundingClientRect();
      const spread=bookEl.cloneNode(true);
      state.spread=spread;
      spread.removeAttribute('id');
      spread.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
      spread.querySelectorAll('.turner,.opening-cover').forEach(el=>el.remove());
      spread.className='open-book flight-reading-spread';
      spread.style.cssText=`left:${bounds.left}px;top:${bounds.top}px;width:${bounds.width}px;height:${bounds.height}px;--cover:${active.color}`;
      transition.querySelector('.flight-world').prepend(spread);
      transition.classList.add('flight-opening');
      const unfolding=[animateOpening(frontCover,[
          {transform:'translateZ(calc(var(--volume-depth) / 2 + 2px)) rotateY(0deg)'},
          {transform:'translateZ(calc(var(--volume-depth) / 2 + 2px)) rotateY(-178deg)'}
        ],1000,state,'cubic-bezier(.35,.05,.2,1)')];
      if(!mobileQuery.matches) unfolding.push(animateOpening(spread,[
        {clipPath:'inset(-15px -15px -25px 50%)',offset:0},
        {clipPath:'inset(-15px -15px -25px 50%)',offset:.5},
        {clipPath:'inset(-15px -15px -25px -15px)',offset:1}
      ],1000,state,'linear'));
      await Promise.all(unfolding);
      // Fade just the temporary cover; never fade a scene over a blurred reader.
      await animateOpening(volume,[{opacity:1},{opacity:0}],180,state,'ease-out');
    } catch(error) {
      if(opening!==state)return;
      // If animation support is interrupted, keep the book readable.
    }
    if(opening!==state)return;
    opening=null;
    reader.classList.remove('reader-waiting');
    transition.close();
    state.animations.forEach(animation=>animation.cancel());
    state.spread?.remove();
    reader.classList.remove('reader-waiting','reader-arriving');
    $('#close-reader').focus();
  }
  function closeBook() { reader.close(); }
  reader.addEventListener('close',()=>{
    clearTimeout(flipTimer);busy=false;active=null;
    bookEl.classList.remove('flipping','backwards');
    document.body.style.overflow='';
    document.querySelector('.book-picked')?.classList.remove('book-picked');
    returnFocus?.focus();
  });
  function turn(direction) {
    if (!active || busy || opening) return;
    const target=offset+direction*step();
    if (target<0 || target>=active.pages.length) return;
    if (!motionEnabled) { offset=target;render();return; }
    busy=true;
    const front=$('.turn-front'),back=$('.turn-back');
    if (mobileQuery.matches) {
      setPage(front,offset);setPage(back,target);
      setPage($('#right-page'),target);
    } else if (direction===1) {
      setPage(front,offset+1);setPage(back,target);
      setPage($('#right-page'),target+1);
    } else {
      setPage(front,offset);setPage(back,target+1);
      setPage($('#left-page'),target);
    }
    bookEl.classList.toggle('backwards',direction===-1);
    bookEl.classList.add('flipping');
    const finish=()=>{offset=target;busy=false;bookEl.classList.remove('flipping','backwards');render();};
    flipTimer=setTimeout(finish,720);
  }
  $('#close-reader').addEventListener('click',closeBook);
  $('#first-book').addEventListener('click',event=>openBook('about',event.currentTarget));
  bookEl.addEventListener('click',event=>{
    if(event.target.closest('[data-return]')){closeBook();return;}
    if(event.target.closest('[data-zoom]')){openImage(event.target);return;}
    if(event.target.closest('a,button'))return;
    if (mobileQuery.matches) {
      const bounds=bookEl.getBoundingClientRect();
      turn(event.clientX<bounds.left+bounds.width/2?-1:1);
    } else turn(event.target.closest('#left-page')?-1:1);
  });
  function openImage(img) {
    if(busy)return;
    $('#image-viewer img').src=img.src;
    $('#image-viewer img').alt=img.alt;
    $('#image-viewer p').textContent=img.alt;
    imageViewer.showModal();$('#close-image').focus();
  }
  $('#close-image').addEventListener('click',()=>imageViewer.close());
  imageViewer.addEventListener('click',event=>{if(event.target===imageViewer)imageViewer.close();});
  imageViewer.addEventListener('close',()=>$('#image-viewer img').removeAttribute('src'));
  reader.addEventListener('keydown',event=>{
    if(imageViewer.open)return;
    if(event.key==='ArrowRight'){event.preventDefault();turn(1);}
    if(event.key==='ArrowLeft'){event.preventDefault();turn(-1);}
    if((event.key==='Enter'||event.key===' ')&&event.target.matches('[data-zoom]')){event.preventDefault();openImage(event.target);}
  });
  let startX=0,startY=0;
  bookEl.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;startY=e.changedTouches[0].clientY;},{passive:true});
  bookEl.addEventListener('touchend',e=>{
    const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;
    if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5){turn(dx<0?1:-1);}
  },{passive:true});
  mobileQuery.addEventListener('change',()=>{
    if(opening){cancelOpening();return;}
    if(!active)return;
    clearTimeout(flipTimer);busy=false;bookEl.classList.remove('flipping','backwards');
    if(!mobileQuery.matches)offset=Math.floor(offset/2)*2;
    render();
  });
})();
