# HSR Optimizer

Honkai: Star Rail Build Optimizer & Battle Simulator

## Features

- Character Build Manager
- Party Manager
- Cycle Editor
- Battle Simulator
- Damage Engine
- Relic Optimizer
- Mobile UI
- Cloudflare Workers

## Development

Install

```bash
npm install
```

Create the D1 database (최초 1회)

```bash
npm run db:create
```

출력된 `database_id`를 `wrangler.toml`의 `[[d1_databases]]`에 붙여넣는다.

Apply migrations

```bash
npm run db:migrate          # 로컬
npm run db:migrate:remote   # 원격
```

Run locally

```bash
npm run dev
```

Deploy

```bash
npm run deploy
```

## Stack

- Cloudflare Workers
- Cloudflare D1 (SQLite)
- Vanilla JavaScript (ES Modules)
- HTML
- CSS
- No Framework

## API

| Method | Path | 설명 |
| --- | --- | --- |
| GET | `/api/builds` | 목록. `?character=` `?limit=` `?offset=` |
| POST | `/api/builds` | 생성 |
| GET | `/api/builds/{id}` | 단건 조회 |
| PUT | `/api/builds/{id}` | 부분 수정 |
| DELETE | `/api/builds/{id}` | 삭제 |
| GET | `/api/meta` | UI 부트스트랩. 캐릭터·광추·유물 테이블 일괄 |
| POST | `/api/stats` | 최종 스펙 계산. body = Build 또는 `{buildId}` |
| GET | `/api/parties/{id}` | `?expand=builds`로 슬롯을 Build로 채움 |
| GET | `/api/cycles` | `?partyId=`로 필터 |
| POST | `/api/simulate` | `{cycleId}` 또는 `{partyId, actions, repeat}` |

`parties`, `cycles`도 `builds`와 동일한 CRUD를 지원한다.

## Storage

Cloudflare D1을 사용한다. 스키마는 하이브리드다.

- 조회/필터 대상 스칼라 값(`id`, `character`, `element`, `updated_at` 등)은 실제 컬럼
- 중첩 구조(`light_cone`, `relics`, `stats`, `slots`, `settings`, `actions`)는 JSON 문자열 컬럼

D1 바인딩은 요청 시점의 `env`에만 존재한다. 따라서 Repository는 모듈 스코프
싱글턴이 될 수 없고, 요청마다 `createRepositories(env.DB)`로 생성해야 한다.
반면 캐릭터/공식 레지스트리는 정적 데이터라 모듈 스코프 싱글턴이어도 안전하다.

## Project

```
migrations/
└── 0001_init.sql
src/
├── api/          # HTTP 핸들러 (builds / parties / cycles / simulate)
├── data/         # 게임 데이터 로딩 -> characterRegistry
├── engine/       # 전투/데미지 엔진
├── formula/      # 캐릭터별 데미지 공식 -> formulaRegistry
├── models/       # 도메인 모델 (영속성을 알지 못함)
├── registry/
├── repositories/ # D1 접근 계층
├── services/
├── stats/
├── util/
├── router.js
└── worker.js
```
