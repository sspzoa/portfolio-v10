# 포트폴리오 썸네일 제작

2026년 11월 3일 최종 반영한 v5 커버의 템플릿이다. 기존 커버를 다시 만들거나 같은 결의 새 프로젝트 커버를 만들 때 사용한다. 임시 작업 폴더나 Flutter 설치가 없어도 보관된 캡처로 다시 렌더링할 수 있다.

## 바로 실행

레포 루트에서 실행한다. Python 3.11 이상, uv, agent-browser가 필요하다. 제작 당시 버전은 Python 3.15, Pillow 13.0.0, agent-browser 0.32.4다. 브라우저와 Wanted Sans 1.0.3을 불러올 수 있는 인터넷 연결이 필요하다.

```sh
# agent-browser가 없는 경우 한 번만 설치
bun add --global agent-browser@0.32.4
agent-browser install

# 브라우저를 열기 전에 입력 파일 확인
uv run --no-project --with pillow==13.0.0 python tools/thumbnails/render.py --check

# 데스크톱, 모바일, 기존 이미지 활용 예시
uv run --no-project --with pillow==13.0.0 python tools/thumbnails/render.py dpos glud nababa

# 최종 21개 모두 생성
uv run --no-project --with pillow==13.0.0 python tools/thumbnails/render.py
```

결과는 `output/<slug>.png`와 `output/gallery.html`이다. 커버는 1600 × 900 PNG이며, 2배 해상도로 렌더링한 뒤 축소한다. 갤러리는 실제 일반 카드 크기인 332 × 187에 가깝게 검수한다. 결과물과 브라우저 중간 파일은 Git에서 제외된다. 실행마다 별도 브라우저 세션을 만들고 종료하므로 다른 작업의 세션을 재사용하지 않는다.

## 파일 구성

| 파일 | 역할 |
| --- | --- |
| `render.py` | 데스크톱, 모바일, 원본 이미지 패널의 HTML/CSS 템플릿과 렌더러 |
| `presets.json` | 최종 21개 프로젝트의 화면 선택, 배치, 크기, 크롭 설정 |
| `projects/<slug>/screens/` | 해당 커버에 실제로 사용한 원본 캡처 |
| `projects/<slug>/logo*.svg` | 원본 도형을 유지한 SVG 로고 |
| `projects/<slug>/source.json` | 저장소와 커밋, 화면 출처, 확인 범위, 원본 파일 해시 |
| `capture-guide.md` | 실제 화면 확보와 재현 방법, 품질 기준 |
| `agent-brief.md` | Claude Code ACP 등에 전달할 재사용 작업 지시 |

보관된 화면은 공개 화면 또는 익명 데모 데이터로 실행한 원본 앱이다. 일부 레거시 자료는 기존 이미지 그대로다. 확인 범위와 제한은 프로젝트별 `source.json`을 따른다. 캡처와 로고는 해당 프로젝트의 자료이며 임의로 다른 서비스에 재사용하지 않는다.

## 새 프로젝트 추가

1. `projects/<slug>/screens/`에 실제 캡처를 넣고 `logo.svg`를 준비한다.
2. 기존 `source.json` 형식을 참고해 원본 저장소, 커밋, 캡처 화면과 데모 데이터의 범위를 기록한다.
3. `presets.json`의 비슷한 프로젝트를 복사하고 `slug`, `title`, `screens`를 바꾼다.
4. `--check` 후 해당 slug만 렌더링한다. 1600 × 900 원본과 332px 갤러리를 모두 확인한다.
5. 최종 PNG를 Notion 프로젝트 페이지의 커버로 올리고, 로고는 페이지 아이콘으로 따로 넣는다. 포트폴리오 갤러리와 프로젝트 모달에서 확인한다.

| 화면 유형 | 복사할 프리셋 | 조정할 값 |
| --- | --- | --- |
| 데스크톱과 모바일 | `dpos` | `deskWidth`, `phoneWidth`, `phoneLeft`, `phoneTop` |
| 데스크톱 핵심 영역 | `prism` | `screens[].crop`, `deskLeft`, `deskWidth` |
| 데스크톱 화면 두 장 | `horang` | 두 번째 `crop`, `insetWidth`, `insetLeft`, `insetTop` |
| 모바일 화면 세 장 | `glud` | `phoneWidth`, `gap`, `offsets`, `screens[].ratio` |
| 기존 커버 전체 보존 | `nababa` | `panelHeight`, `panelPad`, `panelTop` |

모든 배치 값은 1600 × 900 캔버스의 픽셀이다. `crop: [x, y, width, height]`는 1440px 너비 기준의 원본 화면 좌표다. 실제 이미지가 2880px 너비라면 픽셀 좌표를 2로 나눈다. 다른 너비의 화면도 1440px 기준으로 환산한다. 모바일 `ratio`는 캡처의 높이 ÷ 너비다. 기본값은 844 ÷ 390이다. 다른 비율을 쓰면 반드시 지정해 원본 비율과 크롭을 확인한다.

`source.json`의 `approvedCoverSha256`는 당시 Notion에 반영한 최종 PNG를 식별한다. 운영체제나 브라우저의 글꼴 렌더링 차이로 재생성 PNG의 해시는 달라질 수 있다. 입력 파일은 `inputs` 해시로 원본 일치를 확인할 수 있다.

## 유지할 디자인

- 16:9, 1600 × 900. 실제 서비스 화면이 중심이다.
- `#F5F5F5` 또는 흰 바탕, `#E5E5E5` 얇은 경계, 절제된 그림자와 24px 모서리.
- 상단에 작은 로고와 이름 한 줄. Wanted Sans 600, 기본 34px, 자간 -0.02em.
- 사이트의 노란색 포인트를 커버 장식에 가져오지 않는다. 실제 서비스 화면이나 원본 자료의 색은 보존한다.
- 큰 제목 블록, 과한 그라데이션, 반복적인 로고 타일, 작은 부제와 기간 및 인원 표기를 추가하지 않는다.
- 화면 밖에 새로 쓰는 문구에는 중간점을 쓰지 않는다. 원본 UI의 문구는 그대로 둔다.
- 로고의 빈 캔버스는 도형 경계로 맞춘다. 배경은 임의로 추가하지 않는다. 밥.net 아이콘만 사용자가 선택한 원래 배경 버전을 쓴다.

사이트의 디자인이 바뀌면 `src/tokens.css`, `src/components/sections/projects.tsx`, `src/components/detail-dialog.tsx`를 먼저 읽고 카드 크기와 잘리는 범위를 다시 확인한다.
