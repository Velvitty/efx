# ANALOG SOUL — DSP Engine

브라우저에서 음원에 아날로그 질감, 다이내믹 처리, 공간 효과를 적용하고 WAV로 내보내는 오디오 DSP 도구입니다. 현재 화면에 표시된 버전은 **v2.4**입니다.

저장소의 [`index.html`](index.html)은 **문서 색인**입니다. 실제 프로그램은 [`analog-soul-dsp.html`](analog-soul-dsp.html)에서 실행합니다.

**설치 없이 HTTPS 주소에서도 사용할 수 있습니다.** [`CNAME`](CNAME)에 지정된 도메인은 `efx.yeon.at`입니다.

- **프로그램 실행:** [https://efx.yeon.at/analog-soul-dsp.html](https://efx.yeon.at/analog-soul-dsp.html)
- **문서 색인:** [https://efx.yeon.at/](https://efx.yeon.at/)

프로그램 주소를 열고 로컬 음원을 선택한 뒤 재생·처리·내보내기를 진행하세요. 도메인 루트는 설명서를 모은 페이지이므로 실제 음원 처리는 위 프로그램 링크에서 시작합니다.

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

온라인에서는 [프로그램 바로가기](https://efx.yeon.at/analog-soul-dsp.html)를 이용할 수 있습니다. `CNAME`은 배포용 도메인 설정이며, 로컬 실행에는 필요하지 않습니다.

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

## 상세 사양

아래 값은 `analog-soul-dsp.html`의 입력 요소, `getParams()` 및 실제 처리 함수 기준입니다. 기본값은 최초 화면/빈 슬롯 초기화 기준이며, 모드·씬 버튼을 누르면 일부 값이 바뀝니다. 8개 효과와 HD/UHD LIVE는 처음에 모두 꺼져 있습니다.

### 파라미터 범위와 기본값

모든 모듈의 **INPUT GAIN**은 **−24~+24 dB**, 기본 **0 dB**, 간격 **0.5 dB**입니다. 선형 배율은 `10^(dB/20)`이며, 꺼진 모듈은 해당 입력 게인도 건너뜁니다. 아래에서 단위 없는 0~100 값은 UI의 조절 척도입니다.

| 모듈 | 파라미터 | 범위 | 기본값 |
| --- | --- | --- | --- |
| Compressor | THRESHOLD | −60~0 dB | −18 dB |
| Compressor | RATIO | 1~20:1 | 4:1 |
| Compressor | ATTACK | 0.1~200 ms | 10 ms |
| Compressor | RELEASE | 10~3,000 ms | 250 ms |
| Compressor | MAKEUP | 0~24 dB | 4 dB |
| Compressor | KNEE | 0~40 dB | 10 dB |
| BBE | LO CONTOUR / PROCESS / HI DEF | 각각 0~100 | 40 / 60 / 50 |
| Vacuum Tube | DRIVE / BIAS / MIX | 각각 0~100 | 30 / 50 / 50 |
| Vacuum Tube | OUTPUT | −12~+6 dB | 0 dB |
| Exciter | FREQ | 2,000~12,000 Hz, 100 Hz 간격 | 6,000 Hz |
| Exciter | DRIVE / MIX | 각각 0~100 | 40 / 35 |
| Soundgoodizer | AMOUNT / LOW SAT / MID SAT / HI SAT / STEREO | 각각 0~100 | 50 / 60 / 50 / 40 / 55 |
| Soundgoodizer | MODE | A / B / C / D | A |
| Vinyl | CRACKLE / WOBBLE / WEAR / CROSSTALK | 각각 0~100 | 30 / 25 / 40 / 20 |
| Atmos | SPACE / HEIGHT / DEPTH / REVERB / OBJECT / MIX | 각각 0~100 | 60 / 45 / 50 / 35 / 40 / 60 |
| Atmos | SCENE | CINEMA / CONCERT / STADIUM / STUDIO / CLUB | CINEMA |
| Mastering | LOW COMP / MID COMP / HIGH COMP | 각각 1~10:1 | 2 / 3 / 2:1 |
| Mastering | STEREO WIDTH | 0~200 | 110 |
| Mastering | LIMITER CEILING | −6~0 dB, 0.1 dB 간격 | −0.3 dB |
| Mastering | OUTPUT GAIN | −12~+12 dB | 0 dB |
| HD RESTORE | HF SYNTH / SMOOTH | 각각 0~100 | 60 / 40 |
| ULTRA HD | UHF SYNTH / SMOOTH | 각각 0~100 | 50 / 35 |

Soundgoodizer의 A 버튼은 HI SAT를 **35**로 설정하므로 최초 화면 값 **40**과 다릅니다. Atmos의 CINEMA 버튼도 최초 슬라이더와 다른 씬 값을 적용합니다. 저장한 프리셋을 복원할 때는 모드·씬을 먼저 적용한 다음 저장된 개별 슬라이더 값으로 덮어씁니다.

### 입력·디코딩·채널

- 파일은 `File.arrayBuffer()`로 읽고 `decodeAudioData()`로 디코딩합니다. 스트리밍 입력이나 실시간 마이크 입력 UI는 없습니다.
- `sniffSampleRate()`가 WAV의 `fmt ` 청크, FLAC의 STREAMINFO, OGG Vorbis 식별 헤더, MP3 프레임 헤더, MP4/M4A의 `stsd`·`mdhd`를 읽어 원래 샘플레이트를 추정합니다.
- 판독값이 **8,000~192,000 Hz**이면 해당 레이트의 `OfflineAudioContext`에서 디코딩합니다. 판독·디코딩 실패 시 장치 기본 컨텍스트로 재시도하므로 일반 WAV 출력의 “원본 SR”은 최종 디코딩 버퍼 기준입니다.
- 오프라인 출력은 디코딩 버퍼의 채널 수를 사용하지만, 스테레오 폭·누화·공간 처리에는 2채널 분할/병합 노드가 있습니다. 다채널 서라운드 보존·객체 오디오 출력용 도구로 설계된 것은 아닙니다.
- 화면의 `kbps`는 파일 크기와 재생 길이로 계산한 평균값입니다. 압축 코덱 헤더에서 읽은 정확한 스트림 비트레이트 표시는 아닙니다.

## 오디오 엔진과 신호 흐름

기본 모듈 순서는 다음과 같습니다. 드래그한 화면 순서를 실시간·오프라인 체인이 모두 읽으며, 켜진 모듈만 연결합니다.

```text
재생 버퍼 ─┬─ DRY 분석기
           └─ COMP → BBE → TUBE → EXCITER → SG → VINYL → ATMOS
                각 활성 모듈 앞 INPUT GAIN
             → MASTER(활성 시 고정 마지막) → OUTPUT GAIN → WET 분석기 → 출력
```

`buildLiveChain()`은 필요한 오디오 노드를 만들고, `connectLiveChain()`은 활성 상태·순서에 맞춰 연결합니다. `applyLiveDSP()`는 조절값을 노드에 반영하며, 재생 중 토글·순서 변경은 `hotswapDSP()`가 소스의 재생 위치를 유지하면서 새 체인을 연결합니다. `buildOfflineChain()`은 내보내기를 위한 별도 그래프를 만듭니다.

### 모듈별 구현

아래 식에서 `D`, `MIX`, `LO`, `SAT` 등은 별도 단위가 없으면 화면의 0~100을 0~1로 정규화한 값입니다.

| 모듈 | 실제 처리 구조와 주요 상수 |
| --- | --- |
| Compressor | `DynamicsCompressorNode`에 threshold·ratio·attack·release·knee를 전달합니다. 오프라인에서는 바로 뒤에 `10^(MAKEUP/20)` 게인을 붙입니다. 실시간 MAKEUP 차이는 아래 제약을 참고하세요. |
| BBE | 직통 신호와 2단 올패스 경로를 합산합니다. 올패스 주파수는 `80+200×LO`, `40+100×LO` Hz, 위상 경로 게인은 `0.6×LO`, 합산 보상은 `1/(1+0.6×LO)`입니다. 뒤에 3.2 kHz 피킹(Q 0.6, 최대 +9 dB)과 8 kHz 하이셸프(최대 +10 dB)가 있습니다. |
| Vacuum Tube | `120+80×D` Hz 저역 우회와 `100+80×D` Hz HPF를 통과한 포화 경로를 병렬 합산합니다. 4,096점 비대칭 `tanh` 곡선, `4x` 오버샘플링, 포화 전 `sr/3` LPF, 포화 후 12 Hz DC 차단을 사용합니다. |
| Exciter | 원음 + HPF(FREQ) → LPF(`max(FREQ×1.4, sr/3)`) → 1,024점 `tanh` 포화(`4x`) → BPF(FREQ×1.5, Q 0.8) → `MIX×0.5` 경로입니다. DRIVE는 정규화 후 작은 배율 변화만 주므로 MIX와 FREQ의 역할도 큽니다. |
| Soundgoodizer | 저·중·고역을 Q 0.707의 2차 필터 두 개씩으로 분리해 LR4 형태를 구성합니다. 대역별 2,048점 포화 곡선(`4x`)과 레벨 조절 뒤 원음에 합산하고, 2.5 kHz 피킹·2:1 압축·M/S 폭 조절을 적용합니다. |
| Vinyl | `20,000−8,000×WEAR` Hz LPF, 8 kHz 하이셸프(`−4×WEAR` dB), 2초 길이의 반복 핑크 노이즈 버퍼를 사용합니다. 잡음 게인은 `CRACKLE×0.03`입니다. |
| Atmos | 직접음, 초기 반사 컨볼루션, 후기 잔향 컨볼루션, 좌우 지연 경로를 병렬 합산합니다. 오프라인은 초기·후기 IR을 따로 생성하며 `ConvolverNode.normalize=false`입니다. 실시간 IR 갱신 차이는 아래 제약을 참고하세요. |
| Mastering | 120 / 500 / 5,000 Hz 경계의 4대역 압축 → 합산 → 리미터 → M/S 스테레오 폭 → 소프트 클리퍼입니다. 이후 공통 OUTPUT GAIN이 별도로 적용됩니다. |

Tube의 BIAS는 `b=(BIAS−50)/100×0.15`로 동작점을 이동시키고 음의 반주기에 1.15배 드라이브를 적용합니다. 짝수·홀수 배음의 비율은 입력·DRIVE·BIAS에 따라 달라집니다. **MIX=0도 포화 경로 게인이 0.3**이므로 완전 바이패스하려면 모듈 스위치를 끄세요.

Soundgoodizer는 소프트클립과 3차 다항식을 섞고 `0.08×SAT`의 바이어스를 더합니다. 저역 경로에는 12 Hz DC 차단이 있습니다. 후단 압축의 threshold는 `−10−8×AMOUNT` dB, attack은 3 ms, release는 200 ms, knee는 6 dB입니다. STEREO 0/50/100은 각각 모노/원래 폭/사이드 성분 2배에 대응합니다.

| SG 모드 | 이름 | 저·고 분할 주파수 | LOW / MID / HI SAT | STEREO | 기본 drive 계수 |
| --- | --- | --- | --- | --- | --- |
| A | Warm & Punchy | 250 / 4,000 Hz | 60 / 50 / 35 | 55 | 0.40 |
| B | Bright & Airy | 180 / 6,000 Hz | 35 / 45 / 70 | 70 | 0.55 |
| C | Full & Rich | 300 / 3,500 Hz | 75 / 60 / 45 | 45 | 0.50 |
| D | Crispy & Detailed | 200 / 8,000 Hz | 40 / 65 / 80 | 65 | 0.60 |

Vinyl의 WOBBLE은 중심 지연 **6 ms**를 **0.556 Hz** 와우(최대 진폭 0.9 ms)와 **4.2 Hz** 플러터(최대 0.06 ms)로 변조합니다. CROSSTALK은 `x=0.35×CROSSTALK`, `n=1/(1+x)`로 두고 `L'=nL+nxR`, `R'=nR+nxL`을 적용합니다.

Atmos는 7~97 ms의 초기 반사 10개, 6~18 ms의 높이 반사, 40~100 ms의 후방 반사를 생성합니다. 우측 지연 경로는 `1+4×OBJECT` ms입니다. 기준 RT60은 STUDIO 0.4 s, CLUB 0.9 s, CINEMA 1.8 s, CONCERT 2.4 s, STADIUM 3.2 s이며 실제 계산값은 `기준 RT60×(0.4+0.8×SPACE)`입니다. 후기 IR 길이는 `RT60+0.2`초이며 난수로 감쇠하는 잔향을 생성합니다.

### 마스터링 대역과 출력 제어

| 대역 | 범위 | Threshold | Ratio | Attack / Release | Knee |
| --- | --- | --- | --- | --- | --- |
| Sub/Low | ~120 Hz | −24 dB | `min(LOW, 4)` | 30 / 80 ms | 10 dB |
| Low-mid | 120~500 Hz | −22 dB | 실시간 `min(LOW, 5)`, 오프라인 `LOW` | 15 / 120 ms | 8 dB |
| Mid | 500~5,000 Hz | −20 dB | MID | 5 / 180 ms | 6 dB |
| High | 5,000 Hz~ | −22 dB | `min(HIGH, 3)` | 2 / 150 ms | 5 dB |

Sub/Low 합산 전 게인은 0.95이고 나머지는 1입니다. 리미터는 20:1, attack 1 ms, release 50 ms, knee 0 dB입니다. M/S 폭은 `M=(L+R)/2`, `S=(L−R)/2`, `L'=M+wS`, `R'=M−wS`로 구현되며 `w=STEREO WIDTH/100`입니다.

클리퍼는 CEILING 기준으로 정규화한 신호에 8,192점 곡선과 `4x` 오버샘플링을 적용합니다. 절댓값 0.85 이하에서는 선형, 그 위에서는 `0.85+0.15×tanh((|x|−0.85)/0.15)` 형태입니다. **클리퍼 뒤의 OUTPUT GAIN, HD 합성, 재생 장치의 재구성까지 포함한 최종 true-peak 보장 기능은 없습니다.**

## HD / ULTRA HD 대역 확장 기술

`applyHDRestoration()`은 전체 버퍼를 대상으로 컷오프를 추정한 뒤 단시간 푸리에 변환(STFT)으로 고역을 합성합니다. 실제 주파수·비트 변환은 호출 측의 리샘플링과 `encodeWAV()`가 담당합니다.

| 항목 | 구현값 |
| --- | --- |
| FFT / 홉 | 4,096점 / 1,024샘플, 75% 중첩 |
| 분석·합성 창 | 주기형 Hann 창, 중첩 후 창 제곱합으로 정규화 |
| 96 kHz 처리 | 빈 간격 23.4375 Hz, 프레임 약 42.67 ms |
| 192 kHz 처리 | 빈 간격 46.875 Hz, 프레임 약 21.33 ms |
| 컷오프 분석 채널 | 첫 번째 채널의 평균 스펙트럼; 추정한 경계를 전체 채널에 사용 |
| 컷오프 탐색 상한 | 처리 샘플레이트의 1/4 |
| 합성 차수 | 2 / 4 / 8 / 16 / 32 / 64 / 128배 |
| 차수별 크기 | `1/차수 × (0.5+HF 강도)` |
| 결과 레벨 | RMS 증가가 1%를 넘으면 감소 보정, 마지막에 ±0.99로 표본 제한 |

처리 단계는 다음과 같습니다.

1. 첫 채널에서 간격을 두고 프레임을 읽어 평균 진폭을 구하고, **9빈 이동 평균**을 적용합니다. 1~4 kHz의 평균 dB를 기준으로 삼습니다.
2. 연속 12빈 평균이 기준보다 30 dB 이상 낮지 않은 지점을 찾습니다. 이후 15 dB 하락 여부를 확인하고, 필요하면 인접 구간의 20 dB 급락을 재탐색합니다.
3. 추정 컷오프의 **75% 지점부터** 원음과 2배 배음 사이에 코사인 교차를 적용합니다. 상위 배음 구간의 가장자리는 25%씩 겹쳐 연결합니다.
4. 원본 빈의 크기를 차수별 배율로 전달하고 **위상에도 해당 차수를 곱합니다**. 정수 빈 매핑이므로 원본 고역의 정확한 재구성과는 다릅니다.
5. SMOOTH는 합성 구간의 크기에 가우시안 평활을 적용합니다. 정규화 값 `s`에 대해 반경 `round(1+3s)`(1~4), 표준편차 `0.6+1.6s`를 사용하고 적용률도 `s`로 섞습니다. 위상은 그대로 둡니다.
6. 켤레 대칭을 채운 뒤 역 FFT·중첩 합산·창 정규화, RMS 보정, 표본 피크 제한을 수행합니다. 매 64프레임마다 브라우저에 제어권을 돌려줍니다.

**HF SYNTH / UHF SYNTH를 0으로 두면 호출부에서 합성을 생략**하고 선택한 레이트로 리샘플링만 수행합니다. ULTRA HD도 192 kHz에서 한 번 합성하며, 현재 코드에는 HD 결과를 다시 합성하는 2단계 경로가 없습니다.

### 일반 재생·LIVE·내보내기의 차이

| 경로 | 처리 순서 |
| --- | --- |
| 일반 재생 | 디코딩 원본 → 실시간 DSP → 출력 |
| HD/UHD LIVE | 원본 → 목표 레이트 리샘플링 → 대역 확장 버퍼 생성·캐시 → 실시간 DSP → 출력 |
| 일반 WAV 내보내기 | 디코딩 원본 → 오프라인 DSP → 16-bit WAV |
| HD/UHD 내보내기 | 원본 → 목표 레이트 리샘플링 → 오프라인 DSP → 대역 확장 → WAV |

LIVE는 프레임마다 새로 대역을 확장하는 기능이 아니라 **완성한 버퍼를 캐시해 미리듣는 기능**입니다. 캐시 키는 모드·합성 강도·SMOOTH·파일명·파일 크기이며, 새 파일을 열거나 관련 조절을 마치면 다시 생성합니다. HD와 UHD LIVE는 동시에 켜지지 않습니다.

LIVE와 EXPORT는 대역 확장의 앞뒤 순서가 다르므로 **동일 설정에서도 완전히 같은 출력은 아닙니다**. 현재 코드에는 다음 차이도 있습니다.

- 실시간은 Compressor MAKEUP으로 설정한 공통 출력 게인을 뒤에서 Master OUTPUT GAIN으로 덮어쓰고, 오프라인은 Compressor 뒤에 별도 MAKEUP 노드를 둡니다.
- LOW COMP가 5보다 큰 경우 Low-mid 비율은 실시간에서 5:1로 제한되지만 오프라인에서는 설정값을 사용합니다.
- 실시간 `applyLiveDSP()`는 `makeAtmosIR()`의 `part` 인자를 생략하고 같은 IR을 두 컨볼버에 넣습니다. 이 호출은 후기 잔향 분기로 들어가므로 오프라인의 분리된 초기·후기 IR과 다르게 동작합니다.
- Vinyl 잡음과 Atmos 후기 IR의 난수 때문에 반복 렌더 사이에도 차이가 생길 수 있습니다.

LIVE 컨텍스트가 96/192 kHz 요청을 거부하면 장치 기본값으로 재생하고 상태에 실제 출력 레이트를 표시합니다. DRY 분석기는 **DSP 직전 재생 버퍼**를 보므로 LIVE 활성 시에는 이미 대역 확장된 신호를 표시합니다.

## 분석기·WAV·설정 파일 명세

### 주파수 시각화

DRY/WET 모두 `AnalyserNode.fftSize=2048`(1,024빈), 시간 평활 0.8을 사용합니다. 표시 레벨은 −100~−30 dB입니다. X-AXIS의 48/96/192 표기는 샘플레이트 기준으로, 주파수 상한은 각각 24/48/96 kHz입니다. 표시 범위가 실제 컨텍스트의 나이퀴스트보다 넓으면 데이터 없는 영역을 구분해 보여줍니다. 이 분석기는 저장한 WAV 파일을 다시 분석하는 도구가 아닙니다.

### WAV 컨테이너

`encodeWAV()`는 **44바이트 RIFF/WAVE 헤더 + 인터리브된 샘플 데이터**를 작성합니다. 다중 바이트 숫자는 little-endian이며 `fmt ` 청크 길이는 16바이트입니다.

| 필드 / 변환 | 규칙 |
| --- | --- |
| Format tag | 16/24-bit는 1(PCM), 32-bit는 3(IEEE float) |
| Data 크기 | `샘플 프레임 수 × 채널 수 × (비트 수/8)` 바이트 |
| Byte rate / Block align | `SR×채널 수×샘플당 바이트` / `채널 수×샘플당 바이트` |
| 16-bit | −1~1로 제한 후 `round(sample×32767)`을 signed 16-bit로 기록 |
| 24-bit | −1~1로 제한 후 `round(sample×8388607)`의 하위 3바이트 기록 |
| 32-bit float | float32 값을 기록하며 인코더 단계의 −1~1 클램프는 없음 |
| 파일명 | `<원본명>_dsp.wav`, `_HD96k24bit.wav`, `_UHD192k32bit.wav` |

인코더에 디더링, 원본 태그·앨범아트 복사, RF64 처리는 없습니다. 전용 `claude.use('downloads')` 어댑터가 있으면 WAV를 CRC-32가 포함된 무압축 ZIP으로 감싸 전달하고, 일반 브라우저에서는 WAV Blob 다운로드를 사용합니다.

### 프리셋 데이터 구조

| 필드 | 값 / 의미 |
| --- | --- |
| `format`, `version` | `"asde-preset"`, `1` |
| `savedAt` | ISO 형식 저장 시각 |
| `sliders` | HTML 입력 ID → 슬라이더 값 문자열; 분석기 축 설정 포함 |
| `toggles` | 체크박스 ID → boolean; 모듈·HD/UHD LIVE 상태 포함 |
| `order` | `.module` 요소 ID 배열 |
| `sgMode`, `atmosScene` | 선택된 모드·씬 이름 |

복원 순서는 **씬/모드 → 슬라이더 → 일반 토글 → 모듈 순서 → LIVE 토글**입니다. 마스터와 HD 패널은 복원 후에도 끝으로 이동합니다. 음원·렌더 버퍼는 저장되지 않으므로 새로고침 후에는 파일을 다시 선택해야 합니다.

슬롯은 `asde.preset.slot.1`~`asde.preset.slot.4` 키로 현재 출처의 `localStorage`에 저장됩니다. 슬롯 백업은 `format:"asde-slots"`, `version:1`, `savedAt`, `slots` 필드를 가지며 슬롯 1~4에 프리셋 또는 `null`을 담습니다. 백업을 가져오면 슬롯을 복원하고, 백업에서 빈 슬롯은 기존 값도 지웁니다. 현재 조작 화면에는 자동 적용하지 않습니다. HTTPS 사이트와 localhost는 저장 공간이 다르므로 JSON 파일로 옮기세요.

## 자원 사용과 구현상 제약

- 전체 음원을 디코딩하고 전체 길이의 버퍼를 처리합니다. 출력·리샘플 버퍼 외에 STFT용 채널 단위 배열, LIVE 캐시, WAV 인코딩 버퍼가 동시에 필요할 수 있습니다.
- Float32 오디오 버퍼 하나의 원시 데이터 크기는 `초×SR×채널 수×4`바이트입니다. **5분·192 kHz·2채널은 버퍼 하나만 약 439.5 MiB**이며 총 메모리는 이보다 큽니다.
- 내보내기는 예상 PCM 데이터가 **1,800 MiB를 넘으면 중단**합니다. 이는 성공 가능한 메모리 용량을 보장하는 값이 아니며 실제 한계는 기기·브라우저마다 다릅니다.
- 오프라인 렌더 길이는 `ceil(원본 길이×목표 SR)`입니다. 원본 끝 이후의 잔향 꼬리를 담기 위한 추가 길이는 확보하지 않습니다.
- 목표 레이트를 지원하는지 짧은 `OfflineAudioContext`로 먼저 확인합니다. 오프라인 DSP 단계의 진행률 일부는 타이머 기반 안내이고 정확한 처리율 측정은 아닙니다.
- 주파수 확장은 첫 채널의 전역 통계를 사용하고 4,096점 고정 FFT로 동작합니다. 소스별 자연스러운 고역 감쇠와 손실 압축의 차단을 항상 정확히 구별하지는 못합니다.

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

문서를 읽을 때는 [사용 설명서](https://efx.yeon.at/analog-soul-manual.html) → [신호 처리 사양서](https://efx.yeon.at/analog-soul-engineering.html) → [구현 논고](https://efx.yeon.at/analog-soul-internals.html) 순서로 깊이를 높일 수 있습니다. 기존 문서·화면 설명 중 일부와 현재 구현이 다른 부분은 이 README에서 코드 기준으로 설명했습니다. 예를 들어 배음 위상 배수 보정, SYNTH=0일 때의 합성 생략, LIVE와 EXPORT의 처리 순서는 실제 함수 호출 흐름을 기준으로 합니다.

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
