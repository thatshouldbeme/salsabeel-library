(() => {
  'use strict';
  const source = window.LIBRARY;
  const messages = {
    th: {
      browseProjects:'ปัดดูผลงานทั้ง 4 เล่ม ↔', explore:'สำรวจผลงานเด่น', previous:'หน้าก่อน', next:'หน้าถัดไป', navigation:'การเปลี่ยนหน้าหนังสือ', readingHint:'คลิกหน้าซ้าย–ขวา หรือใช้ปุ่มลูกศร ← →', swipeHint:'แตะขอบหน้า หรือปัดซ้าย–ขวาเพื่อเปลี่ยนหน้า', motionSystem:'ลดการเคลื่อนไหวตามการตั้งค่าของอุปกรณ์',
      headline:'ชั้นหนังสือเล็ก ๆ<br>กับ<em>เรื่องราวมากมาย</em>', intro:'ยินดีต้อนรับสู่ห้องสมุดเล็ก ๆ ของซัลสบีล<br>รวมเรื่องราว งานออกแบบ และสิ่งที่ได้เรียนรู้ไว้บนชั้นนี้',
      librarian:'รู้จักเจ้าของห้องสมุด', name:'ซัลสบีล<br>เดเระมะ', philosophy:'ออกแบบด้วยความใส่ใจ<br>เรียนรู้ด้วยความสงสัย', connect:'มาพูดคุยกัน', collection:'คอลเลกชันหนังสือ', hint:'เลือกสักเล่ม แล้วเปิดเรื่องราวข้างใน', catalogue:'8 เล่ม · 2 ชั้น',
      about:'เกี่ยวกับฉันและทักษะ', projects:'ผลงานเด่น', volumes:'4 เล่ม', other:'ผลงานอื่น ๆ', certificates:'ประกาศนียบัตร', activities:'กิจกรรม', hello:'สวัสดี<br>ฉันชื่อซัลซ่า', little:'ไอเดียเล็ก ๆ', big:'ความเป็นไปได้มากมาย', always:'เรียนรู้', learning:'อยู่เสมอ', handmade:'คัดสรรและสร้างสรรค์ด้วยตัวเอง', first:'เริ่มอ่านเรื่องราวของฉัน', established:'เริ่มต้นในปี 2569',
      skip:'ข้ามไปชั้นหนังสือ', profile:'โปรไฟล์และช่องทางติดต่อ', shelf:'ชั้นหนังสือ Portfolio 2 ชั้น', portrait:'ซัลสบีล เดเระมะ', email:'ส่งอีเมล', phone:'โทรศัพท์', linkedin:'ดู LinkedIn', emailLabel:'อีเมล salsasira@gmail.com', phoneLabel:'โทร 062 420 8969', linkedinLabel:'LinkedIn ของ Salsabeel Deremah',
      back:'กลับชั้นหนังสือ', return:'กลับไปที่ชั้นหนังสือ', end:'จบเรื่องราวเล่มนี้', endNote:'กลับไปเลือกเล่มต่อไปบนชั้นหนังสือ', zoom:'ขยายภาพ', imageViewer:'ดูภาพขยาย', closeImage:'ปิดภาพขยาย', motion:'เปิดหรือปิดการเคลื่อนไหวสามมิติ', motionOn:'3D Motion เปิดอยู่ — คลิกเพื่อปิด', motionOff:'3D Motion ปิดอยู่ — คลิกเพื่อเปิด',
      opening:'กำลังหยิบหนังสือออกจากชั้น', cancel:'ยกเลิกการเปิดหนังสือ', picking:'หยิบเรื่องราวออกจากชั้น…', chapter:'เปิดเรื่องราวบทนี้', open:'เปิดหนังสือ', page:'หน้า', left:'หน้าซ้าย — คลิกเพื่อย้อนกลับ', right:'หน้าขวา — คลิกเพื่อไปหน้าถัดไป', mobile:'หน้าหนังสือ — แตะด้านขวาเพื่อไปต่อ ด้านซ้ายเพื่อย้อนกลับ', series:'ห้องสมุดเล็ก ๆ ของซัลสบีล', spineVolume:'เล่ม', volume:'เล่มที่', author:'ซัลสบีล เดเระมะ', language:'เลือกภาษา', title:'ห้องสมุดเล็ก ๆ ของซัลสบีล — Portfolio', description:'ห้องสมุดเล็ก ๆ ของซัลสบีล เดเระมะ รวมงาน UX/UI Design ไอเดีย และประสบการณ์บนชั้นหนังสือที่เปิดอ่านได้'
    },
    en: {
      browseProjects:'Swipe for all 4 projects ↔', explore:'Explore Projects', previous:'Previous', next:'Next', navigation:'Book navigation', readingHint:'Click either page or use the ← → arrow keys', swipeHint:'Tap either edge or swipe to turn the page', motionSystem:'Reduced motion follows your device settings',
      headline:'A little shelf,<br>a lot of <em>stories.</em>', intro:'Welcome to Salsabeel’s little library.<br>A shelf of design, stories and things I’ve learned.',
      librarian:'MEET THE LIBRARIAN', name:'Salsabeel<br>Deremah', philosophy:'Thoughtful design.<br>Curious mind.', connect:'LET’S CONNECT', collection:'THE COLLECTION', hint:'Pick a book and discover the story inside', catalogue:'8 BOOKS · 2 SHELVES',
      about:'ABOUT ME & SKILLS', projects:'FEATURED PROJECTS', volumes:'4 VOLUMES', other:'OTHER PROJECTS', certificates:'CERTIFICATES', activities:'ACTIVITIES', hello:'hello,<br>I’m Salsa.', little:'little ideas', big:'big possibilities', always:'ALWAYS', learning:'LEARNING', handmade:'HANDPICKED & PERSONALLY MADE', first:'Start with my story', established:'EST. 2026',
      skip:'Skip to the bookshelf', profile:'Profile and contact details', shelf:'Portfolio bookshelf with 2 shelves', portrait:'Salsabeel Deremah', email:'Send an email', phone:'Call', linkedin:'View LinkedIn', emailLabel:'Email salsasira@gmail.com', phoneLabel:'Call 062 420 8969', linkedinLabel:'Salsabeel Deremah on LinkedIn',
      back:'Back to the bookshelf', return:'Return to the bookshelf', end:'The end.', endNote:'Return to the shelf and choose your next book.', zoom:'Enlarge image', imageViewer:'Image preview', closeImage:'Close image preview', motion:'Turn 3D Motion on or off', motionOn:'3D Motion is on — click to turn off', motionOff:'3D Motion is off — click to turn on',
      opening:'Taking a book off the shelf', cancel:'Cancel opening the book', picking:'Taking a story off the shelf…', chapter:'Opening this chapter', open:'Open book', page:'Page', left:'Left page — click to go back', right:'Right page — click for the next page', mobile:'Book page — tap right to continue or left to go back', series:'SALSABEEL’S LITTLE LIBRARY', spineVolume:'VOL.', volume:'VOLUME', author:'SALSABEEL DEREMAH', language:'Choose language', title:'Salsabeel’s Little Library — Portfolio', description:'Step into Salsabeel Deremah’s little library of UX/UI Design, ideas and experiences. An interactive bookshelf portfolio.'
    }
  };
  let language='en';
  try { const saved=localStorage.getItem('library-language'); if(saved==='en'||saved==='th')language=saved; } catch {}
  const t=key=>messages[language][key];
  window.libraryI18n={t,get language(){return language;},setLanguage};
  const textBindings={'.skip':'skip','.intro-note':'intro','.card-kicker':'librarian','.card-person b':'name','.card-person p':'philosophy','#contact-label':'connect','.collection-heading > span:first-child':'collection','.catalogue':'catalogue','.shelf-doodle > span':'hello','.stack > span:first-child':'little','.stack > span:nth-child(2)':'big','.below-shelf > span:last-child':'established'};
  const attrBindings=[['.library-card','aria-label','profile'],['#library','aria-label','shelf'],['.card-person img','alt','portrait'],['a[href^="mailto:"]','title','email'],['a[href^="tel:"]','title','phone'],['a[href*="linkedin.com"]','title','linkedin'],['a[href^="mailto:"]','aria-label','emailLabel'],['a[href^="tel:"]','aria-label','phoneLabel'],['a[href*="linkedin.com"]','aria-label','linkedinLabel'],['#image-viewer','aria-label','imageViewer'],['#close-image','aria-label','closeImage'],['#close-image','title','closeImage']];
  const star=document.querySelector('.title-star').outerHTML;
  function picker(className){
    const group=document.createElement('div');group.className=`language-switch ${className}`;group.setAttribute('role','group');
    group.innerHTML='<button type="button" data-language="th" lang="th">ไทย</button><button type="button" data-language="en" lang="en">EN</button>';
    group.addEventListener('click',event=>{const button=event.target.closest('[data-language]');if(button)setLanguage(button.dataset.language);});
    return group;
  }
  document.querySelector('.collection-tools').append(picker('shelf-language'));
  document.querySelector('.reader-toolbar').prepend(picker('reader-language'));
  function setLanguage(next){
    if(next!=='th'&&next!=='en')return;
    language=next;
    document.documentElement.lang=language;
    document.title=t('title');document.querySelector('meta[name="description"]').content=t('description');
    const overrides=window.LIBRARY_TRANSLATIONS[language];
    window.LIBRARY=source.map(book=>{
      const localized=overrides[book.id]||{};
      return {...book,...localized,pages:book.pages.map((page,index)=>({...page,...localized.pages?.[index]}))};
    });
    for(const [selector,key] of Object.entries(textBindings))document.querySelector(selector).innerHTML=t(key);
    for(const [selector,attribute,key] of attrBindings)document.querySelector(selector).setAttribute(attribute,t(key));
    document.querySelector('#headline').innerHTML=t('headline')+star;
    document.querySelector('.hint').innerHTML=`<span aria-hidden="true"><i data-icon="arrow-down-left"></i></span> ${t('hint')}`;
    for(const [selector,key] of [['.about-compartment','about'],['.projects-compartment','projects'],['.other-compartment','other'],['.cert-compartment','certificates'],['.activity-compartment','activities']]){
      const label=document.querySelector(`${selector} .shelf-label`),number=label.querySelector('span').outerHTML;
      label.innerHTML=`${number} ${t(key)}${key==='projects'?` <small>${t('volumes')}</small>`:''}`;
    }
    document.querySelector('.seal').innerHTML=`${t('always')}<br><span><i data-icon="award"></i></span><br>${t('learning')}`;
    document.querySelector('.below-shelf > span:first-child').innerHTML=`<i></i> ${t('handmade')}`;
    document.querySelector('#explore-projects').innerHTML=`${t('explore')} <i data-icon="arrow-down-left"></i>`;
    document.querySelector('#project-scroll-hint').textContent=t('browseProjects');
    document.querySelector('#previous-page span').textContent=t('previous');
    document.querySelector('#next-page span').textContent=t('next');
    document.querySelector('#previous-page').setAttribute('aria-label',t('previous'));
    document.querySelector('#next-page').setAttribute('aria-label',t('next'));
    document.querySelector('.reading-navigation').setAttribute('aria-label',t('navigation'));
    document.querySelector('#first-book').innerHTML=`${t('first')} <span><i data-icon="arrow-up-right"></i></span>`;
    document.querySelector('#close-reader').innerHTML=`<span aria-hidden="true"><i data-icon="library-big"></i></span> ${t('back')}`;
    document.querySelector('#close-reader').setAttribute('aria-label',t('back'));
    document.querySelectorAll('.language-switch').forEach(group=>{
      group.setAttribute('aria-label',t('language'));
      group.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===language)));
    });
    document.querySelectorAll('[data-icon]').forEach(el=>{el.outerHTML=window.libraryIcon(el.dataset.icon);});
    try {localStorage.setItem('library-language',language);}catch{}
    document.dispatchEvent(new CustomEvent('library-language-change'));
  }
  setLanguage(language);
})();
