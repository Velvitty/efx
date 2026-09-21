# ANALOG SOUL — DSP Engine

브라우저에서 음원에 아날로그 질감, 다이내믹 처리, 공간 효과를 적용하고 WAV로 내보내는 오디오 DSP 도구입니다. 현재 화면에 표시된 버전은 **v2.4**입니다.

저장소의 [`index.html`](index.html)은 **문서 색인**입니다. 실제 프로그램은 [`analog-soul-dsp.html`](analog-soul-dsp.html)에서 실행합니다.

## 주요 기능

- 로컬 오디오 파일 재생과 실시간 DSP 조절
- 8개 처리 모듈의 켜기·끄기, 입력 게인 및 파라미터 조절
- 드래그로 처리 순서 조절, 마지막 단계의 마스터링 처리
- 원음(DRY)과 적용본(WET)의 스펙트럼·스펙트로그램 비교
- 고주파 성분을 합성하는 HD / ULTRA HD 대역 확장과 LIVE 미리듣기
- WAV 내보내기, JSON 설정 저장·불러오기, 빠른 슬롯 4개 및 슬롯 백업

## 사용 기술

| 기술 | 용도 |
| --- | --- |
| HTML / CSS / Vanilla JavaScript | DSP 조작 화면과 문서 페이지 |
| Web Audio API | 필터, 게인, 압축, 웨이브셰이핑, 지연, 컨볼루션, 오디오 그래프 |
| OfflineAudioContext | 파일 내보내기용 렌더링과 리샘플링 |
| Canvas / AnalyserNode | 주파수 분석과 시각화 |
| FFT / STFT 기반 자체 처리 | 고주파 배음 합성과 대역 확장 |
| ArrayBuffer / DataView / Blob | WAV 인코딩과 파일 다운로드 |
| localStorage / JSON | 프리셋 슬롯과 설정 백업 |

별도 백엔드, API 키, npm 설치나 빌드 과정이 없습니다. 웹 폰트는 Google Fonts를 사용합니다.

## 실행 방법

**Code → Download ZIP**으로 내려받은 뒤 `analog-soul-dsp.html`을 브라우저에서 열면 됩니다. 문서를 먼저 읽으려면 `index.html`을 여세요.

Git과 Python 3가 설치되어 있다면 로컬 서버로도 실행할 수 있습니다.

```sh
git clone https://github.com/Velvitty/efx.git
cd efx
python3 -m http.server 8000 --bind 127.0.0.1
```

- 프로그램: <http://localhost:8000/analog-soul-dsp.html>
- 문서 색인: <http://localhost:8000/index.html>

`CNAME`에는 `efx.yeon.at`이 등록되어 있습니다. 이 파일은 배포용 도메인 설정이며, 로컬 실행에는 필요하지 않습니다.

## 사용 방법

1. 사용권 안내를 확인하고 오디오 파일을 선택하거나 드래그합니다.
2. **PLAY**로 재생합니다. 지원 형식은 WAV, MP3, FLAC, OGG, AAC 등이며 실제 디코딩 가능 여부는 브라우저에 따라 다릅니다.
3. 원하는 모듈의 스위치를 켜고 노브·슬라이더를 조절합니다. 각 모듈의 **INPUT GAIN**은 해당 처리 단계에 들어가는 레벨을 바꿉니다.
4. 필요하면 모듈 헤더를 드래그해 순서를 바꿉니다. 마스터링 모듈은 마지막에 유지됩니다.
5. DRY/WET 그래프를 비교합니다. 그래프를 클릭하면 막대 표시와 스펙트로그램을 전환할 수 있습니다.
6. HD 또는 ULTRA HD를 사용할 경우 강도를 조절하고 **LIVE**로 결과를 확인합니다. 미리듣기를 준비하는 동안 처리 시간이 필요합니다.
7. **EXPORT**에서 출력 형식을 선택합니다.

처음에는 모듈 하나씩 켜서 차이를 확인하고, 입력·출력 레벨을 과도하게 올리지 않는 편이 결과 비교에 유리합니다.

## 처리 모듈

