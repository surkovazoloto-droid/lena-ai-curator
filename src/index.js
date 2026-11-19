const SYSTEM_PROMPT = `Ты — «ЛЕНА AI — ТВОЙ КУРАТОР 😈».

Твоя задача — не выдавать шаблонные советы, а постепенно помогать человеку разобраться в себе и прийти к понятному профессиональному направлению и первым деньгам.

МАРШРУТ:
РАСПАКОВКА ЧЕЛОВЕКА → СИЛЬНЫЕ СТОРОНЫ → ОПЫТ И НАВЫКИ → НАПРАВЛЕНИЯ → ОНЛАЙН-ПРОФЕССИЯ → БЛОГ → ПРОДУКТ → ПРОДАЖИ → РЕЗУЛЬТАТ.

ГЛАВНОЕ ПРАВИЛО:
Сначала человек. Не начинай с блога, Reels или продажи курса, пока не поняла человека и его опыт.

КАК ПРОВОДИТЬ РАСПАКОВКУ:
- Задавай по одному вопросу за раз.
- Не выдавай анкету из 20–30 вопросов.
- После ответа коротко отражай, что заметила, и задавай следующий вопрос.
- Ищи не только должности, но и реальные действия: что человек придумывал, организовывал, продавал, решал, объяснял, запускал, улучшал.
- Уточняй результаты, ответственность, самостоятельность и то, что человек делает лучше других.
- Не обесценивай опыт из-за того, что он кажется «обычным».

КОГДА ИНФОРМАЦИИ ДОСТАТОЧНО:
Сделай разбор «Что я вижу в тебе»:
1. сильные стороны;
2. скрытые сильные стороны;
3. опыт, который можно монетизировать;
4. какие задачи человеку особенно хорошо даются;
5. что может стать профессией, услугой или продуктом.

ЗАТЕМ ПРЕДЛАГАЙ 3–5 НАПРАВЛЕНИЙ. Для каждого объясняй:
- почему подходит;
- какие уже есть навыки;
- чего не хватает;
- кому человек может быть полезен;
- что можно продавать;
- в каком формате работать онлайн;
- нужен ли блог;
- как можно прийти к первым деньгам.
После этого рекомендуй ОДНО направление для первого теста.

БЛОГ:
Помогай с позиционированием и контентом только после определения направления. Не заставляй человека вести блог, если ему он не нужен для выбранной модели.

ПРОДУКТ:
Помогай определить проблему, аудиторию, результат, формат, содержание, срок создания, цену, оффер и следующий продукт. Если большой продукт пока рано — предлагай более простой формат: консультацию, аудит, разбор, мини-продукт или услугу.

ПРОДАЖИ:
Помогай составить предложение, контент, Reels, Stories, посты, прогрев, сообщения в личке, ответы на возражения и призыв к действию. Без манипуляций и давления.

РЕЖИМЫ:
Если человек пишет «Разбери мою ситуацию» — разбери её честно и практически.
Если пишет «Проверь меня» — найди слабые места и конкретно скажи, что мешает двигаться.
Если пишет «Дай пенок 😈» — можешь быть жёсткой, прямой и с юмором, но не унижай, не стыди и не дави на травмы, здоровье или семью. Критикуй действия, а не личность, и обязательно давай конкретное действие.
Если пишет «Я сделала» — помоги оценить результат и выбрать следующий шаг.
Если пишет «Я застряла» — сначала выясни, где именно стопор, потом дай одно действие с максимальным прогрессом.

СТИЛЬ:
Живо, тепло, по-человечески. Простые слова. Можно немного дерзости и юмора. Никакого корпоративного языка, пустой мотивации и длинных лекций.
Не придумывай опыт человека. Если информации не хватает — спроси.
Не перегружай: в каждый момент давай один главный следующий шаг.

ПЕРВЫЙ ДИАЛОГ:
Если это новое знакомство, начни так:
«Привет 😈 Я Лена AI — твой куратор. Я не буду сразу рассказывать тебе, какой блог вести и что продавать. Сначала разберём тебя: твой опыт, сильные стороны и то, что у тебя уже есть. А потом найдём, как это можно превратить в понятное направление и деньги.

Начнём с самого простого: чем ты занималась раньше и что ты умеешь делать?»`;

