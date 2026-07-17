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

Seed game data (마이그레이션 후 필수)

```bash
npm run data:seed           # 로컬
npm run data:seed:remote    # 원격
```

`characters` 테이블이 비어 있으면 API가 500으로 죽는다.

Run locally

```bash
npm run dev
```

Deploy

```bash
npm run deploy
```

## Game data

캐릭터 데이터는 [Project Yatta](https://sr.yatta.moe)에서 가져온다.
공식 API가 없어 팬 데이터셋에 의존하는데, 후보 중 Yatta를 고른 이유는:

- `Dimbreath/StarRailData`(원본 데이터마이닝)는 법적 사유로 내려갔다(HTTP 451).
- `Mar-7th/StarRailRes`는 패치를 몇 주씩 늦게 따라온다(4.4 시점에 4.3).
- Yatta는 미출시 베타까지 최신이고, 스킬 레벨별 배율(`params`)과
  승급별 기본 스탯, 공식 한국어 명칭을 전부 준다.

동기화는 빌드 타임에만 한다. Worker 런타임은 Yatta를 알지 못한다.

```bash
npm run data:sync    # Yatta => src/data/generated/*.sql 생성 (캐릭터 95명 + 광추 165개 + 유물 세트 60개)
npm run data:seed    # 생성된 SQL을 D1에 적용
npm run img:sync     # 시드가 가리키는 그림을 public/img로 (약 24MB)
```

그림도 커밋한다. 브라우저는 우리 도메인에서만 이미지를 가져오고 Yatta를
알지 못한다. 팬 사이트 CDN에 실사용 트래픽을 얹지 않으려는 것이기도 하다.
`img:sync`는 이미 있는 파일을 건너뛰므로 패치 때 새 그림만 받는다.

생성물은 git에 커밋한다. 패치 때 `data:sync`를 다시 돌리고 diff를 보면
수치 변화가 그대로 드러난다. `scripts/sync-gamedata.js`의 매핑 테이블은
strict라서 Yatta에 모르는 운명/속성/스탯이 새로 생기면 조용히 빈 값을
넣는 대신 죽는다.

미출시 캐릭터는 `is_beta = 1`로 들어온다. 베타 수치는 출시 전에 바뀐다.

### 시드에 넣는 것과 넣지 않는 것

기계적으로 확실한 것만 시드에 들어간다. 기본 스탯, 승급 보정, 스킬 배율
같은 건 Yatta가 숫자로 주므로 그대로 쓴다.

반면 **효과의 의미는 한국어 설명문에만 있다.** Yatta의 `params`는
자리표시자 번호 => 값 배열일 뿐이라, 어느 자리표시자가 어떤 스탯인지는
설명문을 읽어야 안다. 게다가 상시 효과와 조건부 효과가 한 설명문에
섞여 있어서 전부 더하면 조용히 부풀려진 수치가 나온다.

그래서 해석은 사람이 적고, 수치는 시드에서 읽는다. 패치로 값이 바뀌면
해석은 그대로 두고 수치만 따라온다.

- 광추 패시브 => `src/data/lightConePassives.js` (해석이 없으면 기본 스탯만 반영)
- 유물 세트 2세트 효과 => `src/data/relicSetEffects.js`
- 캐릭터 데미지 공식 => `src/formula/characters/*`

해석 파일은 오타가 나면 보너스가 조용히 0이 되므로 검사기가 있다.
`data:sync` 후에 같이 돌려라.

```bash
npm run data:check   # 해석의 slug/자리표시자/스탯 키가 시드와 맞는지 검사
```

## Damage formulas

캐릭터별 공식은 손으로 쓴다. 시드가 스킬 배율(`params`)을 주지만
"어느 배율이 무엇에 스케일링하는가"는 설명문에만 있고, 전체 550개 액션 중
203개는 확산/조건부라 기계적으로 못 뽑는다. 반디의 강화 전투 스킬만 해도
`공격력 x (0.2 x 격파 특수효과 + 2.0)`처럼 두 스탯에 걸쳐 있고 상한도 있다.

공식은 "배율 x 스케일링 스탯"까지만 구한다. 방어력/저항/치명타/강인도 같은
공통 계수는 `src/formula/damage.js`의 `computeDamage()`가 전부 처리한다.
캐릭터마다 다시 쓰면 한 군데만 틀려도 조용히 어긋나기 때문이다.

배율은 하드코딩하지 말고 `param(build, definition, n)`으로 시드에서 읽어라.
그래야 패치로 수치가 바뀌어도 `data:sync`만 다시 돌리면 된다.

`src/formula/characters/firefly/`가 공식이 다 채워진 유일한 레퍼런스다.
공식이 없는 액션은 `DamageEngine`이 "Formula not found"로 막는다.

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