| 화면 이름 | 주요 역할 |
| --- | --- |
| Compressor | 임계값·비율·어택·릴리즈를 이용한 다이내믹 압축 |
| BBE Sonic Maximizer | 대역별 레벨과 위상 처리를 이용한 음색 조절 |
| Vacuum Tube | 비선형 웨이브셰이핑으로 포화감과 배음 추가 |
| Exciter | 고역 배음을 추가해 존재감 조절 |
| Soundgoodizer | 대역별 포화·압축 계열 처리 |
| Vinyl Record | 크랙클, 흔들림, 마모감, 채널 간 누설 효과 |
| Dolby Atmos | 지연·리버브·스테레오 처리를 통한 공간감 시뮬레이션 |
| Mastering Chain | 다중 대역 압축, 스테레오 폭, 출력 게인·피크 제한 |

위 명칭은 프로그램 UI의 모듈 이름입니다. 특히 공간 효과 모듈은 실제 Dolby Atmos 객체 오디오 인코더나 인증 구현을 의미하지 않습니다.

## 출력 형식과 프리셋

| 내보내기 | 실제 출력 |
| --- | --- |
| WAV | 디코딩한 원본 버퍼의 샘플레이트 / 16-bit PCM |
| HD RESTORE | 96 kHz / 24-bit PCM WAV |
| ULTRA HD | 192 kHz / 32-bit float WAV |

고주파 대역 확장은 기존 신호를 바탕으로 성분을 합성합니다. 손실 압축으로 사라진 원본 정보를 정확히 복구하거나, 원본 녹음의 실제 해상도를 높인다는 보장은 없습니다.

**화면 설정 저장**은 JSON 파일을 만듭니다. 슬롯을 짧게 누르면 불러오고, 약 0.6초 이상 길게 누르면 현재 설정을 저장합니다. 빈 슬롯을 누르면 기본값이 적용됩니다. **모든 슬롯을 백업**으로 슬롯을 파일에 보관할 수 있으며, 음원 자체는 프리셋에 포함되지 않습니다.

## 저장소 구성

| 파일 | 역할 |
| --- | --- |
| [`analog-soul-dsp.html`](analog-soul-dsp.html) | DSP 앱, 오디오 엔진, WAV 인코더, 프리셋 관리 |
| [`index.html`](index.html) | 문서 색인과 버전 안내 |
| [`analog-soul-plain.html`](analog-soul-plain.html) | 쉬운 말로 쓴 입문 설명 |
| [`analog-soul-guide.html`](analog-soul-guide.html) | 단계별 학습 및 운용 가이드 |
| [`analog-soul-manual.html`](analog-soul-manual.html) | 상세 사용 설명서 |
| [`analog-soul-engineering.html`](analog-soul-engineering.html) | 신호 처리 사양 |
| [`analog-soul-internals.html`](analog-soul-internals.html) | 알고리즘·구현 해설 |
| [`CNAME`](CNAME) | 배포용 사용자 도메인 설정 |

핵심 코드는 실시간 체인을 만드는 `buildLiveChain()`, 내보내기 체인을 만드는 `buildOfflineChain()`, 대역 확장 함수 `applyHDRestoration()`, 파일 생성 함수 `exportAudio()`·`encodeWAV()`로 구성됩니다.

## 데이터 처리와 문제 해결

- 일반 브라우저 실행에서는 선택한 음원을 브라우저에서 처리합니다. 폰트 로딩에는 외부 네트워크 요청이 발생합니다.
- 프리셋 슬롯은 현재 사이트의 `localStorage`에 저장되므로 브라우저 데이터 삭제 시 사라질 수 있습니다. 필요한 설정은 JSON으로 백업하세요.
- 일부 호스팅 환경에서는 전용 다운로드 어댑터를 시도하며, 일반 실행에서는 브라우저 다운로드를 사용합니다.
- 192 kHz를 지원하지 않거나 메모리가 부족하면 HD 또는 일반 WAV로 내보내세요. 긴 음원의 고해상도 렌더링은 메모리를 많이 사용합니다.
- 현재 `exportAudio()`의 완료 메시지에 범위 밖의 `blob.size` 참조가 있어, 파일 저장 후에도 오류가 표시될 수 있습니다. 다운로드 목록에서 결과 파일을 먼저 확인하세요.
- LIVE 처리 중에는 미리듣기 버퍼 생성 시간이 필요하며, 표시되는 스펙트럼은 가청 음질 향상의 보증이 아닙니다.

## 사용권

소스 상단과 앱 내부 EULA에 명시된 **개인 학습·교육·비영리 연구 목적의 제한적 사용권**을 따릅니다. 원작자의 허가 없는 재배포, 수정본 배포, 판매, 상업적 이용은 제한됩니다. 자세한 조건은 프로그램의 EULA를 확인하세요.

Copyright © 2026 Velvitty(연이). All rights reserved.