const HTML = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>ЛЕНА AI — ТВОЙ КУРАТОР 😈</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f7f1ea;color:#2a211d;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;min-height:100vh}
.wrap{max-width:760px;margin:0 auto;min-height:100vh;display:flex;flex-direction:column;background:#fffaf5;box-shadow:0 0 30px #00000010}
header{padding:22px 20px 16px;background:#2d211d;color:#fff;position:sticky;top:0;z-index:2}header h1{margin:0;font-size:20px}header p{margin:5px 0 0;color:#d9cbc3;font-size:13px}
#chat{flex:1;padding:20px 16px 120px;overflow:auto}.msg{max-width:88%;padding:13px 15px;border-radius:18px;margin:10px 0;line-height:1.45;white-space:pre-wrap}.ai{background:#efe4d9;border-bottom-left-radius:6px}.user{background:#2d211d;color:#fff;margin-left:auto;border-bottom-right-radius:6px}.typing{opacity:.6}
form{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:min(760px,100%);padding:12px 14px calc(12px + env(safe-area-inset-bottom));background:#fffaf5;border-top:1px solid #eadfd7;display:flex;gap:8px}textarea{flex:1;resize:none;border:1px solid #d9cbc3;border-radius:16px;padding:12px 13px;font:inherit;min-height:48px;max-height:130px;background:#fff}button{border:0;border-radius:16px;background:#2d211d;color:#fff;padding:0 18px;font-weight:700;font-size:15px}.small{font-size:12px;color:#87766c;text-align:center;margin:0 0 8px}
</style></head><body><div class="wrap"><header><h1>ЛЕНА AI — ТВОЙ КУРАТОР 😈</h1><p>Разберём тебя → найдём направление → превратим навыки в понятный путь</p></header><main id="chat"></main><div class="small">Твои сообщения отправляются в Cloudflare Workers AI. Ключи API в браузер не выдаются.</div><form id="form"><textarea id="input" placeholder="Напиши ответ…" autocomplete="off"></textarea><button>➤</button></form></div>
<script>
const chat = document.getElementById('chat');
const input = document.getElementById('input');
const form = document.getElementById('form');

let messages = [];

function add(role, text, save = true) {
  const d = document.createElement('div');
  d.className = 'msg ' + (role === 'user' ? 'user' : 'ai');
  d.textContent = text;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;

  if (save) {
    messages.push({ role, content: text });
    localStorage.setItem('lena_messages', JSON.stringify(messages));
  }
}

try {
  const saved = JSON.parse(localStorage.getItem('lena_messages') || '[]');

  if (Array.isArray(saved) && saved.length) {
    messages = saved;
    saved.forEach(m => add(m.role, m.content, false));
  } else {
    add(
      'assistant',
      'Привет 😈 Я Лена AI — твой куратор. Я не буду сразу рассказывать тебе, какой блог вести и что продавать. Сначала разберём тебя.\\n\\nНачнём с самого простого: чем ты занималась раньше и что ты умеешь делать?'
    );
  }
} catch (e) {
  localStorage.removeItem('lena_messages');

  add(
    'assistant',
    'Привет 😈 Я Лена AI — твой куратор. Сначала разберём тебя, а уже потом будем искать направление.\\n\\nНачнём с самого простого: чем ты занималась раньше и что ты умеешь делать?'
  );
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const text = input.value.trim();

  if (!text) return;

  add('user', text);
  input.value = '';
  input.disabled = true;

  const loading = document.createElement('div');
  loading.className = 'msg ai';
  loading.textContent = 'Думаю над твоим ответом… 😈';
  chat.appendChild(loading);
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: messages
      })
    });

    const data = await response.json();

    loading.remove();

    if (!response.ok || data.error) {
      add('assistant', 'Не смогла получить ответ 😕 ' + (data.error || 'Попробуй ещё раз.'));
      return;
    }

    add('assistant', data.text || 'Я получила твой ответ, но почему-то не смогла сформулировать ответ 😅');

  } catch (error) {
    loading.remove();
    add('assistant', 'Что-то пошло не так при соединении. Попробуй отправить сообщение ещё раз.');
  } finally {
    input.disabled = false;
    input.focus();
  }
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    form.requestSubmit();
  }
});
</script>
</script></body></html>`;

function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json;charset=UTF-8','cache-control':'no-store'}})}

export default {async fetch(request,env){
 const url=new URL(request.url);
 if(request.method==='GET' && url.pathname==='/') return new Response(HTML,{headers:{'content-type':'text/html;charset=UTF-8','cache-control':'no-store'}});
 if(request.method==='POST' && url.pathname==='/api/chat'){
   if(env.ACCESS_CODE){const code=request.headers.get('x-access-code');if(code!==env.ACCESS_CODE)return json({error:'Неверный код доступа.'},401)}
   try{
     const body=await request.json();
     let messages=Array.isArray(body.messages)?body.messages.slice(-30):[];
     messages=messages.filter(m=>m&&['user','assistant'].includes(m.role)&&typeof m.content==='string').map(m=>({role:m.role,content:m.content.slice(0,12000)}));
     if(!messages.length)return json({error:'Пустой диалог.'},400);
     const result=await env.AI.run('@cf/openai/gpt-oss-120b',{messages:[{role:'system',content:SYSTEM_PROMPT},...messages],max_tokens:900,temperature:0.65});
     const text=result?.response || result?.result?.response || result?.output_text || '';
     if(!text)return json({error:'Модель не вернула ответ.'},502);
     return json({text});
   }catch(e){return json({error:'Ошибка AI: '+(e?.message||'unknown')},500)}
 }
 return new Response('Not found',{status:404});
}};
