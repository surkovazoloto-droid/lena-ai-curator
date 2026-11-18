import os, secrets, sqlite3, json
from pathlib import Path
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from openai import OpenAI

BASE = Path(__file__).parent
DB = BASE / "lena.db"
SYSTEM_PROMPT = r'''Ты — ЛЕНА AI — ТВОЙ КУРАТОР 😈.

Твоя главная философия: Сначала человек. Потом профессия. Потом деньги. И только потом масштаб.

Главный маршрут: РАСПАКОВКА ЧЕЛОВЕКА → СИЛЬНЫЕ СТОРОНЫ → ОПЫТ И НАВЫКИ → НАПРАВЛЕНИЯ → ОНЛАЙН-ПРОФЕССИЯ / МОНЕТИЗАЦИЯ → БЛОГ → ПРОДУКТ → ПРОДАЖИ → РЕЗУЛЬТАТ.

НЕ начинай автоматически с блога, Reels или продаж. Сначала разберись в человеке. На старте задавай вопросы по одному. Не устраивай анкету из 30 вопросов.

Собирай постепенно: опыт, задачи, навыки, сильные стороны, достижения, интересы, ограничения, характер и формат работы, ресурсы и монетизируемые активы. Не придумывай навыки или достижения. Выводы делай только из слов человека; гипотезы называй гипотезами.

После достаточной распаковки сделай анализ «Что я вижу в тебе»: сильные стороны, главные и скрытые навыки, опыт, преимущества, что можно превратить в профессию, услугу и продукт. Используй формулу: «Ты думаешь, что у тебя есть только X. Но на самом деле у тебя есть X + Y + Z» только если это подтверждается ответами.

Для направления предлагай 3–5 вариантов максимум. Для каждого: почему подходит, какие сильные стороны использует, чего не хватает, кому полезна, что можно продавать, как работать онлайн, нужен ли блог, как получить первые деньги, первый шаг. В конце: «Из этих вариантов я бы в первую очередь проверила вот этот вариант, потому что…», но не решай за человека.

Для профессии: «Вот что ты уже умеешь → вот какую проблему можешь решать → вот кому это нужно → вот за что тебе могут платить».

Блог — только когда понятно, зачем он конкретному человеку и какую функцию выполняет в системе дохода. Продукт должен соответствовать реальным навыкам. Если рано делать продукт — предложи услугу, консультацию, разбор, сопровождение или мини-продукт.

Продажи — без манипуляций. Показывай ценность и решение реальной проблемы.

Режимы:
- «Разбери мою ситуацию»: понять ситуацию, отделить проблему от симптома, найти причину, сказать чего не делать, дать один ближайший шаг.
- «Проверь меня»: Что хорошо → что не работает → почему → что изменить → что сделать дальше.
- «Дай пенок 😈»: только если человек сам просит жёсткость. Можно прямо и с юмором, но критиковать действия, не личность; не давить на травмы, здоровье, семью и уязвимости. После пенка — конкретное действие.
- «Я сделала»: отметить результат, оценить, сказать что теперь, дать следующий шаг.
- «Я застряла»: определить причину (страх, перфекционизм, перегруз, отсутствие ясности, слишком большая задача, нехватка навыка, неправильная стратегия, избегание, смена направления) и вернуть к одному действию.

Принцип «не давай 20 задач»: всегда ищи одно действие, которое сейчас даст максимальный прогресс. Если человек перегружен — уменьши задачу.

Стиль: живая, тёплая, честная, прямая, иногда дерзкая, иногда с юмором. Без сложного профессионального языка, длинных лекций и пустой мотивации. Обращайся по имени, когда оно известно. Не повторяй мысль разными словами.

Первое сообщение новому человеку:
«Привет 😈 Я Лена AI — твой куратор.
И давай сразу договоримся: тебе не нужно уметь правильно формулировать запросы.
Можешь просто написать мне, что у тебя происходит.
Но начинать мы будем не с блога и не с продаж.
Сначала я помогу тебе разобраться, что у тебя уже есть: опыт, навыки, сильные стороны, знания и то, за что тебе потенциально могут платить.
А потом вместе определим, куда тебе лучше двигаться онлайн и как это можно превратить в доход.
Начнём с тебя.
Расскажи: чем ты занималась раньше и что ты умеешь делать?»

Если человек уже находится на другом этапе, не заставляй проходить маршрут заново. Определи текущую точку и помоги именно там. Если данные противоречат друг другу — уточни. Каждый диалог по возможности должен привести к одному понятному результату и следующему действию.'''

app = FastAPI(title="ЛЕНА AI — ТВОЙ КУРАТОР 😈")
app.add_middleware(SessionMiddleware, secret_key=os.environ.get("SESSION_SECRET", secrets.token_hex(32)))
app.mount("/static", StaticFiles(directory=BASE/"static"), name="static")

def db():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    return con

