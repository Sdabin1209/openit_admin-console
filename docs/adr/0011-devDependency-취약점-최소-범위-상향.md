# ADR 0011: devDependency 취약점(ajv, fast-uri)을 최소 범위로 올린다

## 상태
채택됨 (2026-10-28). 이 영역은 온라인 감사를 처음 실시했다.

## 맥락
`npm audit`(2026-10-28, 레지스트리 조회만)가 2건(moderate)을 보고했다: ajv `<=8.17.1`(`$data` 옵션 ReDoS, GHSA-2g4f-4pwh-qvx6), fast-uri `<=3.1.8`(URI 해석 취약점 4건). `npm audit --omit=dev`는 0건이다.

## 결정
- ajv 8.17.1 -> **8.20.0**(같은 8.x, 감사가 제시한 수정 버전). 정확한 버전으로 고정(기존 방식 유지). ajv-formats 3.0.1은 그대로이며 새 ajv와 시험이 통과한다.
- fast-uri(ajv의 하위 의존)는 잠금 파일에서 3.1.8 -> 3.1.9.
- 결과: `npm audit` 0건, `npm audit --omit=dev` 0건.

## 왜 (따른 표준과 근거)
- 따른 기준: 의존 버전은 잠금 파일로 고정, 고정 밖 상향은 최소 범위(워크스페이스 규칙).
- 런타임 영향 없음 근거(확인한 것): 둘 다 `devDependencies`다. ajv는 `gen:schemas`로 계약 스키마에서 검증기 코드를 생성할 때 쓴다(ADR 0002). 이미지는 다단계 빌드이고 최종 단계에는 `dist`와 정적 서버(ADR 0006)만 복사한다(Dockerfile). 단, 생성된 검증기는 `ajv/dist/runtime/ucs2length` 한 함수를 `require`하므로 번들(`dist`)에 ajv 런타임의 그 함수가 들어간다. 감사된 취약점은 `$data` 컴파일 경로(ReDoS)와 fast-uri이고, 생성 코드는 fast-uri를 부르지 않는다(생성 파일의 `require`는 그 한 건뿐임을 확인). `--omit=dev` 감사는 0건이다.
- 확인하지 못한 것: 상향 후 `node scripts/gen-schemas.mjs --check`로 생성 검증기가 그대로임을 확인했고 시험 81개가 통과했다. 번들 안 ucs2length 동작이 바뀌었는지는 소스 비교까지는 하지 않았다.

## 검토한 대안과 버리는 이유
- 올리지 않고 문서화만: 시험이 통과하므로 올리지 않을 이유가 없다.
- `npm audit fix --force`: 이 경우 제시 버전이 8.20.0으로 같아 별도 이점이 없다.

## 결과
단위 81 통과, 타입 검사 통과, smoke 통과. 감수할 것 없음.

## 되돌리는 조건
새 버전에서 생성 검증기나 시험이 깨지면 8.17.1로 되돌리고 새 ADR로 대체한다.
