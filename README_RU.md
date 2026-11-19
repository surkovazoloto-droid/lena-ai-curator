# ЛЕНА AI — Cloudflare Workers AI

Это версия без Render и без OpenAI API-ключа. AI работает через Cloudflare Workers AI.

## Что настроить в Cloudflare
1. Workers & Pages → Create application → Import a repository.
2. Выбрать GitHub → `lena-ai-curator`.
3. Cloudflare увидит `wrangler.toml` и `src/index.js`.
4. После подключения включить AI binding `AI` (конфигурация уже есть в wrangler.toml).
5. При необходимости добавить Secret `ACCESS_CODE` — общий код доступа для учениц.
6. Deploy.

## Модель
Используется `@cf/openai/gpt-oss-120b` через Workers AI. Дополнительный ключ OpenAI не нужен.

## Важно
Не вставляй OpenAI API key в код, GitHub или браузер.

Для первого теста можно вообще не задавать ACCESS_CODE. Тогда сайт будет открыт по ссылке. После проверки добавь ACCESS_CODE в Secrets и раздай код ученицам.