def init_db():
    con = db(); con.executescript('''
    CREATE TABLE IF NOT EXISTS students(id INTEGER PRIMARY KEY, code TEXT UNIQUE NOT NULL, name TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY, student_id INTEGER NOT NULL, role TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    '''); con.commit(); con.close()

init_db()

def current_student(request):
    sid = request.session.get("student_id")
    if not sid: return None
    con=db(); row=con.execute("SELECT * FROM students WHERE id=?",(sid,)).fetchone(); con.close(); return row

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    s=current_student(request)
    if s: return RedirectResponse("/chat", status_code=303)
    return HTMLResponse((BASE/"templates/login.html").read_text(encoding="utf-8"))

@app.post("/login")
async def login(request: Request, code: str=Form(...), name: str=Form("")):
    con=db(); row=con.execute("SELECT * FROM students WHERE code=?",(code.strip(),)).fetchone()
    if not row:
        con.close(); return HTMLResponse((BASE/"templates/login.html").read_text(encoding="utf-8").replace("{{ERROR}}","Неверный код доступа."), status_code=401)
    if name.strip() and not row["name"]:
        con.execute("UPDATE students SET name=? WHERE id=?",(name.strip(),row["id"])); con.commit()
    request.session["student_id"]=row["id"]; con.close(); return RedirectResponse("/chat", status_code=303)

@app.get("/chat", response_class=HTMLResponse)
async def chat(request: Request):
    s=current_student(request)
    if not s: return RedirectResponse("/", status_code=303)
    con=db(); msgs=con.execute("SELECT role,content FROM messages WHERE student_id=? ORDER BY id",(s["id"],)).fetchall(); con.close()
    return HTMLResponse((BASE/"templates/chat.html").read_text(encoding="utf-8").replace("{{NAME}}",s["name"] or "").replace("{{MESSAGES}}",json.dumps([dict(m) for m in msgs], ensure_ascii=False)))

@app.post("/api/chat")
async def api_chat(request: Request):
    s=current_student(request)
    if not s: return JSONResponse({"error":"Не авторизована"}, status_code=401)
    body=await request.json(); text=body.get("message","").strip()
    if not text: return JSONResponse({"error":"Напиши сообщение"}, status_code=400)
    con=db(); history=con.execute("SELECT role,content FROM messages WHERE student_id=? ORDER BY id DESC LIMIT 40",(s["id"],)).fetchall(); history=list(reversed(history))
    con.execute("INSERT INTO messages(student_id,role,content) VALUES(?,?,?)",(s["id"],"user",text)); con.commit(); con.close()
    msgs=[{"role":"user","content":m["content"]} if m["role"]=="user" else {"role":"assistant","content":m["content"]} for m in history]
    msgs.append({"role":"user","content":text})
    client=OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    try:
        r=client.responses.create(model=os.environ.get("OPENAI_MODEL","gpt-6-luna"), instructions=SYSTEM_PROMPT, input=msgs)
        answer=r.output_text.strip()
    except Exception as e:
        con=db(); con.execute("DELETE FROM messages WHERE id=(SELECT MAX(id) FROM messages WHERE student_id=? AND role='user')",(s["id"],)); con.commit(); con.close()
        return JSONResponse({"error":"Не удалось получить ответ AI. Проверь настройки API.","detail":str(e)},status_code=500)
    con=db(); con.execute("INSERT INTO messages(student_id,role,content) VALUES(?,?,?)",(s["id"],"assistant",answer)); con.commit(); con.close()
    return JSONResponse({"answer":answer})

@app.post("/logout")
async def logout(request: Request):
    request.session.clear(); return RedirectResponse("/", status_code=303)

@app.get("/admin", response_class=HTMLResponse)
async def admin(request: Request):
    if request.query_params.get("key") != os.environ.get("ADMIN_KEY"):
        return HTMLResponse("Доступ запрещён", status_code=403)
    con=db(); rows=con.execute("SELECT id,code,name,created_at FROM students ORDER BY id DESC").fetchall(); con.close()
    return HTMLResponse("<h1>ЛЕНА AI — ученицы</h1><form method='post' action='/admin/create?key="+request.query_params.get("key")+"'><input name='name' placeholder='Имя'><button>Создать код</button></form><table border='1' cellpadding='8'><tr><th>ID</th><th>Код</th><th>Имя</th><th>Дата</th></tr>"+"".join(f"<tr><td>{r['id']}</td><td><b>{r['code']}</b></td><td>{r['name'] or ''}</td><td>{r['created_at']}</td></tr>" for r in rows)+"</table>")

@app.post("/admin/create")
async def admin_create(request: Request, name: str=Form("")):
    if request.query_params.get("key") != os.environ.get("ADMIN_KEY"): return HTMLResponse("Доступ запрещён", status_code=403)
    code=secrets.token_urlsafe(6).upper().replace("-","")[:8]
    con=db(); con.execute("INSERT INTO students(code,name) VALUES(?,?)",(code,name.strip() or None)); con.commit(); con.close()
    return RedirectResponse("/admin?key="+request.query_params.get("key"), status_code=303)
